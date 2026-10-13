# PRD: Personal Portfolio Website ("mnmlst.")

> **How to use this file with Antigravity:** put this file in the project root as `PRD.md`, then paste the **Kickoff Prompt** below into the agent. Ask it to work phase by phase (see section 14) and to stop for review after each phase.

---

## 0. Kickoff Prompt (paste this into Antigravity)

```
Read PRD.md in the project root completely before writing any code.

Context: I already have a React + Tailwind CSS project set up, and the Home page is
already built and finished. DO NOT rewrite, restyle or restructure the existing Home
page, Navbar or Footer. Inspect the existing code first, reuse its Tailwind tokens,
fonts, colors and components, and build every new page to match it exactly.

Your job: build the remaining pages and features described in PRD.md, following the
design system (section 5), the folder structure (section 7) and the build phases
(section 14). Work one phase at a time. After each phase, run the dev server, check
the pages in the browser at mobile, tablet and desktop widths, fix any problems, and
summarize what you did before moving on. Ask me before adding any dependency that is
not listed in the PRD.
```

---

## 1. Overview

A single-owner personal portfolio website with a **minimal, editorial, black-and-white-photo-meets-yellow** look. Tagline on the Home page: **"less is more."**

The site presents who I am, what I do, selected work, and how to hire or contact me. It must feel calm, confident and fast, with lots of whitespace, big bold typography, and one strong accent color.

| Item | Value |
|---|---|
| Brand / logo text | `mnmlst.` (lowercase, heavy weight, trailing dot) |
| Owner | `[YOUR NAME]` |
| Role / title | `[YOUR ROLE, e.g. Frontend Developer / Designer]` |
| Location | `[CITY, COUNTRY]` |
| Email | `brandswaying@gmail.com` |
| Primary goal | Get visitors to view work and send an inquiry |

## 2. Goals and Non-Goals

**Goals**
- Present work in a way that is quick to scan and memorable.
- Convert visitors into contact inquiries (clear CTA on every page).
- Be fully responsive, accessible, and fast (Lighthouse 90+ on all four scores).
- Be easy to update: all content (projects, services, links) lives in data files, not hard-coded in components.

**Non-Goals (v1)**
- No user accounts or login.
- No CMS or admin dashboard (content is edited in `src/data/`).
- No e-commerce or payments.

## 3. Target Users

1. **Recruiters / hiring managers**: want to see skills and best projects in under a minute.
2. **Clients / founders**: want to see services, process and proof, then contact me.
3. **Peers / collaborators**: want to see personality, writing and links.

## 4. Sitemap and Navigation

```
/                      Home           (ALREADY BUILT, do not change)
/work                  Work (all projects, filterable)
/work/:slug            Project case study (detail page)
/services              Services / what I offer
/about                 About me
/contact               Contact
/blog                  Blog (optional, Phase 6)
/blog/:slug            Blog post (optional, Phase 6)
*                      404 page
```

**Navbar** (already built; keep exactly as is): logo `mnmlst.` on the left, centered links, hamburger on the right.
The links are driven by `src/data/navLinks.js`. Update that file so the labels and paths match the routes above:

`HOME → /`, `WORK → /work`, `SERVICES → /services`, `ABOUT → /about`, `CONTACT → /contact`

(If I prefer to keep the original labels PRODUCT / STORE / ABOUT US, only the label text changes, not the layout.)

The hamburger opens a full-screen mobile menu overlay (see 6.8).

## 5. Design System (must match the existing Home page)

### 5.1 Colors (add to `tailwind.config.js` under `theme.extend.colors` if not already there)

| Token | Hex | Use |
|---|---|---|
| `brand-yellow` | `#E8B93A` | Accent: circles, highlights, hover states, buttons |
| `brand-bg` | `#EFEFEF` | Page background |
| `brand-ink` | `#1A1A1A` | Text, icons, dark buttons |
| `brand-white` | `#FFFFFF` | Cards on grey background |
| `brand-muted` | `#6B6B6B` | Secondary text |

Dark mode is **not** required in v1.

