import { SITE } from '../lib/constants'
import { trackWhatsAppClick } from '../lib/analytics'
import { AD_PACKAGES } from '../lib/advertising'

export default function Advertising() {
  return (
    <div>
      <h2 className="font-display text-3xl">
        Advertise with Maama Salma — daily reach &amp; traffic
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {AD_PACKAGES.map((item) => (
          <div key={item.name} className="glass-strong flex flex-col rounded-3xl p-6">
            <p className="font-display text-xs uppercase tracking-widest text-gold-400">
              {item.name}
            </p>
            <p className="mt-3 font-display text-3xl text-ember-100">{item.price}</p>
            <p className="mt-2 text-sm text-ember-100/60">{item.reach}</p>
            <p className="mt-5 flex-1 font-serif text-lg text-ember-100/80">{item.description}</p>
            <a
              onClick={() => trackWhatsAppClick(`advertising ${item.name}`)}
              href={`https://wa.me/${SITE.phoneRaw.replace(/\D/g, '')}?text=${encodeURIComponent(
                `Hello Maama, I would like to book the ${item.name} advertising package.`,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ember mt-6 justify-center text-sm"
            >
              Book via WhatsApp
            </a>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <h3 className="font-display text-xl">What can be advertised in a day</h3>
          <ul className="mt-4 space-y-3 font-serif text-lg text-ember-100/75">
            {['Banner slots', 'Sponsored testimonial', 'WhatsApp broadcast', 'Social outreach'].map(
              (item) => (
                <li key={item}>✦ {item}</li>
              ),
            )}
          </ul>
        </div>
        <div className="glass rounded-3xl p-6">
          <h3 className="font-display text-xl">Ready to reach more hearts?</h3>
          <p className="mt-3 font-serif text-lg text-ember-100/75">
            Payment details coming soon — contact Maama on WhatsApp to book.
          </p>
          <a
            onClick={() => trackWhatsAppClick('advertising contact')}
            href={SITE.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex text-gold-300 underline underline-offset-4"
          >
            Contact Maama →
          </a>
        </div>
      </div>
    </div>
  )
}
