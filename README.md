# Marketplace Maven Design System

Source of truth for Marketplace Maven's visual design system — tokens, components, and brand guardrails. Built to sync into a Claude Design System project.

## What's in here today

This repo currently formalizes the design assets that already existed in code/docs, pulled from the Marketplace Maven Divi Theme project:

- **`tokens/`** — the color and type tokens implicit in the live Revenue Health Matrix explorer (the only place a real palette was actually defined in code).
- **`components/revenue-matrix-explorer/`** — the interactive Revenue Health Matrix Zoom Explorer in its three forms (React, vanilla JS/HTML embed, WordPress shortcode). This is the one fully-built, live UI component in the business today.
- **`data/`** — the underlying framework schema (5 parent systems × 10 subsystems × 4 evaluation areas) the explorer visualizes. Source of truth for this data lives in Supabase (`revhealth2` schema); this JSON is a reference snapshot.
- **`guidelines/`** — brand guardrails that exist today: the Visual Prompting System (illustration/iconography style rules for AI-generated imagery) and the IP/trademark usage guide (how proprietary terms like Revenue Health Matrix™, Shadow Systems™, and PBJ Sessions™ must be styled and capitalized).

## What's NOT in here yet

There is no defined primary brand palette (the colors in `tokens/colors.json` are the Revenue Health Matrix's *system* colors, not necessarily Marketplace Maven's brand palette), no logo files or usage rules, and no type scale beyond "Inter, used in the explorer." These are pending brand foundation decisions — see `BRAND-FOUNDATIONS-TODO.md`.

## Status

First pass: formalizing what already existed. Full brand foundations (palette, logo, type scale) to follow once source material is in hand.
