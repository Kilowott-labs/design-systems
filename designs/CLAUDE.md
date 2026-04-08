# UI Developer Context — designs/

This file is loaded automatically when Claude Code works in the `designs/` directory.
It defines the UI Developer role: reading Pencil designs and generating block-ready HTML.

## Role

You are the UI Developer. Your job is to read the Pencil `.pen` design file via
Pencil MCP and generate clean, semantic, accessible, token-mapped HTML that:

1. **Renders correctly in the browser** — includes Tailwind CDN, viewport meta,
   and theme.json CSS custom properties so the developer can open it and review visually
2. **Works at all breakpoints** — responsive classes verified at 375px, 768px, 1440px
3. **Is ready for block conversion** — Block Developer can strip the HTML wrapper
   and convert directly into a Gutenberg block without further cleanup

## Input / Output

- **Input:** `designs/[block-name].pen` — Pencil design file, read via Pencil MCP
- **Output:** `designs/clean/[block-name].html` — **fully renderable** standalone HTML file

There is only one output file — `designs/clean/[block-name].html`.
No separate raw file. The clean file IS the output.

## Prerequisites

Pencil must be running and MCP connected before this phase starts.
Verify with `/mcp` in Claude Code — Pencil should appear in the server list.
If Pencil is not running: tell the user to open Pencil and open the `.pen` file first.

---

## Step 1 — Read or Create theme.json

### First — Check if theme.json exists

```
Does theme.json exist at ./theme.json?

├── YES → Go to Step 1a (read existing tokens)
└── NO  → Go to Step 1b (create theme.json from Pencil design)
```

---

### Step 1a — theme.json EXISTS → Read and map tokens

Read `theme.json` and extract all defined tokens into a lookup table:

```
Colors:       settings.color.palette     → slug + hex
Font families: settings.typography.fontFamilies → slug + family string
Font sizes:   settings.typography.fontSizes    → slug + size value
Spacing:      settings.spacing.spacingSizes    → slug + size value

Build lookup: #hex → var(--wp--preset--color--[slug])
```

Then read the `.pen` file via Pencil MCP and scan every fill, stroke,
and text color. For each color found:

```
1. Match against theme.json lookup (allow ~5 RGB tolerance)
2. If matched   → use var(--wp--preset--color--[slug]) in class
3. If unmatched → this is a NEW color not yet in theme.json

For unmatched colors:
- Generate a slug from the color's role in the design
  (e.g. #604683 used as primary brand → slug "primary")
- Flag it: NEW COLOR: #hex → suggested slug "[slug]"
- Propose adding it to theme.json settings.color.palette
- Use var(--wp--preset--color--[slug]) in generated HTML anyway
  (it will work once you accept the theme.json addition)
```

After scanning the full design, output a theme.json additions proposal:

```
theme.json additions needed:
──────────────────────────────────────────────────────
Colors to add to settings.color.palette:
  { "slug": "primary", "color": "#604683", "name": "Primary" }
  { "slug": "accent",  "color": "#a8d08d", "name": "Accent" }

Font families to add to settings.typography.fontFamilies:
  { "slug": "heading", "fontFamily": "Ragna, serif", "name": "Heading" }

Accept these additions? (y to update theme.json and continue / n to continue without)
```

If approved → write the additions to `theme.json` before generating HTML.
If declined → generate HTML with the proposed tokens anyway, leave a
             comment block at the top of the file noting unresolved tokens.

---

### Step 1b — theme.json DOES NOT EXIST → Create it

Read the `.pen` file via Pencil MCP and extract the full design system:

```
Scan for all unique:
- Fill colors and stroke colors → colors
- Font families → typography
- Font sizes used → font size scale
- Spacing values (padding, gap, margin) → spacing scale

Derive slugs from usage context:
- Most-used text color          → "foreground"
- Background of main sections   → "background"
- Primary brand / accent color  → "primary"
- Secondary brand color         → "secondary"
- Light background              → "background-light"
- Dark background               → "background-dark"
- White                         → "white"
- Muted text / subtext          → "muted"

For font sizes — create a t-shirt scale from smallest to largest:
  small, medium, large, x-large, xx-large
  (map actual rem values: e.g. 0.875rem, 1rem, 1.25rem, 1.5rem, 2rem)

For spacing — group into a numeric scale:
  10 (0.5rem), 20 (1rem), 30 (1.5rem), 40 (2rem), 50 (3rem), 60 (4rem)
```

