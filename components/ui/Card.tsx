import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
  className?: string
  children: React.ReactNode
}

/**
 * Card component - Consistent card styling with variants
 * 
 * @example
 * <Card variant="elevated" padding="lg" hover>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 */
export default function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  children
}: CardProps) {
  const variantClasses = {
    default: 'bg-background/50',
    elevated: 'bg-background/50 shadow-lg',
    outlined: 'bg-transparent border-2'
  }

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-border',
        variantClasses[variant],
        paddingClasses[padding],
        hover && 'hover:border-primary/30 transition-colors',
        className
      )}
    >
      {children}
    </div>
  )
}

