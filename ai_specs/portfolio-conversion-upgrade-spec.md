# Portfolio Conversion & Discoverability Upgrade — Spec

<goal>
Improve `codewithnabi.dev` (this Next.js 15 portfolio) so a hiring manager or client
who lands cold can, within seconds: (1) understand that Nabi is available and for what,
(2) see credible proof the apps are real and shipped, and (3) act — book a call, submit a
form, or download a CV.

This spec implements ONLY the genuinely-missing items from the audit. Roughly ten audited
items already exist in the codebase and are explicitly excluded (see `<out_of_scope>`), so
implementation must not re-build them.

Who benefits: prospective employers/clients scanning the site; the site owner (Nabi), who
gains conversion clarity, social proof, and SEO surface area.
</goal>

<background>
Stack: Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion,
Lenis smooth scroll. No test framework is configured. `@/*` → `./src/*`.

Two distinct visual systems exist and MUST be respected:
- **Home page (`/`)** uses the "atelier" warm palette: CSS vars `--cream`, `--ink`,
  `--ink-soft`, `--muted`, `--line`, `--atelier-accent`. Its nav is `AtelierNav`. The
  global `Navigation` returns `null` on `/`.
- **All other routes** (`/about`, `/projects`, `/blog`, new `/uses`, `/now`) use the
  themable palette: `--bg-primary`, `--bg-secondary`, `--accent`, `--accent-muted`,
  `--text-primary`, `--text-secondary`, `--border-color`, with dark default + light toggle
  (`localStorage 'theme'`). These routes render the global `Navigation` + `Footer`.

New standalone pages MUST follow the second system (match `/about`).

Files to examine before implementing:
- Home: `@src/app/page.tsx` (hero, projects, about preview, blog, contact, inline footer). Status string at line ~315; contact/mailto at ~426; social pills at ~451.
- Home nav: `@src/components/AtelierNav.tsx` (no social icons today).
- Global nav: `@src/components/Navigation.tsx` (fixed typed `navItems`; `null` on `/`).
- Footer: `@src/components/Footer.tsx` (socials gated behind `showSocials`; `quickLinks`).
- About: `@src/app/about/page.tsx` — has `{/* TODO: link to /cv PDF when available */}` at line ~453; CTA copy at ~438–441; socials array at ~107.
- SEO: `@src/components/StructuredData.tsx` (Person + Brand, injected globally in `@src/app/layout.tsx` head).
- Data + types: `@src/data/projects.ts`, `@src/types/project.ts` (use `getProjectBySlug` / `getAllProjects`).
- Project detail: `@src/app/projects/[slug]/page.tsx` + `@src/app/projects/[slug]/ProjectDetailClient.tsx`.
- Reusable UI: `@src/components/ui/SocialIcon.tsx`, `@src/components/ui/Button.tsx`, `@src/components/ScrollReveal.tsx`.
- Routing infra: `@src/app/sitemap.ts`, `@src/app/robots.ts`, `@src/app/about/layout.tsx` (metadata pattern).

Decisions locked with the owner:
- Scope: **portfolio site only**.
- Contact form backend: **Web3Forms** (serverless, public access key; no server runtime/DB).
- Social proof: **real metrics the owner will supply** (fields optional; render only when present — never invent numbers).
- Extras to include: **CV download, `/uses` page, `/now` page, Calendly booking link**.
</background>

<out_of_scope>
Do NOT build these — they already exist, or belong elsewhere:
- Play Store links on cards/detail pages (already present with real URLs).
- GitHub / LinkedIn / X links in contact, `/about`, and JSON-LD `sameAs` (already present).
- Project case-study detail pages at `/projects/[slug]` (already exist).
- "Latest Writing" blog section on the homepage (already present).
- `/about` page and `Person` + `Brand` JSON-LD (already exist).
- Keyword-rich `<title>` / meta description (already non-generic in `layout.tsx`).
- The "Dev Discipline" Flutter-app UX redesign (DayCard states, PreviewSheet, PaywallModal,
  Pro/free day logic, week labels, TodayPage vs SpecificDayPage). That is a separate mobile
  app and CANNOT be built in this Next.js repo — it needs its own spec in the app's repo.
