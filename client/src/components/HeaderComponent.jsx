// src/components/Header.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useAppStore } from '../store'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Subjects', href: '/subjects' },
]

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const user = useAppStore((state) => state.user)
  const logoutUser = useAppStore((state) => state.logoutUser)

  // Automatically close mobile menu on location change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const isCurrent = (path) => location.pathname === path

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  const userInitial = (user?.username?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-8">
            <Link className="flex items-center gap-2 group" to="/dashboard">
              <span className="text-2xl" aria-hidden="true">📚</span>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Note Space
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isCurrent(item.href) ? 'text-brand-primary' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  key={item.name}
                  to={item.href}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Profile Menu */}
          <div className="flex items-center gap-4">
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 rounded-full bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition p-1">
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-brand-primary text-white flex items-center font-semibold justify-center text-sm shadow-xs">
                  {userInitial}
                </div>
              </MenuButton>

              <MenuItems className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden border border-gray-100 transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0" transition>
                <div className="px-3 py-2.5 border-b border-gray-100 mb-1">
                  <p className="text-xs font-semibold text-gray-900 truncate">{user?.username || 'User'}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                </div>
                
                <MenuItem>
                  <Link className="block px-3 py-2 text-sm rounded-lg text-gray-700 data-[focus]:bg-gray-50 data-[focus]:text-gray-900 transition-colors" to="/settings">
                    Settings & Preferences
                  </Link>
                </MenuItem>
                
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm rounded-lg font-medium text-gray-700 data-[focus]:bg-red-50 data-[focus]:text-red-600 transition-colors"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navigation.map((item) => (
            <Link ${ 'bg-purple-50 'text-gray-600 : ? className="{`block" font-medium font-semibold' hover:bg-gray-50' isCurrent(item.href) key="{item.name}" px-3 py-2.5 rounded-xl text-base text-brand-primary to="{item.href}" transition-colors }`}>
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}