### 5.2 Typography
- Font: **Montserrat** (Google Fonts), weights 400, 500, 600, 700, 800.
- Logo and big headlines: weight 800, tight tracking (`tracking-tight`), tight leading (`leading-[0.9]`).
- Nav links: uppercase, weight 500, letter-spacing slightly wide.
- Body: weight 400, 16-18px, line-height 1.6.
- Page titles: `text-5xl md:text-7xl lg:text-8xl font-extrabold`, lowercase with a trailing dot, same style as "less is more."

### 5.3 Visual language
- Generous whitespace, content max-width about 1200-1280px, side padding 24px mobile / 40px desktop.
- **Signature motif:** a large solid yellow circle behind black-and-white (greyscale) photos. Reuse it on About and on project hero images.
- All photos are black-and-white; color comes only from yellow.
- Corners: images/cards use no or small radius (`rounded-none` / `rounded-md`); buttons are pill-shaped (`rounded-full`).
- Buttons: primary = `bg-brand-ink text-white` pill, hover turns `bg-brand-yellow text-brand-ink`; secondary = outlined pill.
- Links: underline slides in on hover. "Read More" style = bold, small, underlined.

### 5.4 Motion
- Subtle only: fade/slide-up on scroll (150-300 ms), image hover scale 1.03, underline transitions.
- Page transitions: simple fade.
- Respect `prefers-reduced-motion` (disable animations when set).

