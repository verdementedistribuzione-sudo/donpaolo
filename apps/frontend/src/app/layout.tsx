import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Emmaus AI - Assistente Spirituale',
  description: 'Accompagnamento spirituale cristiano basato su AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
