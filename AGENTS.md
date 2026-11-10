<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop client

Next.js 16.4.5 App Router (React 19.3, TypeScript strict, Tailwind v4). Small single app, not a monorepo: code lives at the root in `app/`, `components/`, and `lib/`; `@/*` maps to the repo root.

## Commands

- Use npm (`package-lock.json`); do not introduce another package manager.
- `npm run dev` — Turbopack dev server. It writes `.next/dev/lock`; if a server is already running, reuse it rather than starting another.
- `npm run build` — production build; it also runs TypeScript.
- `npm run lint` — ESLint flat config (`eslint`); there is no `next lint` in Next 16.
- `npx tsc --noEmit` — typecheck (no dedicated script).
- No tests are configured. Verify changes with lint, typecheck, and build; there is no single-test command.

## Architecture / auth

- `app/api/auth/[...all]/route.ts` is the only route handler; it mounts Better Auth via `toNextJsHandler(auth)`.
- Server auth is `lib/auth.ts`: Better Auth + MongoDB adapter with a hard-coded `mongodb://localhost:27017/database`. Auth work requires local MongoDB. The gitignored `.env` must provide `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`.
- Client auth is `lib/auth-client.ts`. The root layout wraps every page with `components/navbar.tsx`.
- Next 16 generates route types in `.next/types`. Use generated helpers such as `LayoutProps<"/">` instead of hand-writing page/layout prop types.

## Framework gotchas

- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. With Cache Components on, request-time data (`cookies()`, `headers()`, DB/session reads) cannot be read during prerendering; put it behind `<Suspense>` or cache it. Read the bundled docs in `node_modules/next/dist/docs/` (start with `01-app/01-getting-started/08-caching.md` and `01-app/02-guides/authentication-with-cache-components.md`) before adding data fetching or auth-protected UI.
- Tailwind is v4 with the Turbopack `@tailwindcss/turbopack` rule in `next.config.ts`; there is no `tailwind.config.*`. Theme tokens and dark mode live in `app/globals.css`.
- shadcn config is `components.json` (style `base-nova`). Existing primitives in `components/ui/` are built on `@base-ui/react`, not Radix; use the `cn` helper from `@/lib/utils` (re-exported from the `cn` package).
- Only `public/` is served at the site root. Assets in `app/images/` are not available at `/images/*`; move them to `public/images/` or import them.

Do not delete the managed `nextjs-agent-rules` block above; `next dev` owns and rewrites it.
