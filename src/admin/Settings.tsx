export default function Settings({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="max-w-2xl space-y-6">
      <h2 className="font-display text-3xl">Settings</h2>
      <div className="glass-strong rounded-3xl p-6">
        <h3 className="font-display text-xl">Change the password</h3>
        <p className="mt-3 font-serif text-lg text-ember-100/70">
          Set <code className="text-gold-300">ADMIN_PASSWORD</code> in your Vercel project
          environment variables, then redeploy. If it is not set, the defaults are Masha@1000 and
          Masha@123.
        </p>
      </div>
      <div className="glass-strong rounded-3xl p-6">
        <h3 className="font-display text-xl">Enable live analytics</h3>
        <p className="mt-3 font-serif text-lg text-ember-100/70">
          Add <code className="text-gold-300">KV_REST_API_URL</code> and{' '}
          <code className="text-gold-300">KV_REST_API_TOKEN</code> from Vercel KV or Upstash.
          Without them, this browser keeps a local preview mirror.
        </p>
      </div>
      <button
        onClick={onLogout}
        className="rounded-full border border-rose-400/40 px-5 py-3 text-sm text-rose-200 hover:bg-rose-400/10"
      >
        Log out
      </button>
    </div>
  )
}
