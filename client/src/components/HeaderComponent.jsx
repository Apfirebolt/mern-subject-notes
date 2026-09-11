// src/components/Header.jsx
import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'

export default function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Dummy user data from your upcoming Auth Store state connection
  const user = {
    name: 'Alex Morgan',
    email: 'alex@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Budgets', href: '/budgets' },
    { name: 'Services', href: '/services' },
  ]

  // Helper utility class for linking states
  const linkClass = (path) => {
    const base = "text-sm font-medium transition-colors duration-200 "
    return location.pathname === path
      ? base + "text-indigo-600 font-semibold"
      : base + "text-gray-600 hover:text-gray-900"
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Identity / Logo */}
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <span className="text-2xl">💸</span>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                SubManager
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href} className={linkClass(item.href)}>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Profile Action Corner (Headless UI Menu Primitives) */}
          <div className="flex items-center gap-4">
            <Menu as="div" className="relative">
              <MenuButton className="flex rounded-full bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full border border-gray-200 shadow-xs object-cover"
                  src={user.avatarUrl}
                  alt={user.name}
                />
              </MenuButton>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl bg-white p-1 py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden border border-gray-100">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  
                  <MenuItem>
                    {({ focus }) => (
                      <Link
                        to="/settings"
                        className={`${focus ? 'bg-gray-50 text-gray-900' : 'text-gray-700'} block px-3 py-2 text-sm rounded-lg transition-colors`}
                      >
                        Settings Preferences
                      </Link>
                    )}
                  </MenuItem>
                  
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => console.log('Dispatching logout configuration...')}
                        className={`${focus ? 'bg-red-50 text-red-600' : 'text-gray-700'} block w-full text-left px-3 py-2 text-sm rounded-lg transition-colors`}
                      >
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>

            {/* Mobile Menu Open Trigger Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-hidden"
            >
              <span className="sr-only">Open main menu</span>
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

      {/* Mobile Drawer Panel Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-base font-medium transition-colors ${
                location.pathname === item.href 
                  ? "bg-indigo-50 text-indigo-700" 
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}