import { useEffect, useMemo, useState } from 'react'
import type { MessageRecord, Stats } from '../lib/aggregate'
import { SITE } from '../lib/constants'
import { trackWhatsAppClick } from '../lib/analytics'
import { AD_PACKAGES } from '../lib/advertising'
import { fetchMessages, fetchStats, replyMessage, setStatus } from './api'

type Tab = 'Overview' | 'Visitors' | 'Messages' | 'Advertising' | 'Settings'

const emptyStats: Stats = {
  totals: { visitsToday: 0, visits7d: 0, visits30d: 0, visitsAll: 0, uniqueVisitors7d: 0, whatsappClicks7d: 0, whatsappClicksAll: 0, messagesNew: 0, messagesAll: 0 },
  daily: [],
  topPages: [],
  topCountries: [],
  devices: { mobile: 0, tablet: 0, desktop: 0 },
  referrers: [],
  recentVisitors: [],
  recentClicks: [],
}

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
}

function StatCard({ label, value }: { label: string; value: number }) {
  return <div className="glass rounded-2xl p-5"><p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-400/80">{label}</p><p className="mt-3 font-display text-3xl text-ember-100">{value.toLocaleString()}</p></div>
}

function Overview({ stats }: { stats: Stats }) {
  const max = Math.max(1, ...stats.daily.map((day) => day.visits + day.clicks))
  return <div className="space-y-8">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Visits today" value={stats.totals.visitsToday} /><StatCard label="Visits · 7 days" value={stats.totals.visits7d} /><StatCard label="Visits · 30 days" value={stats.totals.visits30d} /><StatCard label="Visits all time" value={stats.totals.visitsAll} />
      <StatCard label="Unique visitors · 7d" value={stats.totals.uniqueVisitors7d} /><StatCard label="WhatsApp clicks · 7d" value={stats.totals.whatsappClicks7d} /><StatCard label="New messages" value={stats.totals.messagesNew} />
    </div>
    <section className="glass-strong rounded-3xl p-6"><h2 className="font-display text-xl">Last 14 days</h2><div className="mt-6 flex h-44 items-end gap-2">{stats.daily.map((day) => <div key={day.date} className="flex min-w-0 flex-1 flex-col items-center gap-2"><div className="flex h-32 w-full items-end gap-1"><div title={`${day.visits} visits`} className="w-1/2 rounded-t bg-gradient-to-t from-violet-ritual to-gold-400" style={{ height: `${Math.max(4, day.visits / max * 100)}%` }} /><div title={`${day.clicks} clicks`} className="w-1/2 rounded-t bg-gradient-to-t from-crimson-500 to-ember-300" style={{ height: `${Math.max(4, day.clicks / max * 100)}%` }} /></div><span className="truncate text-[10px] text-ember-100/50">{day.date.slice(5)}</span></div>)}</div><div className="mt-4 flex gap-4 text-xs text-ember-100/60"><span>● Visits</span><span className="text-ember-300">● WhatsApp clicks</span></div></section>
    <div className="grid gap-6 lg:grid-cols-2">
      <Ranked title="Top pages" items={stats.topPages.map((item) => [item.path, item.count])} />
      <Ranked title="Top countries" items={stats.topCountries.map((item) => [item.country, item.count])} />
      <Ranked title="Referrers" items={stats.referrers.map((item) => [item.referrer, item.count])} />
      <div className="glass-strong rounded-3xl p-6"><h2 className="font-display text-xl">Devices</h2>{Object.entries(stats.devices).map(([name, count]) => <div key={name} className="mt-4 flex items-center justify-between text-sm capitalize text-ember-100/75"><span>{name}</span><span className="text-gold-300">{count}</span></div>)}</div>
    </div>
  </div>
}

function Ranked({ title, items }: { title: string; items: [string, number][] }) {
  return <div className="glass-strong rounded-3xl p-6"><h2 className="font-display text-xl">{title}</h2>{items.length ? items.map(([name, count]) => <div key={name} className="mt-4 flex items-center justify-between gap-4 text-sm text-ember-100/75"><span className="truncate">{name}</span><span className="text-gold-300">{count}</span></div>) : <p className="mt-4 text-sm text-ember-100/50">No data yet.</p>}</div>
}