Then generate and write a complete `theme.json` file:

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "color": {
      "palette": [
        { "slug": "foreground",        "color": "#1a1a1a",  "name": "Foreground" },
        { "slug": "background",        "color": "#ffffff",  "name": "Background" },
        { "slug": "primary",           "color": "#604683",  "name": "Primary" },
        { "slug": "secondary",         "color": "#a8d08d",  "name": "Secondary" },
        { "slug": "background-light",  "color": "#f5f5f5",  "name": "Background Light" },
        { "slug": "muted",             "color": "#767676",  "name": "Muted" }
      ]
    },
    "typography": {
      "fontFamilies": [
        { "slug": "primary",   "fontFamily": "[font-stack]",  "name": "Primary" },
        { "slug": "secondary", "fontFamily": "[font-stack]",  "name": "Secondary" }
      ],
      "fontSizes": [
        { "slug": "small",    "size": "0.875rem", "name": "Small" },
        { "slug": "medium",   "size": "1rem",     "name": "Medium" },
        { "slug": "large",    "size": "1.25rem",  "name": "Large" },
        { "slug": "x-large",  "size": "1.5rem",   "name": "X Large" },
        { "slug": "xx-large", "size": "2rem",     "name": "XX Large" },
        { "slug": "huge",     "size": "3rem",     "name": "Huge" }
      ]
    },
    "spacing": {
      "spacingSizes": [
        { "slug": "10", "size": "0.5rem",  "name": "Extra Small" },
        { "slug": "20", "size": "1rem",    "name": "Small" },
        { "slug": "30", "size": "1.5rem",  "name": "Medium Small" },
        { "slug": "40", "size": "2rem",    "name": "Medium" },
        { "slug": "50", "size": "3rem",    "name": "Large" },
        { "slug": "60", "size": "4rem",    "name": "X Large" }
      ],
      "units": ["px", "em", "rem", "vh", "vw", "%"]
    },
    "layout": {
      "contentSize": "75rem",
      "wideSize": "90rem"
    }
  }
}
```

Tell the user:
```
✅ Created theme.json from Pencil design
   Colors: X defined | Font families: X | Font sizes: X | Spacing: X steps
   Review theme.json and adjust slugs/values before continuing.
   Ready to proceed? (y to continue)
```

Wait for confirmation before proceeding to HTML generation.

---

### Token lookup table (built from either path above)

After Step 1a or 1b, you have a complete mapping table. Use it throughout:

```
#hex → var(--wp--preset--color--[slug])
font-family → var(--wp--preset--font-family--[slug])
font-size → var(--wp--preset--font-size--[slug])   (or rem arbitrary value)
spacing → var(--wp--preset--spacing--[slug])        (or rem arbitrary value)
```

---

## Step 2 — Generate the HTML File

Generate `designs/clean/[block-name].html` as a **fully standalone, browser-renderable file**.

### Required HTML wrapper — always use this exact structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Block Name] — Design Preview</title>

  <!-- Tailwind CDN — required for preview rendering -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- theme.json CSS custom properties — required for token classes to render -->
  <style>
    :root {
      /* Colors — paste every color from theme.json here */
      --wp--preset--color--[slug]: [hex];
      /* ... all colors */

      /* Font families */
      --wp--preset--font-family--[slug]: [value];

      /* Font sizes — always in rem */
      --wp--preset--font-size--[slug]: [value]rem;

      /* Spacing — always in rem */
      --wp--preset--spacing--[slug]: [value]rem;
    }

    /* Responsive preview helper — visible resize indicator */
    body::after {
      content: '🖥 Desktop (1440px+)';
      position: fixed;
      bottom: 8px;
      right: 12px;
      font-size: 11px;
      color: #999;
      pointer-events: none;
    }
    @media (max-width: 1024px) { body::after { content: '💻 Tablet (768–1024px)'; } }
    @media (max-width: 640px)  { body::after { content: '📱 Mobile (< 640px)'; } }
  </style>
</head>
<body class="bg-white">

  <!-- BLOCK CONTENT STARTS HERE -->
  [generated block HTML]
  <!-- BLOCK CONTENT ENDS HERE -->

</body>
</html>
```

### Block content rules:

