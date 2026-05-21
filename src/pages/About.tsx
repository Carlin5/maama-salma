import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import Sigil from '../components/Sigil'
import TiltCard from '../components/TiltCard'
import ParallaxImage from '../components/ParallaxImage'
import { SITE } from '../lib/constants'
import spellBook2 from '../assets/photos/spell-book-2.jpg'
import candleSmoke from '../assets/photos/candle-smoke.jpg'
import ritualBowls from '../assets/photos/ritual-bowls.jpg'

export default function About() {
  return (
    <div>
      <section className="pt-32 pb-12">
        <div className="container-x text-center">
          <div className="mb-6 mx-auto inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-midnight-950/40 px-4 py-1 backdrop-blur">
            <Sigil size={20} />
            <span className="font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
              About Maama Salma
            </span>
            <Sigil size={20} />
          </div>
          <h1 className="font-display text-4xl md:text-7xl">
            <span className="shimmer-text">A life devoted to love</span>
          </h1>
        </div>
      </section>

      {/* MAIN */}
      <section className="section pt-0">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <TiltCard className="aspect-[4/5]">
              <img
                src={spellBook2}
                alt="Maama Salma's sacred spell book"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/30 to-transparent" />
              <div className="absolute -left-4 -top-4 h-24 w-24 animate-spin-slow opacity-60">
                <Sigil size={96} />
              </div>
              <div className="absolute left-6 bottom-6 right-6">
                <div className="font-display text-[10px] uppercase tracking-[0.25em] text-gold-400">
                  Tried · Trusted · Sacred
                </div>
                <h4 className="mt-1 font-display text-2xl">
                  {SITE.experienceYears}+ Years of Practice
                </h4>
              </div>
            </TiltCard>
          </div>
          <div className="md:col-span-6">
            <div className="font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
              ✦ Tried And Trusted Experience ✦
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">
              The story behind <span className="text-gold-grad">the candles</span>
            </h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-ember-100/80">
              Maama Salma was raised at the feet of her grandmother — a respected
              healer in their village. From the age of seven, she learned the
              language of candles, the names of sacred herbs, and the prayers
              that travel further than words.
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-ember-100/80">
              For over two and a half decades she has carried that lineage
              forward, helping more than 15,000 hearts across Africa, Europe, the
              Americas and beyond reunite, heal, and bind in sacred love. Her
              powerful binding spells strengthen the connection between two
              people, fostering a deep and lasting bond — especially for couples
              who have drifted apart, or who wish to solidify their relationship.
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-ember-100/80">
              By drawing on traditional practices and positive energies, Maama’s
              rituals are carefully crafted to support the growth and harmony of
              your relationship — helping you and your partner stay closely
              connected.
            </p>

            <ul className="mt-6 grid gap-3 font-serif text-base text-ember-100/85 sm:grid-cols-2">
              {[
                'Bring back ex lovers',
                'Solve divorce or marriage trouble',
                'Strengthen marriages, partnerships',
                'Protect from jealousy and envy',
                'Cleanse generational curses',
                'Guide same-sex couples in safety',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-ember-300 to-crimson-500 shadow-glow" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="btn-ember"
              >
                Speak to Maama
              </a>
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-ember-200 hover:bg-gold-500/10"
              >
                Read client stories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            { n: SITE.experienceYears + '+', l: 'Years of Practice' },
            { n: SITE.clientsHelped, l: 'Hearts Healed' },
            { n: '24h', l: 'Average Response Time' },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-strong relative overflow-hidden rounded-3xl p-8 text-center"
            >
              <div className="font-display text-6xl text-gold-grad">{s.n}</div>
              <div className="mt-2 font-display text-[11px] uppercase tracking-[0.3em] text-ember-100/70">
                {s.l}
              </div>
              <div className="pointer-events-none absolute -right-6 -bottom-6 opacity-30">
                <Sigil size={80} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PARALLAX MOOD */}
      <section className="section">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <ParallaxImage src={candleSmoke} alt="Sacred candle and smoke" className="aspect-[4/5]" />
          <ParallaxImage src={ritualBowls} alt="Ritual bowls and sigils" className="aspect-[4/5]" />
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="✦ Maama's Philosophy ✦"
            title={
              <>
                Magic that <span className="shimmer-text">honours the heart</span>
              </>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                t: 'Consent',
                d: 'Maama’s rituals magnify what is already real. They invite — they never force.',
              },
              {
                t: 'Tradition',
                d: 'Every flame carries the prayers of grandmothers. The lineage is sacred and unbroken.',
              },
              {
                t: 'Discretion',
                d: 'Your story is held with the same care a midwife gives to a newborn — silent, watchful, devoted.',
              },
            ].map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass rounded-3xl p-6"
              >
                <div className="font-display text-xl text-ember-200">{p.t}</div>
                <p className="mt-2 font-serif text-base text-ember-100/80">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
