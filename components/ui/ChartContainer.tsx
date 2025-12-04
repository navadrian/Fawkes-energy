import React from 'react'
import { cn } from '@/lib/utils'

interface ChartContainerProps {
  children: React.ReactNode
  source?: string
  height?: string
  className?: string
}

/**
 * ChartContainer component - Standardized chart wrapper with source citation
 * 
 * @example
 * <ChartContainer source="Source: Fawkes Energy internal analysis, 2025">
 *   <Bar data={chartData} options={chartOptions} />
 * </ChartContainer>
 */
export default function ChartContainer({
  children,
  source,
  height = 'h-[280px] md:h-[460px]',
  className
}: ChartContainerProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className={cn('p-4 md:p-8 w-full', height)}>
        {children}
      </div>
      {source && (
        <p className="px-4 md:px-8 pb-4 md:pb-8 text-[10px] italic text-muted-foreground text-center">
          {source}
        </p>
      )}
    </div>
  )
}

