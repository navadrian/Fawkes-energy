import React from 'react'
import { Clock } from 'lucide-react'

interface ReadingTimeProps {
    content: any // Portable Text content
    className?: string
}

// Helper to extract text from Portable Text blocks
function extractTextFromPortableText(blocks: any[]): string {
    if (!blocks || !Array.isArray(blocks)) return ''
    
    return blocks
        .filter((block: any) => block._type === 'block' && block.children)
        .map((block: any) => 
            block.children
                .filter((child: any) => child._type === 'span')
                .map((span: any) => span.text)
                .join('')
        )
        .join(' ')
}

// Calculate reading time based on average reading speed (200 words per minute)
function calculateReadingTime(text: string): number {
    const words = text.trim().split(/\s+/).length
    const wordsPerMinute = 200
    return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export default function ReadingTime({ content, className = '' }: ReadingTimeProps) {
    const text = extractTextFromPortableText(content)
    const minutes = calculateReadingTime(text)

    return (
        <span className={`flex items-center gap-1.5 ${className}`}>
            <Clock className="w-4 h-4" />
            {minutes} min read
        </span>
    )
}
