# Unified Scholarship Platform (frontend)
Next.js 14 PWA + Tailwind + Framer-ready. Prototype uses mock APIs in `lib/mock.ts`.

    npm install
    npm run dev

Routes: `/` landing, `/student` (eligibility, document wallet, offline queue, status timeline), `/admin` (verification queue with adapter normalization, coverage).
JAGO chat is `components/Jago.tsx` (canned replies). Service worker: `public/sw.js`.
Swap `lib/mock.ts` for real REST calls (Node.js/Python backend, PostgreSQL/MongoDB) later.
