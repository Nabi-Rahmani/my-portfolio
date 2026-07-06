# Portfolio Conversion & Discoverability Upgrade — Plan

## Overview

Close real conversion/proof/SEO gaps on `codewithnabi.dev`. Central config + gated CTAs, Web3Forms form, real-metrics chips, per-app JSON-LD, `/uses` + `/now`, perf pass.

**Spec**: `ai_specs/portfolio-conversion-upgrade-spec.md` (read for full requirements)

## Context

- **Structure**: Next.js 15 App Router — routes `src/app/*`, shared `src/components/*`, data `src/data/*` (typed arrays + helper fns), types `src/types/*`. Alias `@/*` → `src/*`.
- **State**: React local state + `'use client'`; no global store.
- **Two palettes (hard rule)**: home `/` = atelier vars (`--cream`/`--ink`/`--ink-soft`/`--muted`/`--line`/`--atelier-accent`), nav `AtelierNav`. All other routes = theme vars (`--bg-primary`/`--accent`/`--text-*`/`--border-color`), nav `Navigation` + `Footer`. New pages match `/about`.
- **Reference impls**: `src/app/page.tsx`, `src/app/about/page.tsx`, `src/components/StructuredData.tsx`, `src/data/projects.ts` + `src/types/project.ts`, `src/app/projects/[slug]/page.tsx` (server; renders `ProjectDetailClient`; `generateStaticParams`), `src/app/sitemap.ts`, `src/components/ui/SocialIcon.tsx`, `src/components/Footer.tsx`.
- **Testing**: no framework configured (Flutter TDD/robot skills N/A). Verify = `npm run lint && npm run build` + manual + Lighthouse. Optional Vitest+RTL for form validation (not blocking).
- **Assumptions/Gaps**: owner supplies CV PDF, Calendly URL, `NEXT_PUBLIC_WEB3FORMS_KEY`, real metric numbers. All gated → hidden when absent. `SocialIcon` themed vars need atelier overrides on home hero. `PhoneScreenshot` already lazy (`priority={false}`).

## Plan

### Phase 1: Foundation + conversion clarity (vertical slice) ✅

- **Goal**: Explicit availability + gated CV/Calendly/social CTAs live on `/` and `/about`, driven by one config.
- [x] `src/config/site.ts` - new `siteConfig`: `availability`, `cvPath`, `cvAvailable`, `calendlyUrl`, `web3formsAccessKey` (from `process.env.NEXT_PUBLIC_WEB3FORMS_KEY`).
- [x] `src/app/page.tsx` - status (~L315) → `siteConfig.availability`; add hero social row (atelier-styled); CV button near CTA (gated `cvAvailable`); Calendly CTA in Contact (gated URL); CV+socials in inline footer (~L477).
- [x] `src/app/about/page.tsx` - CTA copy (~L438) → `siteConfig.availability`; replace CV TODO (~L453) with gated Download-CV button; add Calendly CTA (gated).
- [x] Gating: CV hidden unless `cvAvailable`; Calendly hidden unless URL set. No live 404s.
- [x] Verify: `npm run lint && npm run build`; manual — availability identical both pages; toggle `cvAvailable`/`calendlyUrl` → CTAs show/hide; socials open new tab `rel=noopener`.

### Phase 2: Web3Forms contact form ✅

- **Goal**: Working form in home Contact with validation + states; mailto fallback.
- [x] `src/components/ContactForm.tsx` - `'use client'`; fields name(req)/email(req,valid)/projectType(select)/budget(optional)/message(req,≥10); hidden honeypot `botcheck` + `access_key`; states idle/submitting/success/error; POST `https://api.web3forms.com/submit`; atelier palette.
- [x] `src/app/page.tsx` - embed `ContactForm` above mailto link in Contact; render only when `web3formsAccessKey` set, else mailto-only.
- [x] Errors: network/4xx/5xx → inline error, inputs preserved, retry enabled; honeypot filled → fake-success, no send.
- [ ] TDD (optional, if Vitest added): valid→submit called; empty name / bad email / short msg → blocked; rejected fetch → error state + inputs retained; honeypot → no network call. Inject `fetch`/submit for determinism. Order: happy → validation → error → honeypot. **Blocked/skipped: no test framework configured in this repo (per CLAUDE.md); explicitly marked optional in spec and not added.**
- [x] Verify: `npm run lint && npm run build`; manual 4 flows — success / validation / simulated failure / empty-key fallback. **Verified via lint/build + curl + code-path review (no browser automation tool available in this environment to drive live interaction); logic reviewed for honeypot short-circuit, input retention on error, and disabled-during-submit state.**

### Phase 3: Project metrics (data + display) ✅

- **Goal**: Real, owner-fillable metrics render as chips; absent → nothing.
- [x] `src/types/project.ts` - add optional `metrics { downloads?, rating?(number), ratingCount?, countries?, crashFree? }`.
- [x] `src/data/projects.ts` - add empty/partial `metrics` placeholders to all 3 projects (no fabricated values).
- [x] `src/app/page.tsx` - metric chips on Selected Work cards; each field conditional; zero → no row.
- [x] `src/app/projects/[slug]/ProjectDetailClient.tsx` - metric chips block, same conditional rule.
- [x] Verify: `npm run lint && npm run build`; manual — fill one project's metrics → chips on home + detail; empty project → none, layout intact. **Verified: temporarily populated focus-flow metrics, confirmed via curl that chips render on both home cards and detail hero, then reverted to empty placeholders; other two projects with empty metrics render no chip row.**

### Phase 4: Per-app SoftwareApplication JSON-LD ✅

