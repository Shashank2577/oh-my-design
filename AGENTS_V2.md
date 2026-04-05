# oh-my-design — AGENTS_V2.md

Jules agent context for building Version 2 design style landing pages based on external brand identities.

## Project Overview

Expand the `oh-my-design` showcase with **54 new landing pages** based on popular tech brands and design systems from the [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) repository.

**Core rule**: Follow the same 10-section structure as defined in `docs/architecture.md`. Your goal is to capture the **visual identity and brand essence** of the assigned companies while maintaining the project's layout consistency.

---

## Your Task

1.  **Research the Design**: Read the `DESIGN.md` for your assigned styles from `https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/[style-name]/DESIGN.md`.
2.  **Create the Page**: Implement `app/styles/[slug]/page.tsx`.
    -   Use the brand's colors, typography (via next/font/google), and unique UI patterns (e.g., Stripe's diagonals, Apple's glassmorphism).
    -   Keep the 10 sections: Navbar, Hero, Stats, Features, Product Detail, Pricing, Testimonials, FAQ, Newsletter, Footer.
3.  **Register the Style**: Add the metadata to `lib/styles-registry.ts`.
    -   `slug`: The lowercase name (e.g., `airbnb`).
    -   `name`: The display name (e.g., `Airbnb`).
    -   `category`: Choose the best fit from `lib/styles-registry.ts` interfaces.
    -   `vibe`: A short description of the brand's look and feel.
    -   `accentColor`: The primary brand color.
    -   `built`: `true`.

---

## Tech Stack & Structure

Follow `AGENTS.md` and `docs/architecture.md` for tech stack (Next.js 15, Tailwind, Framer Motion, Lucide) and folder structure.

---

## Brand-Specific Notes

-   **Stripe**: Focus on complex gradients and precise typography.
-   **Apple**: Focus on whitespace, high-quality shadows, and "San Francisco" style sans-serifs (use Inter as fallback).
-   **Airbnb**: Focus on "Cereal" style typography, soft shadows, and airy layouts.
-   **Linear**: Focus on dark mode, glowing borders, and high-contrast accessibility.
-   **Vercel/Next.js**: Focus on minimalist black/white, geometric shapes, and speed.

---

## Commit Convention

```
feat(v2): add [brand-name] landing page
```
