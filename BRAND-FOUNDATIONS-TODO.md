# Brand Foundations — Status

Updated after pulling in the real `mm-styles.css` (the live Divi child theme stylesheet) and its reference doc `mm-style-reference-v3.html` from Rachel's local design reference files. Most of what was originally flagged as missing here is now defined — see `source/` and the updated `tokens/`.

## Now defined
- [x] **Primary brand palette** — `tokens/colors.json`, pulled from `source/mm-styles.css`. Paper/sand surfaces, ink text colors, teal system, ember (CTA) system, dark section colors, accent set, rules/shadows.
- [x] **Type scale** — `tokens/typography.json`. Three-typeface system: Instrument Serif (display/headings), Inter (body/labels), JetBrains Mono (code/data labels). Full h1–h6 scale plus blockquote, dropcap, eyebrow, and margin-note treatments.
- [x] **Shape/spacing basics** — `tokens/shape.json`. Border radius scale, paper shadow, rule colors.
- [x] **Component library** — `source/mm-styles.css` is a full consolidated stylesheet: buttons, cards, links, lists, Divi toggles/tables, CTA modules, layout blocks (before/after, transform grid, step grids, phase/timeline blurbs), dark section overrides, blog modules, manifesto styles, and more (see its own table of contents at the top of the file).

## Still missing
- [ ] **Logo files** — no logo image assets found in the theme's `assets/` folder (only `css/` and `js/` subfolders exist). If a logo exists somewhere else in Rachel's files, it hasn't been located yet.
- [ ] **Design tokens as CSS variables re-exported for non-WordPress use** — right now the canonical form is the Divi child theme's `mm-styles.css`. If this design system needs to feed something outside WordPress (e.g. Claude Design, a separate app), the JSON token files in `tokens/` are a hand-extracted summary, not a build output — they should be spot-checked against `source/mm-styles.css` before being treated as fully authoritative, and re-synced if the source CSS changes.
- [ ] **Reconcile the Matrix explorer's palette with the brand system** — the Revenue Health Matrix Zoom Explorer (`components/revenue-matrix-explorer/`) currently uses its own 5-color system-coding scheme and Inter-only typography, not the brand's teal/ember/serif system. Worth a design pass to decide whether it should adopt more of the shared brand system or intentionally stay distinct as a diagnostic tool.

## Source of truth
`source/mm-styles.css` is the live, canonical stylesheet — it's literally what the WordPress child theme loads. `source/mm-style-reference-v3.html` is Rachel's own visual reference page that renders every class in it live. Treat both as authoritative; the `tokens/*.json` files are a convenience extraction from them for tooling that can't parse CSS directly.