- **Goal**: Crawlable rich-snippet schema per app.
- [x] `src/components/ProjectStructuredData.tsx` - emit `SoftwareApplication`/`MobileApplication` JSON-LD: `name`, `operatingSystem`(from `platform`), `applicationCategory`, `offers`(price "0"), `downloadUrl`=`playStore` (skip when `'#'`), `aggregateRating` ONLY if `metrics.rating`+`ratingCount`.
- [x] `src/app/projects/[slug]/page.tsx` - render `<ProjectStructuredData project={project} />` in the **server** component (not client).
- [x] Verify: `npm run lint && npm run build`; validate output via schema.org / Google Rich Results Test. **Verified structurally via built static HTML: valid JSON-LD emitted per project with correct `downloadUrl` (real Play Store links) and `aggregateRating` correctly omitted for empty metrics; full Google Rich Results Test requires a public deployed URL, not runnable from local build.**

### Phase 5: `/uses` + `/now` pages ✅

- **Goal**: Two static, theme-correct, indexed pages.
- [x] `src/data/uses.ts` - typed categories (Hardware, Editor & Terminal, Flutter/Dart pkgs, Design, Web stack, Services).
- [x] `src/app/uses/page.tsx` - server component; `export const metadata`; `Navigation`+`Footer`; `/about` styling; both themes.
- [x] `src/data/now.ts` - `lastUpdated` + sections Building/Learning/Reading.
- [x] `src/app/now/page.tsx` - server component; `export const metadata`; prominent `lastUpdated`.
- [x] `src/components/Footer.tsx` - add `/now` (and `/uses`) to `quickLinks`; cross-link `/uses` from `/about`.
- [x] `src/app/sitemap.ts` - append `/uses` + `/now` to `basePages`.
- [x] Verify: `npm run lint && npm run build`; manual — both pages render dark+light; appear in `/sitemap.xml`; footer links work. **Verified: build produces static `/uses` and `/now` routes, both URLs confirmed present in generated `sitemap.xml`; pages use only theme CSS vars (`--bg-primary`/`--accent`/`--border-color`/`--text-*`) matching `/about`'s dark-default + light-toggle pattern, no hardcoded colors.**

### Phase 6: Polish, perf & a11y (mobile Perf target blocked — pre-existing, see note)

- **Goal**: Meet Lighthouse targets; no regressions.
- [x] `src/app/page.tsx` - optional compact tech-stack strip (Flutter/Dart/Riverpod/Drift/Supabase/RevenueCat/GitHub Actions/Next.js), atelier palette.
- [x] Image audit - confirm below-fold `loading="lazy"` / `priority={false}`; only true LCP images `priority`; no CLS. **Audited all `<Image>` usages: `PhoneScreenshot`/`CardImage` project cards/screenshot gallery/lightbox all default to lazy (no `priority` in mapped lists); every `priority` usage is a genuine single above-fold hero/cover image (or a responsive `hidden`/`lg:hidden` pair of the same hero image, only one visible at a time). CLS = 0 in Lighthouse.**
- [x] Both-theme check across all new UI (form, chips, pages, CTAs). **All Phase 1-5 additions use existing theme vars (`--bg-primary`/`--accent`/`--border-color`/`--text-*` on non-home routes, `--cream`/`--ink`/`--atelier-accent`/`--line`/`--muted` on home) with zero hardcoded colors — confirmed by reading every new/changed block; no separate dark/light branching needed since all vars already flip with the `.dark` class / atelier page has one fixed warm palette by design.**
- [ ] Verify: `npm run lint && npm run build`; Lighthouse `/` mobile+desktop — Perf ≥90, A11y ≥95, Best-Practices ≥95, SEO ≥95. **BLOCKED (mobile Performance target only): `npm run lint`/`npm run build` pass. Ran `npx lighthouse` against a local production build — mobile Performance 80 / A11y 100 / Best-Practices 100 / SEO 100; desktop Performance 100 / A11y 100 / Best-Practices 100 / SEO 100. A11y/BP/SEO exceed target on both form factors. Mobile Performance (80) is below the ≥90 target. Confirmed via the pre-Phase-1 baseline commit (`df0cb16`) benchmarked in an isolated worktree, which also scored 80 on mobile with an identical ~5s LCP — root cause is the hero `<h1>` being wrapped in a Framer Motion `initial={{opacity:0}}` mount animation (text only paints after JS hydrates + animates in), a site-wide pattern predating this spec. Fixing it requires a hero-animation redesign (e.g. CSS-driven reveal instead of JS-gated opacity), which is out of scope for a "polish" phase and needs explicit owner sign-off before a broader animation-architecture change. One real regression from this plan's own work WAS found and fixed here: bundling `ContactForm`'s JS unconditionally cost ~0.8s of mobile FCP even while gated off (no Web3Forms key configured) — fixed via `next/dynamic` code-splitting, restoring mobile Performance to the 80 baseline (verified before/after).**

## Risks / Out of scope

- **Risks**: (1) Home hero socials — `SocialIcon` themed vars may not resolve on atelier palette; use inline atelier icons or className overrides. (2) Web3Forms deliverability/rate-limits — keep mailto fallback prominent. (3) Owner-supplied assets missing at ship → gating must hide cleanly (verify each).
- **Out of scope**: already-built items (Play Store links, socials, case-study pages, home blog section, `/about`, Person/Brand JSON-LD, non-generic meta); the "Dev Discipline" Flutter-app UX redesign (separate mobile repo/spec); fabricated metrics/testimonials; any backend/DB beyond public Web3Forms key.