- "Dev Discipline messaging confusion" (#7): the site copy is already consistent
  (habit/discipline). The "Flutter Dev Learning App" wording lives on the store listing,
  not this site. No change needed here.
</out_of_scope>

<central_config>
Create `./src/config/site.ts` (single source of truth for owner-supplied externals):
```ts
export const siteConfig = {
  availability: 'Available for freelance & full-time remote',
  cvPath: '/Nabi-Rahmani-Flutter-Developer-CV.pdf', // file placed in /public
  cvAvailable: false,       // flip to true once the PDF is added
  calendlyUrl: '',          // e.g. 'https://cal.com/nabirahmani/15min'; empty hides the CTA
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
} as const;
```
Rules:
- CV button renders only when `cvAvailable === true` (avoids a live 404).
- Calendly CTA renders only when `calendlyUrl` is non-empty.
- Contact form renders only when `web3formsAccessKey` is non-empty; otherwise fall back to
  the existing mailto link (no dead form).
All new/changed components read strings from `siteConfig` — no duplicated literals.
</central_config>

<user_flows>
Primary flow — "evaluate & contact":
1. Visitor lands on `/`. Hero shows name, tagline, an explicit availability line, a social
   icon row, and primary CTA(s).
2. Scrolls to Selected Work → sees per-project metric chips (when data present) + Play Store links.
3. Reaches Contact → chooses one of: submit contact form, book a call (Calendly), download CV,
   or email directly.
4. Success state confirms the message was sent.

Alternative flows:
- Recruiter on `/about`: same availability line, "Download CV" and "Book a call" CTAs, socials.
- Developer visitor: navigates to `/uses` (dev setup) or `/now` (current focus) from footer/cross-links.
- Return visitor: `/now` shows a "last updated" date signalling the site is alive.

Error / edge flows:
- Form submit fails (network / Web3Forms 4xx-5xx) → inline error, form stays populated, retry enabled.
- Form validation fails (missing/invalid name, email, message) → per-field messages, no submit.
- Spam bot fills honeypot → silently rejected (no send, generic UI).
- `cvAvailable` false → CV buttons hidden everywhere; email/Calendly still shown.
- `calendlyUrl` empty → booking CTA hidden; form + email remain.
- `web3formsAccessKey` empty → form hidden; mailto fallback shown.
- Project has no `metrics` → no metric chips render (layout unaffected).
</user_flows>

<requirements>
**Functional — Conversion clarity (Phase 1)**
1. Add `siteConfig` per `<central_config>`. All subsequent phases consume it.
2. Replace home status value *"Open to collaborations"* (`page.tsx` ~315) with
   `siteConfig.availability`. Update `/about` CTA copy (`about/page.tsx` ~438–441) to use the
   same phrase so the two pages agree verbatim.
3. Add a hero social icon row on `/` (GitHub, LinkedIn, X) using the existing home color vars
   (`--muted` / `--ink` / `--atelier-accent`). Reuse `SocialIcon` where compatible; otherwise
   match the existing contact-section pill/icon style. Place near the stats/CTA block.
4. Add a "Download CV" button in three places, each gated on `siteConfig.cvAvailable`:
   home hero (near primary CTA), home footer, and `/about` (replace the TODO at ~453). Link to
   `siteConfig.cvPath` with `download` attr and `target="_blank"`. Style per each page's palette.
5. Add a "Book a 15-min call" CTA (link to `siteConfig.calendlyUrl`, `target="_blank"`,
   `rel="noopener noreferrer"`) in the home Contact section and on `/about`, gated on non-empty URL.

**Functional — Contact form (Phase 2)**
6. Create `./src/components/ContactForm.tsx` (`'use client'`). Fields: Name (required),
   Email (required, valid format), Project type (select: Full-time / Freelance / Collaboration /
   Other), Budget range (optional select or free text), Message (required, min 10 chars).
   Include a hidden honeypot field (e.g. `botcheck`) and a hidden `access_key`.
7. Submit via `POST https://api.web3forms.com/submit` (JSON) using
   `siteConfig.web3formsAccessKey`. Manage states: idle, submitting, success, error.
8. Render the form inside the home Contact section, ABOVE or beside the existing large mailto
   email link (keep the mailto as an always-available fallback). Match the atelier palette.
9. When `web3formsAccessKey` is empty, render nothing for the form and keep only the mailto —
   no broken/dead form.

**Functional — Social proof / metrics (Phase 3)**
10. Extend `Project` in `@src/types/project.ts` with optional:
    ```ts
    metrics?: {
      downloads?: string;    // e.g. '10K+'
      rating?: number;       // e.g. 4.8
      ratingCount?: string;  // e.g. '120'
      countries?: string;    // e.g. '15+'
      crashFree?: string;    // e.g. '99.2%'
    };
    ```
    Add empty/partial `metrics` objects to the three projects in `@src/data/projects.ts` as
    placeholders the owner will fill. Do not fabricate values.
11. Render metric chips on home project cards (`page.tsx` Selected Work) and on the project
    detail page — each field renders only if present. Zero metrics → no chips, no empty row.

**Functional — SEO (Phase 4)**
12. Create `./src/components/ProjectStructuredData.tsx` emitting `SoftwareApplication` (or
    `MobileApplication`) JSON-LD per project: `name`, `operatingSystem` (from `platform`),
    `applicationCategory` ("ProductivityApplication" / suitable), `offers` (free, price "0"),
    `downloadUrl` = `links.playStore` (only when not `'#'`), and `aggregateRating` ONLY when
    `metrics.rating` + `metrics.ratingCount` exist. Render it in the project detail **server**
    page (`projects/[slug]/page.tsx`) for crawlability — not in the client component.
13. Add `/uses` and `/now` to `@src/app/sitemap.ts`.

**Functional — New pages (Phase 5)**
14. Create `/uses` at `./src/app/uses/page.tsx` (server component; export `metadata`). Back it
    with `./src/data/uses.ts` (typed categories, e.g. Hardware, Editor & Terminal, Flutter/Dart
    packages, Design, Web stack, Services). Render with global `Navigation` + `Footer`, matching
    `/about` styling. Cross-link from `/about` and the footer.
15. Create `/now` at `./src/app/now/page.tsx` (server component; export `metadata`). Back it with
    `./src/data/now.ts` (`lastUpdated: string` + sections: Building / Learning / Reading). Show
    the "last updated" date prominently. Add a `/now` link to `Footer` `quickLinks`.

**Functional — Polish (Phase 6)**
16. Add a compact visual tech-stack strip on `/` (icons or labelled grid: Flutter, Dart,
    Riverpod, Drift, Supabase, RevenueCat, GitHub Actions, Next.js). Match atelier palette.
    (Optional/nice-to-have; include if it does not disrupt existing rhythm.)
17. Audit images: ensure below-the-fold images use `loading="lazy"`; keep only true LCP/above-fold
    images `priority`. Verify `PhoneScreenshot`/project images are sized to avoid CLS.

**Error Handling**
18. Contact form network/API failure → inline, non-destructive error message; inputs preserved;
    retry allowed. Never navigate away or clear the form on error.
19. Honeypot filled → treat as success in UI but do not send; log nothing sensitive.

**Edge Cases**
20. Any owner-supplied external missing (CV/PDF, Calendly URL, Web3Forms key, project metrics) →
    the dependent UI is hidden gracefully; the rest of the page is unaffected.
21. Theme toggle: all new components must render correctly in BOTH dark and light themes
    (non-home pages) using theme vars, never hardcoded colors.

**Validation (inputs)**
22. Email validated with a standard pattern; Name non-empty; Message ≥ 10 chars. Show
    per-field messages; disable submit while submitting; re-enable on error.
</requirements>

<boundaries>
Edge cases:
- Metrics partially filled (e.g. only `rating`) → render only the present chips.
- Long project-type/budget values → selects prevent overflow; free-text budget is capped/trimmed.
- `/now` never updated → still valid; shows its stored `lastUpdated`.

Error scenarios:
- Web3Forms rate-limit / 429 / 5xx → generic "Something went wrong, please try again or email
  me directly" with the mailto surfaced.
- JS disabled → mailto link and Calendly link still function (progressive enhancement); the
  fetch-based form is the enhancement, not the only path.

Limits:
- No PII stored in this repo; the form posts directly to Web3Forms. Do not add a database.
- `NEXT_PUBLIC_WEB3FORMS_KEY` is a public access key by design; still read it from env, do not
  hardcode it in committed source.
</boundaries>

<implementation>
Create:
- `./src/config/site.ts` — `siteConfig`.
- `./src/components/ContactForm.tsx` — Web3Forms client form.
- `./src/components/ProjectStructuredData.tsx` — per-project JSON-LD.
- `./src/app/uses/page.tsx` + `./src/data/uses.ts` + (optional) `./src/app/uses/layout.tsx` for metadata.
- `./src/app/now/page.tsx` + `./src/data/now.ts` + (optional) `./src/app/now/layout.tsx`.

Modify:
- `./src/types/project.ts` — add `metrics`.
- `./src/data/projects.ts` — add placeholder `metrics` to the 3 projects.
- `./src/app/page.tsx` — availability string, hero socials, CV button, Calendly CTA, embed
  `ContactForm`, metric chips on cards, optional tech-stack strip, footer CV/socials.
- `./src/app/about/page.tsx` — availability copy, CV button (replace TODO), Calendly CTA, `/uses` cross-link.
- `./src/app/projects/[slug]/page.tsx` — render `ProjectStructuredData`; pass metrics to client for chips.
- `./src/app/projects/[slug]/ProjectDetailClient.tsx` — render metric chips.
- `./src/components/Footer.tsx` — add `/now` (and `/uses`) to `quickLinks`.
- `./src/app/sitemap.ts` — add `/uses`, `/now`.
- `.env.local` (owner, not committed) — `NEXT_PUBLIC_WEB3FORMS_KEY`; document in README/notes.

Patterns to follow:
- Data lives in `src/data/*` as typed arrays with helper accessors (mirror `projects.ts`).
- Wrap new sections in `ScrollReveal` for consistent entrance animation.
- Use the Metadata API (`export const metadata`) for new pages; mirror `about/layout.tsx`.
- Respect the two-palette rule; never hardcode hex on non-home pages — use theme vars.

Avoid:
- Do not add a backend/DB or server env secrets beyond the public Web3Forms key (owner chose
  the serverless path deliberately).
- Do not inject fake metrics, ratings, or testimonials.
- Do not put the `SoftwareApplication` JSON-LD in a `'use client'` component (hurts crawlability).
- Do not expand the strongly-typed `Navigation.navItems` union for `/uses` `/now`; link them via
  `Footer`/cross-links to avoid churn in the section-highlight logic.
</implementation>

<validation>
No test framework is configured (per CLAUDE.md), and the Flutter TDD/robot-testing skills do
not apply to this Next.js/React stack. Validation is therefore build + lint + manual flow +
Lighthouse, with an OPTIONAL lightweight unit layer called out below.

Required baseline (must pass):
- `npm run lint` clean; `npm run build` succeeds (no type errors — strict mode).
- Manual flow checks (happy path + errors) for each phase:
  - Availability text identical on `/` and `/about`.
  - Hero social icons link out correctly (new tab, `rel="noopener noreferrer"`).
  - CV button: visible only when `cvAvailable`; hidden path leaves layout intact; visible path
    opens the PDF.
  - Calendly CTA: visible only with a URL; opens Calendly in a new tab.
  - Contact form: (a) valid submit → success state; (b) invalid inputs → per-field errors, no
    submit; (c) simulate failure → inline error, inputs preserved, retry works; (d) empty key →
    form hidden, mailto present.
  - Metric chips: fill one project's metrics → chips show on home card + detail; empty project →
    no chips.
  - `/uses` and `/now` render in BOTH dark and light themes; appear in `sitemap.xml`.
  - Project detail `SoftwareApplication` JSON-LD validates (Google Rich Results Test / schema.org validator).
- Lighthouse (mobile + desktop) on `/`: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95,
  SEO ≥ 95. Confirm below-fold images are lazy and no CLS regression.

Optional (recommended if introducing Vitest + React Testing Library — not blocking):
- Unit test `ContactForm` validation logic: happy path (valid → submit called), edge cases
  (empty name / bad email / short message → blocked), error handling (rejected fetch → error
  state, inputs retained), honeypot (filled → no network call). Inject the submit/`fetch`
  dependency so tests are deterministic and no real network is hit.
- Unit test any new data accessor(s) in `uses.ts` / `now.ts` and the metric-chip conditional
  rendering (present vs absent fields).
Behavior-first order if tested: happy path → validation edges → network error → spam honeypot.
</validation>

<stages>
Phase 1 — Conversion clarity: `siteConfig`, availability consistency, hero socials, CV buttons,
  Calendly CTAs. Verify: text matches across pages; gated CTAs hide/show correctly.
Phase 2 — Contact form: `ContactForm` + Web3Forms wiring + states. Verify: all four form flows
  (success / validation / failure / no-key fallback).
Phase 3 — Metrics: type + data placeholders + chip rendering on home & detail. Verify: present vs
  absent fields render correctly.
Phase 4 — SEO: `ProjectStructuredData` on server detail page; sitemap entries. Verify: schema
  validator passes; sitemap includes new routes.
Phase 5 — New pages: `/uses`, `/now` + data + metadata + footer links + cross-links. Verify: both
  themes; sitemap; navigable.
Phase 6 — Polish: tech-stack strip (optional), lazy images, a11y/CLS pass. Verify: Lighthouse targets.
Verify each phase before starting the next.
</stages>

<done_when>
- `siteConfig` exists and is the sole source for availability, CV path/flag, Calendly URL, and
  Web3Forms key; no duplicated literals for these.
- Availability phrase is identical on `/` and `/about` and reads as an explicit hire signal.
- Hero (home) shows a working social icon row; CV + Calendly CTAs appear on `/` and `/about`
  when their assets are configured, and are cleanly hidden when not.
- A working Web3Forms contact form exists in the Contact section with validation, success, and
  error states, plus a mailto fallback; posts succeed with a real access key.
- `Project.metrics` exists; the three projects carry (owner-fillable) metric fields; chips render
  only for present values on home cards and detail pages.
- Each project detail page emits valid `SoftwareApplication` JSON-LD from a server component.
- `/uses` and `/now` exist, are theme-correct, have metadata, are linked from the footer, and are
  in `sitemap.xml`.
- Below-fold images are lazy; `npm run lint` and `npm run build` pass; Lighthouse meets the targets
  in `<validation>`.
- No fabricated metrics/testimonials; no backend/DB added; the Flutter-app UX remains out of scope
  and is documented as needing a separate spec.
</done_when>
