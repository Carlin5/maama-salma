import { motion } from 'framer-motion'
import { SITE } from '../lib/constants'
import { trackWhatsAppClick } from '../lib/analytics'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={SITE.whatsappLink}
      onClick={() => trackWhatsAppClick('floating')}
      target="_blank"
      rel="noreferrer"
      aria-label={`WhatsApp Maama Salma at ${SITE.phone}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 160, damping: 14 }}
      className="wa-pulse fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-2xl ring-2 ring-emerald-200/40 hover:scale-[1.04] transition"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden>
        <path d="M19.05 4.91A10 10 0 0 0 4.96 18.5L4 22l3.62-.95A10 10 0 1 0 19.05 4.91Zm-7.05 16a8 8 0 0 1-4.1-1.13l-.3-.18-2.15.56.58-2.1-.2-.32A8 8 0 1 1 12 20.9Zm4.4-5.95c-.24-.12-1.4-.69-1.62-.77s-.38-.12-.53.12-.6.77-.74.93-.28.18-.52.06a6.4 6.4 0 0 1-1.9-1.17 7.2 7.2 0 0 1-1.33-1.65c-.14-.24 0-.37.1-.49l.34-.39c.12-.14.16-.24.24-.4a.45.45 0 0 0 0-.42c-.06-.12-.53-1.29-.73-1.77s-.38-.4-.53-.41h-.45a.86.86 0 0 0-.62.29 2.62 2.62 0 0 0-.82 1.95 4.55 4.55 0 0 0 .95 2.41 10.4 10.4 0 0 0 4 3.53c.56.24 1 .38 1.34.49a3.25 3.25 0 0 0 1.49.09 2.43 2.43 0 0 0 1.6-1.13 1.99 1.99 0 0 0 .14-1.13c-.06-.1-.22-.16-.46-.28Z" />
      </svg>
      <span className="hidden md:inline font-display text-sm tracking-[0.2em]">
        CHAT NOW
      </span>
    </motion.a>
  )
}
