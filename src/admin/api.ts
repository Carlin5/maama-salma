import { aggregateStats, type MessageRecord, type Stats } from '../lib/aggregate'

const token = () => localStorage.getItem('maama_admin_token') || ''

async function request<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) throw new Error(`Request failed: ${response.status}`)
  return (await response.json()) as T
}

function localData() {
  const visits = JSON.parse(localStorage.getItem('maama_local_visits') || '[]')
  const clicks = JSON.parse(localStorage.getItem('maama_local_events') || '[]')
  const messages = JSON.parse(localStorage.getItem('maama_local_messages') || '[]')
  return { visits, clicks, messages }
}

export async function fetchStats(): Promise<{ data: Stats; fallback: boolean }> {
  try {
    return { data: await request<Stats>('/api/admin/stats'), fallback: false }
  } catch {
    const { visits, clicks, messages } = localData()
    return { data: aggregateStats(visits, clicks, messages), fallback: true }
  }
}

export async function fetchMessages(): Promise<{ messages: MessageRecord[]; fallback: boolean }> {
  try {
    return { ...(await request<{ messages: MessageRecord[] }>('/api/admin/messages')), fallback: false }
  } catch {
    return { messages: localData().messages, fallback: true }
  }
}

export async function replyMessage(id: string, text: string) {
  try {
    return await request<MessageRecord>('/api/admin/messages', {
      method: 'POST',
      body: JSON.stringify({ id, text }),
    })
  } catch {
    const message = localData().messages.find((item: MessageRecord) => item.id === id)
    if (!message) throw new Error('Message not found')
    message.replies.push({ ts: Date.now(), text })
    message.status = 'replied'
    saveLocalMessages(localData().messages)
    return message
  }
}

export async function setStatus(id: string, status: MessageRecord['status']) {
  try {
    return await request<MessageRecord>('/api/admin/messages', {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
    })
  } catch {
    const message = localData().messages.find((item: MessageRecord) => item.id === id)
    if (!message) throw new Error('Message not found')
    message.status = status
    saveLocalMessages(localData().messages)
    return message
  }
}

function saveLocalMessages(messages: MessageRecord[]) {
  localStorage.setItem('maama_local_messages', JSON.stringify(messages))
}
