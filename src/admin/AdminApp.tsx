import { useState } from 'react'
import type { FormEvent } from 'react'
import AdminDashboard from './AdminDashboard'

const fallbackPasswords = ['Masha@1000', 'Masha@123']

function AdminLogin({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!response.ok) throw new Error(response.status === 401 ? 'Incorrect password' : 'offline')
      const result = (await response.json()) as { token: string }
      onLogin(result.token)
    } catch (requestError) {
      if (requestError instanceof Error && requestError.message === 'Incorrect password') {
        setError('Incorrect password')
      } else if (fallbackPasswords.includes(password)) {
        onLogin('local')
      } else {
        setError('Incorrect password')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 py-12">
      <div className="glass-strong w-full max-w-md rounded-3xl p-8 shadow-2xl">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-gold-400">Private entrance</p>
        <h1 className="mt-4 font-display text-3xl"><span className="shimmer-text">Maama Salma Admin</span></h1>
        <p className="mt-3 font-serif text-lg text-ember-100/70">A quiet room for your visitors, messages and campaigns.</p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block">
            <span className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">Username</span>
            <input value="admin" readOnly className="mt-2 w-full rounded-2xl border border-gold-500/25 bg-midnight-950/60 px-4 py-3 text-ember-100/70 outline-none" />
          </label>
          <label className="block">
            <span className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">Password</span>
            <input autoFocus type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-2xl border border-gold-500/25 bg-midnight-950/60 px-4 py-3 text-ember-100 outline-none focus:border-gold-400" />
          </label>
          {error && <p className="text-sm text-rose-300">{error}</p>}
          <button disabled={loading} className="btn-ember w-full justify-center disabled:opacity-60">{loading ? 'Entering…' : 'Enter dashboard'}</button>
        </form>
      </div>
    </main>
  )
}

export default function AdminApp() {
  const [token, setToken] = useState(() => localStorage.getItem('maama_admin_token'))
  if (!token) {
    return <AdminLogin onLogin={(nextToken) => {
      localStorage.setItem('maama_admin_token', nextToken)
      setToken(nextToken)
    }} />
  }
  return <AdminDashboard onLogout={() => {
    localStorage.removeItem('maama_admin_token')
    setToken(null)
  }} />
}
