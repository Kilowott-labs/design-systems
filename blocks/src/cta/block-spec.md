# Block: CTA Section
**Block name:** `kw-package/cta`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `designs/design-components-blocks.pen` (nodes Rry9T, 6JasW, XbQkf, 1XqWT, TqsXN)

## Purpose
Displays a call-to-action section with 5 distinct layout variants: full-width dark banner with centered text, split layout with image, inline gradient card, newsletter email signup form, and CTA paired with a testimonial quote and vertical divider. Each variant supports light and dark color modes and is fully responsive across mobile, tablet, and desktop breakpoints.

## Attributes

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| style | string | "banner" | Layout variant: banner, split, card, newsletter, testimonial |
| colorMode | string | "dark" | Color scheme: light or dark |
| heading | string | "Ready to transform your workflow?" | Section heading text |
| description | string | "Join 10,000+ teams..." | Subheading/description text |
| showDescription | boolean | true | Toggle description visibility |
| primaryButtonText | string | "Start Free Trial" | Primary CTA button label |
| primaryButtonUrl | string | "#" | Primary CTA button link |
| showPrimaryArrow | boolean | true | Toggle arrow icon on primary button |
| secondaryButtonText | string | "Talk to Sales" | Secondary button label |
| secondaryButtonUrl | string | "#" | Secondary button link |
| showSecondaryButton | boolean | true | Toggle secondary button visibility |
| imageUrl | string | Unsplash URL | Image for split variant |
| imageId | number | 0 | WordPress media library ID for image |
| imageAlt | string | "Creative studio workspace..." | Image alt text |
| newsletterPlaceholder | string | "Enter your email" | Email input placeholder (newsletter) |
| newsletterButtonText | string | "Subscribe" | Form submit button text (newsletter) |
| newsletterPrivacyText | string | "We respect your privacy..." | Privacy notice below form |
| testimonialQuote | string | "We evaluated 12 tools..." | Testimonial quote text |
| testimonialAuthor | string | "David Park, CTO" | Testimonial author name/title |
| testimonialCompany | string | "Runway ML - Series C" | Author company/details |
| testimonialAvatarUrl | string | Unsplash URL | Author avatar image |
| testimonialAvatarId | number | 0 | WordPress media library ID for avatar |

## Theme Tokens Used

| Token slug | CSS variable | Where used in block |
|---|---|---|
| background-dark | --wp--preset--color--background-dark | Banner dark bg, newsletter dark bg, testimonial dark bg |
| white | --wp--preset--color--white | Banner light bg, text on dark, primary btn text |
| foreground | --wp--preset--color--foreground | Light mode heading, newsletter submit bg, testimonial btn |
| foreground-muted | --wp--preset--color--foreground-muted | Light mode description text |
| foreground-subtle | --wp--preset--color--foreground-subtle | Placeholder text, privacy text, testimonial company |
| foreground-on-dark | --wp--preset--color--foreground-on-dark | Dark mode secondary button text |
| muted-on-dark | --wp--preset--color--muted-on-dark | Dark mode description text |
| accent | --wp--preset--color--accent | Banner primary btn bg, card gradient start, quote mark |
| accent-light | --wp--preset--color--accent-light | Dark mode accent/quote color |
| surface | --wp--preset--color--surface | Card section background |
| surface-warm | --wp--preset--color--surface-warm | Split section background |
| surface-dark | --wp--preset--color--surface-dark | Dark mode secondary btn border |
| border | --wp--preset--color--border | Light mode borders, divider |
| border-dark | --wp--preset--color--border-dark | Dark mode borders, divider |
| dm-sans | --wp--preset--font-family--dm-sans | Headings |
| inter | --wp--preset--font-family--inter | Body text, buttons |
| playfair | --wp--preset--font-family--playfair | Split heading, quote mark |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Gutenberg editor component with InspectorControls for all 5 variants |
| save.js | Frontend HTML output with STYLE_STRUCTURE + STYLE_COLORS pattern |
| view.js | Newsletter form submission handling with status feedback |
| style.scss | Input placeholder styling and disabled button state |
| block-spec.md | This file |

## Frontend Behaviour
The newsletter variant includes a form with client-side email validation. On submission, the submit button shows "Sending..." and both inputs are disabled during the simulated API call. After completion, the email input clears and a "Thank you for subscribing!" message replaces the privacy text for 5 seconds before reverting. In production, the setTimeout should be replaced with an actual API endpoint call.

## Known Constraints
- Switching the style variant in the editor resets heading/description/button text to the variant's defaults. Customized text should be re-entered after switching.
- The newsletter form uses a simulated submission (setTimeout). Production use requires connecting to an actual email API endpoint in view.js.
- The card variant uses a hardcoded gradient end color (#7C3AED) since theme.json does not include a purple token.
- CTA 2 (split) design uses non-token colors (#412B23, #7C4731, #C24612) from the warm palette. These are mapped to generic foreground/muted tokens for theme consistency but differ slightly from the original Pencil design.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from 5 CTA Pencil designs |
