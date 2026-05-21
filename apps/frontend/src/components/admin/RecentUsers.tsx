'use client'

import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  phone_number: string
  province: string
  created_at: string
  emotional_state: string
}

export default function RecentUsers() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // TODO: Fetch from backend
    setUsers([
      {
        id: '1',
        name: 'Maria',
        phone_number: '+39 3xx xxx xxxx',
        province: 'Milano',
        created_at: '2026-05-21',
        emotional_state: 'sereno',
      },
      {
        id: '2',
        name: 'Giovanni',
        phone_number: '+39 3xx xxx xxxx',
        province: 'Roma',
        created_at: '2026-05-20',
        emotional_state: 'ansioso',
      },
    ])
  }, [])

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold mb-4">Utenti Recenti</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.province}</p>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              {user.emotional_state}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
