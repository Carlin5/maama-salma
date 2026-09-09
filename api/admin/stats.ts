import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  aggregateStats,
  type ClickRecord,
  type MessageRecord,
  type VisitRecord,
} from '../../src/lib/aggregate.js'
import { verifyToken } from '../_lib/auth.js'
import { listRange, getJSON } from '../_lib/store.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' })
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const visits = await listRange<VisitRecord>('visits', 0, 4999)
  const clicks = await listRange<ClickRecord>('events', 0, 4999)
  const ids = await listRange<string>('messages', 0, -1)
  const messages = (
    await Promise.all(ids.map((id) => getJSON<MessageRecord>(`message:${id}`)))
  ).filter((message): message is MessageRecord => Boolean(message))
  return res.status(200).json(aggregateStats(visits, clicks, messages))
}
