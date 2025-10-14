# Fawkes Energy - Spacing Scale Standard

## Overview
This document defines the official spacing scale for the Fawkes Energy website, based on Tailwind CSS's spacing system. Consistent spacing improves visual rhythm, reduces design debt, and ensures a professional, polished appearance across all sections.

---

## Official Spacing Scale

Our spacing system is based on Tailwind's 0.25rem (4px) increment system:

### Micro Spacing (Tight Elements)
- **space-2** (0.5rem / 8px) - Minimal internal spacing
- **space-3** (0.75rem / 12px) - Tight spacing within components

### Small Spacing (Component Internals)
- **space-4** (1rem / 16px) - Default small spacing, list items, small gaps
- **space-6** (1.5rem / 24px) - Medium component spacing, section elements

### Medium Spacing (Section Spacing)
- **space-8** (2rem / 32px) - Standard gap between major elements
- **space-12** (3rem / 48px) - Generous section spacing

### Large Spacing (Section Margins)
- **space-16** (4rem / 64px) - Large spacing between major sections
- **space-20** (5rem / 80px) - Extra-large section breaks
- **space-24** (6rem / 96px) - Maximum spacing for hero/major dividers

---

## Usage Guidelines

### When to Use Each Scale

#### Micro Spacing (2, 3)
**Use for:**
- Icon-to-text gaps within buttons
- Tight bullet point spacing
- Inline badge/tag padding
- Small decorative elements

**Examples:**
```tsx
// Icon + text in button
<button className="flex items-center gap-2">
  <Icon /> Text
</button>

// Compact list spacing
<ul className="space-y-2">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

#### Small Spacing (4, 6)
**Use for:**
- Card padding (default)
- Button padding
- Form element spacing
- List item gaps
- Small component margins

**Examples:**
```tsx
// Card internal padding
<div className="p-4 rounded-lg">
  Content
</div>

// Button padding
<button className="px-4 py-2">
  Click me
</button>

// Moderate list spacing
<div className="space-y-4">
  <div>Item</div>
  <div>Item</div>
</div>
```

#### Medium Spacing (8, 12)
**Use for:**
- Large card padding
- Section internal spacing
- Grid/column gaps
- Major element separation
- Heading-to-content spacing

**Examples:**
```tsx
// Large card
<div className="p-8">
  Spacious content
</div>

// Grid layout
<div className="grid grid-cols-2 gap-8">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

// Section heading separation
<div className="mb-12">
  <h2>Section Title</h2>
</div>
```

#### Large Spacing (16, 20, 24)
**Use for:**
- Section vertical padding (py-16)
- Major section margins
- Hero section spacing
- Page-level layout gaps

**Examples:**
```tsx
// Section padding
<section className="py-16">
  Section content
</section>

// Hero section
<section className="pt-16 px-6">
  Hero content
</section>

// Large vertical space between sections
<div className="space-y-16">
  <Section1 />
  <Section2 />
