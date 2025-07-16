// pages/index.js

import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { FaUniversity, FaCode, FaLinkedin, FaGithub, FaEnvelope, FaTelegram, FaTwitter } from 'react-icons/fa'
import { SiSolidity, SiPython, SiJavascript, SiReact } from 'react-icons/si'
import { MdSecurity, MdAnalytics } from 'react-icons/md'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [terminalLines, setTerminalLines] = useState([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const terminalRef = useRef(null)

  // Terminal simulation data
  const generateTerminalSequence = () => {
    const tokens = ['PEPE', 'SHIB', 'DOGE', 'FLOKI', 'ELON', 'MOON', 'ROCKET', 'WAGMI', 'GME', 'APE']
    const randomToken = tokens[Math.floor(Math.random() * tokens.length)]
    const randomAddress = '0x' + Math.random().toString(16).substr(2, 40)
    const randomPnL = (Math.random() * 50 - 10).toFixed(2)
    const randomLockPercent = (Math.random() * 100).toFixed(2)
    const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19)
    
    return [
      { text: '========================================================', color: 'text-green-400', delay: 0 },
      { text: `💖 Rosie Level ${Math.floor(Math.random() * 3) + 5} ⭐ | ELO: ${Math.floor(Math.random() * 200) + 1400} 🎯`, color: 'text-green-400', delay: 50 },
      { text: `👤 XP: ${Math.floor(Math.random() * 40) + 600} / 640`, color: 'text-green-400', delay: 50 },
      { text: `📊 Trades: ${Math.floor(Math.random() * 10) + 15} | Win Rate: ${(Math.random() * 20 + 50).toFixed(1)}% | 🔥 Total P&L: ${(Math.random() * 1000 + 500).toFixed(2)}`, color: 'text-green-400', delay: 50 },
      { text: '========================================================', color: 'text-green-400', delay: 50 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - 🔍 Running pre-flight checks...`, color: 'text-stone-400', delay: 100 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - 📋 Fetching historical context for ${randomToken}...`, color: 'text-stone-400', delay: 200 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - DataFetcher initialized.`, color: 'text-stone-400', delay: 100 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - Found primary pair ${randomAddress.substr(0, 10)}...${randomAddress.substr(-6)}`, color: 'text-stone-400', delay: 300 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [WARNING] - Partially Constructed candle data available. Proceeding with live data.`, color: 'text-yellow-400', delay: 200 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - 🔐 Analyzing BSC token security...`, color: 'text-stone-400', delay: 150 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [WARNING] - ⚠️ LIQUIDITY WARNING: Only ${randomLockPercent}% of LP tokens locked.`, color: 'text-orange-400', delay: 400 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - Security analysis complete.`, color: 'text-stone-400', delay: 200 },
      Math.random() > 0.5 
        ? { text: `${timestamp} - [TELEGRAM_MONITOR] - [WARNING] - 🔒 YOLO MODE ACTIVATED: Taking risky position!`, color: 'text-yellow-400', delay: 100 }
        : { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - ✅ All security checks passed.`, color: 'text-green-400', delay: 100 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - 📄 Preparing PAPER trading session...`, color: 'text-stone-400', delay: 150 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - Virtual Wallet: $250.00 Trading | $50.00 Gas`, color: 'text-stone-400', delay: 100 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - Starting simulation...`, color: 'text-stone-400', delay: 200 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - ========================================`, color: 'text-stone-400', delay: 50 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - PAPER TRADING COMPLETE.`, color: 'text-stone-400', delay: 100 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - Initial Budget: $250.00`, color: 'text-stone-400', delay: 50 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - Final Value: ${(250 + parseFloat(randomPnL)).toFixed(2)}`, color: 'text-stone-400', delay: 50 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - Total PnL: ${randomPnL} (minus gas)`, color: parseFloat(randomPnL) > 0 ? 'text-green-400' : 'text-red-400', delay: 50 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - ========================================`, color: 'text-stone-400', delay: 50 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - Saving brain progress... 🧠`, color: 'text-stone-400', delay: 100 },
      { text: `${timestamp} - [TELEGRAM_MONITOR] - [INFO] - Brain saved successfully. 🧠`, color: 'text-green-400', delay: 200 },
    ]
  }

  // Initialize terminal
  useEffect(() => {
    let timeoutIds = []
    
    const generateSequence = () => {
      const tokens = ['PEPE', 'SHIB', 'DOGE', 'FLOKI', 'ELON', 'MOON', 'ROCKET', 'WAGMI', 'GME', 'APE']
      const randomToken = tokens[Math.floor(Math.random() * tokens.length)]
      const randomAddress = '0x' + Math.random().toString(16).substr(2, 40)
      const randomPnL = (Math.random() * 50 - 10).toFixed(2)
      const randomLockPercent = (Math.random() * 100).toFixed(2)
      const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19)
      
      return generateTerminalSequence()
    }
    
    const runSequence = () => {
      const sequence = generateSequence()
      setTerminalLines([])
      let delay = 0
      
      sequence.forEach((line, index) => {
        delay += line.delay
        const timeoutId = setTimeout(() => {
          setTerminalLines(prev => [...prev, line])
          
          // Auto-scroll terminal
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
          }
          
          // If this is the last line, wait then restart
          if (index === sequence.length - 1) {
            const restartTimeout = setTimeout(() => {
              runSequence()
            }, 3000)
            timeoutIds.push(restartTimeout)
          }
        }, delay)
        timeoutIds.push(timeoutId)
      })
    }
    
    runSequence()
    
    // Cleanup timeouts on unmount
    return () => {
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = (currentScroll / totalHeight) * 100
      setScrollProgress(progress)

      // Determine active section based on scroll position
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50 text-stone-800 font-sans">
      <Head>
        <title>Rosie Learning Systems | Autonomous Crypto Intelligence</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-orange-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
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
        {/* Hero Section - Light */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-stone-50 to-amber-50">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-stone-50 to-orange-100/50" />
          
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse top-20 -left-48" />
            <div className="absolute w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse bottom-20 -right-48" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <Image 
                src="/rosie-pixel.png" 
                alt="Rosie Logo" 
                width={120} 
                height={120} 
                className="mx-auto filter drop-shadow-2xl"
              />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in-delay-1">
              <span className="bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text">
                Rosie Learning Systems
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-600 mb-8 animate-fade-in-delay-2">
              Autonomous Crypto Intelligence
            </p>
            
            <p className="text-lg text-stone-500 max-w-2xl mx-auto animate-fade-in-delay-3">
              Built with heart. Trained for chaos.
            </p>

            <div className="mt-12 animate-bounce">
              <button 
                onClick={() => scrollToSection('product')}
                className="text-stone-400 hover:text-amber-600 transition-colors"
              >
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Product Section */}
        <section id="product" className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-amber-50 to-stone-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text">
                  Principal Product
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-500 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <SiPython className="text-4xl text-amber-600" />
                  <h3 className="text-3xl font-bold text-stone-800">Rosie.py</h3>
                </div>
                
                <p className="text-lg text-stone-600 leading-relaxed">
                  An autonomous crypto agent that operates with the instincts of a trained hunter. 
                  Rosie snoops the blockchain looking for opportunities, catching bad actors, 
                  and turning market noise into actionable intelligence.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-amber-200">
                    <MdAnalytics className="text-2xl text-amber-600 mb-2" />
                    <h4 className="font-semibold text-stone-800">Real-time Analysis</h4>
                    <p className="text-sm text-stone-600">24/7 blockchain monitoring</p>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border border-amber-200">
                    <MdSecurity className="text-2xl text-amber-600 mb-2" />
                    <h4 className="font-semibold text-stone-800">Threat Detection</h4>
                    <p className="text-sm text-stone-600">Advanced pattern recognition</p>
                  </div>
                </div>

                <div className="flex space-x-6 pt-4">
                  <span className="flex items-center text-sm text-stone-600">
                    <SiSolidity className="mr-2" /> Solidity
                  </span>
                  <span className="flex items-center text-sm text-stone-600">
                    <SiJavascript className="mr-2" /> JavaScript
                  </span>
                  <span className="flex items-center text-sm text-stone-600">
                    <SiReact className="mr-2" /> React
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-3xl" />
                <div className="relative bg-stone-800/90 backdrop-blur-sm p-8 rounded-2xl border border-stone-700">
                  <pre className="text-sm text-amber-300 overflow-x-auto">
                    <code>{`class RosieAI:
    def __init__(self):
        self.mode = "hunt"
        self.instinct = "sharp"
        self.loyalty = float('inf')
    
    def analyze_market(self, data):
        patterns = self.detect_patterns(data)
        opportunities = self.find_alpha(patterns)
        return self.execute_strategy(opportunities)`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Terminal Output Section */}
        <section id="terminal" className="min-h-screen flex items-center justify-center py-20 px-6 bg-stone-900">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-transparent bg-clip-text">
                  Live Trading Session
                </span>
              </h2>
              <p className="text-amber-200/80">Real-time output from Rosie.py</p>
            </div>

            <div className="bg-black rounded-lg border border-stone-700 overflow-hidden shadow-2xl">
              <div className="bg-stone-800 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-stone-400 text-sm ml-4">PowerShell - rosie.py</span>
              </div>
              
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <pre className="text-green-400">
{`========================================================
💖 Rosie Level 5 ⭐ | ELO: 1451 🎯
👤 XP: 613 / 640
📊 Trades: 18 | Win Rate: 56.7% | 🔥 Total P&L: $766.53
========================================================`}
                </pre>
                
                <div className="space-y-1 text-xs">
                  <div className="text-stone-400">2025-07-08 09:24:41,315 - [TELEGRAM_MONITOR] - [INFO] - 🔍 Running pre-flight checks...</div>
                  <div className="text-stone-400">2025-07-08 09:24:41,315 - [TELEGRAM_MONITOR] - [INFO] - 📋 Fetching historical context for bady$OUT...</div>
                  <div className="text-stone-400">2025-07-08 09:24:41,316 - [TELEGRAM_MONITOR] - [INFO] - DataFetcher initialized.</div>
                  <div className="text-stone-400">2025-07-08 09:24:41,461 - [TELEGRAM_MONITOR] - [INFO] - Found primary pair 0xxxxxx9F0abd9D5575F776c34d1a8D3B36662601B35 for bady$OUT. Fetching price history...</div>
                  <div className="text-yellow-400">2025-07-08 09:24:41,630 - [TELEGRAM_MONITOR] - [WARNING] - Partially Constructed candle data available (BSC-Alchemy). Proceeding with live data + Historical Data.</div>
                  <div className="text-stone-400">2025-07-08 09:24:41,631 - [TELEGRAM_MONITOR] - [INFO] - Creating minimal history from live price data.</div>
                  <div className="text-stone-400">2025-07-08 09:24:41,631 - [TELEGRAM_MONITOR] - [INFO] - 🔐 Analyzing BSC token security for 0xxxxxx553e5D3D3E1b2c3280AeC520ADA14314326...</div>
                  <div className="text-yellow-400">2025-07-08 09:24:42,111 - [TELEGRAM_MONITOR] - [WARNING] - Could not estimate sell tax for 0xxxaa553e5D3D3E1b2c3280AeC520ADA14314326: execution reverted: TransferHelper</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,112 - [TELEGRAM_MONITOR] - [INFO] - Security analysis complete for 0xxxxxx553e5D3D3E1b2c3280AeC520ADA14314326: Could not simulate a sale. Potentially</div>
                  <div className="text-orange-400">2025-07-08 09:24:42,112 - [TELEGRAM_MONITOR] - [WARNING] - ⚠️ SECURITY WARNING: Could not simulate a sale. Potentially un-sellable, a honeypot, or liquidity issues</div>
                  <div className="text-yellow-400">2025-07-08 09:24:42,112 - [TELEGRAM_MONITOR] - [WARNING] - 🔒 YOLO MODE ACTIVATED: Taking position despite risks for learning purposes!</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,697 - [TELEGRAM_MONITOR] - [INFO] - Liquidity Lock Report: LP Locked: 15.00%</div>
                  <div className="text-orange-400">2025-07-08 09:24:42,697 - [TELEGRAM_MONITOR] - [WARNING] - ⚠️ LIQUIDITY WARNING: Only 15.00% of LP tokens are confirmed locked. Proceeding with caution.</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,697 - [TELEGRAM_MONITOR] - [INFO] - 🔍 Checking for evolving honeypot on 0xf18aa553e5D3D3E1b2c3280AeC520ADA14314326...</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,697 - [TELEGRAM_MONITOR] - [INFO] - Evolving Honeypot Report: No honeypot detected.</div>
                  <div className="text-green-400">2025-07-08 09:24:42,697 - [TELEGRAM_MONITOR] - [INFO] - ✅ All pre-flight checks passed. Fair Address: 0xxxxx5575F776c34d1a8D3B36662601B35</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,697 - [TELEGRAM_MONITOR] - [INFO] - 📄 Preparing for a PAPER trading session.</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,698 - [TELEGRAM_MONITOR] - [INFO] - TradingSession base initialized for Dege.</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,698 - [TELEGRAM_MONITOR] - [INFO] - PaperTradingSession activated.</div>
                  <div className="text-green-400">2025-07-08 09:24:42,698 - [TELEGRAM_MONITOR] - [INFO] - 🎯 YOLO MODE ENABLED - Will take risky positions for learning!</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,698 - [TELEGRAM_MONITOR] - [INFO] - Virtual Wallet Initialized: $250.00 Trading | $50.00 Gas</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,698 - [TELEGRAM_MONITOR] - [INFO] - Starting paper trading simulation for dege...</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,698 - [TELEGRAM_MONITOR] - [INFO] - ========================================</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,698 - [TELEGRAM_MONITOR] - [INFO] - PAPER TRADING COMPLETE.</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,698 - [TELEGRAM_MONITOR] - [INFO] - Initial Budget: $250.00</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,698 - [TELEGRAM_MONITOR] - [INFO] - Final Wallet Value: $263.10</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,699 - [TELEGRAM_MONITOR] - [INFO] - Total PnL: $12.63 (minus gas)</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,699 - [TELEGRAM_MONITOR] - [INFO] - ========================================</div>
                  <div className="text-stone-400">2025-07-08 09:24:42,699 - [TELEGRAM_MONITOR] - [INFO] - Saving brain progress after simulation... 🧠</div>
                  <div className="text-green-400">2025-07-08 09:24:42,704 - [TELEGRAM_MONITOR] - [INFO] - Brain saved successfully. 🧠</div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-amber-200/60 text-sm">
                Rosie analyzes thousands of data points per second, making split-second decisions based on pattern recognition and market sentiment.
              </p>
            </div>
          </div>
        </section>

        {/* Legacy Section */}
        <section id="legacy" className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-stone-50 to-amber-50/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text">
                Rosie's Legacy
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-500 mx-auto mb-12" />

            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/30 to-orange-300/30 blur-3xl" />
              <Image 
                src="/rosie.png" 
                alt="Rosie" 
                width={200} 
                height={200} 
                className="mx-auto rounded-full border-4 border-amber-200 relative z-10"
              />
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl text-stone-700 leading-relaxed">
                Rosie was my rescue dog who saw through everything with unflinching clarity. 
                No pretense, no hesitation — just pure presence and instinct.
              </p>
              
              <p className="text-lg text-stone-600 leading-relaxed">
                She taught me to be direct, to trust instincts, and to stay endlessly curious. 
                I built Rosie AI to operate with the same principles: to learn from chaos, 
                act with conviction, and evolve relentlessly.
              </p>

              <blockquote className="text-2xl font-light italic text-amber-700 pt-8">
                "In memory of a soul who taught me that true intelligence 
                comes from understanding, not just processing."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section id="leadership" className="min-h-screen py-20 px-6 bg-gradient-to-b from-amber-50/50 to-stone-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-700 to-orange-600 text-transparent bg-clip-text">
                  Leadership Team
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-500 mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Brian - Founder */}
              <div className="group">
                <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl border border-amber-200 hover:border-amber-400 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-xl">
                  <div className="flex items-start space-x-6 mb-6">
                    <Image 
                      src="/brian.png" 
                      alt="Brian Griffoul" 
                      width={120} 
                      height={120} 
                      className="rounded-full border-3 border-amber-300"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-stone-800">Brian Griffoul</h3>
                      <p className="text-amber-600 font-medium">Founder & CEO</p>
                      <div className="flex space-x-3 mt-3">
                        <a href="https://linkedin.com/in/YOUR_LINKEDIN" className="text-stone-400 hover:text-amber-600 transition-colors">
                          <FaLinkedin className="text-xl" />
                        </a>
                        <a href="https://github.com/YOUR_GITHUB" className="text-stone-400 hover:text-amber-600 transition-colors">
                          <FaGithub className="text-xl" />
                        </a>
                        <a href="mailto:brian@rosielearning.com" className="text-stone-400 hover:text-amber-600 transition-colors">
                          <FaEnvelope className="text-xl" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-amber-700 mb-2">Education</h4>
                      <ul className="text-sm text-stone-600 space-y-1">
                        <li>• Seton Hall University — International Relations & Diplomacy</li>
                        <li>• Fordham University — Econometrics & Quantitative Economics</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-amber-700 mb-2">Background</h4>
                      <ul className="text-sm text-stone-600 space-y-1">
                        <li>• US Army Infantry, OEF/OIR Combat Veteran</li>
                        <li>• Self-taught developer: Visual Basic → Python → Web3</li>
                        <li>• Building at the intersection of AI and blockchain</li>
                      </ul>
                    </div>

                    <p className="text-stone-700 text-sm italic pt-2 border-t border-amber-100">
                      "I built Rosie to be a fast-learning, conviction-based trader using real-time 
                      data and alpha-hunting logic. She's a reflection of systematic thinking, 
                      curiosity, and continuous evolution."
                    </p>
                  </div>
                </div>
              </div>

              {/* Cody - Chief Morale Officer */}
              <div className="group">
                <div className="bg-gradient-to-br from-white to-orange-50 p-8 rounded-2xl border border-orange-200 hover:border-orange-400 transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-xl">
                  <div className="flex items-start space-x-6 mb-6">
                    <Image 
                      src="/cody.png" 
                      alt="Cody" 
                      width={120} 
                      height={120} 
                      className="rounded-full border-3 border-orange-300"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-stone-800">Cody</h3>
                      <p className="text-orange-600 font-medium">Chief Morale Officer</p>
                      <p className="text-sm text-stone-500 mt-2">Good Boy • Debugging Assistant</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-2">Core Competencies</h4>
                      <ul className="text-sm text-stone-600 space-y-1">
                        <li>• Emotional support during critical deployments</li>
                        <li>• Strategic keyboard interruptions</li>
                        <li>• API failure detection (via selective barking)</li>
                        <li>• Maintaining team wellness standards</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-2">Daily Responsibilities</h4>
                      <p className="text-sm text-stone-600">
                        Ensures optimal work-life balance through mandatory play breaks, 
                        provides instant stress relief, and maintains office security 
                        by alerting to all delivery personnel.
                      </p>
                    </div>

                    <p className="text-stone-700 text-sm italic pt-2 border-t border-orange-100">
                      "Woof! (Translation: Every successful deployment needs a 
                      tail-wagging celebration.)"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-stone-100 border-t border-stone-200 py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Image 
                src="/rosie-pixel.png" 
                alt="Rosie Logo" 
                width={60} 
                height={60} 
                className="mx-auto opacity-60"
              />
            </div>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a href="https://telegram.com/YOUR_TELEGRAM" className="text-stone-400 hover:text-amber-600 transition-colors">
                <FaTelegram className="text-2xl" />
              </a>
              <a href="https://twitter.com/YOUR_TWITTER" className="text-stone-400 hover:text-amber-600 transition-colors">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="https://linkedin.com/in/YOUR_LINKEDIN" className="text-stone-400 hover:text-amber-600 transition-colors">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="https://github.com/YOUR_GITHUB" className="text-stone-400 hover:text-amber-600 transition-colors">
                <FaGithub className="text-2xl" />
              </a>
            </div>

            <p className="text-stone-600 text-sm mb-4">
              © 2024 Rosie Learning Systems LLC. All rights reserved.
            </p>
            
            <p className="text-stone-500 text-xs">
              Built with conviction. Deployed with purpose.
            </p>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay-1 {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
        
        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s both;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  )
}