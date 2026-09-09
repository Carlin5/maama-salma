# Maama Salma — Sacred Love Spells & Ritual Healing

A multi-page React + TypeScript site for spiritual healer **Maama Salma**, built around love spells, reconciliation rituals and ancestral practice. Layered 2D / 3D animations and an always-visible WhatsApp CTA to **+27 60 403 4585** make it easy for visitors to reach out the moment they're ready.

**Live preview:** https://dist-oopuzabu.devinapps.com/

## Pages

- **Home** — 3D ritual hero (floating hearts, glowing rings, sigils, starfield) + tagline + dual CTA.
- **Love Spells** — Eight sacred rituals with alternating image / text cards:
  Reconciliation · Bring Back Lost Lover · Make Someone Fall in Love · Wiccan Love · Love Potion · Binding & Marriage · Gay & Lesbian Love · Marriage / Commitment.
- **Services** — Six complementary offerings (Psychic Reading, Spiritual Cleansing, Protection, Good Luck, Curse Removal, Ritual Candle Burnings).
- **About** — Maama's biography, 25+ years of practice, list of specialties.
- **Testimonials** — Nine client stories from Africa, Europe and the Middle East.
- **Contact** — Form that dynamically pre-fills a WhatsApp message to Maama.

A floating "CHAT NOW" WhatsApp button is rendered on every page.

## Tech stack

- [Vite](https://vitejs.dev) + [React 18](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) with custom colour palette and animations
- [Framer Motion](https://www.framer.com/motion) for page transitions, parallax, tilt and shimmer
- [Three.js](https://threejs.org) via [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber) and [`@react-three/drei`](https://github.com/pmndrs/drei) for the 3D hero (hearts, rings, sparkles)
- [React Router DOM](https://reactrouter.com) for multi-page SPA routing
- [React Icons](https://react-icons.github.io/react-icons) for WhatsApp / phone / star glyphs

## Local development

```bash
pnpm install     # or npm install / yarn
pnpm dev         # starts the Vite dev server at http://localhost:5173
pnpm lint        # ESLint
pnpm build       # production build into ./dist
pnpm preview     # serve the production build locally
```

## Project layout

```
src/
├── App.tsx                # Router + page transitions
├── main.tsx               # ReactDOM entrypoint
├── index.css              # Tailwind + custom utilities
├── lib/
│   └── constants.ts       # Site name, phone, WhatsApp link, etc.
├── assets/photos/         # All 15 ritual photos used across the site
├── components/
│   ├── Layout.tsx         # Page chrome — nav, footer, floating WhatsApp
│   ├── NavBar.tsx         # Sticky ritual navigation
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx # Floating "CHAT NOW" CTA
│   ├── RitualBackground.tsx
│   ├── RitualScene3D.tsx  # Three.js hero scene
│   ├── HeartBurst.tsx     # 3D heart geometry
│   ├── Sigil.tsx          # SVG ritual sigils
│   ├── ParallaxImage.tsx
│   ├── SectionHeading.tsx
│   └── TiltCard.tsx       # Mouse-tracked tilt card
└── pages/
    ├── Home.tsx
    ├── LoveSpells.tsx
    ├── Services.tsx
    ├── About.tsx
    ├── Testimonials.tsx
    └── Contact.tsx
```

## Customisation tips

- **Phone / WhatsApp number:** edit `src/lib/constants.ts` and the link automatically updates everywhere on the site (header CTA, every "Ask Maama" button, the floating "CHAT NOW", and the Contact form's pre-fill flow).
- **Photos:** drop new images into `src/assets/photos/` and update the imports in the page that should use them. The `scripts/crop_photos.py` helper script can strip captions / borders from website-screenshot-style source images.
- **Spells & services:** each entry on the Love Spells / Services pages is a plain data object near the top of the corresponding `pages/*.tsx` file — add / remove / reorder freely.

## Deployment

The production build is fully static, so any static host works:

```bash
pnpm build
# Upload the contents of ./dist to your host of choice (Netlify, Vercel,
# Cloudflare Pages, S3, GitHub Pages, etc.)
```

The current live preview is served from `https://dist-oopuzabu.devinapps.com/`.

## Admin dashboard

The private dashboard is available at `/admin` (it is intentionally not included
in the public navigation). The default passwords are `Masha@1000` and
`Masha@123`; set `ADMIN_PASSWORD` in Vercel to replace them. `ADMIN_SECRET`
controls token signing when set.

For live, site-wide visitor and WhatsApp analytics, configure
`KV_REST_API_URL` and `KV_REST_API_TOKEN` with Vercel KV or Upstash REST
credentials. Without those variables, API data uses an in-memory fallback per
serverless instance and the dashboard mirrors events in this browser's local
storage. The fallback is useful for local `vercel dev` and static previews,
but it is not shared between instances.

## License

All rituals reserved.