### 5.5 Breakpoints
Tailwind defaults: `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Mobile-first. Nothing may scroll horizontally at any width.

## 6. Pages and Features

### 6.1 Home `/` (already built)
Navbar, left text block with "Read More", yellow circle with portrait, "less is more." headline, social icons bottom-left, location bottom-right.
**Only allowed changes:** make "Read More" link to `/about`, and make sure social icons use real URLs from `src/data/socials.js`. Make sure it is responsive on mobile if it is not already (stack: headline, portrait, text).

### 6.2 Work `/work`
- Page title: **"work."** with a one-line intro.
- Filter chips (All, Web, UI/UX, Branding, etc.) generated from the `category` field in `projects.js`. Filtering is instant, with no page reload.
- Responsive grid: 1 col mobile, 2 cols tablet, 2-3 cols desktop.
- **ProjectCard:** greyscale thumbnail with the yellow circle peeking behind/corner, title, category, year. On hover: image goes slightly zoomed and the title gets a yellow underline; a small arrow appears.
- Clicking opens `/work/:slug`.

### 6.3 Project Detail `/work/:slug`
- Hero: project title (huge), category, year, role, tools used, live link and GitHub link buttons.
- Large cover image on a yellow circle background.
- Sections: **Overview, Problem, Process, Solution, Results**, each with a short heading and paragraphs; image gallery (full-width and 2-column images).
- Tech stack as pill tags.
- Bottom: **Next project** large link (cycles to the first project after the last).
- If the slug is not found, show the 404 page.

### 6.4 Services `/services`
- Title: **"services."** plus intro sentence.
- 3-6 service blocks (e.g. Web Development, UI/UX Design, Branding, Landing Pages), each with a number (01, 02, ...), title, short description, and a list of what is included.
- **Process** strip: 4 steps (Discover → Design → Build → Launch), horizontally on desktop, stacked on mobile.
- Optional pricing/"starting from" note per service (data-driven, hide if empty).
- CTA block: "Have a project in mind?" with a button to `/contact`.

### 6.5 About `/about`
- Title: **"about."**
- Two-column layout: a greyscale portrait on a yellow circle (use the 8K transparent PNG cut-out already created: `src/assets/images/hero-portrait.png`), and a bio (3 short paragraphs, first person, minimal tone).
- **Quick facts** row: location, years of experience, projects completed, availability status ("Available for freelance").
- **Skills** grouped (Frontend, Design, Tools) shown as clean pills, not progress bars.
- **Experience / education** timeline: simple vertical list with year, role, company.
- Button: "Download CV" (links to `/public/cv.pdf`) and a "Let's talk" button to `/contact`.

### 6.6 Contact `/contact`
- Title: **"contact."**
- Left: short friendly line, email (click to copy with a small "Copied!" toast), location, social links.
- Right: form with fields **Name, Email, Subject (optional), Message**, and a submit button.
- Validation: required fields, valid email format, message min 10 characters, inline error text, disabled button while sending.
- Submission: use **Formspree** or **EmailJS** (configurable through `.env` variable, e.g. `VITE_FORM_ENDPOINT`). Show success and error states on the page. Add a hidden honeypot field for spam.
- Never commit keys; provide `.env.example`.

### 6.7 Blog `/blog` and `/blog/:slug` (optional, Phase 6)
- List of posts (title, date, reading time, excerpt) as clean rows with large titles.
- Posts stored as Markdown/JSON in `src/data/posts.js` (or `.md` files rendered via `react-markdown`).
- Post page: narrow reading column (max-w-2xl), big title, date, content, "Back to blog".

### 6.8 Global components
- **Navbar:** existing. Add active-link indicator (yellow dot or underline). Becomes sticky/transparent on scroll with slight blur only if it does not change the existing look.
- **Mobile menu:** full-screen overlay, large uppercase links stacked, yellow circle in the background, close button replaces the hamburger, locks body scroll, closes on route change and on `Esc`.
- **Footer:** social icons (left), location (right) matching Home. On inner pages also add a small "© year mnmlst." line and a back-to-top link.
- **Scroll to top** on route change.
- **404 page:** huge "404." with the yellow circle, text "this page left the building.", and a "Back home" button.
- **Page loader (optional):** short logo fade-in.
- **SEO component:** per-page `<title>`, meta description, Open Graph tags (use `react-helmet-async`).

## 7. Tech Stack and Folder Structure

- React 18+ (Vite), Tailwind CSS (already installed), **react-router-dom** v6 for routing.
- Animations: CSS transitions + optional **framer-motion** (ask before installing).
- Icons: `react-icons` (Fa/Fi sets) for socials and arrows.
- Forms: native React state (no heavy form libs).
- SEO: `react-helmet-async`.
- Language: JavaScript (JSX). TypeScript is not required.

```
src/
├── assets/
│   ├── images/          # hero-portrait.png, project covers, gallery images (all greyscale)
│   └── icons/
├── components/
│   ├── layout/          # Navbar, MobileMenu, Footer, PageLayout
│   ├── sections/        # Hero (exists), ServicesList, ProcessSteps, SkillsGrid, Timeline, CTA
│   └── ui/              # Button, SocialIcons, ProjectCard, FilterChips, Tag, Toast, SectionTitle, YellowCircle
├── pages/
│   ├── Home.jsx         # exists
│   ├── Work.jsx
│   ├── ProjectDetail.jsx
│   ├── Services.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Blog.jsx         # optional
│   ├── BlogPost.jsx     # optional
│   └── NotFound.jsx
├── data/
│   ├── navLinks.js
│   ├── socials.js
│   ├── projects.js
│   ├── services.js
│   ├── skills.js
│   ├── experience.js
│   └── posts.js         # optional
├── hooks/
│   ├── useScrollReveal.js
│   └── useScrollToTop.js
├── styles/index.css
├── App.jsx              # <Routes> definitions
└── main.jsx             # BrowserRouter + HelmetProvider
```

Reusable pieces to create first: `Button`, `SectionTitle`, `YellowCircle`, `PageLayout` (wraps Navbar + page + Footer), because every page uses them.

## 8. Data Models

```js
// projects.js
{
  slug: "project-one",            // used in URL
  title: "Project One",
  category: "Web",                // used for filters
  year: 2026,
  role: "Design & Development",
  tools: ["React", "Tailwind", "Figma"],
  cover: "/src/assets/images/projects/project-one-cover.jpg",
  gallery: ["...", "..."],
  summary: "One sentence for the card.",
  overview: "...", problem: "...", process: "...", solution: "...", results: "...",
  liveUrl: "https://...", githubUrl: "https://...",
  featured: true
}

// services.js
{ id: "01", title: "Web Development", description: "...", includes: ["...", "..."], startingFrom: "" }

