# Block: Features
**Block name:** `kw-package/features`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `designs/design-components-blocks.pen` (nodes: Fkjks, SC957, JBwEf, OBfD6, vUuD9)

## Purpose
Displays a configurable feature section with 5 layout variants: icon grid (3-column), alternating image+text rows with step numbers, bento grid (3+2 asymmetric layout), numbered steps, and feature cards. Each variant supports light and dark color modes. Items include an icon, title, description, and optional "learn more" links.

## Attributes
Derived from block.json exactly.

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| heading | string | "Everything you need to ship faster" | Section heading text (h2) |
| description | string | "Powerful features that help your team..." | Subheading paragraph below heading |
| showDescription | boolean | true | Whether the description paragraph is visible |
| showBadge | boolean | true | Whether the small badge label appears above heading |
| badgeText | string | "Features" | Text content of the badge |
| style | string | "icon-grid" | Layout variant: "icon-grid", "alternating", "bento", "steps", "cards" |
| colorMode | string | "light" | Color scheme: "light" or "dark" |
| showItemLinks | boolean | false | Whether each item shows a "Learn more" link |
| items | array | [3 items] | Array of objects: {id, icon, title, description, linkText, linkUrl, image, imageId} |

## Theme Tokens Used

| Token slug | CSS variable | Where used in block |
|---|---|---|
| white | --wp--preset--color--white | icon-grid light section bg |
| foreground | --wp--preset--color--foreground | heading text, card text, number bg (steps) |
| foreground-muted | --wp--preset--color--foreground-muted | description text, item descriptions |
| foreground-subtle | --wp--preset--color--foreground-subtle | bento dark muted text |
| surface | --wp--preset--color--surface | alternating/bento light section bg |
| surface-warm | --wp--preset--color--surface-warm | cards light section bg |
| surface-dark | --wp--preset--color--surface-dark | dark mode icon bg, badge bg |
| background-dark | --wp--preset--color--background-dark | dark mode section bg |
| border | --wp--preset--color--border | bento light card border, step number (light) |
| border-dark | --wp--preset--color--border-dark | dark mode borders, alternating step number (dark) |
| accent | --wp--preset--color--accent | icon color, badge text, link color (light) |
| accent-light | --wp--preset--color--accent-light | dark mode icon and accent colors |
| accent-surface | --wp--preset--color--accent-surface | icon bg, badge bg (light) |
| muted-on-dark | --wp--preset--color--muted-on-dark | dark mode muted text |
| dm-sans | --wp--preset--font-family--dm-sans | headings and titles |
| inter | --wp--preset--font-family--inter | body text, descriptions, badges, links |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Gutenberg editor component with InspectorControls for all 5 variants |
| save.js | Frontend HTML output with STYLE_STRUCTURE + STYLE_COLORS pattern |
| view.js | Staggered entrance animation via IntersectionObserver |
| style.scss | Card hover lift, link underline animation, focus-visible |
| block-spec.md | This file |

## Frontend Behaviour
On page load, feature items start with opacity 0 and translate-y offset. An IntersectionObserver watches each item and triggers a staggered fade-in animation (80ms delay between items) when they scroll into view. Users with `prefers-reduced-motion: reduce` see all items immediately with no animation.

Cards and bento items have a subtle upward lift with box-shadow on hover. Links have an animated underline that scales in from right to left on hover.

## Known Constraints
- The bento grid layout is optimized for exactly 5 items (3 top + 2 bottom). Adding more than 5 items will flow into additional bottom-row pairs. Fewer than 3 items will leave the top row incomplete.
- The alternating variant expects images on each item. Without images, a placeholder grey box appears.
- Features 6 (Comparison Table) from the Pencil designs was excluded as it requires a fundamentally different table-based structure and should be built as a separate block.
- The bento dark mode uses two hardcoded near-black hex values (#18181B card bg, #27272A card border) because these specific zinc shades were not available in theme.json. If these colors are added to theme.json, they should be updated to token references.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from 5 Pencil design variants |
