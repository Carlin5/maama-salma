import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import Sigil from '../components/Sigil'
import TiltCard from '../components/TiltCard'
import ParallaxImage from '../components/ParallaxImage'
import { SITE } from '../lib/constants'
import reconciliation from '../assets/photos/reconciliation.jpg'
import lovePortion from '../assets/photos/love-portion.jpg'
import lovePortion2 from '../assets/photos/love-portion-2.jpg'
import sunset from '../assets/photos/sunset-beach.jpg'
import wedding from '../assets/photos/wedding-field.jpg'
import binding from '../assets/photos/binding-spells.jpg'
import lesbianLove from '../assets/photos/lesbian-love.jpg'
import ringsCouple from '../assets/photos/rings-couple.jpg'
import loveSpellsList from '../assets/photos/love-spells-list.jpg'

const spells = [
  {
    id: 'reconciliation',
    title: 'Reconciliation Spell',
    eyebrow: 'Heal · Forgive · Return',
    image: reconciliation,
    desc: 'Perfect for healing breakups or resolving deep conflict. Reconciliation rituals restore the love and passion between two partners — whether the separation was recent or long ago. They work fast to heal emotional wounds, clear miscommunication, and let the love flourish again.',
    bullets: [
      'Heals heartbreak and emotional grief',
      'Clears past arguments and resentment',
      'Reopens the channel of communication',
      'Often shows results within 24–72 hours',
    ],
  },
  {
    id: 'lost-lover',
    title: 'Bring Back Lost Lover',
    eyebrow: '24-Hour Ritual',
    image: sunset,
    desc: 'Love is a complex force — and when it fades, it can feel devastating. With the right spell, you can bring back a lost lover, often within 24 hours. Maama Salma calls on ancestral guidance and candle magic to gently return the soul that belongs to yours.',
    bullets: [
      'Reignites the original spark',
      'Pulls them home with respect, not control',
      'Erases third-party interference',
      'Especially powerful when love was true',
    ],
  },
  {
    id: 'fall-in-love',
    title: 'Spells to Make Someone Fall in Love with You',
    eyebrow: 'Amplify Attraction',
    image: ringsCouple,
    desc: 'If you’re drawn to someone and wish for a deeper connection, this spell amplifies the attraction — helping you win their heart naturally and respectfully. These spells don’t manipulate; they magnify the attraction that is already meant to be.',
    bullets: [
      'Magnifies natural chemistry',
      'Aligns your aura with romantic intention',
      'Opens their heart to your true self',
      'Ethical, consent-honouring magic',
    ],
  },
  {
    id: 'wiccan',
    title: 'Wiccan Love Spells',
    eyebrow: 'Ancient Earth Magic',
    image: loveSpellsList,
    desc: 'Rooted in the ancient traditions of Wicca, these spells harness the natural energies of earth, moon and flame to attract love, strengthen relationships and rekindle lost passion. Perfect for those seeking deep, meaningful connections.',
    bullets: [
      'Moon-phase aligned for maximum power',
      'Uses sacred herbs and crystals',
      'Wonderful for soulmate attraction',
      'Beautiful as a long-term love practice',
    ],
  },
  {
    id: 'potions',
    title: 'Love Potion Rituals',
    eyebrow: 'Soulmate · Passion · Bond',
    image: lovePortion,
    desc: 'Potions have long been used in love magic. Maama Salma’s custom-made love potions are crafted to enhance attraction, passion and intimacy in your relationship — adding a magical boost to your romantic journey.',
    bullets: [
      'Reignite lost love',
      'Attract a true soulmate',
      'Deepen physical and emotional intimacy',
      'Strengthen long-term commitment',
    ],
  },
  {
    id: 'binding',
    title: 'Binding & Marriage Spells',
    eyebrow: '25+ Years of Practice',
    image: binding,
    desc: 'Maama Salma’s Binding Spells are designed to strengthen the connection between two people, fostering a deep and lasting bond. Drawing on traditional practices and positive energies, they enhance love, trust, and mutual understanding — keeping you and your partner closely connected.',
    bullets: [
      'Get an ex lover back',
      'Resolve divorce or marriage problems',
      'Protect against jealousy and outside meddling',
      'Build an unbreakable, lifelong bond',
    ],
  },
  {
    id: 'inclusive',
    title: 'Gay & Lesbian Love Rituals',
    eyebrow: 'Love Without Boundaries',
    image: lesbianLove,
    desc: 'Experience love without boundaries. Maama Salma specialises in rituals that honour same-sex relationships — ensuring love, harmony and protection for queer couples in spaces where it isn’t always safe to love openly.',
    bullets: [
      'Affirming, judgement-free ritual space',
      'Brings clarity in coming-out journeys',
      'Protection from family and societal pressure',
      'Beautiful, joy-filled binding ceremonies',
    ],
  },
  {
    id: 'marriage',
    title: 'Marriage & Commitment Spells',
    eyebrow: 'From Dating to Forever',
    image: wedding,
    desc: 'When you know they are the one — but they are not yet ready. This ritual guides the relationship toward commitment, builds the courage for proposals, and prepares both hearts for sacred union.',
    bullets: [
      'Encourages clear next-step conversations',
      'Removes fear of commitment',
      'Aligns both partners’ life visions',
      'Blesses the road to marriage',
    ],
  },
]

