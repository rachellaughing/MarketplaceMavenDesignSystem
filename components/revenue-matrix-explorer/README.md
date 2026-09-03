# Revenue Health Matrix Zoom Explorer

Interactive, zoomable explorer of the Revenue Health Matrix™: 5 parent systems → 10 subsystems each → 4 evaluation areas each. Click a system to zoom in; click again to drill into a subsystem; click the center node to zoom back out.

Three forms of the same component, for different contexts:

- **`revenue-matrix-zoom-explorer.jsx`** — React implementation. Uses a static `SYSTEMS` array (hardcoded framework data + colors from `tokens/colors.json`).
- **`revenue-matrix-zoom-explorer.html`** — Vanilla JS/HTML embed, framework-agnostic. This is the version actually live in production: it fetches framework data live from Supabase (`revhealth2` schema, `parent_systems → child_systems → evaluation_areas`) rather than hardcoding it, so it always reflects the current framework without a redeploy.
- **`rhv-matrix-explorer-shortcode.php`** — WordPress shortcode (`[revenue_matrix_explorer]`) that serves the HTML file from the active child theme's directory.

## Setup (WordPress)

1. Add the PHP shortcode function to the child theme's `functions.php` (or a small custom plugin).
2. Upload `revenue-matrix-zoom-explorer.html` into the theme directory, e.g. `wp-content/themes/YOUR-CHILD-THEME/revenue-matrix-zoom-explorer.html`.
3. Place `[revenue_matrix_explorer]` on any page or post.

## Data source

The live (HTML) version pulls from Supabase project `zvgijxpfsiivkoyfhpcp`, table `parent_systems` with nested `child_systems` and `evaluation_areas`, schema `revhealth2`. This is shared with the assessment app — single source of truth. `data/rhv-framework-data.json` in this repo is a static reference snapshot of that structure, used by the React version and for offline reference.
