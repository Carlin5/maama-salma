import type { VercelRequest, VercelResponse } from '@vercel/node'
import { verifyToken } from '../_lib/auth.js'
import { getJSON, listRange, setJSON } from '../_lib/store.js'
import type { MessageRecord } from '../../src/lib/aggregate.js'

async function allMessages() {
  const ids = await listRange<string>('messages', 0, 4999)
  return (await Promise.all(ids.map((id) => getJSON<MessageRecord>(`message:${id}`)))).filter(
    (message): message is MessageRecord => Boolean(message),
  )
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (!verifyToken(req)) return res.status(401).json({ error: 'Unauthorized' })
  if (req.method === 'GET') return res.status(200).json({ messages: await allMessages() })
  const body = req.body as { id?: string; text?: string; status?: MessageRecord['status'] }
  if (!body.id) return res.status(400).json({ error: 'Message id is required' })
  const message = await getJSON<MessageRecord>(`message:${body.id}`)
  if (!message) return res.status(404).json({ error: 'Message not found' })
  if (req.method === 'POST') {
    if (!body.text?.trim()) return res.status(400).json({ error: 'Reply is required' })
    message.replies.push({ ts: Date.now(), text: body.text.trim() })
    message.status = 'replied'
  } else if (req.method === 'PATCH') {
    if (!body.status || !['new', 'read', 'replied', 'archived'].includes(body.status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }
    message.status = body.status
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  await setJSON(`message:${message.id}`, message)
  return res.status(200).json(message)
}
