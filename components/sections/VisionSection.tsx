'use client'

import React from 'react'
import Section from '@/components/ui/Section'
import { Heading } from '@/components/ui/Typography'

export default function VisionSection() {
    return (
        <Section id="vision" maxWidth="4xl" background="secondary" className="min-h-screen text-center">
            <Heading variant="lg" className="mb-8">Vision for a Sustainable Future</Heading>

            <div className="relative max-w-2xl mx-auto mb-12">
                <img
                    src="/images/fawkes.png"
                    alt="Circular Economy Vision - F43i Battery Lifecycle"
                    className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>

            <blockquote className="text-xl italic text-muted-foreground leading-relaxed">
                "We envision a world where every battery is safe, efficient, and circular, powering a truly sustainable electric future."
            </blockquote>
        </Section>
    );
}
