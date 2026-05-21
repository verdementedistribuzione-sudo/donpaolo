import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin - Emmaus AI',
  description: 'Pannello amministrativo di Emmaus AI',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
