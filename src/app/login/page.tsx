'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Get the user's company
      const { data: company } = await supabase
        .from('companies')
        .select('id')
        .eq('user_id', data.user.id)
        .single()

      if (company) {
        router.push(`/dashboard/${company.id}`)
      } else {
        router.push('/onboarding')
      }
    } catch (error: any) {
      setError(error.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <Image
            src="/logos/red-logo.svg"
            alt="Tim Kilroy"
            width={250}
            height={83}
            className="mx-auto"
          />
        </div>

        {/* Login Form */}
        <div className="bg-white text-black p-8 border-4 border-brand-red">
          <h1 className="text-4xl font-anton uppercase text-brand-red mb-2 text-center">
            Login
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Access your agency intelligence dashboard
          </p>

          {error && (
            <div className="bg-brand-red text-white p-4 mb-6 border-2 border-brand-yellow">
              <p className="font-poppins">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-poppins font-medium mb-2 uppercase">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-brand-red focus:outline-none font-poppins"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-poppins font-medium mb-2 uppercase">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 focus:border-brand-red focus:outline-none font-poppins"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red text-white py-4 font-anton text-xl uppercase hover:bg-red-700 transition-colors border-4 border-brand-red hover:border-brand-yellow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 font-poppins">
              Don't have an account?{' '}
              <Link href="/onboarding" className="text-brand-red font-bold hover:text-red-700">
                Start Onboarding
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
