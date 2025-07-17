import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaCalendar, FaChartLine, FaBrain, FaFire, FaHeart, FaPaw, FaBone } from 'react-icons/fa'
import { GiDogBowl, GiSittingDog } from 'react-icons/gi'
import { MdPets } from 'react-icons/md'
import { createClient } from '@sanity/client'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// GROQ query for fetching blog posts
const POSTS_QUERY = `*[_type == "rosieDiary"] | order(date desc) {
  _id,
  title,
  date,
  "slug": slug.current,
  mood,
  tradingMetrics,
  tags,
  "excerpt": array::join(string::split((pt::text(content)), "")[0..150], "") + "..."
}`

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await client.fetch(POSTS_QUERY)
      setPosts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching posts:', error)
      setLoading(false)
    }
  }

  // Rescue puppy themed moods
  const moodEmojis = {
    'playful_pup': '🐕',
    'sleepy_doggo': '😴',
    'treat_hunter': '🦴',
    'zoomies': '💨',
    'cuddle_mode': '🤗',
    'learning_sit': '🎓',
    'protect_mode': '🛡️',
    // Keep original moods but with puppy mapping
    'banana_zone': '🦴', // Treat zone
    'full_savage': '🐕', // Playful pup
    'laser_focus': '🎯', // Training mode
    'revenge_mode': '🛡️', // Protect mode
    'zen_monkey': '😴'  // Sleepy doggo
  }

  const moodColors = {
    'playful_pup': 'from-blue-400 to-purple-500',
    'sleepy_doggo': 'from-indigo-400 to-purple-500',
    'treat_hunter': 'from-yellow-400 to-amber-500',
    'zoomies': 'from-pink-400 to-red-500',
    'cuddle_mode': 'from-pink-300 to-rose-400',
    'learning_sit': 'from-green-400 to-emerald-500',
    'protect_mode': 'from-orange-500 to-red-600',
    // Original mood colors
    'banana_zone': 'from-yellow-400 to-amber-500',
    'full_savage': 'from-blue-400 to-purple-500',
    'laser_focus': 'from-green-400 to-emerald-500',
    'revenge_mode': 'from-orange-500 to-red-600',
    'zen_monkey': 'from-indigo-400 to-purple-500'
  }

  const moodDescriptions = {
    'playful_pup': 'Playful Pup',
    'sleepy_doggo': 'Sleepy Doggo',
    'treat_hunter': 'Treat Hunter',
    'zoomies': 'Zoomies Mode',
    'cuddle_mode': 'Cuddle Mode',
    'learning_sit': 'Training Time',
    'protect_mode': 'Guardian Mode',
    // Original moods with puppy descriptions
    'banana_zone': 'Treat Zone',
    'full_savage': 'Playful Pup',
    'laser_focus': 'Training Mode',
    'revenge_mode': 'Guardian Mode',
    'zen_monkey': 'Sleepy Doggo'
  }

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.mood === filter)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Head>
        <title>Rosie&apos;s Training Journal | A Rescue Pup&apos;s Market Adventures</title>
        <link rel="icon" href="/rosie-pixel.png" type="image/png" />
        <meta name="description" content="Follow Rosie&apos;s journey from rescue pup to market analyst. Heartwarming insights and trading wisdom from a very good girl." />
      </Head>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <FaArrowLeft className="text-purple-600 group-hover:text-blue-600 transition-colors" />
              <Image 
                src="/rosie-pixel.png" 
                alt="Rosie Logo" 
                width={40} 
                height={40}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="text-lg font-bold text-purple-800 group-hover:text-blue-600 transition-colors">
                Back to Home
              </span>
            </Link>
            <div className="flex items-center space-x-2 text-purple-600">
              <FaPaw className="text-xl" />
              <span className="hidden sm:inline text-sm font-medium">Good Girl Points: ∞</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Paw prints decoration */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <FaPaw className="absolute top-10 left-10 text-6xl text-purple-400 rotate-12" />
            <FaPaw className="absolute top-32 right-20 text-4xl text-blue-400 -rotate-12" />
            <FaPaw className="absolute bottom-20 left-1/4 text-5xl text-pink-400 rotate-45" />
            <FaPaw className="absolute bottom-10 right-1/3 text-3xl text-purple-400 -rotate-30" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <MdPets className="text-4xl text-purple-600" />
              <h1 className="text-4xl sm:text-6xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                  Rosie&apos;s Training Journal
                </span>
              </h1>
              <MdPets className="text-4xl text-blue-600" />
            </div>
            
            <p className="text-xl text-purple-700 mb-4">
              From Shelter to Success: A Rescue Pup&apos;s Market Adventures
            </p>
            
            <p className="text-lg text-purple-600 max-w-2xl mx-auto">
              Every good girl deserves a second chance. Follow my journey as I learn tricks, 
              analyze treats, and become the best trading companion a human could ask for.
            </p>
          </div>
          
          {/* Mood Filter with puppy themes */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 mt-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full transition-all flex items-center space-x-2 ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'bg-white text-purple-700 hover:bg-purple-100 border border-purple-300'
              }`}
            >
              <FaHeart className="text-sm" />
              <span>All Adventures</span>
            </button>
            {Object.entries(moodEmojis).slice(0, 7).map(([mood, emoji]) => (
              <button
                key={mood}
                onClick={() => setFilter(mood)}
                className={`px-4 py-2 rounded-full transition-all ${
                  filter === mood 
                    ? `bg-gradient-to-r ${moodColors[mood]} text-white` 
                    : 'bg-white text-purple-700 hover:bg-purple-100 border border-purple-300'
                }`}
              >
                {emoji} {moodDescriptions[mood]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block">
                <GiSittingDog className="text-6xl text-purple-600 animate-bounce mb-4" />
                <p className="text-purple-600">Fetching adventures...</p>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <FaBone className="text-6xl text-purple-400 mx-auto mb-4" />
              <p className="text-xl text-purple-700">No journal entries found. Time for more adventures!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link 
                  key={post._id} 
                  href={`/blog/${post.slug || post._id}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-300">
                    {/* Mood Banner */}
                    <div className={`h-2 bg-gradient-to-r ${moodColors[post.mood] || moodColors['playful_pup']}`} />
                    
                    <div className="p-6">
                      {/* Mood & Date */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{moodEmojis[post.mood] || '🐕'}</span>
                          <span className="text-sm font-medium text-purple-600">
                            {moodDescriptions[post.mood] || 'Adventure Time'}
                          </span>
                        </div>
                        <span className="text-sm text-purple-500 flex items-center">
                          <FaCalendar className="mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-purple-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-purple-700 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Metrics with puppy themes */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-purple-600">
                            <GiDogBowl className="mr-1" />
                            {post.tradingMetrics?.trades || 0} treats
                          </span>
                          <span className="flex items-center text-purple-600">
                            <FaBrain className="mr-1" />
                            Lvl {post.tradingMetrics?.level || 1}
                          </span>
                        </div>
                        {post.tradingMetrics?.winRate > 60 && (
                          <div className="flex items-center text-orange-500">
                            <FaPaw className="mr-1" />
                            <span className="text-xs">Good Girl!</span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-transparent to-purple-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
              Rosie&apos;s Progress Report
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border-2 border-purple-200">
              <FaBone className="text-3xl text-yellow-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-700">{posts.length}</div>
              <div className="text-purple-600">Journal Entries</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-2 border-purple-200">
              <MdPets className="text-3xl text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-700">
                {posts[0]?.tradingMetrics?.level || 1}
              </div>
              <div className="text-purple-600">Training Level</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-2 border-purple-200">
              <FaHeart className="text-3xl text-pink-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-700">
                {posts[0]?.tradingMetrics?.elo || 1200}
              </div>
              <div className="text-purple-600">Good Girl Points</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border-2 border-purple-200">
              <GiDogBowl className="text-3xl text-purple-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-700">
                {posts.reduce((sum, post) => sum + (post.tradingMetrics?.trades || 0), 0)}
              </div>
              <div className="text-purple-600">Total Treats</div>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-white rounded-xl shadow-lg border-2 border-purple-200">
            <p className="text-purple-700 text-lg italic">
              &quot;Every rescue pup has a story. Mine just happens to include market analysis 
              and an unusual talent for spotting trends. But at the end of the day, 
              I&apos;m just a good girl who loves belly rubs and profitable trades.&quot;
            </p>
            <p className="text-purple-600 mt-3">- Rosie 🐕</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Image 
            src="/rosie-pixel.png" 
            alt="Rosie Logo" 
            width={50} 
            height={50}
            className="mx-auto opacity-80 mb-4"
          />
          <p className="text-purple-200 text-sm mb-2">
            © 2024 Rosie Learning Systems. Built with love, treats, and lots of tail wags.
          </p>
          <p className="text-purple-300 text-xs">
            Dedicated to rescue pups everywhere who are learning new tricks. 🐕💜
          </p>
        </div>
      </footer>
    </div>
  )
}