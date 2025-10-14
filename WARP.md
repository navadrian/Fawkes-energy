# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Fawkes Energy Website** - A high-performance marketing website for a deep-tech battery intelligence startup. Built with Next.js 14, TypeScript, and Tailwind CSS, deployed as a static site to Netlify.

## Common Development Commands

### Development
```bash
# Start development server
npm run dev

# Lint code
npm run lint

# Type check (TypeScript)
npx tsc --noEmit
```

### Build & Production
```bash
# Build with video compression
npm run build

# Build without video compression (faster)
npm run build:no-compress

# Start production server (after build)
npm start

# Compress videos only
npm run compress-videos:only
```

### Testing
```bash
# No test runner configured yet
# Consider: npm install --save-dev @testing-library/react jest
```

## Architecture & Code Structure

### Core Stack
- **Framework**: Next.js 14 (App Router) with static export
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS + custom design system
- **Animations**: Framer Motion
- **Charts**: Chart.js with react-chartjs-2
- **Theme**: Dark mode only (via next-themes)
- **Icons**: Lucide React

### Key Directories
- `app/` - Next.js App Router pages and layouts
  - `page.tsx` - Single-page application (1467 lines) with scroll-snap sections
  - `layout.tsx` - Root layout with fonts and metadata
- `components/ui/` - Reusable UI components (Button, etc.)
- `lib/` - Utility functions (cn for class merging)
- `scripts/` - Build scripts (video compression)
- `public/` - Static assets
  - `images/` - Logos and posters
  - `videos/` - Compressed video backgrounds

### Design System
- **Colors**: CSS variables in HSL format
  - Primary: `hsl(37 100% 48%)` (ochre #FFC300)
  - Background: `hsl(20 14.3% 4.1%)` (dark)
- **Typography**: 
  - Headings: Space Grotesk (`font-heading`)
  - Body: Inter (`font-body`)
- **Spacing**: Tailwind defaults with some custom values
- **Container widths**: Various (max-w-2xl to max-w-7xl)

### Key Patterns

#### Single-Page Scroll Experience
The entire site is structured as a single page with scroll-snap sections:
```tsx
<main className="h-screen overflow-y-auto scroll-smooth" style={{ scrollSnapType: 'y mandatory' }}>
  <AnimatedSection id="hero" className="min-h-screen">...</AnimatedSection>
  <AnimatedSection id="problem" className="min-h-screen">...</AnimatedSection>
  // ... more sections
</main>
```

#### Video Optimization
Background videos are optimized for performance:
- Desktop: 1920x1080 @ 30fps
- Mobile: 720x480 @ 24fps  
- Formats: WebM (VP9) and MP4 (H.264) fallbacks
- Lazy loading with intersection observer
- Connection speed detection

#### Chart Integration
Interactive charts for each stakeholder using Chart.js:
```tsx
const chartData: ChartConfig[] = [
  { type: 'Bar', data: {...}, options: {...} },
  { type: 'Line', data: {...}, options: {...} },
  { type: 'Doughnut', data: {...}, options: {...} }
];
```

#### Component Architecture
- Composition pattern with `AnimatedSection` wrapper
- Responsive tab navigation for stakeholder pain points
- Reusable chart rendering with responsive containers

### Important Considerations

1. **Static Export**: Site is built as static HTML (`output: 'export'`)
2. **No API Routes**: Being a static site, no server-side functionality
3. **Video Assets**: Large video files in `videos/` directory need compression before build
4. **Image Optimization**: Disabled due to static export (`unoptimized: true`)
5. **Dark Theme Only**: Theme is forced to dark (`forcedTheme="dark"`)

### Development Protocols

The project includes strict development protocols in `.cursorrules`:
- **@request** - Standard feature implementation protocol
- **@refresh** - Root cause analysis for bug fixes
- **@retro** - Retrospective and learning protocol
- Emphasis on concise, signal-focused communication