# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Next.js, localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (flat config: next/core-web-vitals + next/typescript)
```

No test suite is configured. There is one standalone verification script:

```bash
node scripts/verify-resume.mjs   # headlessly renders both resume PDFs, reports page counts to .resume-verify/
```

Run this after editing either resume YAML file or either `ResumePDF*.tsx` component — it's the only way to catch page-overflow before shipping (a resume that spills to a second page is a silent visual bug, not a crash).

## Architecture

This is a personal portfolio site (jacy-li.com) built with Next.js 15 App Router, React 19, Tailwind CSS 4, and Framer Motion.

### i18n: cookie-based, not URL-based

Locale is **not** in the URL (no `/en`, `/zh` segments, no middleware). It's stored in a `locale` cookie and read server-side:

- `src/i18n/request.ts` reads the `locale` cookie (default `"en"`) and loads `messages/{locale}.json`.
- `next.config.ts` wires this up via `createNextIntlPlugin("./src/i18n/request.ts")`.
- `src/app/layout.tsx` wraps everything in `NextIntlClientProvider`, `lang="en"` is hardcoded on `<html>` regardless of active locale.
- `src/components/LocaleSwitcher.tsx` sets the cookie client-side and calls `router.refresh()` — no navigation occurs.
- Translation strings live in `messages/en.json` and `messages/zh.json` (flat namespaced JSON: `hero`, `about`, `nav`, `experience`, `portfolio`, `contact`, `contactForm`).

Two now-stale docs in the repo root (`I18N_IMPLEMENTATION_SUMMARY.md`, `I18N_COOKIE_BASED_SETUP.md`) describe the migration from the old `[locale]`-routed setup to this one; only the cookie-based approach reflects current code.

### Resume PDFs: YAML data, duplicated rendering logic

Resume content is data-driven from YAML, but rendered by **two independent implementations** that must be kept in sync manually:

- `src/app/contents/resume-pdf.yml` / `resume-pdf-zh.yml` — resume content (jobs, education, skills), loaded via `js-yaml-loader` (registered as a webpack rule in `next.config.ts`, typed via `src/types/yaml.d.ts`).
- `src/components/ResumePDF.tsx` / `ResumePDFZH.tsx` — `@react-pdf/renderer` components (English/Chinese), each with their own `StyleSheet` and JSX layout. Rendered client-only (`dynamic(..., { ssr: false })`) inside `src/app/resume/page.tsx`, which picks EN or ZH based on the active locale.
- `scripts/verify-resume.mjs` — a **third, hand-duplicated copy** of both documents' render trees (using `createElement` instead of JSX, fonts loaded from `public/fonts/*.ttf` on disk) so PDFs can be rendered headlessly outside the browser to check page count. If you change layout/styles in `ResumePDF.tsx` or `ResumePDFZH.tsx`, mirror the change here too or the verification script will silently check stale layout.

The Chinese variant differs structurally from English beyond translation: it uses a `MultilineText` helper (splits on the literal string `"br"` for line breaks) and a bulleted `bulletRow`/`bulletSymbol`/`bulletText` layout not present in the English version, because CJK text wrapping needed different handling.

### Page structure

- `src/app/page.tsx` — single-page scrollytelling home page. Sections (`Hero`, `About`, `Experience`, `Portfolio`, `Contact`) are stacked with `position: sticky` + `z-index` layering and negative margins so each section slides over the previous one on scroll; z-index order is load-bearing (see comments in `page.tsx`) — reordering sections requires re-checking the sticky/z-index stack, not just moving JSX.
- `src/components/layout/ConditionalLayout.tsx` — wraps all routes in `Nav`/`Footer` except `/resume`, which renders standalone (it's meant to be a printable/embeddable PDF viewer page, not a site page).
- `src/components/index.ts` is the single barrel export for all components — new components should be added here rather than imported by path elsewhere. Note the `ResumePDF` export is deliberately aliased to `./ResumePDFZH` (not the English `./ResumePDF.tsx`), so `import { ResumePDF } from "@/components"` gets the Chinese variant; import `ResumePDF.tsx` directly by path for the English one.
- `src/data/portfolio.ts` — static portfolio project data (typed via `PortfolioItem` in `src/types/index.ts`), consumed by `PortfolioSection`/`PortfolioCard`.

### Contact form

`src/app/contact/ContactForm.tsx` sends mail client-side via `@emailjs/browser`, reading `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` from env (see `.env.example`). No server-side email handling exists.

### Path aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`).
