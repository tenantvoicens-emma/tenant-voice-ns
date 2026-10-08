'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignInPage() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

    async function signIn() {

    setSubmitting(true)
    setMessage('')

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      setMessage(error.message)
    } else {
      router.push('/')
    }

    setSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link
             href="/"
             className="
             text-blue-600
              hover:text-blue-800
              hover:underline
               "
              >
              ← Back to Home
            </Link>
         </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Sign In
          </h1>

          <p className="text-slate-500 mb-8">
            Access your Tenant Voice NS account.
          </p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              p-3
              mb-4
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              border
              border-slate-300
              rounded-xl
              p-3
              mb-6
            "
          />

          <button
              onClick={signIn}
              disabled={submitting}
              className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            {submitting ? 'Signing In...' : 'Sign In'}
          </button>

          {message && (
            <p className="mt-4 text-red-600">
              {message}
            </p>
          )}

        </div>

      </div>

    </main>
  )
}