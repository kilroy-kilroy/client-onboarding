import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="z-10 max-w-6xl w-full px-6 py-12">
        {/* Logo */}
        <div className="text-center mb-12">
          <Image
            src="/logos/red-logo.svg"
            alt="Tim Kilroy"
            width={300}
            height={100}
            className="mx-auto"
            priority
          />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl md:text-8xl font-anton uppercase tracking-tight mb-6 text-brand-red">
            WTF
          </h1>
          <h2 className="text-4xl md:text-5xl font-anton uppercase mb-6">
            Agency Intelligence System
          </h2>
          <p className="text-2xl mb-4 text-brand-yellow font-bold">
            Turn WTF into Wow, that's fantastic.
          </p>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stop scattered onboarding. Start building real agency intelligence.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
          <Link
            href="/onboarding"
            className="group bg-brand-red hover:bg-red-700 text-white px-8 py-6 transition-all hover:scale-105 border-4 border-brand-red hover:border-brand-yellow"
          >
            <h3 className="text-3xl font-anton uppercase mb-3">
              Start Here
              <span className="inline-block transition-transform group-hover:translate-x-2 ml-2">
                →
              </span>
            </h3>
            <p className="text-lg font-poppins">
              Build your agency intelligence profile. No BS, just the fundamentals.
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="group bg-white text-black hover:bg-brand-yellow px-8 py-6 transition-all hover:scale-105 border-4 border-white hover:border-brand-yellow"
          >
            <h3 className="text-3xl font-anton uppercase mb-3">
              View Dashboard
              <span className="inline-block transition-transform group-hover:translate-x-2 ml-2">
                →
              </span>
            </h3>
            <p className="text-lg font-poppins">
              Access your Agency Snapshot and AI-powered insights.
            </p>
          </Link>
        </div>

        {/* What This Does */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-brand-red p-8 border-4 border-brand-yellow">
            <h3 className="text-3xl font-anton uppercase mb-6 text-brand-yellow">
              Fix Your Fundamentals First
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-brand-yellow mr-3 text-2xl">→</span>
                <span>Stop being an order-taker. Build strategic positioning.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-yellow mr-3 text-2xl">→</span>
                <span>Create a real database of your entire operation.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-yellow mr-3 text-2xl">→</span>
                <span>Feed all downstream programs: Roadmap, DemandOS, GEN+, FYFS, GTM OS.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-yellow mr-3 text-2xl">→</span>
                <span>Get AI-powered analysis that actually matters.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-yellow mr-3 text-2xl">→</span>
                <span>Generate your 90-Day Go Forward Plan.</span>
              </li>
            </ul>
          </div>

          <p className="text-center text-2xl font-anton uppercase mt-12 text-brand-yellow">
            More Revenue. More Profit. More Happy.
          </p>
        </div>
      </div>
    </main>
  )
}
