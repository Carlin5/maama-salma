import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import RitualScene3D from '../components/RitualScene3D'
import SectionHeading from '../components/SectionHeading'
import Sigil from '../components/Sigil'
import TiltCard from '../components/TiltCard'
import ParallaxImage from '../components/ParallaxImage'
import HeartBurst from '../components/HeartBurst'
import { SITE } from '../lib/constants'
import candleSmoke from '../assets/photos/candle-smoke.jpg'
import lovePortion from '../assets/photos/love-portion.jpg'
import coupleHearts from '../assets/photos/couple-hearts.jpg'
import spellBook from '../assets/photos/spell-book.jpg'
import sunset from '../assets/photos/sunset-beach.jpg'
import wedding from '../assets/photos/wedding-field.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export default function Home() {
  return (
    <div>
      <HeartBurst />

      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <RitualScene3D />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight-950/40 via-midnight-950/10 to-midnight-950" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(36% 26% at 50% 50%, rgba(7,3,24,0.6) 0%, rgba(7,3,24,0.25) 50%, transparent 80%)',
          }}
        />
        <div className="container-x relative z-10 flex h-full flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-midnight-950/40 px-4 py-1 backdrop-blur"
          >
            <Sigil size={20} />
            <span className="font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
              {SITE.experienceYears}+ Years · {SITE.clientsHelped} Hearts Healed
            </span>
            <Sigil size={20} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-display text-5xl leading-[1.05] md:text-7xl lg:text-8xl"
          >
            <span className="shimmer-text">Maama Salma</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="mt-6 max-w-2xl font-serif text-xl md:text-3xl text-ember-100/85"
          >
            Sacred love spells, lost-love reconciliations & soul-binding rituals —
            crafted with{' '}
            <em className="italic text-rose-glow">ancient African magic</em> and
            handed-down ancestral light.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="btn-ember">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.05 4.91A10 10 0 0 0 4.96 18.5L4 22l3.62-.95A10 10 0 1 0 19.05 4.91Z" />
              </svg>
              Whisper to Maama on WhatsApp
            </a>
            <Link
              to="/love-spells"
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-ember-200 transition hover:border-gold-400 hover:bg-gold-500/10"
            >
              Discover the Love Spells →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-6 left-0 right-0 flex justify-center"
          >
            <div className="flex flex-col items-center text-ember-100/60">
              <span className="font-display text-[10px] tracking-[0.35em]">
                SCROLL TO ENTER THE RITUAL
              </span>
              <span className="mt-2 inline-block h-8 w-px animate-pulse bg-gradient-to-b from-gold-400 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container-x grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="mb-4 font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
              ✦ The Sacred Calling ✦
            </div>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">
              Love is the oldest <span className="text-gold-grad">magic</span>.
              <br /> Maama Salma keeps its fire alive.
            </h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-ember-100/80 md:text-xl">
              For over a quarter of a century, Maama Salma has guided lost lovers
              back to each other, healed broken hearts, and woven sacred bonds
              between soulmates. Her rituals blend traditional African
              spirituality, candle magic, and energy work — performed with care,
              consent, and absolute discretion.
            </p>
            <ul className="mt-8 space-y-3 font-serif text-base text-ember-100/85 md:text-lg">
              {[
                'Bring back a lost lover — often within 24 hours',
                'Reignite passion in fading relationships',
                'Attract a soulmate aligned with your spirit',
                'Cleanse curses, jealousy and dark energy',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-ember-300 to-crimson-500 shadow-glow" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/about" className="btn-ember">
                Meet Maama Salma
              </Link>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-ember-200 hover:bg-gold-500/10"
              >
                Free 5-min Consultation
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <TiltCard className="aspect-[4/5]">
              <img
                src={candleSmoke}
                alt="Candle and sacred smoke ritual"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/90 via-midnight-950/20 to-transparent" />
              <div className="absolute left-6 bottom-6 right-6">
                <div className="font-display text-xs uppercase tracking-[0.25em] text-gold-400">
                  Candle Ritual
                </div>
                <h4 className="mt-1 font-display text-2xl">A flame for every prayer</h4>
              </div>
              <div className="absolute -right-4 -top-4 h-24 w-24 animate-spin-slow opacity-60">
                <Sigil size={96} />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* THREE SACRED OFFERINGS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="✦ Three Sacred Offerings ✦"
            title={
              <>
                Powerful rituals,{' '}
                <span className="shimmer-text">tailored to your story</span>
              </>
            }
            subtitle="Each ritual is hand-crafted to the unique energy you bring. Choose the path that calls to your heart."
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Bring Back Lost Lover',
                desc: 'Reunite with the one your soul still calls. Powerful reconciliation rituals to heal what was broken.',
                image: wedding,
                tag: 'Within 24 hours',
                to: '/love-spells#reconciliation',
              },
              {
                title: 'Love Potion Rituals',
                desc: 'Attract a soulmate, ignite passion, or strengthen the bond you already share — through sacred potions.',
                image: lovePortion,
                tag: 'Soulmate Attraction',
                to: '/love-spells#potions',
              },
              {
                title: 'Binding & Marriage',
                desc: 'Weave two souls into one eternal bond. Protect your union from jealousy, doubt and outside interference.',
                image: coupleHearts,
                tag: 'Lifetime Bond',
                to: '/love-spells#binding',
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <TiltCard className="group h-full glass-strong">
                  <div className="relative aspect-[4/5]">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:scale-105 duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />
                    <div className="absolute left-0 right-0 bottom-0 p-6">
                      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-midnight-950/60 px-3 py-1 font-display text-[10px] uppercase tracking-[0.25em] text-gold-400">
                        ✦ {c.tag}
                      </div>
                      <h3 className="font-display text-2xl text-ember-100">{c.title}</h3>
                      <p className="mt-2 font-serif text-base text-ember-100/75">
                        {c.desc}
                      </p>
                      <Link
                        to={c.to}
                        className="mt-4 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.25em] text-ember-200 hover:text-ember-100"
                      >
                        Read the ritual →
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE RITUAL FEEL — animated infinite scroller */}
      <section className="section overflow-hidden">
        <div className="container-x">
          <SectionHeading
            eyebrow="✦ Step Into the Sacred Space ✦"
            title={
              <>
                A ritual is more than words —{' '}
                <span className="shimmer-text">it is a doorway</span>
              </>
            }
            subtitle="Candles. Sacred smoke. The whisper of ancestral names. Every element is chosen to carry your intention into the unseen."
          />
        </div>
        <div className="relative mt-14 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex gap-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 45,
              ease: 'linear',
            }}
          >
            {[
              candleSmoke,
              lovePortion,
              coupleHearts,
              spellBook,
              sunset,
              wedding,
              candleSmoke,
              lovePortion,
              coupleHearts,
              spellBook,
              sunset,
              wedding,
            ].map((src, i) => (
              <div
                key={i}
                className="relative h-[260px] w-[360px] flex-shrink-0 overflow-hidden rounded-3xl"
              >
                <img
                  src={src}
                  alt="Ritual moment"
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="✦ The Four Sacred Steps ✦"
            title={
              <>
                How your <span className="text-gold-grad">ritual</span> unfolds
              </>
            }
            subtitle="Every consultation follows a respectful, structured path — your story, your spirits, your healing."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              {
                n: '01',
                t: 'Connect',
                d: 'Reach Maama on WhatsApp. Share your story in confidence — no judgement.',
              },
              {
                n: '02',
                t: 'Divine',
                d: 'Maama reads your energy and ancestral signs to choose the right ritual.',
              },
              {
                n: '03',
                t: 'Ritual',
                d: 'Candles, herbs and sacred words carry your intention into the unseen.',
              },
              {
                n: '04',
                t: 'Manifest',
                d: 'Signs appear — calls return, doors open, hearts soften. Often within 24h.',
              },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="glass tilt-card relative rounded-3xl p-6"
              >
                <div className="font-display text-5xl text-gold-grad opacity-80">
                  {s.n}
                </div>
                <div className="mt-2 font-display text-xl text-ember-100">{s.t}</div>
                <p className="mt-2 font-serif text-base text-ember-100/75">{s.d}</p>
                <div className="pointer-events-none absolute -right-3 -bottom-3 opacity-30">
                  <Sigil size={64} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX IMAGE BLOCK */}
      <section className="section">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="✦ Bound by Spirit ✦"
              title={
                <>
                  When two flames burn as{' '}
                  <span className="shimmer-text">one</span>
                </>
              }
              subtitle="Binding rituals weave a single sacred cord between two hearts. Trust grows. Doubt fades. Outside interference no longer reaches you."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/love-spells#binding" className="btn-ember">
                The Binding Ritual
              </Link>
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-ember-200 hover:bg-gold-500/10"
              >
                Stories of Reunion
              </Link>
            </div>
          </div>
          <div className="md:col-span-7">
            <ParallaxImage
              src={coupleHearts}
              alt="Couple with sacred hearts ritual"
              className="aspect-[16/10]"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS TEASER */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="✦ Stories of Reunion ✦"
            title={
              <>
                Real hearts.{' '}
                <span className="text-gold-grad">Real ritual. Real love.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Amara · Cape Town',
                quote:
                  'My fiancé walked away after seven years. Within three days of Maama’s ritual he called me crying. We’re married now.',
              },
              {
                name: 'Jonathan · London',
                quote:
                  'I had given up. Maama’s reconciliation candle ritual brought my partner home — gentle, real, life-changing.',
              },
              {
                name: 'Naledi · Johannesburg',
                quote:
                  'The protection ritual cleared the jealousy in my marriage. We breathe again. Maama is a treasure.',
              },
            ].map((q, i) => (
              <motion.figure
                key={q.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-strong relative rounded-3xl p-6"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="text-gold-400/60"
                >
                  <path
                    d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83V11.17H5.83A1.17 1.17 0 0 1 7 10h.17V6Zm10 0A5.17 5.17 0 0 0 12 11.17V18h6.83V11.17h-3a1.17 1.17 0 0 1 1.17-1.17h.17V6Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote className="mt-3 font-serif text-lg leading-relaxed text-ember-100/90">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-5 font-display text-[11px] uppercase tracking-[0.25em] text-gold-400">
                  — {q.name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-ember-200 hover:bg-gold-500/10"
            >
              Read more stories →
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="section">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[2.5rem] glass-strong p-10 md:p-16 text-center"
          >
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 animate-spin-slow opacity-25">
              <Sigil size={288} />
            </div>
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 animate-spin-reverse opacity-25">
              <Sigil size={288} />
            </div>
            <h3 className="font-display text-3xl md:text-5xl">
              Your heart already knows.{' '}
              <span className="shimmer-text">Now let the ritual speak.</span>
            </h3>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-lg text-ember-100/80">
              Send Maama a private WhatsApp message — your first 5 minutes are
              free. No judgement, only light.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="btn-ember">
                Begin Your Ritual
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 font-display text-xs uppercase tracking-[0.25em] text-ember-200 hover:bg-gold-500/10"
              >
                More ways to reach Maama
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
