import type { Stats } from '../lib/aggregate'

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-400/80">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl text-ember-100">{value.toLocaleString()}</p>
    </div>
  )
}

function Ranked({ title, items }: { title: string; items: [string, number][] }) {
  return (
    <div className="glass-strong rounded-3xl p-6">
      <h2 className="font-display text-xl">{title}</h2>
      {items.length ? (
        items.map(([name, count]) => (
          <div
            key={name}
            className="mt-4 flex items-center justify-between gap-4 text-sm text-ember-100/75"
          >
            <span className="truncate">{name}</span>
            <span className="text-gold-300">{count}</span>
          </div>
        ))
      ) : (
        <p className="mt-4 text-sm text-ember-100/50">No data yet.</p>
      )}
    </div>
  )
}

export default function Overview({ stats }: { stats: Stats }) {
  const max = Math.max(1, ...stats.daily.map((day) => day.visits + day.clicks))

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Visits today" value={stats.totals.visitsToday} />
        <StatCard label="Visits · 7 days" value={stats.totals.visits7d} />
        <StatCard label="Visits · 30 days" value={stats.totals.visits30d} />
        <StatCard label="Visits all time" value={stats.totals.visitsAll} />
        <StatCard label="Unique visitors · 7d" value={stats.totals.uniqueVisitors7d} />
        <StatCard label="WhatsApp clicks · 7d" value={stats.totals.whatsappClicks7d} />
        <StatCard label="New messages" value={stats.totals.messagesNew} />
      </div>
      <section className="glass-strong rounded-3xl p-6">
        <h2 className="font-display text-xl">Last 14 days</h2>
        <div className="mt-6 flex h-44 items-end gap-2">
          {stats.daily.map((day) => (
            <div key={day.date} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div className="flex h-32 w-full items-end gap-1">
                <div
                  title={`${day.visits} visits`}
                  className="w-1/2 rounded-t bg-gradient-to-t from-violet-ritual to-gold-400"
                  style={{ height: `${Math.max(4, (day.visits / max) * 100)}%` }}
                />
                <div
                  title={`${day.clicks} clicks`}
                  className="w-1/2 rounded-t bg-gradient-to-t from-crimson-500 to-ember-300"
                  style={{ height: `${Math.max(4, (day.clicks / max) * 100)}%` }}
                />
              </div>
              <span className="truncate text-[10px] text-ember-100/50">{day.date.slice(5)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4 text-xs text-ember-100/60">
          <span>● Visits</span>
          <span className="text-ember-300">● WhatsApp clicks</span>
        </div>
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Ranked title="Top pages" items={stats.topPages.map((item) => [item.path, item.count])} />
        <Ranked
          title="Top countries"
          items={stats.topCountries.map((item) => [item.country, item.count])}
        />
        <Ranked
          title="Referrers"
          items={stats.referrers.map((item) => [item.referrer, item.count])}
        />
        <div className="glass-strong rounded-3xl p-6">
          <h2 className="font-display text-xl">Devices</h2>
          {Object.entries(stats.devices).map(([name, count]) => (
            <div
              key={name}
              className="mt-4 flex items-center justify-between text-sm capitalize text-ember-100/75"
            >
              <span>{name}</span>
              <span className="text-gold-300">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
