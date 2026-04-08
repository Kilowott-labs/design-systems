# Block: Hero Product Showcase
**Block name:** `kw-package/hero-product`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `designs/design-components-blocks.pen` (node aBAkX)

## Purpose
Displays a product showcase hero with centered vertical layout: tagline, large heading, product image, horizontal specs row (4 spec items), and a sticky buy bar with pill-shaped CTA and installment text. Designed for consumer electronics and physical products. Supports light/dark color modes.

## Attributes

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| colorMode | string | "light" | Light or dark color scheme |
| tagline | string | "AURA PRO MAX" | Product line tagline |
| heading | string | "Sound, Perfected." | Main hero heading |
| subheading | string | "40-hour battery..." | Product description |
| productImage | string | "" | Product image URL |
| productImageId | number | 0 | Product image media ID |
| productImageAlt | string | "Premium wireless headphones..." | Product image alt |
| specs | array | [4 items] | Product specs: {id, value, label} |
| buyText | string | "Buy -- $349" | Buy button label |
| buyUrl | string | "#" | Buy button URL |
| installmentText | string | "or $29/mo for 12 months" | Installment financing text |

## Theme Tokens Used

| Token slug | CSS variable | Where used |
|---|---|---|
| surface | --wp--preset--color--surface | Section bg (light) |
| foreground | --wp--preset--color--foreground | Text, buy button bg (light), spec values |
| foreground-subtle | --wp--preset--color--foreground-subtle | Tagline, spec labels, subheading, installment |
| white | --wp--preset--color--white | Buy button text (light) |
| dark | --wp--preset--color--dark | Section bg (dark) |
| muted-on-dark | --wp--preset--color--muted-on-dark | Subheading (dark) |
| dm-sans | --wp--preset--font-family--dm-sans | Heading, spec values |
| inter | --wp--preset--font-family--inter | Body, tagline, specs, buy button |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Gutenberg editor with MediaUpload, spec CRUD |
| save.js | Frontend HTML with centered product layout |
| style.scss | Focus-visible and reduced-motion rules |
| block-spec.md | This file |

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from Pencil design |
