import type { VercelRequest, VercelResponse } from '@vercel/node'
import { acceptedPasswords, createToken } from '../_lib/auth.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { password } = req.body as { password?: string }
  if (!password || !acceptedPasswords().includes(password)) {
    return res.status(401).json({ error: 'Incorrect password' })
  }
  return res.status(200).json({ token: createToken() })
}
