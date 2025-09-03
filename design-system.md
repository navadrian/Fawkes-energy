# Fawkes Energy Design System

## 🎨 Brand Identity

### Logo Usage
- **Primary Logo**: Fawkes Energy wordmark with "FAWKES" and "ENERGY" text
- **Logo Colors**: Primary ochre (#FFC300) and dark ochre (#DAA520)
- **Logo Format**: SVG with transparent background
- **Typography**: Custom lettering with bold, modern styling

### Logo Guidelines
- Minimum size: 24px height
- Clear space: Equal to the height of the logo
- Acceptable backgrounds: White, dark surfaces
- Do not stretch, rotate, or modify colors

---

## 🎯 Color Palette

### Brand Color System
> **✅ Extracted from Fawkes Energy Logo**

#### Primary Colors
```css
--brand-primary: #FFC300      /* Ochre - Primary brand color from logo */
--brand-primary-dark: #DAA520 /* Dark ochre - Primary dark variant from logo */
--brand-primary-light: #FFD700 /* Light ochre - Primary light variant */
```

#### Accent Colors
```css
--electric-green: #00C853  /* Energy/tech accent */
--neon-cyan: #00B8D4      /* Innovation accent */
```

#### Background Colors
```css
--light-bg: #FFFFFF       /* Primary light background */
--light-bg-alt: #F5F5F5   /* Alternative light background */
--dark-surface: #202020   /* Primary dark surface */
--dark-surface-alt: #333333 /* Alternative dark surface */
```

#### Text Colors
```css
--text-primary-dark: #111827    /* Dark theme headings */
--text-secondary-dark: #374151  /* Dark theme body */
--text-muted-dark: #6B7280      /* Dark theme muted */
--text-primary-light: #FFFFFF   /* Light theme headings */
--text-secondary-light: #F0F0F0 /* Light theme body */
--text-muted-light: #B0B8C4     /* Light theme muted */
```

#### Border Colors
```css
--light-border: #E5E7EB   /* Light theme borders */
```

### Color Usage Guidelines

#### Primary Ochre (#FFC300)
- **Use for**: Primary CTAs, brand highlights, active states
- **Don't use for**: Large background areas, body text
- **Contrast ratio**: Ensure 4.5:1 minimum with text

#### Electric Green (#00C853)
- **Use for**: Success states, energy indicators, progress
- **Don't use for**: Error states, primary navigation

#### Neon Cyan (#00B8D4)
- **Use for**: Tech highlights, data visualization, accents
- **Don't use for**: Primary actions, warning states

---

## 📝 Typography

### Font Families
- **Headings**: Space Grotesk (300, 400, 500, 600, 700)
- **Body**: Inter (300, 400, 500, 600, 700)
- **Fallback**: system-ui, sans-serif

### Typography Scale
```css
/* Headings */
h1: 3xl-4xl (48-60px) - font-bold - Space Grotesk
h2: 2xl-3xl (36-48px) - font-bold - Space Grotesk  
h3: xl-2xl (24-36px) - font-bold - Space Grotesk
h4: lg-xl (18-24px) - font-semibold - Space Grotesk
h5: base-lg (16-18px) - font-semibold - Space Grotesk
h6: base (16px) - font-semibold - Space Grotesk

/* Body Text */
Large: lg (18px) - font-normal - Inter
Base: base (16px) - font-normal - Inter
Small: sm (14px) - font-normal - Inter
Caption: xs (12px) - font-normal - Inter
```

### Typography Guidelines
- **Line Height**: 1.6 for body text, 1.2-1.4 for headings
- **Letter Spacing**: Default for body, -0.02em for large headings
- **Font Weight**: Use semibold (600) instead of bold (700) for better readability

---

## 🧩 Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--ochre);
  color: var(--text-primary-dark);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  transition: all 300ms ease;
}

.btn-primary:hover {
  background: var(--ochre-dark);
  transform: scale(1.05);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: var(--light-bg-alt);
  color: var(--text-primary-dark);
  border: 1px solid var(--light-border);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
}
```

### Cards
```css
.card {
  background: var(--light-bg-alt);
  border: 1px solid var(--light-border);
  border-radius: 8px;
  padding: 24px;
  transition: all 300ms ease;
}

.card:hover {
  border-color: rgba(255, 195, 0, 0.3);
  transform: translateY(-4px);
}
```

### Form Inputs
```css
.form-input {
  background: var(--light-bg-alt);
  border: 1px solid var(--light-border);
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 16px;
  transition: all 300ms ease;
}

