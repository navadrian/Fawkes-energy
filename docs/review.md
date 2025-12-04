# Website Review & Recommendations

## Overview
This review focuses on the implementation of **Semantic HTML** and **BEM (Block Element Modifier)** methodology within the current Next.js + Tailwind CSS codebase.

## Current State
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS (Utility-first)
- **Structure**: Monolithic `page.tsx` containing multiple section components.
- **BEM Usage**: Not strictly followed. The project relies on Tailwind's utility classes rather than semantic BEM class names (e.g., `.block__element--modifier`).

## Recommendations

### 1. BEM in a Tailwind Context
Strictly enforcing BEM class names (like `class="card__title card__title--large"`) alongside Tailwind utilities can lead to cluttered code. Instead, we recommend a **Component-Oriented BEM** approach:

- **Block**: The React Component (e.g., `HeroSection`, `Card`).
- **Element**: Sub-components or styled JSX elements (e.g., `CardHeader`, `HeroVideo`).
- **Modifier**: Component Props (e.g., `variant="primary"`, `size="lg"`).

**Action Item**: Continue refactoring sections from `page.tsx` into individual files in `components/sections/`. This enforces the "Block" separation.

### 2. Semantic HTML Improvements
The current HTML structure is generally good but can be improved for better accessibility and SEO.

- **Cards**: Use `<article>` for self-contained content like blog posts or feature cards, instead of `<div>`.
- **Figures**: Use `<figure>` and `<figcaption>` for charts and images with captions.
- **Address**: Use `<address>` for contact information in the Footer or Contact section.
- **Lists**: Ensure lists of items (like features or team members) are wrapped in `<ul>` or `<ol>`.

### 3. Refactoring `page.tsx`
The `app/page.tsx` file was quite large (~1700 lines). We have started refactoring it by extracting `HeroSection`.

**Completed Refactoring:**
- Created `components/sections/HeroSection.tsx`.
- Created `hooks/useVideoOptimization.ts` (extracted logic).
- Created `components/ui/AnimatedSection.tsx` (extracted UI wrapper).
- Updated `app/page.tsx` to use the new components.

**Next Steps:**
- Extract `ProblemSection`, `VisionSection`, etc., into `components/sections/`.
- Move `Header` and `Footer` to `components/layout/`.

### 4. Accessibility (A11y)
- Ensure all interactive elements (buttons, links) have descriptive `aria-label`s if they don't have visible text.
- Verify color contrast ratios (Ochre on White seems okay, but check specific combinations).
- Ensure focus states are visible (Tailwind's `focus-visible` utilities are being used, which is good).

## Example: Card Component with BEM-like Props
The existing `Card` component already follows a BEM-like pattern using props:
```tsx
// Block: Card
// Modifier: variant, padding
<Card variant="elevated" padding="lg">
  {/* Elements: Children */}
  <h3>Title</h3>
</Card>
```
This is the preferred way to implement "BEM" in a React + Tailwind environment.
