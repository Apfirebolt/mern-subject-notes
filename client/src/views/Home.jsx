import { Link } from 'react-router'

export default function Home() {
  const features = [
    { title: "Track Everything", desc: "Keep all your streaming, SaaS, and gym memberships in a single view." },
    { title: "Smart Alerts", desc: "Get notified via email or push notifications before auto-renewals hit your card." },
    { title: "Spend Analytics", desc: "Visualize dynamic breakdowns of monthly and annual recurring liabilities." }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-28 text-center">
          <span className="inline-flex items-center rounded-md bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 mb-4">
            Version 1.0 Live
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Take control of your recurring expenses
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Stop letting forgotten free trials turn into expensive yearly charges. Track, analyze, and optimize your monthly subscription footprints seamlessly.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/login"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
            >
              Get Started Free
            </Link>
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Live Demo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8 pb-16">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none sm:grid-cols-3">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-start p-5 rounded-2xl border border-gray-100 shadow-xs bg-gray-50/50">
              <div className="rounded-lg bg-indigo-600 p-2 text-white text-xs font-bold mb-3">
                0{i + 1}
              </div>
              <h3 className="text-base font-semibold leading-7 text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}