</div>
```

---

## Current Spacing Analysis

### Analysis of app/page.tsx

#### Padding Values Found
| Value | Count | Current Usage |
|-------|-------|---------------|
| `p-2` | 4 | Small elements (debug overlay, icons) |
| `p-3` | 6 | Tab buttons, small cards (mobile) |
| `p-4` | 14 | Standard card padding, metric cards, team cards |
| `p-6` | 18 | Large cards, sections, form containers |
| `p-8` | 4 | Hero content, co-founder cards, spacious sections |
| `px-2` | 1 | Tab button horizontal |
| `px-3` | 9 | Form inputs, tab nav, badge pills |
| `px-4` | 3 | Header button, tab buttons (desktop) |
| `px-6` | 8 | Header, sections, contact buttons |
| `py-1` | 1 | Badge pill vertical |
| `py-2` | 6 | Buttons, form inputs, tab buttons |
| `py-3` | 4 | Header, buttons, tab navigation |
| `py-8` | 2 | Mobile menu, footer |
| `py-16` | 10 | Section vertical padding (STANDARD) |

#### Margin Values Found
| Value | Count | Current Usage |
|-------|-------|---------------|
| `mb-1` | 4 | Metric value spacing |
| `mb-2` | 8 | Heading-to-subheading, tight element spacing |
| `mb-3` | 5 | Insight text, key challenges heading |
| `mb-4` | 17 | Section headings, icon containers, cards |
| `mb-6` | 11 | Section titles, product descriptions, story sections |
| `mb-8` | 5 | Vision diagram, team sections |
| `mb-12` | 7 | Section introductions (STANDARD) |
| `mt-1` | 2 | Bullet point alignment, small shifts |
| `mt-2` | 1 | Footer secondary text |
| `mt-4` | 4 | Mobile menu button, diagram labels |
| `mr-2` | 1 | Bullet point spacing |
| `mr-3` | 1 | Logo spacing |

#### Gap Values Found
| Value | Count | Current Usage |
|-------|-------|---------------|
| `gap-2` | 3 | Small grids, compact layouts |
| `gap-3` | 8 | Icon+text buttons, team cards |
| `gap-4` | 2 | Metric grids, team layout |
| `gap-6` | 4 | Form grids, value cards |
| `gap-8` | 4 | Header nav, co-founders, partners grid |
| `gap-12` | 2 | Product stack alternating layout |

#### Space-Y/Space-X Values Found
| Value | Count | Current Usage |
|-------|-------|---------------|
| `space-y-2` | 2 | Tight lists, diagram flow |
| `space-y-3` | 2 | Challenge lists, loading indicator |
| `space-y-4` | 2 | Story paragraphs, value metrics |
| `space-y-6` | 3 | Mobile menu navigation, form fields |
| `space-y-16` | 1 | Product stack sections |
| `space-x-1.5` | 1 | Mobile tab icons |
| `space-x-2` | 2 | Tab navigation, mobile spacing |
| `space-x-6` | 1 | Desktop tab navigation |

---

## Migration Mapping

### Standardization Strategy

The following table maps current inconsistent spacing values to standardized values:

| Current Value | New Standard | Context/Use Case | Rationale |
|--------------|--------------|------------------|-----------|
| **PADDING** |
| `p-3` (mobile) | `p-4` | Tab buttons, small cards | Align to 4px base, improve touch targets |
| `px-3` | `px-4` | Form inputs, badges | Consistent with button padding |
| `py-3` | `py-4` | Header, navigation | Better visual balance |
| `p-2` | `p-2` | KEEP | Valid for debug/micro elements |
| `p-4` | `p-4` | KEEP | Standard card padding |
| `p-6` | `p-6` | KEEP | Large card/section padding |
| `p-8` | `p-8` | KEEP | Hero/spacious content padding |
| `py-16` | `py-16` | KEEP | **Official section padding** |

| **MARGINS** |
| `mb-3` | `mb-4` | Insight text, labels | Clearer visual separation |
| `mb-1` | `mb-2` | Metric spacing | Minimum should be 2 (8px) |
| `mb-2` | `mb-2` | KEEP | Valid for tight heading spacing |
| `mb-4` | `mb-4` | KEEP | Standard element spacing |
| `mb-6` | `mb-6` | KEEP | Section title spacing |
| `mb-8` | `mb-8` | KEEP | Large section breaks |
| `mb-12` | `mb-12` | KEEP | **Official section intro spacing** |
| `mt-1` | `mt-2` | Bullet alignment | Minimum 8px for clarity |

| **GAPS** |
| `gap-3` | `gap-4` | Icon+text, team cards | Align to base-4 increment |
| `gap-2` | `gap-2` | KEEP | Valid for compact layouts |
| `gap-4` | `gap-4` | KEEP | Standard grid gap |
| `gap-6` | `gap-6` | KEEP | Form/card grids |
| `gap-8` | `gap-8` | KEEP | Large layout gaps |
| `gap-12` | `gap-12` | KEEP | Major layout spacing |

| **SPACE** |
| `space-x-1.5` | `space-x-2` | Mobile tab icons | Align to base increment |
| `space-y-3` | `space-y-4` | Challenge lists | Better readability |
| `space-y-2` | `space-y-2` | KEEP | Tight list spacing |
| `space-y-4` | `space-y-4` | KEEP | Standard list spacing |
| `space-y-6` | `space-y-6` | KEEP | Form field spacing |
| `space-y-16` | `space-y-16` | KEEP | Major section spacing |

---

## Responsive Spacing Pattern

### Mobile-First Approach

Use smaller spacing on mobile, scale up on larger screens:

```tsx
// Good: Responsive padding
<div className="p-4 md:p-6 lg:p-8">
  Scales from small to large screens
