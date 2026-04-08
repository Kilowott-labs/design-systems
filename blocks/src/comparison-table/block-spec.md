# Block: Comparison Table
**Block name:** `kw-package/comparison-table`
**Version:** 1.0.0
**Generated:** 2026-04-05
**Pencil source:** `designs/design-components-blocks.pen` (node 3XSFM — Features 6)

## Purpose
Displays a feature comparison table with configurable plan columns (e.g. competitors), feature rows, and per-cell values that can be check marks, cross marks, partial indicators, or custom text. The highlighted column draws attention to the recommended plan using accent color. Supports light and dark color modes. Table scrolls horizontally on mobile.

## Attributes
Derived from block.json exactly.

| Attribute | Type | Default | What it controls |
|---|---|---|---|
| heading | string | "Why teams switch to us" | Section heading above the table |
| description | string | "See how we compare to legacy tools." | Subheading description text |
| showDescription | boolean | true | Toggle description visibility |
| showBadge | boolean | false | Toggle badge pill above heading |
| badgeText | string | "Compare" | Text inside the badge pill |
| colorMode | string | "light" | Color scheme: "light" or "dark" |
| plans | array | 3 items | Column definitions: [{id, name, highlighted}] |
| features | array | 5 items | Row definitions: [{id, name, values: [string per plan]}] |

### Cell value format
Each entry in `features[n].values` is a string:
- `"check"` — renders green checkmark SVG
- `"cross"` — renders grey X SVG
- `"partial"` — renders grey dash SVG
- Any other string — renders as text (bold if plan is highlighted, muted otherwise)

## Theme Tokens Used

| Token slug | CSS variable | Where used in block |
|---|---|---|
| white | --wp--preset--color--white | Light mode section/table background |
| foreground | --wp--preset--color--foreground | Heading text, feature labels, highlighted cell text |
| foreground-muted | --wp--preset--color--foreground-muted | Description text, non-highlighted plan headers |
| foreground-subtle | --wp--preset--color--foreground-subtle | Non-highlighted cell text values |
| surface | --wp--preset--color--surface | Table header row background (light) |
| border | --wp--preset--color--border | Table border, header row bottom border (light) |
| accent | --wp--preset--color--accent | Highlighted plan column header (light) |
| accent-light | --wp--preset--color--accent-light | Highlighted plan column header (dark) |
| accent-surface | --wp--preset--color--accent-surface | Badge background (light) |
| forest-green | --wp--preset--color--forest-green | Check icon color |
| grey-light | --wp--preset--color--grey-light | Cross and partial icon color |
| background-dark | --wp--preset--color--background-dark | Dark mode section background |
| muted-on-dark | --wp--preset--color--muted-on-dark | Dark mode muted text |
| surface-dark | --wp--preset--color--surface-dark | Dark mode table header, badge bg |
| border-dark | --wp--preset--color--border-dark | Dark mode borders |
| dm-sans | --wp--preset--font-family--dm-sans | Heading font |
| inter | --wp--preset--font-family--inter | Table body, badge, description font |

## Files

| File | Purpose |
|---|---|
| block.json | Attribute schema, metadata, supports |
| edit.js | Gutenberg editor component with InspectorControls for plans/features management |
| save.js | Frontend HTML output with semantic table, SVG icons, color mode support |
| style.scss | Table border-radius on cells (border-collapse + border-radius fix), mobile scroll hint |
| block-spec.md | This file |

## Known Constraints
- Adding or removing a plan column requires the `features` array values to stay in sync (handled automatically by the editor CRUD helpers).
- Cell values use reserved keywords `"check"`, `"cross"`, `"partial"` — custom text must not match these strings.
- The `plans` array order determines column order and must match the index positions in each feature's `values` array.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-05 | Initial block generated from Pencil Features 6 design |
