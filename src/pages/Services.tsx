import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import Sigil from '../components/Sigil'
import TiltCard from '../components/TiltCard'
import { SITE } from '../lib/constants'
import { trackWhatsAppClick } from '../lib/analytics'
import psychic from '../assets/photos/psychic-reading.jpg'
import spellBook from '../assets/photos/spell-book.jpg'
import spellBook2 from '../assets/photos/spell-book-2.jpg'
import ritualBowls from '../assets/photos/ritual-bowls.jpg'
import candleSmoke from '../assets/photos/candle-smoke.jpg'
import lovePortion from '../assets/photos/love-portion.jpg'

const services = [
  {
    title: 'Psychic Reading',
    image: psychic,
    desc: 'Get clear insight into your future with accurate psychic readings. Discover hidden truths about love, career and life so you can make informed decisions.',
    tag: 'Insight',
  },
  {
    title: 'Spiritual Cleansing',
    image: ritualBowls,
    desc: 'Clear away negative energy, generational curses and blockages that may be hindering your love life or peace of mind. A reset for your soul.',
    tag: 'Cleansing',
  },
  {
    title: 'Protection Spells',
    image: spellBook,
    desc: 'Shield your relationship and your home from jealousy, misunderstandings and outside influences. A spiritual armour that lasts.',
    tag: 'Protection',
  },
  {
    title: 'Good Luck Spells',
    image: lovePortion,
    desc: 'Attract luck and positivity in love, creating new opportunities for romantic connection — and overall good fortune in life.',
    tag: 'Fortune',
  },
  {
    title: 'Curse Removal',
    image: spellBook2,
    desc: 'Lift dark magic, ancestral curses and the heavy weight of envy from your aura — restoring clarity, sleep and joy.',
    tag: 'Liberation',
  },
  {
    title: 'Ritual Candle Burnings',
    image: candleSmoke,
    desc: 'Custom candle rituals burned in Maama’s sacred space — a flame held for every prayer, every intention, every name.',
    tag: 'Ritual',
  },
]

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="container-x text-center">
          <div className="mb-6 mx-auto inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-midnight-950/40 px-4 py-1 backdrop-blur">
            <Sigil size={20} />
            <span className="font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
              Additional Services
            </span>
            <Sigil size={20} />
          </div>
          <h1 className="font-display text-4xl md:text-7xl">
            <span className="shimmer-text">Services</span> to strengthen love
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg md:text-2xl text-ember-100/80">
            Beyond love spells, Maama Salma offers complementary rituals that
            support and enhance the magic.
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <TiltCard className="group h-full glass-strong">
                  <div className="relative aspect-[4/5]">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/50 to-transparent" />
                    <div className="absolute left-0 right-0 bottom-0 p-6">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-midnight-950/60 px-3 py-1 font-display text-[10px] uppercase tracking-[0.25em] text-gold-400">
                        ✦ {s.tag}
                      </div>
                      <h3 className="font-display text-2xl text-ember-100">{s.title}</h3>
                      <p className="mt-2 font-serif text-base text-ember-100/75">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="✦ Maama's Promise ✦"
            title={
              <>
                Sacred. Discreet.{' '}
                <span className="shimmer-text">Always rooted in love.</span>
              </>
            }
            subtitle="Every ritual is performed by Maama Salma herself — with the care and reverence your story deserves."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                t: '100% Confidential',
                d: 'Your story stays with Maama. Always. Names, places, prayers — protected by ancestral honour.',
              },
              {
                t: 'Ethical Magic',
                d: 'No coercion, no manipulation. Maama only works with the natural pull between souls that are meant to connect.',
              },
              {
                t: '25+ Years Practice',
                d: 'Thousands of hearts healed across Africa, Europe and the diaspora — testimonies you can read for yourself.',
              },
            ].map((p, i) => (
              <motion.div
                key={p.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass-strong rounded-3xl p-6"
              >
                <div className="font-display text-xl text-ember-200">{p.t}</div>
                <p className="mt-2 font-serif text-base text-ember-100/80">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.5rem] glass-strong p-10 md:p-16 text-center">
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 animate-spin-reverse opacity-25">
              <Sigil size={288} />
            </div>
            <h3 className="font-display text-3xl md:text-5xl">
              Not sure which ritual you need?
            </h3>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-lg text-ember-100/80">
              Maama offers a free 5-minute reading on WhatsApp to point you toward
              the path that will serve your heart best.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={SITE.whatsappLink}
                onClick={() => trackWhatsAppClick('services CTA')}
                target="_blank"
                rel="noreferrer"
                className="btn-ember"
              >
                Free Reading on WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-ember-200 hover:bg-gold-500/10"
              >
                Other ways to reach Maama
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
