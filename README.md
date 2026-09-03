# Marketplace Maven Design System

Source of truth for Marketplace Maven's visual design system — tokens, components, and brand guardrails. Built to sync into a Claude Design System project.

## What's in here

- **`source/`** — the real, canonical files: `mm-styles.css` (the live consolidated stylesheet the WordPress Divi child theme actually loads) and `mm-style-reference-v3.html` (Rachel's own visual reference page rendering every class in it). Treat these as authoritative.
- **`tokens/`** — JSON token extractions for tooling that can't read CSS directly: `colors.json` (brand palette), `typography.json` (type scale), `shape.json` (radius/shadow), and `matrix-system-colors.json` (the separate 5-color scheme used only by the Matrix explorer component below — not part of the general brand palette).
- **`components/revenue-matrix-explorer/`** — the interactive Revenue Health Matrix Zoom Explorer in its three forms (React, vanilla JS/HTML embed, WordPress shortcode). The one fully-built interactive component in the business today. Note: it currently uses its own color scheme and Inter-only type, not the full brand system in `tokens/` — see `BRAND-FOUNDATIONS-TODO.md`.
- **`data/`** — the underlying Revenue Health Matrix framework schema (5 parent systems × 10 subsystems × 4 evaluation areas). Live source of truth is Supabase (`revhealth2` schema); this is a reference snapshot.
- **`guidelines/`** — brand guardrails: the Visual Prompting System (illustration/iconography style rules for AI-generated imagery) and the IP/trademark usage guide (styling and capitalization rules for Revenue Health Matrix™, Shadow Systems™, PBJ Sessions™, etc.).

## Status

Brand foundations (palette, type scale, component CSS) are now defined, pulled from the live Divi child theme stylesheet. See `BRAND-FOUNDATIONS-TODO.md` for what's still open — mainly logo assets and reconciling the Matrix explorer's own color scheme with the main brand system.
