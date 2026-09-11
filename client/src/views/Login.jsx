// src/views/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Field, Label, Input } from '@headlessui/react'
import { useAppStore } from '../store'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const loginUser = useAppStore((state) => state.loginUser)
  const authLoading = useAppStore((state) => state.authLoading)
  const authError = useAppStore((state) => state.authError)
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await loginUser(email, password)
      navigate('/dashboard')
    } catch (err) {
      // Error is already handled and stored in Zustand state (authError), 
      // but catching here prevents unwanted navigation on failure.
      console.error('Login aborted due to failure')
    }
  }

  return (
    <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Manage your subscriptions seamlessly
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {authError && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <p className="text-sm font-medium text-red-800">{authError}</p>
              </div>
            )}

            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">Email address</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-brand-primary focus:ring-brand-primary sm:text-sm outline-none transition"
                placeholder="you@example.com"
              />
            </Field>

            <Field className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">Password</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder-gray-400 focus:border-brand-primary focus:ring-brand-primary sm:text-sm outline-none transition"
                placeholder="••••••••"
              />
            </Field>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-brand-primary hover:text-brand-secondary">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="text-sm">
              <a href="/register" className="font-medium text-brand-primary hover:text-brand-secondary">
                Don't have an account? Register
              </a>
            </div>

            <div>
              <button
                type="submit"
                disabled={authLoading}
                className="flex w-full justify-center rounded-lg bg-brand-primary px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:opacity-50 transition"
              >
                {authLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}