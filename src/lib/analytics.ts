import { useEffect } from 'react'

type EventPayload = {
  type: 'pageview' | 'whatsapp_click'
  path: string
  label?: string
  referrer?: string
  sessionId: string
  screen?: string
}

const sessionKey = 'maama_session_id'

function uuid() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function getSessionId() {
  const existing = sessionStorage.getItem(sessionKey)
  if (existing) return existing
  const id = uuid()
  sessionStorage.setItem(sessionKey, id)
  return id
}

function mirror(key: string, event: EventPayload) {
  try {
    const existing = JSON.parse(localStorage.getItem(key) || '[]') as unknown[]
    const ua = navigator.userAgent
    const enriched = {
      ...event,
      ts: Date.now(),
      country: '',
      city: '',
      ua,
      device: /tablet|ipad/i.test(ua) ? 'tablet' : /mobile|android|iphone/i.test(ua) ? 'mobile' : 'desktop',
    }
    localStorage.setItem(key, JSON.stringify([enriched, ...existing].slice(0, 500)))
  } catch {
    // Storage can be unavailable in private browsing; network tracking still runs.
  }
}

function send(event: EventPayload) {
  mirror(event.type === 'pageview' ? 'maama_local_visits' : 'maama_local_events', event)
  void fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
    keepalive: true,
  }).catch(() => undefined)
}

export function trackPageview(path: string) {
  send({
    type: 'pageview',
    path,
    referrer: document.referrer,
    sessionId: getSessionId(),
    screen: `${window.innerWidth}x${window.innerHeight}`,
  })
}

export function trackWhatsAppClick(label: string) {
  send({
    type: 'whatsapp_click',
    path: window.location.pathname,
    label,
    referrer: document.referrer,
    sessionId: getSessionId(),
    screen: `${window.innerWidth}x${window.innerHeight}`,
  })
}

export function usePageTracking(pathname: string) {
  useEffect(() => {
    if (!pathname.startsWith('/admin')) trackPageview(pathname)
  }, [pathname])
}
