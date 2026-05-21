'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiLogIn } from 'react-icons/fi'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🙏</div>
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen spiritual-gradient">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold mb-4">Emmaus AI</h1>
          <p className="text-xl text-spiritual-100 mb-8">Assistente Spirituale Cristiano</p>
          <p className="text-lg text-spiritual-100 max-w-2xl mx-auto">
            Accompagnamento spirituale, preghiera guidata e comunità cristiana sempre con te.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="card p-6 hover:shadow-md transition">
            <div className="text-3xl mb-3">✝️</div>
            <h3 className="text-xl font-bold mb-2">Ascolto Spirituale</h3>
            <p className="text-gray-600">
              Condividi i tuoi pensieri e ricevi accompagnamento spirituale basato sul Vangelo.
            </p>
          </div>

          <div className="card p-6 hover:shadow-md transition">
            <div className="text-3xl mb-3">📿</div>
            <h3 className="text-xl font-bold mb-2">Rosario Guidato</h3>
            <p className="text-gray-600">
              Preghiere guidate, riflessioni quotidiane e momenti di contemplazione insieme.
            </p>
          </div>

          <div className="card p-6 hover:shadow-md transition">
            <div className="text-3xl mb-3">❤️</div>
            <h3 className="text-xl font-bold mb-2">Comunità di Preghiera</h3>
            <p className="text-gray-600">
              Condividi le tue intenzioni e unisciti alla comunità in preghiera.
            </p>
          </div>

          <div className="card p-6 hover:shadow-md transition">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-xl font-bold mb-2">Su WhatsApp</h3>
            <p className="text-gray-600">
              Disponibile sempre su WhatsApp. Scrivi quando hai bisogno di una parola di conforto.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 bg-white text-spiritual-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            <FiLogIn /> Area Amministratore
          </Link>
        </div>
      </div>
    </main>
  )
}
