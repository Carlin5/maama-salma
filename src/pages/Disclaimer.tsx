import { Link } from 'react-router-dom'
import Sigil from '../components/Sigil'
import { SITE } from '../lib/constants'
import { trackWhatsAppClick } from '../lib/analytics'

const SECTIONS: { title: string; body: string }[] = [
  {
    title: 'Spiritual Practice, Not Professional Advice',
    body: `All services provided by ${SITE.name} are based on traditional spiritual practices and beliefs. They are not intended to replace professional advice — including medical, legal or financial guidance. Always consult a qualified professional for matters that require it.`,
  },
  {
    title: 'Results May Vary',
    body: `Results may vary from person to person, depending on individual situations, the openness of the heart involved, and overall spiritual alignment. Maama Salma offers her work in good faith and with deep care, but she cannot guarantee specific outcomes.`,
  },
  {
    title: 'Your Discretion',
    body: `By contacting Maama Salma — whether on WhatsApp, by phone, or through this website — you agree to receive spiritual services at your own discretion and of your own free will. You must be at least 18 years of age.`,
  },
  {
    title: 'Confidentiality',
    body: `Every consultation is treated with absolute discretion. Names, photos, prayers and stories shared with Maama are protected by ancestral honour and are never sold, shared or published.`,
  },
  {
    title: 'Payments',
    body: `Any offerings or payments made in support of a ritual are non-refundable once the work has started. If you have questions about a specific ritual or payment, please reach out before the ritual begins.`,
  },
]

export default function Disclaimer() {
  return (
    <div>
      {/* HERO */}
      <section className="pt-32 pb-10">
        <div className="container-x text-center">
          <div className="mb-6 mx-auto inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-midnight-950/40 px-4 py-1 backdrop-blur">
            <Sigil size={20} />
            <span className="font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
              Sacred Terms · Read with Care
            </span>
            <Sigil size={20} />
          </div>
          <h1 className="font-display text-4xl md:text-7xl">
            <span className="shimmer-text">Disclaimer</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl font-serif text-lg leading-relaxed text-ember-100/80">
            Maama Salma walks beside you in spirit — but the path you take is
            always yours. Please read these gentle terms before reaching out.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="section pt-4">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border border-gold-500/15 bg-midnight-950/40 p-8 md:p-12 backdrop-blur-xl shadow-glow">
              <p className="font-serif text-lg leading-relaxed text-ember-100/85">
                All services provided by <span className="text-gold-400">{SITE.name}</span>{' '}
                are based on traditional spiritual practices and beliefs. Results
                may vary from person to person depending on individual situations
                and spiritual alignment. These services are not intended to
                replace professional advice such as medical, legal, or financial
                guidance. By contacting {SITE.name}, you agree to receive
                spiritual services at your own discretion. All consultations are
                confidential and handled with respect. Payments are non-refundable
                once work has started.
              </p>

              <div className="my-10 flex items-center gap-4">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
                <Sigil size={20} />
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
              </div>

              <ul className="space-y-8">
                {SECTIONS.map((s) => (
                  <li key={s.title} className="font-serif">
                    <h3 className="font-display text-xl text-gold-grad">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-ember-100/80">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-12 flex flex-wrap items-center gap-3">
                <a
                  href={SITE.whatsappLink}
                  onClick={() => trackWhatsAppClick('disclaimer CTA')}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ember"
                >
                  I understand · Speak to Maama
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-5 py-3 font-display text-[11px] uppercase tracking-[0.25em] text-ember-200 hover:bg-gold-500/10"
                >
                  Other ways to contact
                </Link>
              </div>

              <p className="mt-8 text-xs uppercase tracking-[0.25em] text-ember-100/40">
                Last updated {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="section pt-4">
        <div className="container-x text-center">
          <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-midnight-950/40 px-4 py-1 backdrop-blur">
            <Sigil size={18} />
            <span className="font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
              With love
            </span>
            <Sigil size={18} />
          </div>
          <h2 className="mt-4 font-display text-2xl md:text-4xl text-ember-100/90">
            The work is sacred — <span className="text-gold-grad">and so are you</span>
          </h2>
        </div>
      </section>
    </div>
  )
}
