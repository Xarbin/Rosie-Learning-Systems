import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaCalendar, FaBrain, FaPaw } from 'react-icons/fa'
import { GiDogBowl } from 'react-icons/gi'
import { MdPets } from 'react-icons/md'

// This is our hardcoded post. To add more, just add another object to this array.
const allPosts = [
  {
    _id: 'static-post-1',
    title: "Under the Hood: How Rosie Learns",
    date: '2025-07-17T00:00:00.000Z',
    slug: 'under-the-hood-how-rosie-learns', // This should match the filename you created
    mood: 'laser_focus',
    tradingMetrics: {
      trades: 6020,
      level: 26,
      winRate: 49.5,
    },
    excerpt: "A deep dive into the AI training, data analysis, and decision-making process of Rosie, the autonomous crypto trading agent.",
    tags: ['AI', 'Trading', 'Analysis']
  }
];

export default function Blog() {
  const posts = allPosts; // We directly use our static list

  const moodEmojis = {
    'laser_focus': '🎯',
    // Add other moods here if you create more static posts
  }

  const moodColors = {
    'laser_focus': 'from-green-400 to-emerald-500',
    // Add other mood colors here
  }

  const moodDescriptions = {
    'laser_focus': 'Training Mode',
    // Add other mood descriptions here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Head>
        <title>Rosie&apos;s Training Journal | A Rescue Pup&apos;s Market Adventures</title>
        <link rel="icon" href="/rosie-pixel.png" type="image/png" />
        <meta name="description" content="Follow Rosie&apos;s journey from rescue pup to market analyst. Heartwarming insights and trading wisdom from a very good girl." />
      </Head>

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
      
      <section className="relative py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
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
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link 
                  key={post._id} 
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border-2 border-transparent hover:border-purple-300">
                    <div className={`h-2 bg-gradient-to-r ${moodColors[post.mood] || 'from-gray-400 to-gray-500'}`} />
                    <div className="p-6">
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
                      <h2 className="text-xl font-bold text-purple-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-purple-700 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
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
                        {post.tradingMetrics?.winRate > 45 && (
                          <div className="flex items-center text-orange-500">
                            <FaPaw className="mr-1" />
                            <span className="text-xs">Good Girl!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
        </div>
      </section>

      <footer className="bg-purple-900 py-8 px-4 sm:px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <Image 
            src="/rosie-pixel.png" 
            alt="Rosies Logo" 
            width={50} 
            height={50}
            className="mx-auto opacity-80 mb-4"
          />
          <p className="text-purple-200 text-sm mb-2">
            © 2025 Rosie Learning Systems. Built with love, treats, and lots of tail wags.
          </p>
        </div>
      </footer>
    </div>
  )
}
