import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { FaUniversity, FaCode, FaLinkedin, FaGithub, FaEnvelope, FaTelegram, FaTwitter, FaCalendar, FaChartLine, FaBrain, FaArrowRight } from 'react-icons/fa'
import { SiSolidity, SiPython, SiJavascript, SiReact } from 'react-icons/si'
import { MdSecurity, MdAnalytics, MdMonitor, MdWarning } from 'react-icons/md'
import { BsDatabase, BsGraphUp } from 'react-icons/bs'

// This is our new hardcoded post data for the widget
const latestPostStatic = {
  _id: 'static-post-1',
  title: "Under the Hood: How Rosie Learns",
  date: '2025-07-17T00:00:00.000Z',
  slug: 'under-the-hood-how-rosie-learns',
  mood: 'laser_focus',
  tradingMetrics: {
    trades: 6020,
    level: 26,
    elo: 32785,
    winRate: 49.5,
    pnl: 153.49
  },
  excerpt: "A deep dive into the AI training, data analysis, and decision-making process of Rosie, the autonomous crypto trading agent."
};


export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [terminalLines, setTerminalLines] = useState([])
  const [activeProductTab, setActiveProductTab] = useState('analysis')
  const [expandedFeature, setExpandedFeature] = useState(null)
  const [viewerKey, setViewerKey] = useState('')
  const [viewerKeyInput, setViewerKeyInput] = useState('')
  const [viewerKeyError, setViewerKeyError] = useState('')
  const [isKeyReady, setIsKeyReady] = useState(false)
  const [showViewerKey, setShowViewerKey] = useState(false)
  
  // We'll use our static post data here
  const latestPost = latestPostStatic;
  const blogLoading = false;

  const router = useRouter()
  const hasViewerKey = viewerKey.trim().length > 0
  const maskedViewerKey = hasViewerKey ? viewerKey.replace(/.(?=.{4})/g, '*') : ''

  const terminalRef = useRef(null)
  const expandedRef = useRef(null)

  // ... (keep all the existing useEffects and functions like generateTerminalSequence, scrollToSection, etc.)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const storedKey = localStorage.getItem('hunterViewerKey') || ''
    setViewerKey(storedKey)
    setViewerKeyInput('')
    setShowViewerKey(false)
    setIsKeyReady(true)
  }, [])

  const handleViewerKeyChange = (event) => {
    if (viewerKeyError) {
      setViewerKeyError('')
    }
    setViewerKeyInput(event.target.value)
  }

  const handleViewerKeySubmit = (event) => {
    event.preventDefault()
    const trimmed = viewerKeyInput.trim()
    if (!trimmed) {
      setViewerKeyError('Enter your viewer key to continue.')
      return
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('hunterViewerKey', trimmed)
    }
    setViewerKey(trimmed)
    setViewerKeyInput('')
    setShowViewerKey(false)
    setViewerKeyError('')
    router.push('/hunter')
  }

  const handleViewerKeyReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hunterViewerKey')
    }
    setViewerKey('')
    setViewerKeyInput('')
    setViewerKeyError('')
    setShowViewerKey(false)
  }

  // Terminal simulation data
  const generateTerminalSequence = () => {
    const tokens = ['PEPE', 'SHIB', 'DOGE', 'FLOKI', 'ELON', 'MOON', 'ROCKET', 'WAGMI', 'GME', 'APE']
    const randomToken = tokens[Math.floor(Math.random() * tokens.length)]
    const randomAddress = '0x' + Math.random().toString(16).substr(2, 40)
    const randomPnL = (Math.random() * 50 - 10).toFixed(2)
    const randomLockPercent = (Math.random() * 100).toFixed(2)
    const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19)

    return [
      { text: '====================================', color: 'text-green-600', delay: 0 },
      { text: `?? Rosie Level ${Math.floor(Math.random() * 3) + 5} ?`, color: 'text-green-600', delay: 50 },
      { text: `?? Trades: ${Math.floor(Math.random() * 10) + 15} | Win: ${(Math.random() * 20 + 50).toFixed(1)}%`, color: 'text-green-600', delay: 50 },
      { text: '====================================', color: 'text-green-600', delay: 50 },
      { text: `[INFO] - ?? Running pre-flight checks...`, color: 'text-stone-700', delay: 100 },
      { text: `[INFO] - ?? Fetching context for ${randomToken}...`, color: 'text-stone-700', delay: 200 },
      { text: `[INFO] - Found pair ${randomAddress.substr(0, 8)}...`, color: 'text-stone-700', delay: 300 },
      { text: `[WARNING] - LP: ${randomLockPercent}% locked.`, color: 'text-orange-600', delay: 400 },
      { text: `[INFO] - ?? PAPER trading session...`, color: 'text-stone-700', delay: 150 },
      { text: `[INFO] - Budget: $250.00`, color: 'text-stone-700', delay: 100 },
      { text: `[INFO] - COMPLETE. PnL: ${randomPnL}`, color: parseFloat(randomPnL) > 0 ? 'text-green-600' : 'text-red-600', delay: 50 },
      { text: `[INFO] - Brain saved. ??`, color: 'text-green-600', delay: 200 },
    ]
  }

  // Initialize terminal
  useEffect(() => {
    let timeoutIds = []
    let isActive = true
    
    const runSequence = () => {
      if (!isActive) return
      
      const sequence = generateTerminalSequence()
      setTerminalLines([])
      let cumulativeDelay = 0
      
      sequence.forEach((line, index) => {
        cumulativeDelay += line.delay
        const timeoutId = setTimeout(() => {
          if (isActive) {
            setTerminalLines(prev => [...prev, line])
            
            if (terminalRef.current) {
              terminalRef.current.scrollTop = terminalRef.current.scrollHeight
            }
            
            if (index === sequence.length - 1) {
              const restartTimeout = setTimeout(() => {
                if (isActive) runSequence()
              }, 3000)
              timeoutIds.push(restartTimeout)
            }
          }
        }, cumulativeDelay)
        timeoutIds.push(timeoutId)
      })
    }
    
    runSequence()
    
    return () => {
      isActive = false
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = (currentScroll / totalHeight) * 100
      setScrollProgress(progress)

      const sections = document.querySelectorAll('section')
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
  }

  const productFeatures = {
    analysis: {
      title: "Data Collection & Analysis",
      icon: <BsDatabase className="text-2xl" />,
      description: "Advanced blockchain data aggregation and pattern recognition",
      features: [
        "Real-time mempool monitoring",
        "Liquidity pool analysis",
        "Smart contract verification",
        "Historical pattern matching"
      ],
      code: `# Data Collection Module
def collect_blockchain_data(self):
    mempool = self.monitor_mempool()
    liquidity = self.analyze_liquidity_pools()
    contracts = self.verify_smart_contracts()
    
    return self.aggregate_signals({
        'mempool': mempool,
        'liquidity': liquidity,
        'contracts': contracts
    })`,
      expandedContent: {
        title: "Deep Dive: Data Collection & Analysis",
        sections: [
          {
            heading: "Real-time Mempool Monitoring",
            content: "Rosie continuously scans pending transactions in the mempool, identifying patterns before they hit the blockchain. This allows for predictive analysis of market movements and early detection of coordinated trading activities.",
            stats: ["500K+ transactions/hour", "15ms avg response time", "99.9% uptime"]
          },
          {
            heading: "Liquidity Pool Analysis",
            content: "Advanced algorithms analyze liquidity depth, price impact, and pool composition across multiple DEXs. Rosie identifies arbitrage opportunities and detects unusual liquidity movements that may indicate market manipulation.",
            stats: ["200+ DEX integrations", "Real-time price feeds", "Cross-chain analysis"]
          },
          {
            heading: "Pattern Recognition Engine",
            content: "Machine learning models trained on millions of historical transactions identify recurring patterns and anomalies. The system adapts to new market conditions and continuously improves its predictive accuracy.",
            stats: ["ML-powered insights", "Self-improving algorithms", "Pattern library of 10K+ scenarios"]
          }
        ]
      }
    },
    monitoring: {
      title: "Live Monitoring & Threat Detection",
      icon: <MdMonitor className="text-2xl" />,
      description: "24/7 autonomous threat detection and opportunity scanning",
      features: [
        "Rug pull detection algorithm",
        "Honeypot identification",
        "Volume anomaly detection",
        "Whale movement tracking"
      ],
      code: `# Threat Detection Module
def detect_threats(self, transaction):
    risk_score = self.calculate_risk(transaction)
    
    if self.is_honeypot(transaction.contract):
        return Alert("HONEYPOT_DETECTED", critical=True)
    
    if self.detect_rug_pattern(transaction):
        return Alert("RUG_PULL_RISK", risk_score)
        
    return self.monitor_continue(transaction)`,
      expandedContent: {
        title: "Deep Dive: Threat Detection & Monitoring",
        sections: [
          {
            heading: "Rug Pull Detection System",
            content: "Proprietary algorithms analyze contract ownership, liquidity locks, and developer behavior patterns. Rosie assigns risk scores based on multiple factors including code similarity to known scams and unusual permission structures.",
            stats: ["95% detection accuracy", "< 2% false positive rate", "Database of 50K+ known rugs"]
          },
          {
            heading: "Honeypot Identification",
            content: "Advanced static and dynamic analysis of smart contracts identifies hidden transfer restrictions and malicious functions. Rosie simulates transactions to detect traps before you fall into them.",
            stats: ["Smart contract decompilation", "Automated testing suite", "Real-time alerts"]
          },
          {
            heading: "Whale Movement Tracking",
            content: "Monitor large holder activities across multiple chains. Rosie tracks wallet clustering, identifies accumulation patterns, and alerts on significant position changes that could impact price.",
            stats: ["10K+ whale wallets tracked", "Cross-reference with CEX flows", "Historical behavior analysis"]
          }
        ]
      }
    }
  }

  const handleFeatureClick = (key) => {
    setActiveProductTab(key)
    if (expandedFeature === key) {
      setExpandedFeature(null)
    } else {
      setExpandedFeature(key)
      setTimeout(() => {
        if (expandedRef.current) {
          expandedRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  const moodEmojis = {
    'banana_zone': '??',
    'full_savage': '??',
    'laser_focus': '??',
    'revenge_mode': '??',
    'zen_monkey': '??'
  }

  const moodColors = {
    'banana_zone': 'from-yellow-400 to-amber-500',
    'full_savage': 'from-orange-500 to-red-600',
    'laser_focus': 'from-blue-500 to-purple-600',
    'revenge_mode': 'from-red-600 to-red-800',
    'zen_monkey': 'from-green-500 to-teal-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50 text-stone-800 font-sans overflow-x-hidden">
      <Head>
        <title>Rosie Learning Systems | Autonomous Crypto Intelligence</title>
        <link rel="icon" href="/rosie-pixel.png" type="image/png" />
        <link rel="apple-touch-icon" href="/rosie-pixel.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5" />
        <meta name="description" content="Autonomous crypto intelligence built with heart, trained for chaos. Real-time blockchain analysis and threat detection." />
        <meta property="og:title" content="Rosie Learning Systems" />
        <meta property="og:description" content="Autonomous crypto intelligence built with heart, trained for chaos." />
        <meta property="og:url" content="https://rosieai.dev" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://rosieai.dev" />
      </Head>

      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-orange-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Link 
        href="/blog" 
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        Blog
      </Link>

      <div className="fixed right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        {['hero', 'product', 'legacy', 'leadership'].map((section, index) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`block w-3 h-3 rounded-full mb-4 transition-all duration-300 ${
              activeSection === index 
                ? 'bg-amber-600 scale-150' 
                : 'bg-stone-400 hover:bg-stone-600'
            }`}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>

      <main>
         <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50/90 via-amber-50/80 to-amber-50/90 z-10" />
            <Image 
              src="/lazykitty.png" 
              alt="Background"
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aaAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
          <div className="absolute inset-0 z-5">
            <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse top-20 -left-32 sm:-left-48" />
            <div className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse bottom-20 -right-32 sm:-right-48" />
          </div>
          <div className="relative z-10 text-center px-2 sm:px-6 max-w-4xl mx-auto">
            <div className="mb-6 sm:mb-8 animate-fade-in">
              <Image 
                src="/rosie-pixel.png" 
                alt="Rosie Logo" 
                width={100} 
                height={100} 
                className="mx-auto filter drop-shadow-2xl sm:w-[120px] sm:h-[120px]"
              />
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 animate-fade-in-delay-1">
              <span className="bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text block sm:inline">
                Rosie Learning Systems
              </span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-stone-600 mb-6 sm:mb-8 animate-fade-in-delay-2">
              Autonomous Crypto Intelligence
            </p>
            <p className="text-sm sm:text-lg text-stone-500 max-w-2xl mx-auto animate-fade-in-delay-3">
              Built with heart. Trained for chaos.
            </p>
            <div className="mt-8 sm:mt-12 flex flex-col items-center space-y-4">
              <button 
                onClick={() => scrollToSection('product')}
                className="text-stone-400 hover:text-amber-600 transition-colors p-2 animate-bounce"
              >
                <svg className="w-6 sm:w-8 h-6 sm:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/blog" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Read Rosie&apos;s Diary
                </Link>
                <Link href="/blog" className="inline-flex items-center px-6 py-3 border-2 border-amber-600 text-amber-600 font-semibold rounded-lg hover:bg-amber-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View All Blog Posts
                </Link>
                <button
                  type="button"
                  onClick={() => scrollToSection('viewer-key-card')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Hunter Dashboard
                </button>
              </div>
            </div>
            <div id="viewer-key-card" className="mt-10 w-full max-w-md mx-auto rounded-2xl border border-amber-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Image src="/Rosie.png" alt="Rosie emblem" width={48} height={48} className="rounded-full shadow-md" />
                <h2 className="text-lg font-semibold text-stone-800">Hunter Viewer Key</h2>
              </div>
              <p className="mt-3 text-sm text-stone-500">
                Store your viewer key locally to unlock the live hunter console.
              </p>
              <form onSubmit={handleViewerKeySubmit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500" htmlFor="viewer-key-input">
                    Viewer Key
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="viewer-key-input"
                      type={showViewerKey ? 'text' : 'password'}
                      value={viewerKeyInput}
                      onChange={handleViewerKeyChange}
                      placeholder="alpha-2025"
                      className="w-full rounded-lg border border-stone-300 bg-white/95 px-3 py-2 pr-16 text-sm text-stone-800 shadow-inner focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                      disabled={!isKeyReady}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowViewerKey(prev => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-amber-600 hover:text-amber-700"
                    >
                      {showViewerKey ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                {viewerKeyError && (
                  <p className="text-sm text-red-600">{viewerKeyError}</p>
                )}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:from-amber-700 hover:to-orange-700 disabled:opacity-60"
                    disabled={!isKeyReady}
                  >
                    Launch Hunter Dashboard
                  </button>
                  {hasViewerKey && (
                    <button
                      type="button"
                      onClick={handleViewerKeyReset}
                      className="inline-flex w-full justify-center rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-600 transition hover:border-amber-500 hover:text-amber-600"
                    >
                      Clear Saved Key
                    </button>
                  )}
                </div>
              </form>
              <div className="mt-3 rounded-lg bg-stone-100 px-3 py-2 text-xs text-stone-500">
                <span className="font-semibold text-stone-700">Status:</span>{' '}
                {hasViewerKey ? (
                  <>Key saved locally</>
                ) : (
                  <>Awaiting key entry</>
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="product" className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-stone-900 to-stone-800">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text">
                  Principal Product
                </span>
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto" />
            </div>
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4">
                  <SiPython className="text-2xl sm:text-4xl text-amber-600 flex-shrink-0" />
                  <h3 className="text-xl sm:text-3xl font-bold text-stone-100">Rosie.py</h3>
                </div>
                <p className="text-sm sm:text-lg text-stone-400 leading-relaxed">
                  An autonomous crypto agent that operates with the instincts of a trained hunter. 
                  Rosie snoops the blockchain looking for opportunities, catching bad actors, 
                  and turning market noise into actionable intelligence.
                </p>
              </div>
              <div className="bg-stone-800/50 backdrop-blur-sm rounded-2xl border border-stone-700 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  {Object.entries(productFeatures).map(([key, feature]) => (
                    <button
                      key={key}
                      onClick={() => handleFeatureClick(key)}
                      className={`flex-1 p-4 rounded-lg border transition-all duration-300 ${
                        activeProductTab === key
                          ? 'bg-gradient-to-r from-amber-600 to-orange-600 border-transparent text-white shadow-lg'
                          : 'bg-stone-800 border-stone-700 text-stone-400 hover:border-amber-600'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-3">
                        {feature.icon}
                        <span className="font-semibold text-sm sm:text-base">{feature.title}</span>
                      </div>
                      {expandedFeature === key && (
                        <div className="mt-2">
                          <svg className="w-5 h-5 mx-auto animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-stone-100">
                        {productFeatures[activeProductTab].title}
                      </h4>
                      <p className="text-stone-400">
                        {productFeatures[activeProductTab].description}
                      </p>
                      <ul className="space-y-2">
                        {productFeatures[activeProductTab].features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-amber-600 mt-1">â€¢</span>
                            <span className="text-stone-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10 blur-2xl" />
                      <div className="relative bg-stone-900/90 backdrop-blur-sm p-4 rounded-lg border border-stone-700">
                        <pre className="text-xs sm:text-sm text-amber-300 overflow-x-auto">
                          <code>{productFeatures[activeProductTab].code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 sm:gap-6 pt-4 border-t border-stone-700">
                    <span className="flex items-center text-xs sm:text-sm text-stone-400">
                      <SiPython className="mr-1 sm:mr-2" /> Python
                    </span>
                    <span className="flex items-center text-xs sm:text-sm text-stone-400">
                      <SiSolidity className="mr-1 sm:mr-2" /> Solidity
                    </span>
                    <span className="flex items-center text-xs sm:text-sm text-stone-400">
                      <SiJavascript className="mr-1 sm:mr-2" /> JavaScript
                    </span>
                    <span className="flex items-center text-xs sm:text-sm text-stone-400">
                      <SiReact className="mr-1 sm:mr-2" /> React
                    </span>
                  </div>
                </div>
              </div>
              {expandedFeature && (
                <div 
                  ref={expandedRef}
                  className="mt-12 animate-fade-in"
                >
                  <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-2xl border border-amber-600/30 p-8 sm:p-12">
                    <h3 className="text-2xl sm:text-4xl font-bold mb-8 text-center">
                      <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text">
                        {productFeatures[expandedFeature].expandedContent.title}
                      </span>
                    </h3>
                    <div className="grid md:grid-cols-1 gap-8">
                      {productFeatures[expandedFeature].expandedContent.sections.map((section, index) => (
                        <div 
                          key={index} 
                          className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-stone-700 hover:border-amber-600/50 transition-all duration-300"
                        >
                          <h4 className="text-xl font-bold text-amber-500 mb-4 flex items-center">
                            <span className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </span>
                            {section.heading}
                          </h4>
                          <p className="text-stone-300 mb-6 leading-relaxed">
                            {section.content}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {section.stats.map((stat, statIndex) => (
                              <div 
                                key={statIndex}
                                className="bg-stone-900/50 rounded-lg p-3 text-center border border-stone-700"
                              >
                                <p className="text-amber-400 text-sm font-semibold">{stat}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setExpandedFeature(null)}
                        className="text-stone-400 hover:text-amber-500 transition-colors"
                      >
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-sm mt-2 block">Close Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="terminal" className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-stone-50 to-amber-50">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text">
                  Live Trading Session
                </span>
              </h2>
              <p className="text-stone-600 text-sm sm:text-base">Real-time output from Rosie.py</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-stone-200 overflow-hidden shadow-2xl">
              <div className="bg-stone-200 px-3 sm:px-4 py-2 flex items-center space-x-2 border-b border-stone-300">
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green-500"></div>
                <span className="text-stone-600 text-[10px] sm:text-sm ml-3 sm:ml-4">bash - rosie.py</span>
              </div>
              <div ref={terminalRef} className="p-3 sm:p-6 font-mono text-[10px] sm:text-xs leading-relaxed overflow-y-auto h-48 sm:h-80 lg:h-96">
                <div className="space-y-1">
                  {terminalLines.map((line, index) => (
                    <div key={index} className={line.color}>
                      {line.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center mt-6 sm:mt-8 px-4">
              <p className="text-stone-500 text-xs sm:text-sm">
                Rosie analyzes thousands of data points per second, making split-second decisions based on pattern recognition and market sentiment.
              </p>
            </div>
          </div>
        </section>

        <section id="legacy" className="min-h-screen flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-stone-800 to-stone-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text">
                Rosie&apos;s Legacy
              </span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mb-8 sm:mb-12" />
            <div className="relative mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/30 to-orange-300/30 blur-3xl" />
              <Image 
                src="/Rosie.png" 
                alt="Rosie" 
                width={150} 
                height={150}
                className="mx-auto rounded-full border-4 border-amber-600/50 relative z-10 sm:w-[200px] sm:h-[200px]"
              />
            </div>
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 px-4">
              <p className="text-lg sm:text-xl text-stone-300 leading-relaxed">
                Rosie was my rescue dog who saw through everything with unflinching clarity. 
                No pretense, no hesitation â€” just pure presence and instinct.
              </p>
              <p className="text-base sm:text-lg text-stone-400 leading-relaxed">
                She taught me to be direct, to trust instincts, and to stay endlessly curious. 
                I built Rosie AI to operate with the same principles: to learn from chaos, 
                act with conviction, and evolve relentlessly.
              </p>
              <blockquote className="text-xl sm:text-2xl font-light italic text-amber-500 pt-6 sm:pt-8">
                In memory of a soul who taught me that true intelligence 
                comes from understanding, not just processing.
              </blockquote>
            </div>
          </div>
        </section>

        <section id="leadership" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-amber-50/50 to-stone-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text">
                  Leadership Team
                </span>
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-500 mx-auto" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              <div className="group">
                <div className="bg-gradient-to-br from-white to-amber-50 p-6 sm:p-8 rounded-2xl border border-amber-200 hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-xl">
                  <div className="flex items-start flex-col sm:flex-row sm:space-x-4 lg:space-x-6 mb-4 sm:mb-6">
                    <Image 
                      src="/brian.png" 
                      alt="Brian Griffoul" 
                      width={100} 
                      height={100} 
                      className="rounded-full border-3 border-amber-300 mb-3 sm:mb-0 sm:w-[120px] sm:h-[120px]"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-2xl font-bold text-stone-800">Brian Griffoul</h3>
                      <p className="text-amber-600 font-medium text-sm sm:text-base">Founder & CEO</p>
                      <div className="flex space-x-3 mt-2 sm:mt-3">
                        <a href="https://linkedin.com/in/brian_griffoul" className="text-stone-400 hover:text-amber-600 transition-colors">
                          <FaLinkedin className="text-lg sm:text-xl" />
                        </a>
                        <a href="https://github.com/Xarbin" className="text-stone-400 hover:text-amber-600 transition-colors">
                          <FaGithub className="text-lg sm:text-xl" />
                        </a>
                        <a href="mailto:brian@rosieai.dev" className="text-stone-400 hover:text-amber-600 transition-colors">
                          <FaEnvelope className="text-lg sm:text-xl" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-semibold text-amber-700 mb-1 sm:mb-2 text-sm sm:text-base">Education</h4>
                      <ul className="text-xs sm:text-sm text-stone-600 space-y-1">
                        <li>â€¢ Seton Hall â€” Intl Relations & Diplomacy</li>
                        <li>â€¢ Fordham â€” Econometrics & Quant Economics</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-700 mb-1 sm:mb-2 text-sm sm:text-base">Background</h4>
                      <ul className="text-xs sm:text-sm text-stone-600 space-y-1">
                        <li>â€¢ US Army 11B Infantry OEF/OIR </li>
                        <li>â€¢ VB ? Python ? Web3 ? JavaScript</li>
                        <li>â€¢ AI + market data + blockchain chaos</li>
                      </ul>
                    </div>
                    <p className="text-stone-700 text-xs sm:text-sm italic pt-2 border-t border-amber-100">
                      I built Rosie to cope with my grief. It started as a stock picker RPG on Notepad+, to a fully
                      autonomous live agent that identifies patterns both malicious and prosperous
                    </p>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="bg-gradient-to-br from-white to-orange-50 p-6 sm:p-8 rounded-2xl border border-orange-200 hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-xl">
                  <div className="flex items-start flex-col sm:flex-row sm:space-x-4 lg:space-x-6 mb-4 sm:mb-6">
                    <Image 
                      src="/Cody.png" 
                      alt="Cody" 
                      width={100} 
                      height={100} 
                      className="rounded-full border-3 border-orange-300 mb-3 sm:mb-0 sm:w-[120px] sm:h-[120px]"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-2xl font-bold text-stone-800">Cody</h3>
                      <p className="text-orange-600 font-medium text-sm sm:text-base">Chief Morale Officer</p>
                      <p className="text-xs sm:text-sm text-stone-500 mt-1 sm:mt-2">Good Boy â€¢ Debug Assistant</p>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-1 sm:mb-2 text-sm sm:text-base">Core Competencies</h4>
                      <ul className="text-xs sm:text-sm text-stone-600 space-y-1">
                        <li>â€¢ Emotional support during deployments</li>
                        <li>â€¢ Strategic keyboard interruptions</li>
                        <li>â€¢ API failure detection (barking)</li>
                        <li>â€¢ Maintaining wellness standards</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-1 sm:mb-2 text-sm sm:text-base">Daily Responsibilities</h4>
                      <p className="text-xs sm:text-sm text-stone-600">
                        Ensures optimal work-life balance through mandatory play breaks, 
                        provides instant stress relief, and maintains office security
                      </p>
                    </div>
                    <p className="text-stone-700 text-xs sm:text-sm italic pt-2 border-t border-orange-100">
                      &quot;Woof! (Translation: Every successful deployment needs a 
                      tail-wagging celebration.)&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-amber-50 to-stone-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text">
                  Latest from Rosie&apos;s Diary
                </span>
              </h2>
              <p className="text-stone-600 text-lg">Fresh insights from the blockchain jungle</p>
            </div>

            {!blogLoading && latestPost && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className={`h-3 bg-gradient-to-r ${moodColors[latestPost.mood] || moodColors['full_savage']}`} />
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{moodEmojis[latestPost.mood] || '??'}</span>
                        <span className="text-sm font-medium text-stone-600">
                          {latestPost.mood?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      <span className="text-sm text-stone-500 flex items-center">
                        <FaCalendar className="mr-1" />
                        {new Date(latestPost.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-stone-800">
                      {latestPost.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      {latestPost.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Link 
                        href={`/blog/${latestPost.slug}`}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Read Full Entry
                        <FaArrowRight className="ml-2" />
                      </Link>
                      <Link 
                        href="/blog"
                        className="inline-flex items-center px-6 py-3 border-2 border-amber-600 text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-all duration-300"
                      >
                        View All Entries
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                        <div className="text-2xl font-bold text-amber-700">
                          {latestPost.tradingMetrics?.winRate || 0}%
                        </div>
                        <div className="text-sm text-stone-600">Win Rate</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                        <div className="text-2xl font-bold text-purple-700">
                          ${latestPost.tradingMetrics?.pnl || 0}
                        </div>
                        <div className="text-sm text-stone-600">Session P&L</div>
                      </div>
                    </div>
                    <div className="bg-stone-100 rounded-lg p-6 text-center">
                      <p className="text-stone-700 font-medium mb-3">
                        ?? Rosie&apos;s brain analyzed
                      </p>
                      <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text">
                        {latestPost.tradingMetrics?.trades || 0} patterns
                      </div>
                      <p className="text-sm text-stone-600 mt-2">
                        in this trading session
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <footer className="bg-stone-900 border-t border-stone-800 py-8 sm:py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 sm:mb-8">
              <Image 
                src="/rosie-pixel.png" 
                alt="Rosie Logo" 
                width={50} 
                height={50} 
                className="mx-auto opacity-60 sm:w-[60px] sm:h-[60px]"
              />
            </div>
            <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
              <a href="https://telegram.com/Xarbin" className="text-stone-500 hover:text-amber-500 transition-colors p-1">
                <FaTelegram className="text-xl sm:text-2xl" />
              </a>
              <a href="https://linkedin.com/in/brian_griffoul" className="text-stone-500 hover:text-amber-500 transition-colors p-1">
                <FaLinkedin className="text-xl sm:text-2xl" />
              </a>
              <a href="https://github.com/Xarbin" className="text-stone-500 hover:text-amber-500 transition-colors p-1">
                <FaGithub className="text-xl sm:text-2xl" />
              </a>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm mb-3 sm:mb-4">
              Â© 2025 Rosie Learning Systems LLC. All rights reserved.
            </p>
            <p className="text-stone-500 text-[10px] sm:text-xs tracking-wider">
              Built by my hatred of JavaScript and stubbornness to do it myself.
            </p>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-delay-1 { animation: fade-in 0.8s ease-out 0.2s both; }
        .animate-fade-in-delay-2 { animation: fade-in 0.8s ease-out 0.4s both; }
        .animate-fade-in-delay-3 { animation: fade-in 0.8s ease-out 0.6s both; }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s infinite; }
      `}</style>
    </div>
  )
}





