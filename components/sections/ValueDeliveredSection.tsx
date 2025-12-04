'use client'

import React from 'react'
import { CheckCircle, BarChart3, TrendingUp, AlertCircle } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Heading, Body } from '@/components/ui/Typography'

export default function ValueDeliveredSection() {
    return (
        <Section id="value" maxWidth="7xl">
            <div className="text-center mb-12">
                <Heading variant="lg" className="mb-4">Tangible Value, Delivered</Heading>
                <Body variant="lg" className="max-w-2xl mx-auto">
                    Our intelligence translates into measurable improvements for your bottom line and operational efficiency.
                </Body>
            </div>

            {/* Core Value Propositions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                <Card variant="default" className="text-center bg-primary/5 border-primary/20">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-6 h-6 text-primary" />
                    </div>
                    <Heading variant="md" as="h3" className="mb-2">Reliable SOH Report in &lt;1 hour</Heading>
                    <Body variant="sm">Cutting testing time by 70%</Body>
                </Card>

                <Card variant="default" className="text-center bg-primary/5 border-primary/20">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <Heading variant="md" as="h3" className="mb-2">±3% accuracy</Heading>
                    <Body variant="sm">in SOH &amp; RUL forecasts</Body>
                </Card>

                <Card variant="default" className="text-center bg-primary/5 border-primary/20">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <Heading variant="md" as="h3" className="mb-2">Lower TCO by up to 15%</Heading>
                    <Body variant="sm">through predictive, optimized, value-driven maintenance tracking</Body>
                </Card>

                <Card variant="default" className="text-center bg-primary/5 border-primary/20">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-6 h-6 text-primary" />
                    </div>
                    <Heading variant="md" as="h3" className="mb-2">Cut unplanned down time by &gt; 20%</Heading>
                    <Body variant="sm">through anomaly alerts, reducing unexpected asset stoppages</Body>
                </Card>
            </div>
        </Section>
    );
}
