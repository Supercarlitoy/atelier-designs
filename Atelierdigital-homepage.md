# Homepage Redesign Spec — Vide Infra Reference

## Hero / Landing Section

- **Background**: Desktop horizontal gradient `#C4C6C7 → #CCCECF`; **Mobile vertical** `#C7C9CA → #BEBFC0`.
- **Primary Headline**:
  - Line 1: `Designers. Curated.` — **black** `#000000`, bold.
  - Line 2: `Melbourne.` — **pure white** `#FFFFFF`.
  - **Typography (display):** Neue Haas Grotesk / Helvetica Neue (or licensed equivalent).
  - **Body font:** Inter.
  - Size: H1 clamp 42px → 170px; tight leading `~0.95`.
  - Alignment: **Left-aligned**; vertically centered within hero.
- **Supporting Text (right block)**: small paragraph in black `#000000` emphasising curation & lead quality.
- **Visual Motif**: Overlapping thin circles (faint grey outlines) positioned bottom-left of hero.
- **A11y**: One **H1** in hero; semantic landmarks (`<header> <nav> <main> <footer>`).
- **Analytics**: `page_view` on load.

## Search Bar Section (Part of Landing Screen)

- **Visible on first paint (above the fold)**; sits directly **beneath the hero copy**.
- **Background Separation**: hard boundary between grey hero and **full-width black strip**.
- **Black strip**: `#000000` spanning full width.
- **Search Bar**:
  - Full‑width, centered container (max‑width ≈ 1200px; horizontal padding 24–40px).
  - **Input**: background **lightest grey** `#E6E6E6`, text `#000000`, placeholder `#BDBDBD`, height 48–56px, rounded.
  - **Button**: background `#FFFFFF`, text `#000000`, same height as input.
- **Behaviour**: Autosuggest with `aria-live="polite"`; submit → `/search?q=...` and fire `hero_search_submit`.
- **Mobile**: Stack input over button; preserve ≥48px tap targets.
- **A11y**: Labeled input and button.
- **Analytics**: `hero_search_submit { query, method }`.

## Navigation (Top Bar)

- **Style**: Sticky on scroll (desktop); compact heights 56px mobile / 72px desktop.
- **Font**: Inter for nav items; medium (500).
- **Desktop items**: Logo (left) → Nav links (center) → Actions (right).
- **Dropdown (Designers)**:
  - Replace **Expertise** with **Designers** + chevron.
  - On click/enter, open full‑width white panel listing **Top designers**; 2–3 columns of large links; includes “View all designers →”.
  - A11y: trigger `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`; panel `role="listbox"`, labelled by trigger; closes on `Esc`/outside click; focus returns to trigger.
  - Analytics: `nav_designers_open/close`, `nav_designer_click { designer_id, slug, rank, source }`.
- **Mobile menu**:
  - Hamburger opens **full‑screen overlay** sliding **left → right** with **giant text links**.
  - Contains a **Top designers** block mirroring desktop list.
  - Close on `Esc`, outside click, or close button; focus trap enabled.

## Colours

- **Hero gradient (desktop)**: `#C4C6C7 → #CCCECF`.
- **Hero gradient (mobile)**: `#C7C9CA → #BEBFC0`.
- **Headline black**: `#000000`.
- **Headline white**: `#FFFFFF`.
- **Body text**: `#000000`.
- **Black strip background**: `#000000`.
- **Input grey**: `#E6E6E6`.
- **Placeholder grey**: `#BDBDBD`.
- **Divider**: `rgba(17,17,17,0.06)`.
- **Focus ring**: `#0057FF`.

## Typography

- **Display (hero)**: Neue Haas Grotesk / Helvetica Neue (or licensed equivalent), 800–900 weight.
- **Body**: Inter 400–500.
- **Sizes**:
  - H1: `clamp(42px, -3.07px + 9vw, 170px)`; leading ≈ 0.95.
  - Paragraph: 16px desktop; 14–16px mobile.
- **Nav**: uppercase allowed; tracking tightened; focus-visible rings.

## Accessibility

- One H1 in hero; semantic landmarks everywhere.
- Keyboard access for nav, dropdown, overlays; focus trap and `Esc` to close.
- `prefers-reduced-motion`: **disable** all parallax and animations.
- Contrast meets WCAG AA; reserve image aspect ratios to avoid CLS.

## Analytics (Homepage)