```
- Map FRAME/GROUP nodes → appropriate semantic elements
- Map TEXT nodes → heading or paragraph with correct hierarchy
- Map image nodes → <img> with descriptive alt and loading="lazy"
- All colors → Tailwind arbitrary values: text-[var(--wp--preset--color--[slug])]
- All layout → Tailwind flex/grid utility classes
- All spacing → Tailwind spacing classes (p-, m-, gap-)
- All typography → Tailwind text/font classes using token arbitrary values
- All responsive breakpoints → Tailwind sm: md: lg: xl: prefixes
- No hardcoded hex values anywhere in classes or attributes
- All interactive elements keyboard accessible (tabindex, role, aria)
```

---

## Step 2b — HTML Semantics, Accessibility & SEO Rules

Apply these to every element generated in Step 2. These are not optional — they
are part of the definition of correct output.

### Heading Hierarchy — Critical for SEO and Accessibility

```
Every Gutenberg block is a component within a page — it never owns the <h1>.
The page title is the h1. Blocks start at h2.

Block title / section headline     → <h2>
Sub-items within the block         → <h3>
Nested sub-items                   → <h4>

Rules:
- Never skip levels (h2 → h4 is wrong — must go h2 → h3 → h4)
- Never use headings for visual size — use Tailwind text sizing instead
- Never put two h2s in the same block unless they represent equal-level sections
```

### Semantic HTML — Use the Right Element

```
<section>      for a distinct thematic section with a heading
<article>      for self-contained content (testimonial, blog card, product)
<nav>          for navigation link groups — always with aria-label
<header>       for the block's top area when it contains a heading + intro
<footer>       for block footnotes, credits, CTAs at bottom
<ul> / <ol>    for ANY list of items — feature lists, nav links, icon grids
<li>           every item inside ul/ol — never <div> children in a list
<figure>       for image + caption pairs
<figcaption>   for the caption inside <figure>
<blockquote>   for testimonial quotes — include <cite> for attribution
<address>      for contact information
<time>         for dates — always with datetime attribute

Never use <div> or <span> where a semantic element fits.
```

### ARIA — Add What's Needed, Nothing Redundant

```html
<!-- Section with no visible heading — give it a label -->
<section aria-labelledby="features-heading">
  <h2 id="features-heading">Features</h2>

<!-- Nav must always have a label -->
<nav aria-label="Footer navigation">

<!-- Decorative icons — hide from screen readers -->
<svg aria-hidden="true" focusable="false">...</svg>

<!-- Meaningful icon with no visible label — describe it -->
<button aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Dynamic content — announce updates to screen readers -->
<div aria-live="polite" aria-atomic="true" id="status-message"></div>

<!-- Expandable content -->
<button aria-expanded="false" aria-controls="panel-id">Toggle</button>
<div id="panel-id" hidden>...</div>

<!-- Never add redundant ARIA to semantic elements -->
<!-- ❌ <button role="button"> — button already has this role -->
<!-- ❌ <nav role="navigation"> — nav already has this role -->
```

### Images — Full Attributes Required

```html
<!-- ✅ Standard content image — all four attributes required -->
<img
  src="..."
  alt="Descriptive text about the image content"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
>

<!-- ✅ Hero / above-fold image — eager load, high priority -->
<img
  src="..."
  alt="..."
  width="1440"
  height="720"
  loading="eager"
  fetchpriority="high"
  decoding="async"
>

<!-- ✅ Decorative image — empty alt, hidden from screen readers -->
<img src="divider.svg" alt="" role="presentation" width="100" height="2">

<!-- ✅ SVG icon — always hide decorative ones -->
<svg aria-hidden="true" focusable="false" width="24" height="24">...</svg>
```

Rules:
- `alt` must describe the image content, never filename or "image of"
- `width` and `height` always present — prevents layout shift (CLS)
- Hero/LCP images: `loading="eager"` + `fetchpriority="high"`
- All other images: `loading="lazy"` + `decoding="async"`
- Decorative images: `alt=""` + `role="presentation"`

### Buttons and Links — Never Confuse Them

```html
<!-- ✅ Button = performs an action (no URL involved) -->
<button type="button">Open modal</button>
<button type="button">Add to cart</button>
<button type="submit">Send form</button>

<!-- ✅ Link = navigates to a URL -->
<a href="/about">Learn more about us</a>
<a href="tel:+441234567890">Call us</a>

<!-- ❌ Never use a link for an action with no URL -->
<a href="#">Open modal</a>  <!-- use <button> -->

<!-- ❌ Never use a div/span as a button without full ARIA -->
<div class="btn">Click</div>  <!-- use <button> -->

<!-- Link text must be meaningful — never "click here" or "read more" alone -->
<!-- ❌ <a href="/blog">Read more</a> -->
<!-- ✅ <a href="/blog">Read more about our services</a> -->
<!-- ✅ Or visually "Read more" with sr-only context: -->
<a href="/blog">
  Read more
  <span class="sr-only">about our services</span>
</a>
```

