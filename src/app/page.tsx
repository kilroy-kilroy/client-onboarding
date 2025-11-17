import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-center">
        <h1 className="text-6xl font-bold mb-6">
          WTF Agency Intelligence System
        </h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
          The unified platform that powers your entire agency consulting ecosystem
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link
            href="/onboarding"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Start Onboarding{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Begin the guided intake process to create your agency intelligence profile
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <h2 className="mb-3 text-2xl font-semibold">
              View Dashboard{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                →
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">
              Access your Agency Snapshot and intelligence overview
            </p>
          </Link>
        </div>

        <div className="mt-16 text-left max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">What This System Does:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Replaces scattered onboarding with structured intake</li>
            <li>Creates a relational database of your entire agency operation</li>
            <li>Feeds all downstream programs: Roadmap, DemandOS, GEN+, FYFS, GTM OS</li>
            <li>Generates automated analysis and intelligence</li>
            <li>Produces your Agency Snapshot and Go Forward Plan</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