</div>

// Good: Responsive gaps
<div className="gap-4 md:gap-6 lg:gap-8">
  Grid spacing scales appropriately
</div>

// Good: Responsive margins
<h2 className="mb-6 md:mb-8 lg:mb-12">
  Heading spacing scales with viewport
</h2>
```

### Current Responsive Patterns (Keep These)

| Pattern | Usage | Status |
|---------|-------|--------|
| `px-4 sm:px-6` | Section horizontal padding | KEEP |
| `py-3 md:py-4` | Tab navigation | KEEP |
| `p-3 md:p-6` | Card padding | STANDARDIZE to `p-4 md:p-6` |
| `gap-2 md:gap-6` | Tab spacing | STANDARDIZE to `gap-4 md:gap-6` |
| `space-x-2 md:space-x-6` | Navigation | KEEP |
| `p-8 md:p-12` | Hero padding | KEEP |

---

## Common Spacing Patterns

### Section Layout (STANDARD)
```tsx
<section className="py-16">
  <div className="max-w-6xl mx-auto px-6">
    <div className="mb-12">
      {/* Section intro */}
    </div>
    {/* Section content */}
  </div>
</section>
```

### Card Component (STANDARD)
```tsx
// Small card
<div className="p-4 rounded-lg border">
  Content
</div>

// Large card
<div className="p-6 rounded-lg border">
  Content
</div>

// Hero card
<div className="p-8 md:p-12 rounded-lg">
  Major content
</div>
```

### Grid Layouts (STANDARD)
```tsx
// Tight grid
<div className="grid grid-cols-2 gap-4">
  Cards
</div>

// Standard grid
<div className="grid grid-cols-2 gap-6">
  Cards
</div>

// Spacious grid
<div className="grid grid-cols-2 gap-8">
  Cards
</div>
```

### List Spacing (STANDARD)
```tsx
// Tight list
<ul className="space-y-2">
  <li>Compact items</li>
</ul>

// Standard list
<ul className="space-y-4">
  <li>Normal items</li>
</ul>

// Generous list
<ul className="space-y-6">
  <li>Spacious items</li>
</ul>
```

---

## Before/After Examples

### Example 1: Tab Navigation
**Before:**
```tsx
<div className="flex space-x-2 md:space-x-6 px-3 md:px-6 py-3 md:py-4">
  <button className="px-2 md:px-4 py-2 md:py-3">
    Tab 1
  </button>
</div>
```

**After (Standardized):**
```tsx
<div className="flex gap-4 md:gap-6 px-4 md:px-6 py-4">
  <button className="px-4 py-2">
    Tab 1
  </button>
</div>
```

**Changes:**
- `space-x-2` → `gap-4` (consistent minimum spacing)
- `px-3` → `px-4` (align to 4-unit base)
- `py-3` → `py-4` (align to 4-unit base)
- `px-2 md:px-4` → `px-4` (consistent across breakpoints)
- `py-2 md:py-3` → `py-2` (simplified)

---

### Example 2: Card Content
**Before:**
```tsx
<div className="p-3 md:p-6">
  <h4 className="mb-2">Title</h4>
  <p className="mb-3">Content</p>
  <div className="flex items-center gap-3">
    <Icon />
    <span>Text</span>
  </div>
</div>
```

**After (Standardized):**
```tsx
<div className="p-4 md:p-6">
  <h4 className="mb-2">Title</h4>
  <p className="mb-4">Content</p>
  <div className="flex items-center gap-4">
    <Icon />
    <span>Text</span>
  </div>
