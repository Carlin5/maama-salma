import type { ReactNode } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import RitualBackground from './RitualBackground'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <RitualBackground />
      <NavBar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
