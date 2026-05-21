'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // TODO: Implement actual authentication
      if (email === 'admin@emmaus.it' && password === 'demo') {
        localStorage.setItem('adminToken', 'demo-token')
        router.push('/admin/dashboard')
      } else {
        setError('Credenziali non valide')
      }
    } catch (err) {
      setError('Errore durante il login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="w-full max-w-md card p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Emmaus AI</h1>
        <p className="text-center text-gray-600 mb-8">Area Amministratore</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@emmaus.it"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full spiritual-gradient text-white py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Demo: admin@emmaus.it / demo
        </p>

        <Link href="/" className="block text-center text-spiritual-600 text-sm mt-4 hover:underline">
          ← Torna alla home
        </Link>
      </div>
    </div>
  )
}
