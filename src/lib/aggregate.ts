export type VisitRecord = {
  type?: 'pageview'
  path: string
  ts: number
  country?: string
  city?: string
  ua?: string
  device?: 'mobile' | 'tablet' | 'desktop'
  referrer?: string
  sessionId: string
  screen?: string
}

export type ClickRecord = {
  type?: 'whatsapp_click'
  path: string
  ts: number
  label?: string
  country?: string
  city?: string
  ua?: string
  device?: 'mobile' | 'tablet' | 'desktop'
  referrer?: string
  sessionId: string
  screen?: string
}

export type MessageRecord = {
  id: string
  ts: number
  name: string
  phone: string
  ritual: string
  story: string
  status: 'new' | 'read' | 'replied' | 'archived'
  replies: { ts: number; text: string }[]
  country?: string
}

export type Stats = {
  totals: {
    visitsToday: number
    visits7d: number
    visits30d: number
    visitsAll: number
    uniqueVisitors7d: number
    whatsappClicks7d: number
    whatsappClicksAll: number
    messagesNew: number
    messagesAll: number
  }
  daily: { date: string; visits: number; clicks: number }[]
  topPages: { path: string; count: number }[]
  topCountries: { country: string; count: number }[]
  devices: { mobile: number; tablet: number; desktop: number }
  referrers: { referrer: string; count: number }[]
  recentVisitors: VisitRecord[]
  recentClicks: ClickRecord[]
}

const dayStart = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

const dateKey = (timestamp: number) =>
  new Date(timestamp).toISOString().slice(0, 10)

function ranked(values: string[]) {
  const counts = new Map<string, number>()
  values.forEach((value) => {
    if (value) counts.set(value, (counts.get(value) || 0) + 1)
  })
  return [...counts.entries()]
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count)
}

export function aggregateStats(
  visits: VisitRecord[],
  clicks: ClickRecord[],
  messages: MessageRecord[],
  now = Date.now(),
): Stats {
  const today = dayStart(new Date(now))
  const sevenDays = today - 6 * 86400000
  const thirtyDays = today - 29 * 86400000
  const visits7d = visits.filter((visit) => visit.ts >= sevenDays)
  const clicks7d = clicks.filter((click) => click.ts >= sevenDays)
  const daily = Array.from({ length: 14 }, (_, index) => {
    const timestamp = today - (13 - index) * 86400000
    const next = timestamp + 86400000
    return {
      date: dateKey(timestamp),
      visits: visits.filter((visit) => visit.ts >= timestamp && visit.ts < next).length,
      clicks: clicks.filter((click) => click.ts >= timestamp && click.ts < next).length,
    }
  })
  const pages = ranked(visits7d.map((visit) => visit.path))
  const countries = ranked(visits7d.map((visit) => visit.country || 'Unknown'))
  const referrers = ranked(visits7d.map((visit) => visit.referrer || 'Direct'))
  const devices = { mobile: 0, tablet: 0, desktop: 0 }
  visits7d.forEach((visit) => {
    devices[visit.device || 'desktop'] += 1
  })

  return {
    totals: {
      visitsToday: visits.filter((visit) => visit.ts >= today).length,
      visits7d: visits7d.length,
      visits30d: visits.filter((visit) => visit.ts >= thirtyDays).length,
      visitsAll: visits.length,
      uniqueVisitors7d: new Set(visits7d.map((visit) => visit.sessionId)).size,
      whatsappClicks7d: clicks7d.length,
      whatsappClicksAll: clicks.length,
      messagesNew: messages.filter((message) => message.status === 'new').length,
      messagesAll: messages.length,
    },
    daily,
    topPages: pages.slice(0, 8).map(({ value, count }) => ({ path: value, count })),
    topCountries: countries.slice(0, 8).map(({ value, count }) => ({ country: value, count })),
    devices,
    referrers: referrers.slice(0, 8).map(({ value, count }) => ({ referrer: value, count })),
    recentVisitors: visits.slice(0, 50),
    recentClicks: clicks.slice(0, 30),
  }
}
