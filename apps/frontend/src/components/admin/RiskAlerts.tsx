'use client'

import { useEffect, useState } from 'react'

interface Alert {
  id: string
  user_name: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  created_at: string
}

export default function RiskAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // TODO: Fetch from backend
    setAlerts([
      {
        id: '1',
        user_name: 'Pietro',
        severity: 'high',
        description: 'Rilevate parole chiave di rischio nel messaggio',
        created_at: '2026-05-21 14:30',
      },
      {
        id: '2',
        user_name: 'Anna',
        severity: 'medium',
        description: 'Isolamento rilevato - nessun contatto per 7 giorni',
        created_at: '2026-05-20 09:15',
      },
    ])
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold mb-4">🚨 Alert Rischio</h2>
      <div className="space-y-4">
        {alerts.length === 0 ? (
          <p className="text-gray-600 text-sm">Nessun alert al momento</p>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="border-l-4 border-orange-500 bg-orange-50 p-3 rounded">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{alert.user_name}</p>
                  <p className="text-sm text-gray-600">{alert.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.created_at}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
