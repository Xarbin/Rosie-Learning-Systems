export default function Home() {
  return (
    <main className="bg-gray-950 text-white min-h-screen px-6 py-12 space-y-24">
      
      {/* Hero with Rosie logo */}
      <section className="text-center">
        <img
          src="/rosie-pixel.png"
          alt="Rosie AI logo"
          className="mx-auto w-32 h-32 object-contain mb-6"
        />
        <h1 className="text-5xl font-extrabold tracking-tight">Rosie Learning Systems</h1>
        <p className="text-xl text-gray-400 mt-4">
          Built with heart. Trained for chaos.
        </p>
        <p className="max-w-xl mx-auto text-gray-300 mt-2">
          Rosie is an autonomous crypto agent — but her inspiration came from a real dog.
          A rescue who taught me about curiosity, instinct, and unconditional clarity. 
          She snoops the blockchain looking for bones, catching bad actors, and turning 
          noise into data. 
        </p>
      </section>

      {/* About You */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <img
          src="/brian.png"
          alt="Brian portrait"
          className="mx-auto w-32 h-32 rounded-full object-cover border-4 border-pink-500 mb-4"
        />
        <p className="text-lg text-gray-300">
          I’m Brian — founder of Rosie Learning Systems. I built Rosie to be a fast-learning,
          conviction-based trader using real-time data and alpha-hunting logic. But Rosie’s more
          than a bot. She’s a reflection of the mind that made her: systematic, curious, occasionally impulsive — and always learning.
        </p>
      </section>

      {/* Rosie’s Legacy */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Rosie’s Legacy</h2>
        <img
          src="/rosie.png"
          alt="Rosie pixel art"
          className="mx-auto w-36 h-36 object-contain mb-4"
        />
        <p className="text-lg text-gray-300">
          Rosie was my rescue dog. She saw through everything. No pretense, no hesitation — just presence.
          She reminded me to be direct, to trust instincts, and to stay curious. I built Rosie AI to operate the same way:
          to learn from noise, act with purpose, and evolve every day.
        </p>
      </section>

      {/* Cody Section */}
      <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">🐾 Chief Morale Officer: Cody</h2>
        <img
          src="/cody.png"
          alt="Cody the dog"
          className="mx-auto w-32 h-32 rounded-full object-cover border-4 border-yellow-400 mb-4"
        />
        <p className="text-lg text-gray-300">
          Cody keeps the vibes high during long debugging sessions. His specialties include emotional support,
          strategic tail placement on keyboards, and barking at API failures.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center mt-16 space-x-4">
        <a href="/blog" className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-400 transition">
          Read Rosie’s Journal
        </a>
        <a href="/about" className="text-pink-300 underline hover:text-pink-400 transition text-lg">
          Learn More
        </a>
      </section>
    </main>
  );
}
