import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'

const baseWs = process.env.NEXT_PUBLIC_HUNTER_WS ?? 'wss://hunter.rosieai.dev/stream'

const MAX_LOGS = 200
const MAX_DETECTIONS = 100

type ConnectionState = 'idle' | 'connecting' | 'connected' | 'error' | 'unauthorized'
type LogLevel = 'info' | 'warning' | 'error' | 'debug'

type LogEntry = {
  ts: number
  level: LogLevel
  message: string
}

type DetectionEntry = {
  ts: number
  amm: string
  symbol: string
  baseMint: string
  quoteMint: string
  slot: number | null
  tx: string
}

const maskKey = (key: string) => (key ? key.replace(/.(?=.{4})/g, '*') : '')

const mapLogLevel = (value: unknown): LogLevel => {
  const normalised = typeof value === 'string' ? value.toLowerCase() : ''
  if (normalised === 'warn' || normalised === 'warning') return 'warning'
  if (normalised === 'error') return 'error'
  if (normalised === 'debug' || normalised === 'trace') return 'debug'
  return 'info'
}

export default function HunterPage() {
  const router = useRouter()
  const [viewerKey, setViewerKey] = useState('')
  const [inputKey, setInputKey] = useState('')
  const [keyError, setKeyError] = useState('')
  const [connectionState, setConnectionState] = useState<ConnectionState>('idle')
  const [showViewerKey, setShowViewerKey] = useState(false)
  const [logEntries, setLogEntries] = useState<LogEntry[]>([])
  const [detections, setDetections] = useState<DetectionEntry[]>([])
  const [lastHeartbeat, setLastHeartbeat] = useState<number | null>(null)
  const [isClientReady, setIsClientReady] = useState(false)

  const logContainerRef = useRef<HTMLDivElement | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  const appendLog = useCallback((message: string, level: LogLevel = 'info') => {
    setLogEntries(prev => {
      const entry: LogEntry = {
        ts: Date.now(),
        level,
        message,
      }
      const next = [...prev, entry]
      if (next.length > MAX_LOGS) {
        return next.slice(next.length - MAX_LOGS)
      }
      return next
    })
  }, [])

  const addDetection = useCallback((entry: DetectionEntry) => {
    setDetections(prev => {
      const next = [entry, ...prev]
      if (next.length > MAX_DETECTIONS) {
        return next.slice(0, MAX_DETECTIONS)
      }
      return next
    })
  }, [])

  const handleMessage = useCallback((data: any) => {
    const topic = data?.topic
    const payload = data?.payload ?? {}
    switch (topic) {
      case 'detection': {
        const detection: DetectionEntry = {
          ts: typeof data?.ts === 'number' ? data.ts * 1000 : Date.now(),
          amm: typeof payload?.amm === 'string' ? payload.amm : 'Unknown AMM',
          symbol: typeof payload?.symbol === 'string' && payload.symbol ? payload.symbol : 'Unknown',
          baseMint: typeof payload?.base_mint === 'string' ? payload.base_mint : 'N/A',
          quoteMint: typeof payload?.quote_mint === 'string' ? payload.quote_mint : 'N/A',
          slot: typeof payload?.slot === 'number' ? payload.slot : null,
          tx: typeof payload?.tx_signature === 'string' ? payload.tx_signature : '',
        }
        addDetection(detection)
        appendLog(`Detection: ${detection.symbol} on ${detection.amm}`, 'info')
        break
      }
      case 'log': {
        const level = mapLogLevel(payload?.level)
        const loggerName = typeof payload?.logger === 'string' ? payload.logger : ''
        const messageText = typeof payload?.message === 'string' ? payload.message : JSON.stringify(payload ?? {})
        appendLog(`${loggerName ? `[${loggerName}] ` : ''}${messageText}`, level)
        break
      }
      case 'heartbeat': {
        setLastHeartbeat(Date.now())
        break
      }
      case 'news': {
        const summary = typeof payload?.preview === 'string' ? payload.preview : payload?.title ?? 'News update'
        appendLog(`News: ${summary}`, 'info')
        break
      }
      case 'correlation': {
        const detail = typeof payload?.rationale === 'string' ? payload.rationale : 'Correlation update'
        appendLog(`Correlation: ${detail}`, 'info')
        break
      }
      case 'metric': {
        const safe = JSON.stringify(payload ?? {})
        appendLog(`Metric: ${safe}`, 'debug')
        break
      }
      default: {
        if (topic) {
          appendLog(`Unhandled topic: ${topic}`, 'debug')
        }
      }
    }
  }, [addDetection, appendLog])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const stored = localStorage.getItem('hunterViewerKey') || ''
    setViewerKey(stored)
    setInputKey('')
    setShowViewerKey(false)
    setIsClientReady(true)
    if (!stored) {
      setKeyError('Viewer key required. Enter your key to connect.')
    } else {
      setKeyError('')
    }
  }, [])

  useEffect(() => {
    if (!viewerKey) {
      return
    }
    try {
      const wsUrl = `${baseWs}?token=${encodeURIComponent(viewerKey)}`
      setConnectionState('connecting')
      const ws = new WebSocket(wsUrl)
      wsRef.current = ws

      ws.onopen = () => {
        setConnectionState('connected')
        appendLog('WebSocket connection established.', 'info')
      }

      ws.onmessage = event => {
        try {
          const parsed = JSON.parse(event.data)
          handleMessage(parsed)
        } catch (error) {
          const message = error instanceof Error ? error.message : 'unknown error'
          appendLog(`Failed to parse message: ${message}`, 'error')
        }
      }

      ws.onerror = () => {
        appendLog('WebSocket error encountered.', 'error')
      }

      ws.onclose = event => {
        wsRef.current = null
        if (event.code === 1008 || event.code === 4403) {
          setConnectionState('unauthorized')
          appendLog('Viewer key rejected by hunter backend.', 'error')
          setKeyError('Viewer key rejected; please verify and re-enter your key.')
          return
        }
        appendLog(`Connection closed (code ${event.code}).`, 'warning')
        setConnectionState('error')
      }

      return () => {
        wsRef.current = null
        ws.close()
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error'
      appendLog(`Failed to open WebSocket: ${message}`, 'error')
      setConnectionState('error')
    }
  }, [viewerKey, appendLog, handleMessage])

  useEffect(() => {
    if (!logContainerRef.current) return
    logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
  }, [logEntries])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = inputKey.trim()
    if (!trimmed) {
      setKeyError('Enter your viewer key to connect.')
      setViewerKey('')
      wsRef.current?.close()
      return
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('hunterViewerKey', trimmed)
    }
    setKeyError('')
    setLogEntries([])
    setDetections([])
    setViewerKey(trimmed)
    setInputKey('')
    setShowViewerKey(false)
  }

  const handleClearKey = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hunterViewerKey')
    }
    setViewerKey('')
    setInputKey('')
    setShowViewerKey(false)
    setKeyError('Viewer key cleared. Enter a key to reconnect.')
    setConnectionState('idle')
    wsRef.current?.close()
  }

  const connectionBadge = (() => {
    switch (connectionState) {
      case 'connected':
        return { label: 'Connected', className: 'bg-emerald-100 text-emerald-700 border-emerald-300' }
      case 'connecting':
        return { label: 'Connecting...', className: 'bg-amber-100 text-amber-700 border-amber-300' }
      case 'unauthorized':
        return { label: 'Unauthorized', className: 'bg-red-100 text-red-700 border-red-300' }
      case 'error':
        return { label: 'Disconnected', className: 'bg-red-100 text-red-700 border-red-300' }
      default:
        return { label: 'Idle', className: 'bg-stone-200 text-stone-700 border-stone-300' }
    }
  })()

  const maskedViewerKey = maskKey(viewerKey)

  return (
    <>
      <Head>
        <title>Hunter Console | Rosie Learning Systems</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-100">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
          <header className="flex flex-col gap-6 rounded-3xl border border-stone-800 bg-stone-900/80 p-6 shadow-xl backdrop-blur">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-semibold sm:text-3xl">Hunter Live Console</h1>
                <p className="text-sm text-stone-400">
                  Streaming detections, logs, and heartbeats from hunter.rosieai.dev.
                </p>
              </div>
              <div className={`inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold ${connectionBadge.className}`}>
                {connectionBadge.label}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-stone-800 bg-stone-950/60 p-4 sm:grid-cols-[2fr,auto] sm:items-end">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500" htmlFor="viewer-key">
                  Viewer Key
                </label>
                <div className="relative mt-1">
                  <input
                    id="viewer-key"
                    type={showViewerKey ? 'text' : 'password'}
                    value={isClientReady ? inputKey : ''}
                    onChange={event => {
                      if (keyError) setKeyError('')
                      setInputKey(event.target.value)
                    }}
                    placeholder="alpha-2025"
                    className="w-full rounded-lg border border-stone-700 bg-stone-900 px-3 py-2 pr-16 text-sm text-stone-100 shadow-inner focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    autoComplete="off"
                    disabled={!isClientReady}
                  />
                  <button
                    type="button"
                    onClick={() => setShowViewerKey(prev => !prev)}
                    className="absolute inset-y-0 right-2 flex items-center text-xs font-semibold text-amber-300 hover:text-amber-200"
                  >
                    {showViewerKey ? 'Hide' : 'Show'}
                  </button>
                </div>
                {keyError && (
                  <p className="mt-2 text-xs text-red-400">{keyError}</p>
                )}
                {viewerKey && (
                  <p className="mt-2 text-xs text-stone-500">Using key: {maskedViewerKey}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:from-amber-600 hover:to-orange-700 disabled:opacity-60"
                  disabled={!isClientReady}
                >
                  Connect
                </button>
                <button
                  type="button"
                  onClick={handleClearKey}
                  className="inline-flex items-center justify-center rounded-lg border border-stone-700 px-4 py-2 text-sm font-semibold text-stone-300 transition hover:border-red-500 hover:text-red-400"
                >
                  Clear Key
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
              <span>Last heartbeat: {lastHeartbeat ? `${Math.round((Date.now() - lastHeartbeat) / 1000)}s ago` : 'N/A'}</span>
              <span>Active detections cached: {detections.length}</span>
              <span>Log lines buffered: {logEntries.length}</span>
              <Link href="/" className="ml-auto inline-flex items-center gap-1 text-amber-400 hover:text-amber-300">
                ? Back to landing
              </Link>
            </div>
          </header>

          {!viewerKey && (
            <div className="mt-8 rounded-3xl border border-amber-500/40 bg-amber-500/10 p-6 text-sm text-amber-100">
              <p className="font-semibold">Viewer key required</p>
              <p className="mt-1 text-amber-200">
                Enter a valid viewer key above to open a live connection. Keys are provided by the Rosie Hunter backend team.
              </p>
            </div>
          )}

          <section className="mt-10 grid gap-8 lg:grid-cols-[2fr,3fr]">
            <div className="rounded-3xl border border-stone-800 bg-stone-950/60 p-5 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-100">Live Detections</h2>
                <span className="text-xs text-stone-500">Newest first</span>
              </div>
              {detections.length === 0 ? (
                <p className="rounded-lg border border-dashed border-stone-800 bg-stone-900/40 p-6 text-sm text-stone-400">
                  Waiting for detections...
                </p>
              ) : (
                <ul className="space-y-4">
                  {detections.map((detection, index) => (
                    <li key={`${detection.tx || detection.ts}-${index}`} className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                          {detection.symbol}
                        </span>
                        <span className="text-xs text-stone-400">{detection.amm}</span>
                        {detection.slot !== null && (
                          <span className="text-xs text-stone-500">slot {detection.slot}</span>
                        )}
                        <span className="ml-auto text-xs text-stone-500">
                          {new Date(detection.ts).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 text-xs text-stone-400 sm:grid-cols-2">
                        <div>
                          <span className="text-stone-500">Base:</span> {detection.baseMint}
                        </div>
                        <div>
                          <span className="text-stone-500">Quote:</span> {detection.quoteMint}
                        </div>
                        {detection.tx && (
                          <div className="sm:col-span-2">
                            <a
                              href={`https://solscan.io/tx/${detection.tx}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-amber-400 hover:text-amber-200"
                            >
                              {detection.tx}
                            </a>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-3xl border border-stone-800 bg-stone-950/60 p-5 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-stone-100">Live Log Stream</h2>
                <span className="text-xs text-stone-500">Latest at bottom</span>
              </div>
              <div ref={logContainerRef} className="h-[420px] overflow-y-auto rounded-xl border border-stone-800 bg-black/50 p-4 text-xs font-mono text-stone-200">
                {logEntries.length === 0 ? (
                  <p className="text-stone-500">Log output will appear here once connected.</p>
                ) : (
                  logEntries.map(entry => (
                    <div key={`${entry.ts}-${entry.message}`} className="mb-2 whitespace-pre-wrap break-words last:mb-0">
                      <span className="text-stone-500">[{new Date(entry.ts).toLocaleTimeString()}]</span>{' '}
                      <span
                        className={
                          entry.level === 'error'
                            ? 'text-red-400'
                            : entry.level === 'warning'
                              ? 'text-amber-300'
                              : entry.level === 'debug'
                                ? 'text-stone-500'
                                : 'text-stone-200'
                        }
                      >
                        {entry.message}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}


