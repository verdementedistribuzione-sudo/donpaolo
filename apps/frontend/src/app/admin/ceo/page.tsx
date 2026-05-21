'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { FiFilter, FiDownload } from 'react-icons/fi'

interface User {
  id: string
  name: string
  phone_number: string
  province: string
  parrocchia: string
  parroco: string
  status: 'active' | 'inactive' | 'paused'
  emotional_state: string
  risk_level: 'none' | 'low' | 'medium' | 'high'
  created_at: string
  last_interaction: string
  conversations_count: number
  prayers_count: number
}

export default function CEODashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [provinceFilter, setProvinceFilter] = useState('all')
  const [parrocchiaFilter, setParrocchiaFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const [provinces, setProvinces] = useState<string[]>([])
  const [parrocchie, setParrocchie] = useState<string[]>([])

  // Mock data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Maria Rossi',
      phone_number: '+39 333 1234567',
      province: 'Milano',
      parrocchia: 'Santa Maria del Carmine',
      parroco: 'Don Giuseppe',
      status: 'active',
      emotional_state: 'sereno',
      risk_level: 'none',
      created_at: '2026-05-10',
      last_interaction: '2026-05-21 14:30',
      conversations_count: 45,
      prayers_count: 12,
    },
    {
      id: '2',
      name: 'Giovanni Bianchi',
      phone_number: '+39 333 2345678',
      province: 'Roma',
      parrocchia: 'Basilica di San Pietro',
      parroco: 'Don Andrea',
      status: 'active',
      emotional_state: 'ansioso',
      risk_level: 'low',
      created_at: '2026-05-15',
      last_interaction: '2026-05-21 09:15',
      conversations_count: 23,
      prayers_count: 8,
    },
    {
      id: '3',
      name: 'Anna Verdi',
      phone_number: '+39 333 3456789',
      province: 'Milano',
      parrocchia: 'Santo Stefano',
      parroco: 'Don Marco',
      status: 'active',
      emotional_state: 'triste',
      risk_level: 'medium',
      created_at: '2026-05-12',
      last_interaction: '2026-05-21 11:45',
      conversations_count: 67,
      prayers_count: 20,
    },
    {
      id: '4',
      name: 'Pietro Neri',
      phone_number: '+39 333 4567890',
      province: 'Napoli',
      parrocchia: 'San Francesco di Paola',
      parroco: 'Don Vincenzo',
      status: 'active',
      emotional_state: 'paura',
      risk_level: 'high',
      created_at: '2026-05-18',
      last_interaction: '2026-05-21 16:20',
      conversations_count: 12,
      prayers_count: 5,
    },
  ]

  useEffect(() => {
    setUsers(mockUsers)
    const uniqueProvinces = [...new Set(mockUsers.map(u => u.province))]
    setProvinces(uniqueProvinces as string[])
  }, [])

  useEffect(() => {
    let filtered = users

    if (provinceFilter !== 'all') {
      filtered = filtered.filter(u => u.province === provinceFilter)
    }

    if (parrocchiaFilter !== 'all') {
      filtered = filtered.filter(u => u.parrocchia === parrocchiaFilter)
    }

    if (riskFilter !== 'all') {
      filtered = filtered.filter(u => u.risk_level === riskFilter)
    }

    setFilteredUsers(filtered)

    // Update parrocchie list based on province
    if (provinceFilter !== 'all') {
      const uniqueParrocchie = [...new Set(
        users
          .filter(u => u.province === provinceFilter)
          .map(u => u.parrocchia)
      )]
      setParrocchie(uniqueParrocchie as string[])
    } else {
      const uniqueParrocchie = [...new Set(users.map(u => u.parrocchia))]
      setParrocchie(uniqueParrocchie as string[])
    }
  }, [provinceFilter, parrocchiaFilter, riskFilter, users])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'none':
        return 'bg-green-100 text-green-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'sereno':
        return '😌'
      case 'ansioso':
        return '😰'
      case 'triste':
        return '😢'
      case 'paura':
        return '😨'
      case 'gioia':
        return '😊'
      case 'rabbia':
        return '😠'
      default:
        return '😐'
    }
  }

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalConversations: users.reduce((acc, u) => acc + u.conversations_count, 0),
    highRiskUsers: users.filter(u => u.risk_level === 'high').length,
    averageEmotion: 'sereno',
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard CEO</h1>
          <p className="text-gray-600 mt-2">Panoramica completa di Emmaus AI per territorio</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-5 gap-4">
          <div className="card p-6 bg-blue-50">
            <p className="text-gray-600 text-sm">Utenti Totali</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers}</p>
          </div>
          <div className="card p-6 bg-green-50">
            <p className="text-gray-600 text-sm">Utenti Attivi</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.activeUsers}</p>
          </div>
          <div className="card p-6 bg-purple-50">
            <p className="text-gray-600 text-sm">Conversazioni</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalConversations}</p>
          </div>
          <div className="card p-6 bg-red-50">
            <p className="text-gray-600 text-sm">Utenti ad Alto Rischio</p>
            <p className="text-3xl font-bold text-red-900 mt-1">🚨 {stats.highRiskUsers}</p>
          </div>
          <div className="card p-6 bg-yellow-50">
            <p className="text-gray-600 text-sm">Stato Medio</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{getEmotionIcon(stats.averageEmotion)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiFilter size={20} />
            <h2 className="text-lg font-bold">Filtri</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Provincia</label>
              <select
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-500"
              >
                <option value="all">Tutte le province</option>
                {provinces.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parrocchia</label>
              <select
                value={parrocchiaFilter}
                onChange={(e) => setParrocchiaFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-500"
              >
                <option value="all">Tutte le parrocchie</option>
                {parrocchie.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Livello di Rischio</label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-500"
              >
                <option value="all">Tutti i livelli</option>
                <option value="none">Nessun rischio</option>
                <option value="low">Basso</option>
                <option value="medium">Medio</option>
                <option value="high">Alto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-bold">Utenti ({filteredUsers.length})</h2>
            <button className="flex items-center gap-2 text-spiritual-600 hover:text-spiritual-700">
              <FiDownload size={18} />
              Esporta CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Provincia</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Parrocchia</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Don</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Stato</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Emozione</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Rischio</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Chat</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Preghiere</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Ultimo Contatto</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-semibold">{user.name}</td>
                    <td className="px-6 py-4 text-sm">{user.province}</td>
                    <td className="px-6 py-4 text-sm">{user.parrocchia}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.parroco}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-2xl">
                      {getEmotionIcon(user.emotional_state)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded ${getRiskColor(user.risk_level)}`}>
                        {user.risk_level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {user.conversations_count}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {user.prayers_count}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.last_interaction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
