import { useEffect, useState } from 'react'
import type { MessageRecord, Stats } from '../lib/aggregate'
import { fetchMessages, fetchStats } from './api'
import Advertising from './Advertising'
import Messages from './Messages'
import Overview from './Overview'
import Settings from './Settings'
import Visitors from './Visitors'

type Tab = 'Overview' | 'Visitors' | 'Messages' | 'Advertising' | 'Settings'

const emptyStats: Stats = {
  totals: {
    visitsToday: 0,
    visits7d: 0,
    visits30d: 0,
    visitsAll: 0,
    uniqueVisitors7d: 0,
    whatsappClicks7d: 0,
    whatsappClicksAll: 0,
    messagesNew: 0,
    messagesAll: 0,
  },
  daily: [],
  topPages: [],
  topCountries: [],
  devices: { mobile: 0, tablet: 0, desktop: 0 },
  referrers: [],
  recentVisitors: [],
  recentClicks: [],
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('Overview')
  const [stats, setStats] = useState<Stats>(emptyStats)
  const [messages, setMessages] = useState<MessageRecord[]>([])
  const [fallback, setFallback] = useState(false)

  async function refresh() {
    const [statsResult, messagesResult] = await Promise.all([fetchStats(), fetchMessages()])
    setStats(statsResult.data)
    setMessages(messagesResult.messages)
    setFallback(statsResult.fallback || messagesResult.fallback)
  }

  useEffect(() => {
    const initial = window.setTimeout(() => {
      void refresh()
    }, 0)
    const timer = window.setInterval(() => void refresh(), 60000)
    return () => {
      window.clearTimeout(initial)
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-screen">
      <header className="border-b border-gold-500/15 bg-midnight-950/70 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <a href="/" className="font-display text-lg tracking-widest">
            MAAMA <span className="text-gold-grad">SALMA</span>
          </a>
          <button
            onClick={onLogout}
            className="text-xs uppercase tracking-widest text-ember-100/60 hover:text-ember-100"
          >
            Log out
          </button>
        </div>
      </header>
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-5 py-6 lg:flex-row">
        <aside className="glass-strong rounded-3xl p-3 lg:w-56 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {(['Overview', 'Visitors', 'Messages', 'Advertising', 'Settings'] as Tab[]).map(
              (item) => (
                <button
                  key={item}
                  onClick={() => setTab(item)}
                  className={`whitespace-nowrap rounded-2xl px-4 py-3 text-left font-display text-xs uppercase tracking-widest ${
                    tab === item
                      ? 'bg-gold-400 text-midnight-950'
                      : 'text-ember-100/65 hover:bg-white/5'
                  }`}
                >
                  {item}
                </button>
              ),
            )}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">
          {fallback && (
            <div className="mb-6 rounded-2xl border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-sm text-gold-200">
              Showing this-browser data only — connect Vercel KV for live site-wide analytics
            </div>
          )}
          {tab === 'Overview' && <Overview stats={stats} />}
          {tab === 'Visitors' && (
            <Visitors
              stats={stats}
              refresh={() => {
                void refresh()
              }}
            />
          )}
          {tab === 'Messages' && (
            <Messages
              messages={messages}
              onUpdate={() => {
                void refresh()
              }}
            />
          )}
          {tab === 'Advertising' && <Advertising />}
          {tab === 'Settings' && <Settings onLogout={onLogout} />}
        </main>
      </div>
    </div>
  )
}
