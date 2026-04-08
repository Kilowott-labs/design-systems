# /build-block

Runs the full 3-phase block pipeline for a single block.
Design source is a Pencil `.pen` file — read live via Pencil MCP.
No caching, no node IDs, no Figma exports.

## Usage

```
/build-block [block-name]
/build-block [block-name] from [pen-file]
/build-block [block-name] component "[frame-name]"
```

**Examples:**

```
# One .pen file per block (recommended — simplest)
/build-block testimonial-simple

# Block lives inside a larger page design file
/build-block testimonial-simple from designs/landing-page.pen

# Target a specific named frame inside a .pen file
/build-block testimonial-simple component "Testimonial Card"

# Use currently selected element in Pencil canvas
# (just select it in Pencil first, then run the command)
/build-block testimonial-simple selected
```

**Prerequisites:**
- Pencil must be running
- The `.pen` file must be open in Pencil
- Pencil MCP must be connected (verify with `/mcp` — Pencil should appear in list)
- If using `selected` — the component must be selected on the Pencil canvas before running

---

## Pre-Flight Checks

Before starting any phase:

1. **Resolve the design source** based on how the command was called:

   | Usage | Design source |
   |---|---|
   | `/build-block name` | `designs/$ARGUMENTS.pen` — one file per block |
   | `/build-block name from designs/page.pen` | Named `.pen` file, read full design |
   | `/build-block name component "Frame Name"` | Specific named frame inside the `.pen` file |
   | `/build-block name selected` | Currently selected element on Pencil canvas |

2. Confirm the resolved `.pen` file exists — if not, tell the user
3. Confirm Pencil MCP is connected — if not connected: stop and tell the user to open Pencil
4. If `selected` mode: use `get_editor_state` via Pencil MCP to confirm something is selected. If nothing selected: stop and tell the user to select the component in Pencil first
5. If `component "Frame Name"` mode: use `batch_get` via Pencil MCP to confirm the named frame exists. If not found: list available top-level frames and ask the user to confirm
6. Check theme.json state:
   - EXISTS with tokens → read all slugs into mapping table — use these throughout
   - EXISTS but empty/sparse → will propose additions after scanning Pencil design
   - DOES NOT EXIST → will create it from Pencil design in Phase 1 Step 1b
7. Check `blocks/src/$ARGUMENTS/` — if it already exists, ask before overwriting
8. Skim `PROJECT-STATUS.md` for any relevant blockers

---

## Phase 1 — UI Developer

**Source:** Resolved `.pen` design source (full file, named frame, or canvas selection)
**Output:** `designs/clean/$ARGUMENTS.html` — fully renderable standalone HTML file
**Context:** `designs/CLAUDE.md` rules apply

Tasks:
1. Read design data via Pencil MCP using the resolved source:
   - Full file: read entire `designs/$ARGUMENTS.pen`
   - Named frame: use `batch_get` to read only that frame's subtree
   - Selected: use `get_editor_state` to read the selected element
2. Read `theme.json` color mapping (built in pre-flight)
3. Generate semantic, accessible, token-mapped HTML from the Pencil design:
   - All colors → Tailwind arbitrary values using theme.json CSS custom properties
   - All layout → Tailwind utility classes
   - Responsive using Tailwind prefixes: `sm:` `md:` `lg:` `xl:`
   - Semantic HTML5 elements throughout
   - All images: descriptive `alt` + `loading="lazy"`
   - All interactive elements keyboard accessible
   - No hardcoded hex
   - No CDN script tags or Google Font tags
4. Save the complete renderable file to `designs/clean/$ARGUMENTS.html`
   (includes Tailwind CDN, viewport meta, theme.json CSS custom properties, responsive preview indicator)
6. Assess whether `style.scss` will be needed (see `designs/CLAUDE.md`)
7. Output Phase 1 summary in the format specified in `designs/CLAUDE.md`

**PAUSE after Phase 1 summary.**
Tell the user: "Open `designs/clean/$ARGUMENTS.html` in your browser to review the design before approving Phase 2."
Wait for explicit user approval (y) before continuing.

---

## Phase 2 — Block Developer

**Working directory:** `blocks/src/`
**Context:** `blocks/CLAUDE.md` Block Developer rules apply

Tasks:
1. Read `designs/clean/$ARGUMENTS.html` in full
2. Read one similar existing block from `blocks/src/` as structural reference
3. Identify all editable content and map to attribute types
4. Generate all required files inside `blocks/src/$ARGUMENTS/`:
   - `block.json` — always
   - `edit.js` — always
   - `save.js` — always
   - `view.js` — only if block has frontend JS interactions
   - `style.scss` — only if Phase 1 flagged it as needed
   - `block-spec.md` — always (developer documentation)
5. Add `register_block_type( __DIR__ . '/src/$ARGUMENTS' );` to `blocks/blocks.php`
6. Run `npm run build`
7. Output Phase 2 summary in the format specified in `blocks/CLAUDE.md`

**PAUSE after Phase 2 summary. Wait for explicit user approval (y) before continuing.**

---

## Phase 3 — QA Reviewer

**Working directory:** `blocks/src/$ARGUMENTS/` + `tests/visual-regression/`
**Context:** `blocks/CLAUDE.md` QA Reviewer rules apply

Tasks:
1. Run the full code review checklist from `blocks/CLAUDE.md` — Part A
2. Confirm Pencil MCP is still connected — read design data live from `designs/$ARGUMENTS.pen`
3. Add entry to `tests/visual-regression/design-qa-config.json`:
   ```json
   {
     "$ARGUMENTS": {
       "penFile": "designs/$ARGUMENTS.pen",
       "url": "/page-containing-block",
       "rootSelector": ".wp-block-[namespace]-$ARGUMENTS",
       "viewports": ["desktop", "tablet", "mobile"]
     }
   }
   ```
4. Use Chrome DevTools MCP to navigate to the page and measure at:
   - Desktop: 1440px
   - Tablet: 768px
   - Mobile: 375px
5. Compare DOM measurements against Pencil design data — Part B
6. Write report to `tests/visual-regression/reports/$ARGUMENTS.md`
7. Output Phase 3 summary in the format specified in `blocks/CLAUDE.md`

---

## Pipeline Complete

```
✅ /build-block $ARGUMENTS complete

Source: designs/$ARGUMENTS.pen (Pencil MCP)
Phase 1 — UI Developer: X colors mapped, style.scss: [needed/not needed]
Phase 2 — Block Developer: [list files created], build: [success/errors]
Phase 3 — QA Reviewer: X critical, X warnings, X visual mismatches

Report: tests/visual-regression/reports/$ARGUMENTS.md

Next action: [fix X critical issues] OR [block is ready ✅]
```
