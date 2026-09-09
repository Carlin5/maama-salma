import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import Sigil from '../components/Sigil'
import DisclaimerNotice from '../components/DisclaimerNotice'
import { SITE } from '../lib/constants'
import { submitMessage } from '../lib/messages'
import { trackWhatsAppClick } from '../lib/analytics'

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [story, setStory] = useState('')
  const [ritual, setRitual] = useState('Reconciliation Spell')
  const [submitted, setSubmitted] = useState(false)
  const [submissionError, setSubmissionError] = useState(false)
  const lastSubmission = useRef('')

  async function submit() {
    const content = JSON.stringify({ name, phone, ritual, story })
    if (!name.trim() || !story.trim() || lastSubmission.current === content) return
    lastSubmission.current = content
    const result = await submitMessage({ name, phone, ritual, story })
    if (!result.delivered) lastSubmission.current = ''
  }

  async function submitAndClear() {
    const content = JSON.stringify({ name, phone, ritual, story })
    if (!name.trim() || !story.trim() || lastSubmission.current === content) return
    lastSubmission.current = content
    setSubmitted(false)
    setSubmissionError(false)
    const result = await submitMessage({ name, phone, ritual, story })
    if (!result.delivered) {
      lastSubmission.current = ''
      setSubmissionError(true)
      return
    }
    setSubmitted(true)
    setName('')
    setPhone('')
    setStory('')
  }

  function buildWhatsApp() {
    const text = `Hello Maama Salma 🌹

My name is ${name || '...'}
I am interested in: ${ritual}

${story || 'Please advise me on a ritual that would help.'}`
    return `https://wa.me/27604034585?text=${encodeURIComponent(text)}`
  }

  return (
    <div>
      <section className="pt-32 pb-12">
        <div className="container-x text-center">
          <div className="mb-6 mx-auto inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-midnight-950/40 px-4 py-1 backdrop-blur">
            <Sigil size={20} />
            <span className="font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
              Reach Maama Salma
            </span>
            <Sigil size={20} />
          </div>
          <h1 className="font-display text-4xl md:text-7xl">
            <span className="shimmer-text">Begin your ritual</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg md:text-2xl text-ember-100/80">
            Maama prefers WhatsApp — it lets her hear your voice and read your energy through your
            own words.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid gap-10 md:grid-cols-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 md:col-span-7"
          >
            <h3 className="font-display text-2xl text-ember-100">Prepare your message</h3>
            <p className="mt-2 font-serif text-base text-ember-100/75">
              Fill in the details below — your story will be prefilled into a WhatsApp message to
              Maama. You can edit it before sending.
            </p>
            <div className="mt-6 grid gap-4">
              <label className="block">
                <span className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">
                  Your Name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Beloved soul"
                  className="mt-2 w-full rounded-2xl border border-gold-500/30 bg-midnight-950/60 px-4 py-3 font-serif text-base text-ember-100 placeholder-ember-100/40 outline-none focus:border-gold-400"
                />
              </label>

              <label className="block">
                <span className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">
                  Your WhatsApp / Phone number
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 60 403 4585"
                  className="mt-2 w-full rounded-2xl border border-gold-500/30 bg-midnight-950/60 px-4 py-3 font-serif text-base text-ember-100 placeholder-ember-100/40 outline-none focus:border-gold-400"
                />
              </label>

              <label className="block">
                <span className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">
                  Ritual You Are Drawn To
                </span>
                <select
                  value={ritual}
                  onChange={(e) => setRitual(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-gold-500/30 bg-midnight-950/60 px-4 py-3 font-serif text-base text-ember-100 outline-none focus:border-gold-400"
                >
                  {[
                    'Reconciliation Spell',
                    'Bring Back Lost Lover',
                    'Make Someone Fall In Love',
                    'Wiccan Love Spell',
                    'Love Potion Ritual',
                    'Binding & Marriage Spell',
                    'Gay & Lesbian Love Ritual',
                    'Marriage / Commitment Spell',
                    'Psychic Reading',
                    'Spiritual Cleansing',
                    'Protection Spell',
                    'Curse Removal',
                    'Not sure — please advise',
                  ].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">
                  Your Story (kept private)
                </span>
                <textarea
                  rows={6}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Tell Maama briefly what is happening in your heart…"
                  className="mt-2 w-full rounded-2xl border border-gold-500/30 bg-midnight-950/60 px-4 py-3 font-serif text-base text-ember-100 placeholder-ember-100/40 outline-none focus:border-gold-400"
                />
              </label>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href={buildWhatsApp()}
                  onClick={() => {
                    trackWhatsAppClick('contact form')
                    void submit()
                  }}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ember"
                >
                  Send via WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => {
                    void submitAndClear()
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-5 py-3 font-display text-xs uppercase tracking-[0.18em] text-ember-200 transition hover:bg-gold-500/10"
                >
                  Send to Maama&apos;s inbox
                </button>
                <span className="font-serif text-sm text-ember-100/60">
                  Replies usually within minutes.
                </span>
              </div>
              {submitted && (
                <p className="font-serif text-base text-emerald-300">
                  Message received — Maama will reply on WhatsApp.
                </p>
              )}
              {submissionError && (
                <p className="font-serif text-base text-amber-300">
                  Could not reach Maama&apos;s inbox — please use Send via WhatsApp instead.
                </p>
              )}

              <p className="mt-6 font-serif text-xs leading-relaxed text-ember-100/55">
                By contacting Maama Salma you agree to the spiritual practice terms in the{' '}
                <Link
                  to="/disclaimer"
                  className="underline decoration-gold-500/40 underline-offset-4 hover:text-ember-200"
                >
                  disclaimer
                </Link>
                . Results may vary and payments are non-refundable once work has started.
              </p>
            </div>
          </motion.div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5"
          >
            <div className="glass-strong rounded-3xl p-8">
              <h3 className="font-display text-2xl">Other ways to reach Maama</h3>
              <ul className="mt-6 space-y-5">
                <li>
                  <div className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">
                    WhatsApp
                  </div>
                  <a
                    href={SITE.whatsappLink}
                    onClick={() => trackWhatsAppClick('contact details')}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-2 font-serif text-xl text-ember-100 hover:text-ember-200"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M19.05 4.91A10 10 0 0 0 4.96 18.5L4 22l3.62-.95A10 10 0 1 0 19.05 4.91Z" />
                      </svg>
                    </span>
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <div className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">
                    Direct Call
                  </div>
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="mt-1 inline-block font-serif text-xl text-ember-100 hover:text-ember-200"
                  >
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <div className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">
                    Consultation Hours
                  </div>
                  <p className="mt-1 font-serif text-base text-ember-100/80">
                    Open 7 days a week · Quick replies between 08:00 – 22:00 SAST. Emergencies any
                    hour.
                  </p>
                </li>
                <li>
                  <div className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">
                    Languages
                  </div>
                  <p className="mt-1 font-serif text-base text-ember-100/80">
                    English · Swahili · isiZulu · French
                  </p>
                </li>
                <li>
                  <div className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">
                    Privacy
                  </div>
                  <p className="mt-1 font-serif text-base text-ember-100/80">
                    Every message is treated with absolute discretion. Maama never shares names,
                    photos or stories with anyone.
                  </p>
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-3xl glass p-6">
              <SectionHeading
                align="left"
                eyebrow="✦ First time? ✦"
                title={
                  <>
                    Your first <span className="shimmer-text">5 minutes</span> are on Maama
                  </>
                }
                subtitle="A short free reading helps you decide which ritual is right for your story. No payment is requested before this conversation."
              />
            </div>
          </motion.div>
        </div>
      </section>

      <DisclaimerNotice />
    </div>
  )
}
