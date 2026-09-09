import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SITE } from '../lib/constants'
import { trackWhatsAppClick } from '../lib/analytics'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-midnight-950/70 border-b border-gold-500/15' : ''
      }`}
    >
      <div className="container-x flex items-center justify-between py-4">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative inline-flex h-10 w-10 items-center justify-center">
            <span className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-ember-300 via-crimson-500 to-violet-ritual opacity-80 blur-md" />
            <svg viewBox="0 0 64 64" className="relative h-10 w-10">
              <defs>
                <radialGradient id="logo-g" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffd27a" />
                  <stop offset="55%" stopColor="#ff4d6d" />
                  <stop offset="100%" stopColor="#7a3df5" />
                </radialGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="url(#logo-g)" opacity="0.95" />
              <path
                d="M32 48s-13-8.5-13-19a8 8 0 0 1 13-6.2A8 8 0 0 1 45 29c0 10.5-13 19-13 19z"
                fill="#1a0418"
              />
              <path
                d="M32 48s-13-8.5-13-19a8 8 0 0 1 13-6.2A8 8 0 0 1 45 29c0 10.5-13 19-13 19z"
                stroke="#ffd27a"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
          </span>
          <span className="font-display text-lg tracking-widest text-ember-100 group-hover:text-ember-300 transition">
            MAAMA <span className="text-gold-grad">SALMA</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative font-display text-[12px] uppercase tracking-[0.22em] transition ${
                  isActive ? 'text-ember-200' : 'text-ember-100/70 hover:text-ember-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 mx-auto h-[1px] w-8 bg-gradient-to-r from-ember-300 via-crimson-400 to-violet-ritual"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <a
          href={SITE.whatsappLink}
          onClick={() => trackWhatsAppClick('navbar desktop')}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex btn-ember text-sm"
        >
          Book a Ritual
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 text-ember-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden border-t border-gold-500/15 bg-midnight-950/90 backdrop-blur-xl"
          >
            <div className="container-x flex flex-col gap-2 py-4">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-2 font-display text-sm tracking-[0.2em] ${
                      isActive ? 'text-ember-200' : 'text-ember-100/80'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <a
                href={SITE.whatsappLink}
                onClick={() => trackWhatsAppClick('navbar mobile')}
                target="_blank"
                rel="noreferrer"
                className="btn-ember mt-2 self-start text-sm"
              >
                Book a Ritual
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