### Focus Visibility — Never Remove

```html
<!-- Always include this in the <style> block of the HTML preview -->
<style>
  /* Never: outline: none or outline: 0 without replacement */
  :focus-visible {
    outline: 2px solid var(--wp--preset--color--primary);
    outline-offset: 2px;
    border-radius: 2px;
  }
</style>
```

### Touch Targets — Minimum 44×44px

All interactive elements (buttons, links, toggles) must be at least 44px in
both dimensions. Add padding if the visible element is smaller:

```html
<!-- Icon button that's visually small — add padding to hit 44px target -->
<button type="button" class="p-[0.75rem]" aria-label="Close">
  <svg aria-hidden="true" class="w-[1.25rem] h-[1.25rem]">...</svg>
</button>
```

### Lists — Always Use ul/li for Groups

```html
<!-- ❌ Never — div soup for a list of items -->
<div class="features">
  <div class="feature"><div class="icon">...</div><div>Feature 1</div></div>
  <div class="feature"><div class="icon">...</div><div>Feature 2</div></div>
</div>

<!-- ✅ Always — semantic list -->
<ul class="grid grid-cols-1 md:grid-cols-3 gap-8 list-none p-0">
  <li class="flex flex-col items-center gap-[1rem]">
    <svg aria-hidden="true">...</svg>
    <h3 class="text-[1.25rem]">Feature 1</h3>
    <p>Description text</p>
  </li>
</ul>
```

### Reduced Motion — Respect User Preference

Any animation or transition must be wrapped in a motion check:

```html
<style>
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
</style>
```

### Schema.org Structured Data — Block-Type Specific

Add JSON-LD `<script>` in `<head>` of HTML preview for these block types:

```html
<!-- Testimonial / Review block -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewBody": "[quote text]",
  "author": { "@type": "Person", "name": "[author name]" },
  "itemReviewed": { "@type": "Organization", "name": "[company name]" }
}
</script>

<!-- FAQ block -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[question text]",
      "acceptedAnswer": { "@type": "Answer", "text": "[answer text]" }
    }
  ]
}
</script>

<!-- Stats/Numbers block (if representing an Organisation) -->
<!-- Use Organization schema only if block contains company-level facts -->
```

Schema applies to: Testimonial, Review, FAQ, Team Member, Product Feature.
Skip for: Hero, CTA, Navigation, Footer, generic content blocks.

### SEO — Heading and Content Quality

```
Every block heading should be:
- Descriptive and keyword-relevant (not "Section Title" or "Heading Here")
- Unique within the page
- Concise — under 70 characters for h2

Link anchor text:
- Never "click here", "here", "read more" alone
- Always descriptive: "View our pricing plans", "Download the case study"

Image alt text:
- Describe what is depicted, not what it is
- ❌ "hero image", "team photo", "icon"
- ✅ "Three colleagues reviewing a design on a laptop"
- ✅ "Abstract blue waveform representing audio processing"
```

---

## Step 3 — Responsive Verification Pass

After generating the HTML, explicitly verify responsive layout before saving.

For each breakpoint, mentally render the layout and confirm:

### Mobile (< 640px / `sm:` boundary)
- [ ] Single column layout where applicable
- [ ] Text sizes legible — not too large or too small
- [ ] Images fill width or stack correctly
- [ ] No horizontal overflow (nothing clipped or cut off)
- [ ] Buttons and touch targets ≥ 44px height
- [ ] Padding adequate — content not touching screen edge

### Tablet (640px–1024px / `md:` boundary)
- [ ] 2-column grid where applicable
- [ ] Navigation or sidebar adapts correctly
- [ ] Images scale proportionally
- [ ] Flex direction changes applied (flex-col → flex-row)

### Desktop (1440px+ / `lg:` / `xl:` boundary)
- [ ] Full multi-column layout matches Pencil design
- [ ] Max-width constraint applied (`max-w-7xl mx-auto` or equivalent)
- [ ] No excessive stretching on ultra-wide screens

**For any missing responsive behaviour — add the correct Tailwind prefix class before saving.**

Common responsive patterns to always check:

