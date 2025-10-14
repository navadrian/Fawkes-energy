# Container Max-Width Hierarchy

This document defines the standardized container widths across all sections for consistent visual hierarchy in `app/page.tsx`.

## Hierarchy Structure

### max-w-7xl (1280px) - Wide layouts with multi-column grids
- **Header** navigation
- **Value Delivered** section (main container + inner grids)

### max-w-6xl (1152px) - Standard section containers
- **Hero** section
- **Problem** section
- **Products** section
- **Differentiators** section
- **About** section (main container)
- **Footer**

### max-w-4xl (896px) - Content-focused sections & subsections
- **Vision** section
- **About subsections**:
  - Our Story
  - Co-Founders
  - Team
  - Partnerships

### max-w-2xl (672px) - Narrow content & forms
- **Contact** section
- **Hero section** content text
- **Section description** paragraphs

## Implementation Notes

- All section containers follow this hierarchy consistently
- The Value Delivered section uses `max-w-7xl` for both the main container and inner grids to maintain visual consistency for wide layouts
- Subsection max-widths are applied using `mx-auto` to center content within larger parent containers
- Description paragraphs within sections consistently use `max-w-2xl` for optimal readability

## Last Updated
2025-10-08
