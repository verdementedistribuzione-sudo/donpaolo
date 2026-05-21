'use client'

import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'

export default function AdminHome() {
  const features = [
    {
      title: 'Dashboard CEO',
      description: 'Panoramica completa con filtri per provincia e parrocchia',
      href: '/admin/ceo',
      icon: '📊',
      color: 'bg-blue-50',
    },
    {
      title: 'Chat Test',
      description: 'Testa le risposte del bot spirituale in tempo reale',
      href: '/admin/chat-test',
      icon: '💬',
      color: 'bg-purple-50',
    },
    {
      title: 'Gestione Utenti',
      description: 'Visualizza e gestisci tutti gli utenti del sistema',
      href: '/admin/users',
      icon: '👥',
      color: 'bg-green-50',
    },
    {
      title: 'Alert Sistema',
      description: 'Monitora gli alert e i rischi rilevati',
      href: '/admin/alerts',
      icon: '🚨',
      color: 'bg-red-50',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Emmaus AI Admin</h1>
          <p className="text-lg text-gray-600">Pannello di controllo completo del sistema</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Link key={feature.href} href={feature.href}>
              <div className={`${feature.color} card p-8 hover:shadow-lg transition cursor-pointer`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-spiritual-600 font-semibold">
                  Accedi <FiChevronRight size={20} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 card p-8 bg-gradient-to-r from-spiritual-50 to-purple-50">
          <h2 className="text-2xl font-bold mb-4">📈 Statistiche Sistema</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-600 text-sm">API Status</p>
              <p className="text-2xl font-bold text-green-600 mt-2">✅ Online</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Database</p>
              <p className="text-2xl font-bold text-green-600 mt-2">✅ Connesso</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">AI Engine</p>
              <p className="text-2xl font-bold text-green-600 mt-2">✅ Attivo</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">WhatsApp</p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">⏳ Setup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
