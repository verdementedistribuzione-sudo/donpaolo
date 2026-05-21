'use client'

import { useEffect, useState } from 'react'
import { FiTrash2, FiEdit } from 'react-icons/fi'

interface User {
  id: string
  name: string
  phone_number: string
  province: string
  parrocchia?: string
  parroco?: string
  status: string
  emotional_state: string
  risk_level: string
  created_at: string
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch from backend
    setUsers([])
    setIsLoading(false)
  }, [])

  return (
    <div className="card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Provincia</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Stato Emotivo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Rischio</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.province}</td>
                <td className="px-6 py-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {user.emotional_state}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded ${
                    user.risk_level === 'high' || user.risk_level === 'critical'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.risk_level}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FiEdit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">Nessun utente trovato</p>
        </div>
      )}
    </div>
  )
}
