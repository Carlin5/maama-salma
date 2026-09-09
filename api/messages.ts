import type { VercelRequest, VercelResponse } from '@vercel/node'
import { listPush, setJSON } from './_lib/store.js'

const cors = (res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const body = req.body as Record<string, string>
  if (!body.name?.trim() || !body.story?.trim()) {
    return res.status(400).json({ error: 'Name and story are required' })
  }
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const message = {
    id,
    ts: Date.now(),
    name: body.name.trim(),
    phone: body.phone?.trim() || '',
    ritual: body.ritual || 'Not specified',
    story: body.story.trim(),
    status: 'new' as const,
    replies: [] as { ts: number; text: string }[],
    country: req.headers['x-vercel-ip-country'] || '',
  }
  await setJSON(`message:${id}`, message)
  await listPush('messages', id)
  return res.status(200).json({ id })
}