function Visitors({ stats, refresh }: { stats: Stats; refresh: () => void }) {
  return <div className="space-y-6"><div className="flex items-center justify-between"><h2 className="font-display text-2xl">Recent visitors</h2><button onClick={refresh} className="rounded-full border border-gold-500/30 px-4 py-2 text-xs uppercase tracking-widest text-gold-300 hover:bg-gold-500/10">Refresh</button></div><div className="overflow-x-auto glass-strong rounded-3xl"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-gold-500/15 text-xs uppercase tracking-widest text-gold-400/70"><tr><th className="p-4">Time</th><th className="p-4">Page</th><th className="p-4">Place</th><th className="p-4">Device</th><th className="p-4">Referrer</th><th className="p-4">Session</th></tr></thead><tbody>{stats.recentVisitors.map((visitor, index) => <tr key={`${visitor.ts}-${index}`} className="border-b border-gold-500/10 text-ember-100/75"><td className="p-4 whitespace-nowrap">{formatTime(visitor.ts)}</td><td className="p-4">{visitor.path}</td><td className="p-4">{visitor.city || '—'}{visitor.country ? `, ${visitor.country}` : ''}</td><td className="p-4 capitalize">{visitor.device || 'desktop'}</td><td className="max-w-[150px] truncate p-4">{visitor.referrer || 'Direct'}</td><td className="p-4">{visitor.sessionId.slice(0, 8)}</td></tr>)}</tbody></table>{!stats.recentVisitors.length && <p className="p-6 text-sm text-ember-100/50">Visit the public site to begin collecting data.</p>}</div><div className="glass-strong rounded-3xl p-6"><h2 className="font-display text-xl">Recent WhatsApp clicks</h2>{stats.recentClicks.map((click, index) => <div key={`${click.ts}-${index}`} className="mt-4 flex flex-wrap justify-between gap-3 text-sm text-ember-100/75"><span>{click.label || 'WhatsApp'} · {click.path}</span><span className="text-ember-100/50">{formatTime(click.ts)}</span></div>)}</div></div>
}

function Messages({ messages, onUpdate }: { messages: MessageRecord[]; onUpdate: () => void }) {
  const [selected, setSelected] = useState<MessageRecord | null>(messages[0] || null)
  const [filter, setFilter] = useState<'all' | MessageRecord['status']>('all')
  const [reply, setReply] = useState('')
  const filtered = useMemo(() => messages.filter((message) => filter === 'all' || message.status === filter), [messages, filter])
  const active = selected && messages.some((message) => message.id === selected.id) ? selected : messages[0] || null
  async function saveReply(openWhatsApp = false) {
    if (!active || !reply.trim()) return
    const text = reply.trim()
    await replyMessage(active.id, text)
    setReply('')
    onUpdate()
    if (openWhatsApp && active.phone) window.open(`https://wa.me/${active.phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
  }
  return <div className="grid gap-6 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.4fr)]"><div className="glass-strong rounded-3xl p-4"><div className="flex flex-wrap gap-2">{(['all', 'new', 'replied', 'archived'] as const).map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-3 py-2 text-[10px] uppercase tracking-widest ${filter === item ? 'bg-gold-400 text-midnight-950' : 'border border-gold-500/20 text-gold-300'}`}>{item}</button>)}</div><div className="mt-4 space-y-2">{filtered.map((message) => <button key={message.id} onClick={() => setSelected(message)} className={`w-full rounded-2xl p-4 text-left ${active?.id === message.id ? 'bg-gold-500/15' : 'hover:bg-white/5'}`}><div className="flex justify-between gap-2"><strong className="text-ember-100">{message.name}</strong><span className="text-[10px] uppercase text-gold-300">{message.status}</span></div><p className="mt-1 text-xs text-ember-100/55">{message.ritual} · {formatTime(message.ts)}</p><p className="mt-2 truncate text-sm text-ember-100/70">{message.story}</p></button>)}</div>{!filtered.length && <p className="p-4 text-sm text-ember-100/50">No messages in this filter.</p>}</div>{active ? <div className="glass-strong rounded-3xl p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-display text-2xl">{active.name}</h2><p className="mt-1 text-sm text-gold-300">{active.ritual} · {active.phone || 'No phone number'}</p></div><div className="flex gap-2"><button onClick={() => { void setStatus(active.id, 'read').then(onUpdate) }} className="rounded-full border border-gold-500/30 px-3 py-2 text-xs text-gold-300">Mark read</button><button onClick={() => { void setStatus(active.id, 'archived').then(onUpdate) }} className="rounded-full border border-gold-500/30 px-3 py-2 text-xs text-gold-300">Archive</button></div></div><p className="mt-6 whitespace-pre-wrap font-serif text-lg leading-relaxed text-ember-100/85">{active.story}</p><div className="mt-6 space-y-3 border-t border-gold-500/15 pt-5">{active.replies.map((item) => <div key={item.ts} className="rounded-2xl bg-gold-500/10 p-3 text-sm text-ember-100/80"><p>{item.text}</p><time className="mt-1 block text-xs text-gold-300/60">{formatTime(item.ts)}</time></div>)}</div><textarea value={reply} onChange={(event) => setReply(event.target.value)} rows={4} placeholder="Write a reply…" className="mt-6 w-full rounded-2xl border border-gold-500/25 bg-midnight-950/60 p-4 text-ember-100 outline-none focus:border-gold-400" /><div className="mt-3 flex flex-wrap gap-3"><button onClick={() => { void saveReply() }} className="btn-ember">Save reply</button><button disabled={!active.phone} onClick={() => { void saveReply(true) }} className="rounded-full border border-[#25D366]/50 px-5 py-3 text-sm text-[#8ff0b3] disabled:cursor-not-allowed disabled:opacity-40">Reply on WhatsApp</button></div></div> : <div className="glass-strong rounded-3xl p-6 text-ember-100/60">Select a message to read it.</div>}</div>
}

