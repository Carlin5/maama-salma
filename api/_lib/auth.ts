import { createHmac, timingSafeEqual } from 'node:crypto'
import type { VercelRequest } from '@vercel/node'

const defaults = ['Masha@1000', 'Masha@123']

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'maama-salma-admin'
}

function signature(expiry: number) {
  return createHmac('sha256', secret())
    .update(`maama-admin:${expiry}`)
    .digest('base64url')
}

export function acceptedPasswords() {
  return process.env.ADMIN_PASSWORD
    ? [process.env.ADMIN_PASSWORD]
    : defaults
}

export function createToken() {
  const expiry = Date.now() + 7 * 86400000
  return `${signature(expiry)}.${expiry}`
}

export function verifyToken(req: VercelRequest) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : ''
  const [provided, expiryText] = token.split('.')
  const expiry = Number(expiryText)
  if (!provided || !Number.isFinite(expiry) || expiry < Date.now()) return false
  const expected = signature(expiry)
  const left = Buffer.from(provided)
  const right = Buffer.from(expected)
  return left.length === right.length && timingSafeEqual(left, right)
}
