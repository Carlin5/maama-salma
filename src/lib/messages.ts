export type LocalMessage = {
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

function saveLocal(message: LocalMessage) {
  try {
    const messages = JSON.parse(
      localStorage.getItem('maama_local_messages') || '[]',
    ) as LocalMessage[]
    localStorage.setItem(
      'maama_local_messages',
      JSON.stringify([message, ...messages].slice(0, 500)),
    )
  } catch {
    // Ignore storage failures and keep the form flow responsive.
  }
}

export async function submitMessage(input: {
  name: string
  phone: string
  ritual: string
  story: string
}) {
  const message: LocalMessage = {
    ...input,
    id: `local-${Date.now()}`,
    ts: Date.now(),
    status: 'new',
    replies: [],
  }
  try {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    const result = (await response.json()) as { id?: string }
    if (!response.ok || !result.id) throw new Error('Unable to submit')
    return { id: result.id, delivered: true }
  } catch {
    saveLocal(message)
    return { id: message.id, delivered: false }
  }
}
