// src/components/Footer.jsx
import { Link } from 'react-router'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const sections = [
    {
      title: 'Workspace',
      links: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Subjects', href: '/subjects' },
      ],
    },
    {
      title: 'Management',
      links: [
        { name: 'Settings & Preferences', href: '/settings' },
        { name: 'User Profile', href: '/settings' },
      ],
    },
  ]

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 mt-auto font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand/Bio Information Column */}
          <div className="space-y-4 xl:col-span-1">
            <Link to="/dashboard" className="flex items-center gap-2">
              <span className="text-xl">📚</span>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                NoteSpace
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              Organize subjects, structure topics, and write clean Markdown notes. Keep your study materials structured and accessible in one unified workspace.
            </p>
          </div>

          {/* Quick Links Column Sections */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8 col-span-2 flex justify-between sm:justify-start gap-x-16">
              {sections.map((section) => (
                <div key={section.title} className="mt-12 md:mt-0">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {section.title}
                  </h3>
                  <ul role="list" className="mt-4 space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-sm text-gray-500 hover:text-brand-primary transition-colors duration-150"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Metadata Border Block */}
        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} NoteSpace Inc. All rights reserved.
          </p>
          
          {/* External Social / Repo Links Stub */}
          <div className="flex space-x-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
              <span className="sr-only">GitHub Workspace</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}