</div>
```

**Changes:**
- `p-3` → `p-4` (align to standard card padding)
- `mb-3` → `mb-4` (consistent element spacing)
- `gap-3` → `gap-4` (align to base-4 increment)

---

### Example 3: Section Header
**Before:**
```tsx
<div className="text-center mb-12">
  <h2 className="mb-4">Section Title</h2>
  <p className="mb-3">Subtitle</p>
</div>
```

**After (Standardized):**
```tsx
<div className="text-center mb-12">
  <h2 className="mb-4">Section Title</h2>
  <p>Subtitle</p>
</div>
```

**Changes:**
- Removed `mb-3` from subtitle (not needed as last element in container)
- Kept `mb-12` for section spacing (standard)
- Kept `mb-4` for title-to-subtitle (standard)

---

## Implementation Checklist

### Phase 1: Documentation (CURRENT)
- [x] Analyze current spacing usage
- [x] Define standardized spacing scale
- [x] Create migration mapping
- [x] Document usage guidelines

### Phase 2: Code Migration (NEXT)
- [ ] Update all `p-3` → `p-4` instances
- [ ] Update all `px-3` → `px-4` instances
- [ ] Update all `gap-3` → `gap-4` instances
- [ ] Update all `space-x-1.5` → `space-x-2` instances
- [ ] Update all `mb-3` → `mb-4` instances
- [ ] Update all `mb-1` → `mb-2` instances
- [ ] Update all `mt-1` → `mt-2` instances
- [ ] Test responsive behavior on all breakpoints

### Phase 3: Validation
- [ ] Visual regression testing
- [ ] Mobile responsiveness check
- [ ] Accessibility testing (touch target sizes)
- [ ] Design review and approval

---

## Best Practices

### DO
- Use the spacing scale consistently across all components
- Follow responsive patterns (smaller on mobile, larger on desktop)
- Stick to base-4 increments (2, 4, 6, 8, 12, 16, etc.)
- Use semantic spacing (section headers get `mb-12`, cards get `p-6`)
- Document any deviations from the standard

### DON'T
- Use arbitrary spacing values (e.g., `p-5`, `gap-7`, `mb-11`)
- Mix spacing units inconsistently within the same component
- Use `space-x-3` or `gap-3` when `gap-4` would work
- Skip responsive breakpoints for spacing
- Use negative margins unless absolutely necessary

---

## Edge Cases

### When to Deviate from the Standard

1. **Fine-tuning alignment:** Use `mt-1` or `mt-0.5` for precise icon/text alignment
2. **Pixel-perfect designs:** If design specs require non-standard spacing, document why
3. **Third-party components:** When integrating external libraries with their own spacing
4. **Accessibility requirements:** Larger touch targets may need custom padding

**Important:** Always document deviations in code comments:

```tsx
// Using p-5 to match design specification for hero card
<div className="p-5 rounded-lg">
  Custom spacing
</div>
```

---

## Maintenance

### Reviewing Spacing
- Run monthly audits of spacing usage
- Check for new arbitrary values introduced
- Update this guide as patterns evolve
- Share learnings with the team

### Tools
- Use Tailwind CSS IntelliSense for autocomplete
- Consider using a linter to flag non-standard spacing
- Create component templates with pre-approved spacing

---

## Summary

**Official Spacing Scale:**
- Micro: 2, 3
- Small: 4, 6
- Medium: 8, 12
- Large: 16, 20, 24

**Key Standards:**
- Section padding: `py-16`
- Section intro margin: `mb-12`
- Card padding: `p-4` (small), `p-6` (large)
- Grid gaps: `gap-4`, `gap-6`, `gap-8`
- List spacing: `space-y-4` (standard)

**Migration Priority:**
1. Replace `p-3` → `p-4` (14 instances)
2. Replace `gap-3` → `gap-4` (8 instances)
3. Replace `mb-3` → `mb-4` (5 instances)
4. Clean up responsive inconsistencies

---

**Document Version:** 1.0
**Last Updated:** 2025-10-08
**Next Review:** Monthly
**Owner:** Development Team
