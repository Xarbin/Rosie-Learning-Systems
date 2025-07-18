// pages/blog/[slug].js
import { createClient } from '@sanity/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

// Initialize Sanity client with error handling
const client = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
}) : null

export default function BlogPost({ post }) {
  const router = useRouter()

  // Show loading state while page is being generated
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-xl text-gray-800">Loading...</div>
      </div>
    )
  }

  // Show 404 if no post found
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-xl text-gray-800">Post not found</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{post.title} - Rosie&apos;s Trading Diary</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        {/* Header Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <Link href="/blog" className="text-amber-700 hover:text-amber-900 font-medium">
            ← Back to Blog
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Article Header */}
            <header className="bg-gradient-to-r from-amber-100 to-orange-100 px-8 py-10 md:px-12 md:py-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="text-gray-700 mb-6">
                <time dateTime={post.date} className="text-lg">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              
              {/* Trading Metrics Card */}
              {post.tradingMetrics && (
                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Trading Performance</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-600">{post.tradingMetrics.trades}</div>
                      <div className="text-sm text-gray-600 mt-1">Total Trades</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{post.tradingMetrics.winRate?.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600 mt-1">Win Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{post.tradingMetrics.level}</div>
                      <div className="text-sm text-gray-600 mt-1">Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{post.tradingMetrics.elo}</div>
                      <div className="text-sm text-gray-600 mt-1">ELO Rating</div>
                    </div>
                  </div>
                </div>
              )}
            </header>

            {/* Main Content */}
            <div className="px-8 py-10 md:px-12">
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
                    h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>,
                    h3: ({children}) => <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>,
                    p: ({children}) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                    strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                    em: ({children}) => <em className="italic text-gray-700">{children}</em>,
                    ul: ({children}) => <ul className="list-disc list-inside mb-4 text-gray-700">{children}</ul>,
                    ol: ({children}) => <ol className="list-decimal list-inside mb-4 text-gray-700">{children}</ol>,
                    li: ({children}) => <li className="mb-2">{children}</li>,
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-amber-400 pl-4 italic text-gray-700 my-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Charts Section */}
              <div className="mt-12 space-y-12">
                {post.candlestickChart && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Trading Activity Chart</h3>
                    <div className="bg-white rounded-lg p-2 shadow-inner">
                      <Image 
                        src={post.candlestickChart} 
                        alt="Candlestick Chart"
                        width={1200}
                        height={800}
                        className="w-full rounded-lg"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
                
                {post.featureHeatmap && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Brain Activity Heatmap</h3>
                    <div className="bg-white rounded-lg p-2 shadow-inner">
                      <Image 
                        src={post.featureHeatmap} 
                        alt="Feature importance heatmap"
                        width={1200}
                        height={800}
                        className="w-full rounded-lg"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Token Info Footer */}
              {post.tokenAnalyzed && (
                <div className="mt-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Token Analysis Details</h3>
                  <div className="flex flex-wrap gap-4 text-gray-700">
                    <div>
                      <span className="font-medium">Symbol:</span>
                      <span className="ml-2 font-mono bg-white/50 px-2 py-1 rounded">
                        {post.tokenAnalyzed.symbol}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Blockchain:</span>
                      <span className="ml-2 font-mono bg-white/50 px-2 py-1 rounded">
                        {post.tokenAnalyzed.chain}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Bottom Navigation */}
          <div className="mt-8 text-center">
            <Link 
              href="/blog" 
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              View More Posts
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  // Return empty paths if client is not configured
  if (!client) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  // Fetch all posts to generate paths
  const posts = await client.fetch(`*[_type == "rosieDiary" && defined(slug.current)]{
    "slug": slug.current
  }`)

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: 'blocking', // This allows new posts to be rendered on-demand
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params

  // Return 404 if client is not configured
  if (!client) {
    return {
      notFound: true,
    }
  }

  // Fetch the specific post
  const post = await client.fetch(`
    *[_type == "rosieDiary" && slug.current == $slug][0]{
      title,
      content,
      date,
      mood,
      tradingMetrics,
      tokenAnalyzed,
      "featureHeatmap": featureHeatmap.asset->url,
      "candlestickChart": candlestickChart.asset->url
    }
  `, { slug })

  // If no post found, return 404
  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: { post },
    revalidate: 60, // Revalidate every 60 seconds
  }
}