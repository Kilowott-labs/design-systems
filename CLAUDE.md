# WordPress Theme — Claude Code Context

## Path Resolution — Always Dynamic

**Never use hardcoded absolute paths. Never assume a project name.**

The workspace root is wherever Claude Code was opened.
All paths are relative to that root.

```bash
# Claude should run this at session start to confirm workspace root
pwd                    # Mac/Linux
(Get-Location).Path    # Windows PowerShell
```

Derive everything from the workspace — never hardcode:

| What | How to get it |
|---|---|
| Theme root | Workspace root (where this CLAUDE.md lives) |
| Theme name | Read `style.css` → `Theme Name:` header |
| Block namespace | Read `package.json` → `name` field |
| Local URL | Read `PROJECT-STATUS.md` → `localUrl` field |
| Blocks dir | `./blocks/src/` relative to workspace root |
| Designs dir | `./designs/` relative to workspace root |

---

## Stack

| Layer | Detail |
|---|---|
| Platform | WordPress 6.x FSE / Gutenberg |
| Theme | This workspace root — resolved dynamically |
| PHP | 8.4 — XAMPP (path resolved from workspace root) |
| Block namespace | Read from `package.json` at session start |
| Primary styling | **Tailwind CSS** — 1:1 Pencil design fidelity |
| SCSS escape hatch | `style.scss` — only for CSS Tailwind cannot express |
| JS | Vanilla ES6+ — no jQuery |
| Build | `@wordpress/scripts` → `npm run build` / `npm run start` |
| Local URL | Read from `PROJECT-STATUS.md` at session start |
| MCP | Pencil MCP (local, reads `.pen` files directly) + Chrome DevTools MCP |

---

## Project Structure

```
[workspace-root]/            ← resolved dynamically at session start
├── designs/
│   ├── [block-name].pen     # Pencil design source — committed to Git
│   └── clean/
│       └── [block-name].html
├── blocks/src/[block-name]/
│   ├── block.json
│   ├── edit.js
│   ├── save.js
│   ├── view.js              # only if interactive
│   └── style.scss           # only if Tailwind cannot express it
├── blocks/blocks.php
├── tests/visual-regression/
│   ├── design-qa-config.json
│   ├── reports/
│   └── .cache/
├── PROJECT-STATUS.md        # localUrl and current state live here
├── functions.php
├── package.json             # block namespace lives here
├── style.css                # theme name lives here
└── theme.json               # design token source of truth
```

---

## Session Start — Always Do This First

```
1. Run pwd (Mac/Linux) or (Get-Location).Path (PowerShell)
   to confirm workspace root

2. Read package.json → extract "name" field as block namespace

3. Read style.css → extract "Theme Name:" as theme name

4. Read PROJECT-STATUS.md → extract localUrl for Chrome DevTools MCP

5. Confirm Pencil MCP connected → /mcp

6. Check designs/ for .pen files ready to build
```

**All subsequent file paths in this session use the confirmed workspace root.**

---

## Design Source — Pencil .pen Files

Designs live as `.pen` files in `./designs/` committed to Git.
Read directly via Pencil MCP — no caching, no exports, no node IDs.
Pencil MCP is local — no rate limits, no API keys needed.

---

## Pipeline

```
/build-block [block-name]
```

Three phases, approval between each:
1. **UI Developer** — read `./designs/[name].pen` → `./designs/clean/[name].html`
2. **Block Developer** — convert to Gutenberg block → `./blocks/src/[name]/`
3. **QA Reviewer** — code review + visual regression

---

## Styling Rules

### Tailwind First — SCSS Only as Escape Hatch

| Use Tailwind ✅ | Use style.scss only ☐ |
|---|---|
| Colors, spacing, typography | `@keyframes` animations |
| Layout — flex, grid, positioning | `::before` / `::after` pseudo-elements |
| Responsive — `md:` `lg:` prefixes | `:nth-child()` stagger selectors |
| Hover, focus, active states | Complex `clip-path` shapes |
| Opacity, transitions, transforms | Scroll-driven animations |
| Shadows, borders, border-radius | `mask` / `mask-image` complex values |

