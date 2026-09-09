import type { Stats } from '../lib/aggregate'

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
}

export default function Visitors({ stats, refresh }: { stats: Stats; refresh: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Recent visitors</h2>
        <button
          onClick={refresh}
          className="rounded-full border border-gold-500/30 px-4 py-2 text-xs uppercase tracking-widest text-gold-300 hover:bg-gold-500/10"
        >
          Refresh
        </button>
      </div>
      <div className="overflow-x-auto glass-strong rounded-3xl">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-gold-500/15 text-xs uppercase tracking-widest text-gold-400/70">
            <tr>
              <th className="p-4">Time</th>
              <th className="p-4">Page</th>
              <th className="p-4">Place</th>
              <th className="p-4">Device</th>
              <th className="p-4">Referrer</th>
              <th className="p-4">Session</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentVisitors.map((visitor, index) => (
              <tr
                key={`${visitor.ts}-${index}`}
                className="border-b border-gold-500/10 text-ember-100/75"
              >
                <td className="p-4 whitespace-nowrap">{formatTime(visitor.ts)}</td>
                <td className="p-4">{visitor.path}</td>
                <td className="p-4">
                  {visitor.city || '—'}
                  {visitor.country ? `, ${visitor.country}` : ''}
                </td>
                <td className="p-4 capitalize">{visitor.device || 'desktop'}</td>
                <td className="max-w-[150px] truncate p-4">{visitor.referrer || 'Direct'}</td>
                <td className="p-4">{visitor.sessionId.slice(0, 8)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!stats.recentVisitors.length && (
          <p className="p-6 text-sm text-ember-100/50">
            Visit the public site to begin collecting data.
          </p>
        )}
      </div>
      <div className="glass-strong rounded-3xl p-6">
        <h2 className="font-display text-xl">Recent WhatsApp clicks</h2>
        {stats.recentClicks.map((click, index) => (
          <div
            key={`${click.ts}-${index}`}
            className="mt-4 flex flex-wrap justify-between gap-3 text-sm text-ember-100/75"
          >
            <span>
              {click.label || 'WhatsApp'} · {click.path}
            </span>
            <span className="text-ember-100/50">{formatTime(click.ts)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
