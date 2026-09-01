# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16, React 19, Tailwind CSS v4, Three.js, GSAP

## Users

Creative directors, brand leads, and collaborators evaluating NEHA's design work. Visitors who arrive to understand what NEHA does and whether to engage.

## Product Purpose

NEHA's portfolio website — an interactive journey showcasing a designer's perception across AI, XR, UX, and product design. The site makes the visitor understand what NEHA builds and why it matters.

## Positioning

A calm, authoritative portfolio that lets the work speak for itself. Every surface serves the content: the designer's craft, the projects, and the thinking behind them. No decoration without purpose.

## Operating Context

Desktop-first portfolio viewed on screens ranging from 390px to 1920px+. Dark theme default. The visitor scrolls through a curated journey from introduction through work to contact.

## Capabilities and Constraints

- Content is fixed: profile, 4 projects, 4 dimensions, 4 milestones, 12 skills, social links
- Must preserve all existing content and links
- Three.js/React Three Fiber 3D scenes are optional — the redesign may replace them with simpler visual elements
- GSAP animations available but should be used purposefully, not decoratively
- All content from `src/data/portfolio.ts` must remain intact
- Navigation must link to: timeline, dimensions, world, contact
- Footer must include social links

## Brand Commitments

- Name: NEHA
- Tagline: "I design the interfaces where intelligent systems and human needs meet — across every reality."
- Dimensions: PRODUCT (cyan), UX (volt/gold), XR (neon/pink), AI (sigil/purple)
- Tone: Confident, precise, calm — never salesy or desperate

## Evidence on Hand

- `src/data/portfolio.ts` — all profile, project, dimension, milestone, capability, skill, and social data
- `src/app/layout.tsx` — fonts: Space Grotesk (display), JetBrains Mono (mono), Instrument Serif (serif)
- `src/app/page.tsx` — current page structure with canvas, chrome, and content sections
- `src/components/` — all existing components including 3D scene components, chrome, UI components, and cinema/dom components
- `src/lib/` — gsap, sceneState, journey, interactions utilities
- `public/` — static assets

## Product Principles

1. The work leads — every pixel serves the content, never the reverse
2. Calm authority — the design should feel controlled, not frantic
3. Minimal means essential — remove everything that doesn't serve the visitor's understanding
4. Craft over spectacle — effects exist to serve the experience, not to impress
5. Typography as voice — the type system carries the personality when the visual recedes

## Accessibility & Inclusion

- Dark mode by default; ensure sufficient contrast
- Respect `prefers-reduced-motion`
- Keyboard navigable throughout
- Focus states visible and consistent