export default function LoveSpells() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="container-x text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-midnight-950/40 px-4 py-1 backdrop-blur"
          >
            <Sigil size={20} />
            <span className="font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
              Love Spells · The Heart of Maama's Practice
            </span>
            <Sigil size={20} />
          </motion.div>
          <h1 className="font-display text-4xl md:text-7xl">
            <span className="shimmer-text">Love Spells</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg md:text-2xl text-ember-100/80">
            Eight sacred rituals — each one a different language of the heart.
            Read carefully, then message Maama with the one that calls to you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {spells.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-gold-500/30 bg-midnight-950/40 px-4 py-2 font-display text-[11px] uppercase tracking-[0.25em] text-ember-200 hover:bg-gold-500/10"
              >
                {s.title.split(' ').slice(0, 2).join(' ')}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hero image with parallax */}
      <section className="section pt-0">
        <div className="container-x">
          <ParallaxImage
            src={lovePortion2}
            alt="Love potion in a glowing flask"
            className="aspect-[16/9]"
            intensity={80}
          />
        </div>
      </section>

      {/* Each spell as alternating panels */}
      <section className="section pt-0">
        <div className="container-x space-y-24">
          {spells.map((s, i) => {
            const reversed = i % 2 === 1
            return (
              <motion.article
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="grid scroll-mt-32 gap-10 md:grid-cols-12 md:items-center"
              >
                <div
                  className={`md:col-span-7 ${reversed ? 'md:order-2' : ''}`}
                >
                  <TiltCard className="aspect-[4/3]">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-midnight-950/60 via-transparent to-midnight-950/30" />
                    <div className="pointer-events-none absolute right-4 top-4 opacity-60">
                      <Sigil size={64} />
                    </div>
                  </TiltCard>
                </div>
                <div className={`md:col-span-5 ${reversed ? 'md:order-1' : ''}`}>
                  <div className="font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
                    ✦ {s.eyebrow} ✦
                  </div>
                  <h2 className="mt-3 font-display text-3xl md:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 font-serif text-lg leading-relaxed text-ember-100/80">
                    {s.desc}
                  </p>
                  <ul className="mt-6 space-y-2 font-serif text-base text-ember-100/85">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-ember-300 to-crimson-500 shadow-glow" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={SITE.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ember"
                    >
                      Ask Maama about this ritual
                    </a>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-5 py-3 font-display text-[11px] uppercase tracking-[0.25em] text-ember-200 hover:bg-gold-500/10"
                    >
                      Other ways to contact
                    </Link>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* FAQ-LIKE STRIP */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="✦ Questions of the Heart ✦"
            title={
              <>
                Honest answers about <span className="shimmer-text">love magic</span>
              </>
            }
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                q: 'Can you cast a reconciliation spell for me?',
                a: 'Yes — provided both of you once shared true love. Maama will perform a free reading first to confirm the path is clear.',
              },
              {
                q: 'How long until I see results?',
                a: 'Most clients see the first signs within 24 to 72 hours — a phone call, a dream, a sudden softening of their energy.',
              },
              {
                q: 'Is this safe and ethical?',
                a: 'Absolutely. Maama only works with consent-honouring magic. No one is forced — energies are aligned, never bent against will.',
              },
              {
                q: 'Will my partner know?',
                a: 'No. Rituals are completely private. Your loved one will feel a pull back to you — but never know the source.',
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="glass-strong rounded-3xl p-6"
              >
                <h4 className="font-display text-lg text-ember-200">{f.q}</h4>
                <p className="mt-2 font-serif text-base text-ember-100/80">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.5rem] glass-strong p-10 md:p-16 text-center">
            <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 animate-spin-slow opacity-25">
              <Sigil size={288} />
            </div>
            <h3 className="font-display text-3xl md:text-5xl">
              Ready to <span className="shimmer-text">begin your ritual?</span>
            </h3>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-lg text-ember-100/80">
              Share your story with Maama Salma on WhatsApp — gently, privately,
              and with complete discretion.
            </p>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn-ember mt-8"
            >
              Open WhatsApp · {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