function Advertising() {
  return <div><h2 className="font-display text-3xl">Advertise with Maama Salma — daily reach &amp; traffic</h2><div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{AD_PACKAGES.map((item) => <div key={item.name} className="glass-strong flex flex-col rounded-3xl p-6"><p className="font-display text-xs uppercase tracking-widest text-gold-400">{item.name}</p><p className="mt-3 font-display text-3xl text-ember-100">{item.price}</p><p className="mt-2 text-sm text-ember-100/60">{item.reach}</p><p className="mt-5 flex-1 font-serif text-lg text-ember-100/80">{item.description}</p><a onClick={() => trackWhatsAppClick(`advertising ${item.name}`)} href={`https://wa.me/${SITE.phoneRaw.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello Maama, I would like to book the ${item.name} advertising package.`)}`} target="_blank" rel="noreferrer" className="btn-ember mt-6 justify-center text-sm">Book via WhatsApp</a></div>)}</div><div className="mt-8 grid gap-6 md:grid-cols-2"><div className="glass rounded-3xl p-6"><h3 className="font-display text-xl">What can be advertised in a day</h3><ul className="mt-4 space-y-3 font-serif text-lg text-ember-100/75">{['Banner slots', 'Sponsored testimonial', 'WhatsApp broadcast', 'Social outreach'].map((item) => <li key={item}>✦ {item}</li>)}</ul></div><div className="glass rounded-3xl p-6"><h3 className="font-display text-xl">Ready to reach more hearts?</h3><p className="mt-3 font-serif text-lg text-ember-100/75">Payment details coming soon — contact Maama on WhatsApp to book.</p><a onClick={() => trackWhatsAppClick('advertising contact')} href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-gold-300 underline underline-offset-4">Contact Maama →</a></div></div></div>
}

function Settings({ onLogout }: { onLogout: () => void }) {
  return <div className="max-w-2xl space-y-6"><h2 className="font-display text-3xl">Settings</h2><div className="glass-strong rounded-3xl p-6"><h3 className="font-display text-xl">Change the password</h3><p className="mt-3 font-serif text-lg text-ember-100/70">Set <code className="text-gold-300">ADMIN_PASSWORD</code> in your Vercel project environment variables, then redeploy. If it is not set, the defaults are Masha@1000 and Masha@123.</p></div><div className="glass-strong rounded-3xl p-6"><h3 className="font-display text-xl">Enable live analytics</h3><p className="mt-3 font-serif text-lg text-ember-100/70">Add <code className="text-gold-300">KV_REST_API_URL</code> and <code className="text-gold-300">KV_REST_API_TOKEN</code> from Vercel KV or Upstash. Without them, this browser keeps a local preview mirror.</p></div><button onClick={onLogout} className="rounded-full border border-rose-400/40 px-5 py-3 text-sm text-rose-200 hover:bg-rose-400/10">Log out</button></div>
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
  useEffect(() => { const initial = window.setTimeout(() => { void refresh() }, 0); const timer = window.setInterval(() => void refresh(), 60000); return () => { window.clearTimeout(initial); window.clearInterval(timer) } }, [])
  return <div className="min-h-screen"><header className="border-b border-gold-500/15 bg-midnight-950/70 px-5 py-4 backdrop-blur-xl"><div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4"><a href="/" className="font-display text-lg tracking-widest">MAAMA <span className="text-gold-grad">SALMA</span></a><button onClick={onLogout} className="text-xs uppercase tracking-widest text-ember-100/60 hover:text-ember-100">Log out</button></div></header><div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-5 py-6 lg:flex-row"><aside className="glass-strong rounded-3xl p-3 lg:w-56 lg:shrink-0"><nav className="flex gap-2 overflow-x-auto lg:flex-col">{(['Overview', 'Visitors', 'Messages', 'Advertising', 'Settings'] as Tab[]).map((item) => <button key={item} onClick={() => setTab(item)} className={`whitespace-nowrap rounded-2xl px-4 py-3 text-left font-display text-xs uppercase tracking-widest ${tab === item ? 'bg-gold-400 text-midnight-950' : 'text-ember-100/65 hover:bg-white/5'}`}>{item}</button>)}</nav></aside><main className="min-w-0 flex-1">{fallback && <div className="mb-6 rounded-2xl border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-sm text-gold-200">Showing this-browser data only — connect Vercel KV for live site-wide analytics</div>}{tab === 'Overview' && <Overview stats={stats} />}{tab === 'Visitors' && <Visitors stats={stats} refresh={() => { void refresh() }} />}{tab === 'Messages' && <Messages messages={messages} onUpdate={() => { void refresh() }} />}{tab === 'Advertising' && <Advertising />}{tab === 'Settings' && <Settings onLogout={onLogout} />}</main></div></div>
}
