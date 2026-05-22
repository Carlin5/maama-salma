import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sigil from './Sigil'
import { SITE } from '../lib/constants'

export default function DisclaimerNotice() {
  return (
    <section className="section pt-4">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl rounded-3xl border border-gold-500/15 bg-midnight-950/40 p-7 md:p-10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 text-gold-400">
            <Sigil size={18} />
            <span className="font-display text-[11px] uppercase tracking-[0.35em]">
              Disclaimer
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
          </div>
          <p className="mt-4 font-serif text-base leading-relaxed text-ember-100/80">
            All services provided by{' '}
            <span className="text-gold-400">{SITE.name}</span> are based on
            traditional spiritual practices and beliefs. Results may vary from
            person to person depending on individual situations and spiritual
            alignment. These services are not intended to replace professional
            advice such as medical, legal, or financial guidance. By contacting{' '}
            {SITE.name}, you agree to receive spiritual services at your own
            discretion. All consultations are confidential and handled with
            respect. Payments are non-refundable once work has started.
          </p>
          <div className="mt-5">
            <Link
              to="/disclaimer"
              className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.25em] text-ember-200 hover:text-gold-300"
            >
              Read the full disclaimer →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
