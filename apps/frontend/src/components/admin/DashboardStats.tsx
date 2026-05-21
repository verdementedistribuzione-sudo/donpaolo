'use client'

import { useEffect, useState } from 'react'

interface Stats {
  activeUsers: number
  totalPrayers: number
  alertsPending: number
  averageMood: string
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    activeUsers: 0,
    totalPrayers: 0,
    alertsPending: 0,
    averageMood: 'sereno',
  })

  useEffect(() => {
    // TODO: Fetch from backend
    setStats({
      activeUsers: 45,
      totalPrayers: 234,
      alertsPending: 3,
      averageMood: 'sereno',
    })
  }, [])

  const statCards = [
    {
      label: 'Utenti Attivi',
      value: stats.activeUsers,
      icon: '👥',
      color: 'bg-blue-50',
    },
    {
      label: 'Preghiere Oggi',
      value: stats.totalPrayers,
      icon: '📿',
      color: 'bg-purple-50',
    },
    {
      label: 'Alert Pendenti',
      value: stats.alertsPending,
      icon: '🚨',
      color: 'bg-red-50',
    },
    {
      label: 'Stato Medio',
      value: stats.averageMood,
      icon: '💭',
      color: 'bg-green-50',
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {statCards.map((card) => (
        <div key={card.label} className={`card p-6 ${card.color}`}>
          <div className="text-3xl mb-2">{card.icon}</div>
          <p className="text-gray-600 text-sm">{card.label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  )
}
