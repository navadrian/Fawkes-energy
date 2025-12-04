'use client'

import React from 'react'
import { Cpu, Database, Battery } from 'lucide-react'
import Section from '@/components/ui/Section'
import { Heading, Body } from '@/components/ui/Typography'
import { differentiators } from '@/lib/data'

export default function DifferentiatorsSection() {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Cpu': return <Cpu className="w-6 h-6" />;
            case 'Database': return <Database className="w-6 h-6" />;
            case 'Battery': return <Battery className="w-6 h-6" />;
            default: return null;
        }
    };

    return (
        <Section id="differentiators" maxWidth="6xl" background="secondary">
            <div className="text-center mb-12">
                <Heading variant="lg" className="mb-4">Our Competitive Edge</Heading>
                <Body variant="lg" className="max-w-2xl mx-auto">
                    We're not just another analytics platform. Our core differentiators create a defensible moat.
                </Body>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {differentiators.map((item, index) => (
                    <div key={index} className="text-center">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            {React.cloneElement(getIcon(item.iconName) as React.ReactElement, { className: 'w-6 h-6 text-primary' })}
                        </div>
                        <Heading variant="md" as="h3" className="mb-2">{item.title}</Heading>
                        <Body variant="sm">{item.description}</Body>
                    </div>
                ))}
            </div>
        </Section>
    );
}
