# Block: Hero Magazine Editorial
**Block name:** `kw-package/hero-magazine`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `designs/design-components-blocks.pen` (node CXyLy)

## Purpose
Displays a magazine editorial hero with a full-height featured image on the left (45% width) and article content on the right including category tag, read time, headline, deck paragraph, and author attribution with avatar. An optional trending bar at the bottom shows numbered trending stories. Supports light/dark color modes.

## Attributes

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| colorMode | string | "light" | Light or dark color scheme |
| heading | string | "The Architecture of Silence..." | Article headline |
| deck | string | "In an era of sensory overload..." | Article deck/summary |
| categoryLabel | string | "DESIGN" | Category tag text |
| readTime | string | "8 MIN READ" | Estimated read time |
| authorName | string | "Elena Vasquez" | Author name |
| authorDate | string | "April 2, 2026" | Publication date |
| authorImage | string | "" | Author avatar URL |
| authorImageId | number | 0 | Author avatar media ID |
| featuredImage | string | "" | Featured image URL |
| featuredImageId | number | 0 | Featured image media ID |
| featuredImageAlt | string | "Minimalist architectural..." | Featured image alt text |
| showTrending | boolean | true | Show/hide trending bar |
| trendingItems | array | [3 items] | Trending stories: {id, text} |

## Theme Tokens Used

| Token slug | CSS variable | Where used |
|---|---|---|
| surface-warm | --wp--preset--color--surface-warm | Section bg (light) |
| foreground | --wp--preset--color--foreground | Text, category tag bg, author name |
| foreground-muted | --wp--preset--color--foreground-muted | Deck text, trending text |
| foreground-subtle | --wp--preset--color--foreground-subtle | Read time, author date |
| white | --wp--preset--color--white | Category tag text, trending bar bg |
| border-warm | --wp--preset--color--border-warm | Trending bar border |
| terracotta | --wp--preset--color--terracotta | Trending label |
| background-dark | --wp--preset--color--background-dark | Section bg (dark) |
| surface-dark | --wp--preset--color--surface-dark | Trending bar bg (dark) |
| border-dark | --wp--preset--color--border-dark | Trending border (dark) |
| muted-on-dark | --wp--preset--color--muted-on-dark | Deck text (dark) |
| inter | --wp--preset--font-family--inter | All body text |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Gutenberg editor with MediaUpload for images, trending CRUD |
| save.js | Frontend HTML with split image/text layout |
| style.scss | Focus-visible and reduced-motion rules |
| block-spec.md | This file |

## Known Constraints
- Featured image and author avatar use single setAttributes call for URL + ID fields
- Trending items are auto-numbered with zero-padded indices

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from Pencil design |
