import type { VercelRequest, VercelResponse } from '@vercel/node'
import { listPush } from './_lib/store.js'

const cors = (res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function device(ua: string) {
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  if (/mobile|android|iphone/i.test(ua)) return 'mobile'
  return 'desktop'
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const body = req.body as Record<string, string>
  if (!['pageview', 'whatsapp_click'].includes(body.type) || !body.path || !body.sessionId) {
    return res.status(400).json({ error: 'Invalid event' })
  }
  const ua = req.headers['user-agent'] || ''
  const event = {
    ...body,
    ts: Date.now(),
    country: req.headers['x-vercel-ip-country'] || '',
    city: req.headers['x-vercel-ip-city'] || '',
    ua,
    device: device(ua),
  }
  await listPush(body.type === 'pageview' ? 'visits' : 'events', event)
  return res.status(204).end()
}
