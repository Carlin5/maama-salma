type StoreMap = Map<string, unknown>

declare global {
  // Local/preview fallback only. Each serverless instance has its own memory.
  var __maamaStore: StoreMap | undefined
}

const memory = () => {
  globalThis.__maamaStore ||= new Map<string, unknown>()
  return globalThis.__maamaStore
}

const remote = () =>
  Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

async function command<T>(args: unknown[]): Promise<T> {
  const response = await fetch(process.env.KV_REST_API_URL!, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  if (!response.ok) throw new Error(`KV request failed: ${response.status}`)
  const data = (await response.json()) as { result: T }
  return data.result
}

export async function getJSON<T>(key: string): Promise<T | null> {
  if (remote()) {
    const value = await command<string | null>(['GET', key])
    return value ? (JSON.parse(value) as T) : null
  }
  return (memory().get(key) as T | undefined) ?? null
}

export async function setJSON<T>(key: string, value: T): Promise<void> {
  if (remote()) {
    await command(['SET', key, JSON.stringify(value)])
    return
  }
  memory().set(key, value)
}

export async function listPush<T>(key: string, value: T): Promise<void> {
  if (remote()) {
    await command(['LPUSH', key, JSON.stringify(value)])
    await command(['LTRIM', key, '0', key === 'visits' || key === 'events' ? '4999' : '4999'])
    return
  }
  const values = (memory().get(key) as T[] | undefined) || []
  memory().set(key, [value, ...values].slice(0, 5000))
}

export async function listRange<T>(key: string, start: number, stop: number): Promise<T[]> {
  if (remote()) {
    const values = await command<string[]>(['LRANGE', key, start, stop])
    return values.map((value) => JSON.parse(value) as T)
  }
  return ((memory().get(key) as T[] | undefined) || []).slice(start, stop + 1)
}

export async function listLen(key: string): Promise<number> {
  if (remote()) return command<number>(['LLEN', key])
  return ((memory().get(key) as unknown[] | undefined) || []).length
}