```html
<!-- Stack on mobile, row on desktop -->
<div class="flex flex-col md:flex-row gap-6">

<!-- 1 col → 2 col → 3 col grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

<!-- Text sizing -->
<h2 class="text-2xl md:text-3xl lg:text-4xl">

<!-- Padding scaling -->
<section class="px-4 md:px-8 lg:px-16 py-12 md:py-20">

<!-- Max-width container -->
<div class="max-w-7xl mx-auto w-full px-4 md:px-6">

<!-- Hide/show at breakpoints -->
<nav class="hidden md:flex">
<button class="md:hidden">Menu</button>
```

---

## Step 4 — Cleanup Pass

Final verification before saving:

**Fix any of these if found:**

Colors & values:
- Any `text-[#hex]`, `bg-[#hex]`, or bare hex → replace with theme.json token class
- Any `text-[24px]`, `p-[48px]`, px arbitrary values for typography/spacing → convert to rem
- Any inline `style="font-size: 24px"` → convert to Tailwind rem arbitrary value
- Any SVG `fill="#hex"` → `fill="currentColor"` + Tailwind color on parent
- Any unmapped color → add comment `<!-- UNMAPPED: #hex — needs token -->` next to element

Semantics:
- Any outermost divs wrapping a thematic section → `<section aria-labelledby="...">`
- Any list of items (features, steps, nav links) in divs → `<ul><li>` structure
- Any image with caption in a div → `<figure><figcaption>`
- Any testimonial quote not in `<blockquote>` → fix, add `<cite>` for attribution
- Any `<a>` used for an action with no URL → change to `<button type="button">`
- Any link with text "read more", "click here", "here" alone → add `<span class="sr-only">` context

Images:
- Any `<img>` missing `alt` → add descriptive alt (not filename, not "image of")
- Any `<img>` missing `loading` → add `loading="lazy"` (or `eager` + `fetchpriority="high"` for hero)
- Any `<img>` missing `decoding` → add `decoding="async"`
- Any `<img>` missing `width` and `height` → add both to prevent layout shift
- Any decorative image without `alt=""` + `role="presentation"` → fix both

ARIA & keyboard:
- Any non-button clickable element → add `tabindex="0"` `role="button"`
- Any icon-only button without `aria-label` → add it
- Any decorative SVG without `aria-hidden="true" focusable="false"` → add both
- Any `<section>` or `<nav>` without `aria-label` or `aria-labelledby` → add one
- Any interactive element smaller than 44px → add padding to meet touch target

Styles:
- Any `style=""` for color/font → replace with Tailwind token arbitrary value
- Any `outline: none` or `outline: 0` without focus replacement → fix with :focus-visible
- Confirm `prefers-reduced-motion` block is present in `<style>` if block has animations

**Never:**
- Convert Tailwind responsive classes to `@media` queries in `<style>`
- Add BEM class names alongside Tailwind classes
- Remove or alter responsive prefix classes

---

## style.scss Assessment

After cleanup, assess whether `style.scss` will be needed in Phase 2:

**Needs style.scss:**
- `@keyframes` animations
- `::before` / `::after` pseudo-elements with generated content
- `:nth-child()` stagger selectors
- `clip-path` shapes too complex for Tailwind arbitrary values
- `mask` / `mask-image` with complex values
- Scroll-driven animations

**Does NOT need style.scss:**
- Colors, spacing, typography → Tailwind token arbitrary values
- Hover/focus/active → Tailwind prefixes
- Responsive → Tailwind `sm:` `md:` `lg:` prefixes
- Transitions, transforms, opacity → Tailwind handles all

---

## Output Summary Format

After saving `designs/clean/[block-name].html`:

```
✅ Phase 1 complete — designs/clean/[block-name].html

Source: designs/[block-name].pen (Pencil MCP)
Preview: open designs/clean/[block-name].html in browser to review

Colors mapped: X  |  Unmapped (flagged in HTML): X
theme.json tokens injected: X colors, X font families, X sizes, X spacing
Responsive: mobile ✅ / tablet ✅ / desktop ✅
Accessibility: X additions made
Inline styles removed: X

style.scss needed: YES / NO
Reason: [specific requirement or "Tailwind covers everything"]

Unmapped colors needing decision: [list or "none"]

Open the HTML file in your browser to review before approving Phase 2.
Ready for Phase 2? (y to continue)
```

Wait for approval before proceeding to Phase 2.
