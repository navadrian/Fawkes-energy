import React from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  variant?: 'xl' | 'lg' | 'md' | 'sm' | 'base' | 'caption'
  className?: string
  children: React.ReactNode
}

/**
 * Heading component - For h1, h2, h3 headings
 * Enforces design system typography scale
 */
export function Heading({
  as: Component = 'h2',
  variant = 'lg',
  className,
  children
}: Omit<TypographyProps, 'variant'> & { variant?: 'xl' | 'lg' | 'md' }) {
  const variantClasses: Record<'xl' | 'lg' | 'md', string> = {
    xl: 'text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4',
    lg: 'text-2xl md:text-3xl font-bold font-heading mb-4',
    md: 'text-xl md:text-2xl font-semibold font-heading mb-4'
  }

  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  )
}

/**
 * Subheading component - For h4, h5, h6 subheadings
 */
export function Subheading({
  as: Component = 'h4',
  className,
  children
}: Omit<TypographyProps, 'variant'>) {
  return (
    <Component className={cn('text-lg md:text-xl font-semibold font-heading mb-2', className)}>
      {children}
    </Component>
  )
}

/**
 * Body component - For paragraphs and body text
 */
export function Body({
  as: Component = 'p',
  variant = 'base',
  className,
  children
}: Omit<TypographyProps, 'variant'> & { variant?: 'lg' | 'base' | 'sm' }) {
  const variantClasses: Record<'lg' | 'base' | 'sm', string> = {
    lg: 'text-lg text-muted-foreground leading-relaxed',
    base: 'text-base text-muted-foreground leading-relaxed',
    sm: 'text-sm text-muted-foreground leading-relaxed'
  }

  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  )
}

/**
 * Caption component - For small text and captions
 */
export function Caption({
  as: Component = 'span',
  className,
  children
}: Omit<TypographyProps, 'variant'>) {
  return (
    <Component className={cn('text-xs text-muted-foreground', className)}>
      {children}
    </Component>
  )
}

