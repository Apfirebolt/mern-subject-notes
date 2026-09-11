import { Link } from 'react-router'
import {
  BookOpenIcon,
  SparklesIcon,
  FolderTreeIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  CheckCircle2Icon
} from 'lucide-react'

export default function Home() {
  const highlights = [
    "Structured 3-tier hierarchy: Subjects → Topics → Notes",
    "Distraction-free markdown study workspace",
    "Fast full-text lookup across all semesters and units"
  ]

  const features = [
    {
      title: "Hierarchical Organization",
      desc: "Structure your syllabus naturally. Nest detailed conceptual notes inside topics, and group topics under master subjects.",
      icon: FolderTreeIcon,
      accent: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400"
    },
    {
      title: "Focused Study Notes",
      desc: "Capture crisp headings, lecture formulas, and code snippets in clean markdown without visual clutter.",
      icon: DocumentTextIcon,
      accent: "bg-violet-500/10 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400"
    },
    {
      title: "Exam & Revision Ready",
      desc: "Rapidly browse across modules, filter down to key takeaways, and review concepts ahead of assessments.",
      icon: BookOpenIcon,
      accent: "bg-sky-500/10 text-sky-600 dark:bg-sky-400/10 dark:text-sky-400"
    }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Background radial gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[50rem] -translate-x-1/2 [background:radial-gradient(ellipse_at_top,rgba(99,102,241,0.18),transparent_70%)]"
      />

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-16 sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/80 px-3.5 py-1 text-xs font-medium text-indigo-700 shadow-xs backdrop-blur-xs">
            <SparklesIcon className="h-3.5 w-3.5" />
            <span>Built for students, developers &amp; researchers</span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl font-montserrat">
            Master your subjects,{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
              one topic at a time
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Stop losing critical definitions across scattered text files. Organize your entire learning syllabus into structured subjects, focused topics, and deep notes.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition-all duration-150 hover:bg-indigo-500 hover:shadow-indigo-600/35 active:scale-[0.98]"
            >
              <span>Get Started Free</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-xs transition-all duration-150 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]"
            >
              Sign In to Notes
            </Link>
          </div>

          {/* Trust bullets */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <CheckCircle2Icon className="h-4 w-4 text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Engineered for Recall
          </h2>
          <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Everything you need to conquer your curriculum
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
              >
                <div>
                  <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.accent}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {feature.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
                  Layer 0{i + 1}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}