// socials.js
{ name: "Instagram", url: "https://...", icon: "FaInstagram" }

// experience.js
{ period: "2024 - Present", role: "...", company: "...", description: "..." }
```

Use **placeholder content** (3-6 projects, clearly marked `TODO: replace`) so the site works out of the box. Greyscale placeholder images are fine.

## 9. Content Rules
- Tone: calm, confident, short sentences, lowercase headings with a trailing dot.
- No lorem ipsum on finished pages (the Home placeholder text should be replaced with a real 2-3 line intro).
- Every page ends with a CTA to `/contact`.

## 10. Accessibility
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`), one `h1` per page.
- Keyboard navigable, visible focus ring (yellow outline), skip-to-content link.
- Alt text on all images; `aria-label` on icon-only buttons (hamburger, socials).
- Color contrast AA: dark text on grey/yellow is fine; never use yellow text on grey.
- Forms: labels linked to inputs, errors announced with `aria-live`.

## 11. Performance
- Lazy-load route components with `React.lazy` + `Suspense`.
- Images: compressed `.webp` where possible, explicit `width`/`height`, `loading="lazy"` below the fold. Large hero PNG must be resized/compressed to a sensible web size (about 1200-1600 px) before use; **do not ship the 8K file to the browser**.
- Preload the Montserrat font and use `font-display: swap`.
- Keep the JS bundle small; no unnecessary libraries.

## 12. SEO and Meta
- Unique title and description per page, Open Graph image, favicon, `robots.txt`, `sitemap.xml`.
- Clean URLs, 404 for unknown routes.
- Add `public/_redirects` (Netlify) or `vercel.json` rewrite so deep links work with client-side routing.

## 13. Deployment
- Target: **Vercel** or **Netlify** (free tier), connected to the GitHub repo.
- Env variables: `VITE_FORM_ENDPOINT`.
- Provide a short `README.md` with setup, dev, build and deploy steps and how to edit content in `src/data/`.

## 14. Build Phases (work in this order, review after each)

1. **Foundation:** inspect the existing Home, confirm Tailwind tokens/fonts, install `react-router-dom`, set up routes in `App.jsx`, `PageLayout`, `useScrollToTop`, 404 page, and update `navLinks.js`. Home must still look identical.
2. **Shared UI:** `Button`, `SectionTitle`, `YellowCircle`, `Tag`, `SocialIcons`, `Toast`, mobile menu, footer variant for inner pages.
3. **Work + Project Detail:** `projects.js` with placeholder data, filters, cards, detail page, next-project link.
4. **About + Services:** content sections, timeline, skills, process steps, CTA blocks.
5. **Contact:** form, validation, submission, email copy button, success/error states.
6. **Polish:** scroll-reveal animations, SEO component, accessibility pass, performance pass (lazy loading, image optimization), responsive QA at 375, 768, 1024, 1440 px.
7. **Optional Blog**, then final README and deployment config.

## 15. Acceptance Criteria (definition of done)
- [ ] All routes in section 4 work, including direct visits/refresh on deep links.
- [ ] Existing Home page is visually unchanged (except the small allowed edits in 6.1).
- [ ] Every page matches the design system and is fully responsive from 360 px to 1920 px with no horizontal scroll.
- [ ] Mobile menu works (open, close, Esc, route change, scroll lock).
- [ ] Work filters work; project detail renders from data and handles unknown slugs.
- [ ] Contact form validates, submits, and shows success and error states.
- [ ] No console errors or warnings; `npm run build` succeeds.
- [ ] Lighthouse 90+ for Performance, Accessibility, Best Practices and SEO on desktop.
- [ ] All content is editable from `src/data/` without touching components.

## 16. Placeholders to fill in before launch
- `[YOUR NAME]`, `[YOUR ROLE]`, `[CITY, COUNTRY]`
- Real social URLs, real project content and images, `cv.pdf`
- Form endpoint (`VITE_FORM_ENDPOINT`)
- Real 2-3 line intro to replace the lorem ipsum on Home
