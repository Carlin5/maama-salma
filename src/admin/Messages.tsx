import { useMemo, useState } from 'react'
import type { MessageRecord } from '../lib/aggregate'
import { replyMessage, setStatus } from './api'

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
}

export default function Messages({
  messages,
  onUpdate,
}: {
  messages: MessageRecord[]
  onUpdate: () => void
}) {
  const [selected, setSelected] = useState<MessageRecord | null>(messages[0] || null)
  const [filter, setFilter] = useState<'all' | MessageRecord['status']>('all')
  const [reply, setReply] = useState('')
  const [replyError, setReplyError] = useState('')
  const filtered = useMemo(
    () => messages.filter((message) => filter === 'all' || message.status === filter),
    [messages, filter],
  )
  const active =
    selected && messages.some((message) => message.id === selected.id)
      ? selected
      : messages[0] || null

  async function saveReply(openWhatsApp = false) {
    if (!active || !reply.trim()) return
    const text = reply.trim()
    const waUrl =
      openWhatsApp && active.phone
        ? `https://wa.me/${active.phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
        : null
    const win = openWhatsApp && active.phone ? window.open('', '_blank') : null
    setReplyError('')
    try {
      await replyMessage(active.id, text)
      setReply('')
      onUpdate()
      if (win && waUrl) win.location.href = waUrl
    } catch {
      win?.close()
      setReplyError('Could not save reply')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(260px,0.8fr)_minmax(0,1.4fr)]">
      <div className="glass-strong rounded-3xl p-4">
        <div className="flex flex-wrap gap-2">
          {(['all', 'new', 'replied', 'archived'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-full px-3 py-2 text-[10px] uppercase tracking-widest ${
                filter === item
                  ? 'bg-gold-400 text-midnight-950'
                  : 'border border-gold-500/20 text-gold-300'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {filtered.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelected(message)}
              className={`w-full rounded-2xl p-4 text-left ${
                active?.id === message.id ? 'bg-gold-500/15' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between gap-2">
                <strong className="text-ember-100">{message.name}</strong>
                <span className="text-[10px] uppercase text-gold-300">{message.status}</span>
              </div>
              <p className="mt-1 text-xs text-ember-100/55">
                {message.ritual} · {formatTime(message.ts)}
              </p>
              <p className="mt-2 truncate text-sm text-ember-100/70">{message.story}</p>
            </button>
          ))}
        </div>
        {!filtered.length && (
          <p className="p-4 text-sm text-ember-100/50">No messages in this filter.</p>
        )}
      </div>
      {active ? (
        <div className="glass-strong rounded-3xl p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl">{active.name}</h2>
              <p className="mt-1 text-sm text-gold-300">
                {active.ritual} · {active.phone || 'No phone number'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  void setStatus(active.id, 'read').then(onUpdate)
                }}
                className="rounded-full border border-gold-500/30 px-3 py-2 text-xs text-gold-300"
              >
                Mark read
              </button>
              <button
                onClick={() => {
                  void setStatus(active.id, 'archived').then(onUpdate)
                }}
                className="rounded-full border border-gold-500/30 px-3 py-2 text-xs text-gold-300"
              >
                Archive
              </button>
            </div>
          </div>
          <p className="mt-6 whitespace-pre-wrap font-serif text-lg leading-relaxed text-ember-100/85">
            {active.story}
          </p>
          <div className="mt-6 space-y-3 border-t border-gold-500/15 pt-5">
            {active.replies.map((item) => (
              <div
                key={item.ts}
                className="rounded-2xl bg-gold-500/10 p-3 text-sm text-ember-100/80"
              >
                <p>{item.text}</p>
                <time className="mt-1 block text-xs text-gold-300/60">{formatTime(item.ts)}</time>
              </div>
            ))}
          </div>
          <textarea
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            rows={4}
            placeholder="Write a reply…"
            className="mt-6 w-full rounded-2xl border border-gold-500/25 bg-midnight-950/60 p-4 text-ember-100 outline-none focus:border-gold-400"
          />
          <div className="mt-3 flex flex-wrap gap-3">
            <button
              onClick={() => {
                void saveReply()
              }}
              className="btn-ember"
            >
              Save reply
            </button>
            <button
              disabled={!active.phone}
              onClick={() => {
                void saveReply(true)
              }}
              className="rounded-full border border-[#25D366]/50 px-5 py-3 text-sm text-[#8ff0b3] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reply on WhatsApp
            </button>
          </div>
          {replyError && <p className="mt-3 text-sm text-rose-300">{replyError}</p>}
        </div>
      ) : (
        <div className="glass-strong rounded-3xl p-6 text-ember-100/60">
          Select a message to read it.
        </div>
      )}
    </div>
  )
}
