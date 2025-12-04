'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  maxWidth?: '2xl' | '4xl' | '6xl' | '7xl'
  padding?: 'sm' | 'md' | 'lg'
  background?: 'default' | 'secondary'
  children: React.ReactNode
}

const fadeIn = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hidden: { opacity: 0, y: 20 },
}

/**
 * Section component - Standardized section wrapper with consistent spacing and max-widths
 * 
 * @example
 * <Section maxWidth="6xl" background="secondary">
 *   <h2>Section Title</h2>
 *   <p>Section content</p>
 * </Section>
 */
export default function Section({
  id,
  className,
  maxWidth = '6xl',
  padding = 'md',
  background = 'default',
  children
}: SectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const maxWidthMap = {
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  }

  const paddingClass = padding === 'sm' ? 'py-12' : padding === 'lg' ? 'py-20' : 'py-16'
  const backgroundClass = background === 'secondary' ? 'bg-secondary/30' : ''

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn(
        'flex items-center',
        paddingClass,
        backgroundClass,
        className
      )}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
    >
      <div className={cn('mx-auto px-4 sm:px-6 w-full', maxWidthMap[maxWidth])}>
        {children}
      </div>
    </motion.section>
  )
}

