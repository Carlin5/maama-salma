import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { NAV_LINKS, SITE } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-gold-500/15 bg-midnight-950/70 backdrop-blur-xl">
      <div className="container-x grid grid-cols-1 gap-10 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl tracking-widest">
            MAAMA <span className="text-gold-grad">SALMA</span>
          </h3>
          <p className="mt-3 font-serif text-base leading-relaxed text-ember-100/70">
            Sacred love spells, reconciliation rituals and spiritual cleansing — guided
            by 25+ years of ancestral practice across Africa and the diaspora.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-400/80">
            <span className="h-px w-8 bg-gold-500/40" />
            Ad maiorem amorem
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.25em] text-ember-200">
            Explore
          </h4>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-ember-100/70 transition hover:text-ember-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-[0.25em] text-ember-200">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-ember-100/80">
            <li>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-ember-200"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M19.05 4.91A10 10 0 0 0 4.96 18.5L4 22l3.62-.95A10 10 0 1 0 19.05 4.91Zm-7.05 16a8 8 0 0 1-4.1-1.13l-.3-.18-2.15.56.58-2.1-.2-.32A8 8 0 1 1 12 20.9Zm4.4-5.95c-.24-.12-1.4-.69-1.62-.77s-.38-.12-.53.12-.6.77-.74.93-.28.18-.52.06a6.4 6.4 0 0 1-1.9-1.17 7.2 7.2 0 0 1-1.33-1.65c-.14-.24 0-.37.1-.49l.34-.39c.12-.14.16-.24.24-.4a.45.45 0 0 0 0-.42c-.06-.12-.53-1.29-.73-1.77s-.38-.4-.53-.41h-.45a.86.86 0 0 0-.62.29 2.62 2.62 0 0 0-.82 1.95 4.55 4.55 0 0 0 .95 2.41 10.4 10.4 0 0 0 4 3.53c.56.24 1 .38 1.34.49a3.25 3.25 0 0 0 1.49.09 2.43 2.43 0 0 0 1.6-1.13 1.99 1.99 0 0 0 .14-1.13c-.06-.1-.22-.16-.46-.28Z" />
                  </svg>
                </span>
                <span>WhatsApp · {SITE.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 hover:text-ember-200"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
                  <MdEmail size={14} />
                </span>
                <span>{SITE.email}</span>
              </a>
            </li>
            <li className="text-ember-100/60 text-sm">
              Consultations available daily · responses within minutes.
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold-500/10">
        <div className="container-x flex flex-col items-start gap-3 py-5 text-xs text-ember-100/40 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Maama Salma — All rituals reserved.</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              to="/disclaimer"
              className="uppercase tracking-[0.25em] text-ember-100/60 transition hover:text-ember-200"
            >
              Disclaimer
            </Link>
            <span className="hidden h-3 w-px bg-gold-500/20 md:inline-block" />
            <span className="font-display tracking-[0.25em]">
              ✦ LOVE · LIGHT · RITUAL ✦
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