- `page_view` on load with page meta.
- `hero_search_submit { query, method }`.
- `hero_claim_click { source: 'hero' }`.
- `nav_designers_open/close`.
- `nav_designer_click { designer_id, slug, rank, source }`.
- `reveal_view { id, section, index }`.

## Notes

- Hero layout and typography directly reference **Vide Infra** design [Vide Infra at Awwwards](https://www.awwwards.com/sites/vide-infra-1)【116†source】.
- Search bar is part of the **landing screen** and uses black/grey separation.
- Dropdown adapted to serve **Designer curation** purpose.

---

## Motion & Scroll System (Desktop‑first, mobile‑considered)

- Parallax tokens p0–p4; reveal‑on‑scroll; menu & overlay transitions; sticky strips; hover states. Disabled with reduced motion.
- Budgets: CLS ≤0.05, LCP ≤2.0s, INP ≤200ms.

---

## Featured Designers — Carousel (Phase 2)

Real Melbourne studios and designers seeded for launch.

### Entries

1. **Chromatix** (Camberwell)\
   Services: Web design, UX/UI, web development, conversion strategy.\
   [chromatix.com.au](https://www.chromatix.com.au/)\
   Short bio: Melbourne-born web-only specialists.\
   Rating \~4.9.

2. **Luminary** (Melbourne CBD)\
   Services: Digital strategy, UX, digital design, web development.\
   [luminary.com](https://www.luminary.com/)\
   Short bio: Full-service digital agency, enterprise focused.\
   Rating \~4.8.

3. **Brandwell** (Collingwood)\
   Services: Brand identity, strategy, packaging, web.\
   [brandwell.com.au](https://brandwell.com.au/)\
   Short bio: Award-winning branding studio.\
   Rating \~4.7.

4. **Emote Digital** (Hawthorn)\
   Services: Brand & digital, UX, eCommerce, marketing.\
   [emotedigital.com.au](https://www.emotedigital.com.au/)\
   Short bio: Results-focused digital agency.\
   Rating \~4.7.

5. **Willow & Blake** (Richmond)\
   Services: Branding, strategy, visual identity, voice, digital.\
   [willowandblake.com](https://willowandblake.com/)\
   Short bio: Creative branding agency.\
   Rating \~4.6.

### Spec

- **Layout:** Horizontal carousel on mobile; grid on desktop.
- **Card:** Image, name, services, suburb, rating, CTAs: *Contact*, *View profile*.
- **Motion:** Parallax images, reveal-on-scroll, hover scale 1.02.
- **A11y:** Role list/listitem; buttons labelled; contact opens modal with focus trap.
- **Analytics:** `featured_profile_view`, `profile_contact_click`.
- **Data contract:** (see JSON below).

---

## How It Works (Phase 2)

### Steps

1. **Discover** — “Browse Melbourne’s curated designers by style and suburb.”
2. **Connect** — “Shortlist and contact verified designers securely.”
3. **Hire** — “Start projects with clarity. Designers manage their profile, portfolio, and services.”

### Designer Callout

- Text: “Are you a designer? Apply to be curated and claim your profile.”
- CTA: **Claim Your Profile** → `/claim`.
- Analytics: `profile_claim_click { source:'how_it_works' }`.

### Profile System (Claim + Signup)

- **Claim flow**: `/claim?slug=:designer` → verify ownership → profile created/managed.
- **New signup flow**: `/signup` → create account → auto-create profile in **DRAFT** with signup data.
- **Auto-populate fields**: name, role, suburb, services[], socials, website, avatar/cover. Import thumbnails from provided social links. Add platform logo watermark to OG image.
- **Workflow states**: `DRAFT → UNDER_REVIEW → PUBLISHED | REJECTED`. Editable in DRAFT/UNDER\_REVIEW.
- **Profile editor**: inline editing for bio, services, location, portfolio; live OG preview.
- **Sharing**: OG/Twitter meta with brand logo; share buttons (LinkedIn, X/Twitter, FB, copy link).
- **APIs**:
  - `POST /api/auth/signup` → creates user.
  - `POST /api/profiles` → auto-create draft profile with signup entries.
  - `PUT /api/profiles/:id` → edits.
  - `POST /api/profiles/:id/submit` → submit for review.
  - `POST /api/profiles/:id/share/og` → generate OG with logo.
- **Data model**:
  - `users(id,email,name,role,created_at)`
  - `profiles(id,user_id,name,slug,suburb,services[],bio,avatarUrl,coverUrl,website,socials{},state,created_via,created_at)`
  - `portfolio_items(id,profile_id,kind,url,title,thumbUrl,order)`
- **Analytics**:
  - `signup_complete { source:'signup' }`
  - `profile_created { created_via:'signup'|'claim' }`
  - `profile_submit_review { profile_id }`
  - `profile_publish { profile_id }`
  - `profile_share_click { platform, profile_id }`

---

## Lead Capture CTA (Phase 2)

- **Purpose**: Replace pricing teaser with strong lead generation focus.
- **Layout**: Full-width strip, contrasting background (e.g., brand accent or light grey).
- **Content**:
  - Headline: “Request connected designers.”
  - Subtext: “Tell us your project. We’ll match you with curated designers in Melbourne.”
  - CTA button: **Request a Brief** → opens modal form.
- **Form (modal)**:
  - Fields: name, email, suburb, services needed, project brief (textarea).
  - Inline validation; consent checkbox for marketing/analytics.
  - Success confirmation: inline success message + email confirmation.
- **Accessibility**: modal focus trap, labels on all inputs, `aria-modal=true`, Esc to close.
- **Analytics**:
  - `lead_cta_open`
  - `lead_submit { success, source:'lead_strip' }`

---

## Testimonials / Reviews (Phase 2)

- **Purpose**: Social proof from clients, reinforcing trust.
- **Layout**:
  - Mobile: stacked quotes (1 per row).
  - Desktop: carousel with 2–3 testimonials visible.
- **Content**: reviewer name, role/suburb, quote text, verified tag.
- **SEO**: add `schema.org/Review` structured data to page HTML.
- **Accessibility**: `role="region" aria-label="Testimonials"`; keyboard navigable carousel controls.
- **Motion**: reveal-on-scroll with fade/slide transitions.
- **Analytics**: `review_view`, `review_click` if CTA present.

---

## Latest Case Studies / Projects (Phase 3)

- **Purpose**: Depth + SEO; show recent work and drive profile clicks.
- **Layout**: Grid (mobile 2 cols → desktop 3+). Reserved aspect‑ratio boxes to avoid CLS.
- **Card**: Cover image, title, short excerpt, tags, link → `/case-studies/:slug`.
- **Motion**: Reveal‑on‑scroll; image parallax `p1`.
- **SEO**: Each detail page includes structured data (`Article`/`CreativeWork`), breadcrumb JSON‑LD.
- **A11y**: Each card is a link with descriptive `aria-label`.
- **Analytics**: `project_view { slug }`, `project_click { slug }`.
- **Data contract**:

```json
[
  {"id":"cs_001","slug":"brand-refresh-fitzroy","title":"Brand refresh for a Fitzroy studio","coverUrl":"https://.../fitzroy.jpg","excerpt":"Positioning and visual identity overhaul.","tags":["Brand","Identity"],"designer_slug":"brandwell"}
]
```

- **API**: `GET /api/case-studies?limit=6`

## Newsletter Signup (Phase 3)

- **Purpose**: Grow audience for updates and featured profiles.
- **Layout**: Minimal form (email + submit), centered block; success + error states.
- **Integration**: Resend/Mailchimp; double opt‑in implied.
- **A11y**: `<form aria-label="Newsletter signup">`; input has visible label; status `aria-live="polite"`.
- **Security**: Rate‑limit; email validation client + server.
- **Analytics**: `newsletter_subscribe { source:'homepage' }` (hash email client‑side if logged).
- **API**: `POST /api/newsletter/subscribe` → `{ ok:true }` on success.

## Footer (Phase 3)

- **Purpose**: Navigation + trust + legal.
- **Contents**: About, Privacy, Terms, Contact, Careers; Social links with `aria-label`.
- **Extras**: Curated stamp + small copyright; ABN if applicable.
- **Layout**: 3–4 column grid desktop; stacked mobile.
- **A11y**: `<footer role="contentinfo">`; visible focus rings; external links marked.
- **SEO**: Link to sitemap.xml and robots.txt; canonical already handled.
- **Analytics**: `footer_link_click { href, label }`.

## Phase 3 QA Checklist

- Case Studies grid responsive with reserved image boxes; no CLS > 0.05.
- Newsletter form validates and posts; success + error announced via live region.
- Footer links accurate; social links keyboard accessible; legal pages exist.
- All new events fire via `track()`; reduced‑motion respected for reveals/parallax.

