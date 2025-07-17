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
      { text: '====================================', color: 'text-green-600', delay: 0 },
      { text: `💖 Rosie Level ${Math.floor(Math.random() * 3) + 5} ⭐`, color: 'text-green-600', delay: 50 },
      { text: `📊 Trades: ${Math.floor(Math.random() * 10) + 15} | Win: ${(Math.random() * 20 + 50).toFixed(1)}%`, color: 'text-green-600', delay: 50 },
      { text: '====================================', color: 'text-green-600', delay: 50 },
      { text: `[INFO] - 🔍 Running pre-flight checks...`, color: 'text-stone-700', delay: 100 },
      { text: `[INFO] - 📋 Fetching context for ${randomToken}...`, color: 'text-stone-700', delay: 200 },
      { text: `[INFO] - Found pair ${randomAddress.substr(0, 8)}...`, color: 'text-stone-700', delay: 300 },
      { text: `[WARNING] - LP: ${randomLockPercent}% locked.`, color: 'text-orange-600', delay: 400 },
      { text: `[INFO] - 📄 PAPER trading session...`, color: 'text-stone-700', delay: 150 },
      { text: `[INFO] - Budget: $250.00`, color: 'text-stone-700', delay: 100 },
      { text: `[INFO] - COMPLETE. PnL: ${randomPnL}`, color: parseFloat(randomPnL) > 0 ? 'text-green-600' : 'text-red-600', delay: 50 },
      { text: `[INFO] - Brain saved. 🧠`, color: 'text-green-600', delay: 200 },
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
            
            // Auto-scroll terminal
            if (terminalRef.current) {
              terminalRef.current.scrollTop = terminalRef.current.scrollHeight
            }
            
            // If this is the last line, wait then restart
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
    
    // Start the sequence
    runSequence()
    
    // Cleanup function
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

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 to-orange-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Dots */}
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
        {/* Hero Section - Light */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-stone-50 to-amber-50 px-4 sm:px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 via-stone-50 to-orange-100/50" />
          
          {/* Animated Background */}
          <div className="absolute inset-0">
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

            <div className="mt-8 sm:mt-12 animate-bounce">
              <button 
                onClick={() => scrollToSection('product')}
                className="text-stone-400 hover:text-amber-600 transition-colors p-2"
              >
                <svg className="w-6 sm:w-8 h-6 sm:h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Product Section */}
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

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div className="space-y-3 sm:space-y-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <SiPython className="text-2xl sm:text-4xl text-amber-600 flex-shrink-0" />
                  <h3 className="text-xl sm:text-3xl font-bold text-stone-100">Rosie.py</h3>
                </div>
                
                <p className="text-sm sm:text-lg text-stone-400 leading-relaxed">
                  An autonomous crypto agent that operates with the instincts of a trained hunter. 
                  Rosie snoops the blockchain looking for opportunities, catching bad actors, 
                  and turning market noise into actionable intelligence.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <div className="bg-stone-800/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-stone-700">
                    <MdAnalytics className="text-xl sm:text-2xl text-amber-600 mb-1 sm:mb-2" />
                    <h4 className="font-semibold text-stone-100 text-sm sm:text-base">Real-time Analysis</h4>
                    <p className="text-xs sm:text-sm text-stone-400">24/7 blockchain monitoring</p>
                  </div>
                  <div className="bg-stone-800/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-stone-700">
                    <MdSecurity className="text-xl sm:text-2xl text-amber-600 mb-1 sm:mb-2" />
                    <h4 className="font-semibold text-stone-100 text-sm sm:text-base">Threat Detection</h4>
                    <p className="text-xs sm:text-sm text-stone-400">Advanced pattern recognition</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 sm:gap-6 pt-2 sm:pt-4">
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

              <div className="relative mt-6 md:mt-0">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-3xl" />
                <div className="relative bg-stone-800/90 backdrop-blur-sm p-3 sm:p-6 lg:p-8 rounded-2xl border border-stone-700 overflow-x-auto">
                  <pre className="text-[10px] sm:text-sm text-amber-300">
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

        {/* Legacy Section */}
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
                No pretense, no hesitation — just pure presence and instinct.
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

        {/* employees */}
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
              {/* Brian - Founder */}
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
                        <li>• Seton Hall — Int'l Relations & Diplomacy</li>
                        <li>• Fordham — Econometrics & Quant Economics</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-amber-700 mb-1 sm:mb-2 text-sm sm:text-base">Background</h4>
                      <ul className="text-xs sm:text-sm text-stone-600 space-y-1">
                        <li>• US Army 11B Infantry, OEF/OIR </li>
                        <li>• VB → Python → Web3 → JavaScript</li>
                        <li>• AI + market data + blockchain chaos</li>
                      </ul>
                    </div>

                    <p className="text-stone-700 text-xs sm:text-sm italic pt-2 border-t border-amber-100">
                      I built Rosie to cope with my grief. It started as a stock picker RPG on Notepad+, to a fully
                      autonomous live agent that identifies patterns both malicious and prosperous
                    </p>
                  </div>
                </div>
              </div>

              {/* Cody - Chief Morale Officer */}
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
                      <p className="text-xs sm:text-sm text-stone-500 mt-1 sm:mt-2">Good Boy • Debug Assistant</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="font-semibold text-orange-700 mb-1 sm:mb-2 text-sm sm:text-base">Core Competencies</h4>
                      <ul className="text-xs sm:text-sm text-stone-600 space-y-1">
                        <li>• Emotional support during deployments</li>
                        <li>• Strategic keyboard interruptions</li>
                        <li>• API failure detection (barking)</li>
                        <li>• Maintaining wellness standards</li>
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

        {/* Footer */}
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
              © 2024 Rosie Learning Systems LLC. All rights reserved.
            </p>
            
            <p className="text-stone-500 text-[10px] sm:text-xs tracking-wider">
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