.form-input:focus {
  border-color: var(--ochre);
  box-shadow: 0 0 0 2px rgba(255, 195, 0, 0.2);
}
```

---

## 📐 Spacing & Layout

### Spacing Scale
```css
--space-xs: 4px     /* 0.25rem */
--space-sm: 8px     /* 0.5rem */
--space-md: 16px    /* 1rem */
--space-lg: 24px    /* 1.5rem */
--space-xl: 32px    /* 2rem */
--space-2xl: 48px   /* 3rem */
--space-3xl: 64px   /* 4rem */
--space-4xl: 96px   /* 6rem */
```

### Container Widths
```css
--container-sm: 640px    /* Small screens */
--container-md: 768px    /* Medium screens */
--container-lg: 1024px   /* Large screens */
--container-xl: 1280px   /* Extra large screens */
--container-max: 1536px  /* Maximum width */
```

### Border Radius
```css
--radius-sm: 4px     /* Small elements */
--radius-md: 6px     /* Default elements */
--radius-lg: 8px     /* Cards, buttons */
--radius-xl: 16px    /* Large sections */
--radius-full: 9999px /* Circular elements */
```

---

## 🎭 Animations & Transitions

### Timing Functions
```css
--ease-in-out: cubic-bezier(0.6, -0.05, 0.01, 0.99);
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in: cubic-bezier(0.32, 0, 0.67, 0);
```

### Duration Standards
```css
--duration-fast: 150ms    /* Micro-interactions */
--duration-normal: 300ms  /* Standard transitions */
--duration-slow: 500ms    /* Complex animations */
```

### Common Animations
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 195, 0, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 195, 0, 0.6); }
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px   /* Small devices */
--breakpoint-md: 768px   /* Medium devices */
--breakpoint-lg: 1024px  /* Large devices */
--breakpoint-xl: 1280px  /* Extra large devices */
--breakpoint-2xl: 1536px /* 2X large devices */
```

### Usage Guidelines
- Design mobile-first
- Use `min-width` media queries
- Test on actual devices
- Ensure touch targets are 44px minimum

---

## ✅ Design Checklist

### Visual Hierarchy
- [ ] Clear heading hierarchy (H1 → H6)
- [ ] Proper contrast ratios (4.5:1 minimum)
- [ ] Consistent spacing using design tokens
- [ ] Logical information architecture

### Accessibility
- [ ] Alt text for all images
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Color is not the only way to convey information
- [ ] Focus indicators are visible

### Performance
- [ ] Optimized images (WebP, proper sizing)
- [ ] Minimal animation impact
- [ ] Efficient CSS (no unused styles)
- [ ] Fast loading times

### Brand Consistency
- [ ] Logo usage follows guidelines
- [ ] Colors match brand palette
- [ ] Typography is consistent
- [ ] Tone of voice is maintained

### User Experience
- [ ] Clear navigation
- [ ] Intuitive interactions
- [ ] Consistent patterns
- [ ] Mobile-friendly design
- [ ] Fast and responsive

### Technical Quality
- [ ] Semantic HTML
- [ ] Valid CSS
- [ ] Cross-browser compatibility
- [ ] SEO optimization
- [ ] Clean, maintainable code

---

## 🎨 Component Library

### Navigation
- Header with logo and menu
- Mobile hamburger menu
- Breadcrumbs (if needed)

### Content
- Hero sections
- Feature cards
- Testimonials
- FAQ sections

### Forms
- Contact forms
- Newsletter signup
- Search inputs

### Feedback
- Loading states
- Error messages
- Success notifications
- Empty states

---

## 📖 Usage Guidelines

### Do's
- Use consistent spacing throughout
- Maintain color contrast standards
- Follow typography hierarchy
- Use brand colors appropriately
- Test across devices and browsers

### Don'ts
- Don't use colors outside the palette
- Don't mix font families inconsistently
- Don't ignore accessibility guidelines
- Don't create overly complex animations
- Don't break responsive layouts

---

## 🔄 Maintenance

### Regular Reviews
- Monthly design consistency audit
- Quarterly color palette review
- Bi-annual typography assessment
- Yearly brand guideline update

### Version Control
- Document all changes
- Maintain changelog
- Archive previous versions
- Communicate updates to team

---

*Last updated: [Current Date]*
*Version: 1.0*