### Color Tokens — Non-Negotiable

Never hardcode hex anywhere — Tailwind or SCSS.

```jsx
// ❌ Never
className="text-[#604683] bg-[#ead8d6]"

// ✅ Always — map from theme.json
className="text-[var(--wp--preset--color--primary)]"
className="bg-[var(--wp--preset--color--background-warm)]"
```

```scss
// ❌ Never
color: #604683;

// ✅ Always
color: var(--wp--preset--color--primary);
```

SVG fills: `fill="currentColor"` + set color on parent via Tailwind.

### Responsive — Tailwind Prefixes Only

Never write SCSS media queries — always `sm:` `md:` `lg:` `xl:` `2xl:` in JSX.

---

## Naming — Derived from package.json

At session start, read `package.json` → `name` field.
That value is the block namespace. Use it everywhere.

```
Block name format:   [namespace]/[block-name]   e.g. cremaprivat/hero-section
PHP functions:       [namespace]_function_name
PHP classes:         Namespace_Class_Name
JS selectors:        data- attributes only — never Tailwind class names
Block registration:  blocks/blocks.php via register_block_type()
```

---

## Security — Non-Negotiable

```php
esc_html( $text )           // plain text output
esc_attr( $attribute )      // HTML attribute values
esc_url( $url )             // href and src values
wp_kses_post( $html )       // rich HTML content
sanitize_text_field()       // user text input
absint()                    // numeric input
```

---

## theme.json Token Reference

```jsx
// In JSX / Tailwind
className="text-[var(--wp--preset--color--primary)]"
className="bg-[var(--wp--preset--color--secondary)]"
className="text-[length:var(--wp--preset--font-size--large)]"
className="p-[var(--wp--preset--spacing--50)]"
className="font-[family-name:var(--wp--preset--font-family--primary)]"
```

### rem — Non-Negotiable for Typography and Spacing

Never use px arbitrary values for font sizes or spacing — always rem.
Conversion: px ÷ 16 = rem

```jsx
// ❌ Never
className="text-[24px] p-[48px] gap-[16px]"

// ✅ Always
className="text-[1.5rem] p-[3rem] gap-[1rem]"
```

Common conversions:
- 8px → 0.5rem | 12px → 0.75rem | 16px → 1rem | 20px → 1.25rem
- 24px → 1.5rem | 32px → 2rem | 40px → 2.5rem | 48px → 3rem | 64px → 4rem

```scss
// In style.scss
color: var(--wp--preset--color--primary);
font-size: var(--wp--preset--font-size--large);
padding: var(--wp--preset--spacing--50);
```

---

## Reference Site Replication — Token-Efficient Workflow

When replicating a reference website into static HTML/Tailwind:

1. **Batch extract** — one large evaluate_script per page capturing ALL sections
2. **Fetch JS once** — cache the result, don't re-fetch same URLs
3. **Batch fixes** — make all changes per section in one pass, max 2 screenshot rounds
4. **Edit only** — never full file rewrites after initial creation
5. **Single browser** — Chrome DevTools MCP only, not dual browser
6. **Batch asset downloads** — collect all URLs, one curl command

---

## Hard Rules — Never Do These

- Use absolute paths — always relative from workspace root
- Hardcode any hex color in Tailwind or SCSS
- Use px values for font sizes or spacing in Tailwind arbitrary values — always rem
- Assume the block namespace — always read from `package.json`
- Assume the local URL — always read from `PROJECT-STATUS.md`
- Create `style.scss` without confirming Tailwind cannot handle it
- Write SCSS media queries — use Tailwind responsive prefixes
- Select by Tailwind class name in `view.js` — use `data-` attributes
- Modify WordPress core, plugin, or WooCommerce files
- Run `git push`, `git commit`, or `git add` without explicit approval
- Build blocks from scratch — always use an existing block as reference
- Commit `.claude/mcp.json` — contains API keys
