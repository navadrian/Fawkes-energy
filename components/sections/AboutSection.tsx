'use client'

import React from 'react'
import { Users } from 'lucide-react'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { Heading, Subheading, Body } from '@/components/ui/Typography'

export default function AboutSection() {
    return (
        <Section id="about" maxWidth="6xl" background="secondary" className="min-h-screen">
            <div className="text-center mb-12">
                <Heading variant="lg" className="mb-4">We Are Battery People</Heading>
                <Body variant="lg" className="max-w-2xl mx-auto">
                    We are a team of scientists, engineers, and entrepreneurs obsessed with solving the hardest problems in energy storage.
                </Body>
            </div>

            {/* Our Story */}
            <div className="mb-16 max-w-4xl mx-auto">
                <Heading variant="md" as="h3" className="mb-6">Our Story</Heading>
                <div className="space-y-4">
                    <Body>
                        Fawkes Energy was born from a clear insight: <strong className="text-foreground">the EV ecosystem in India struggles because accurate battery data is hard to access.</strong>
                    </Body>
                    <Body>
                        Without it, batteries are often recycled too early, used EVs lose resale value, and many end-of-first-life batteries never reach the second-life applications they're best suited for.
                    </Body>
                    <Body>
                        We set out to change that.
                    </Body>
                    <Body>
                        Our mission is to <strong className="text-foreground">unlock high-quality battery intelligence</strong>, improving insights on <strong className="text-foreground">safety, State-of-Health (SoH), and Remaining Useful Life (RUL)</strong> to help every battery reach its full potential.
                    </Body>
                    <Body>
                        By enabling smarter reuse, fairer resale, and more sustainable second-life applications, we're driving circularity across the battery value chain, and shaping a future where <strong className="text-foreground">every battery counts.</strong>
                    </Body>
                    <Body>
                        Fawkes Energy is born out of a deep understanding of the challenges in the battery value chain, from materials science to end-of-life management.
                    </Body>
                </div>
            </div>

            {/* Co-Founders */}
            <div className="mb-16">
                <Heading variant="md" as="h3" className="mb-8 text-center">Co-Founders</Heading>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card>
                        <figure className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-secondary">
                            <img
                                src="/images/karthik-ganesh.jpg"
                                alt="Karthik Ganesh"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </figure>
                        <Subheading className="mb-2 text-center">Karthik Ganesh</Subheading>
                        <Body variant="sm" className="text-center">
                            Karthik brings 15+ years experience in powering clean tech with deep expertise in battery system design, thermal analysis, and real-world validation. From CFD to prototypes, he turns complex electrochemical systems into scalable energy solutions.
                        </Body>
                    </Card>

                    <Card>
                        <figure className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-secondary">
                            <img
                                src="/images/akshay-kumar.jpg"
                                alt="Akshay Kumar"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </figure>
                        <Subheading className="mb-2 text-center">Akshay Kumar</Subheading>
                        <Body variant="sm" className="text-center">
                            Blending physics with data, Akshay helps companies fast-track product development through digital prototyping. A CFD expert, machine learning enthusiast, and open-source geek who knows tech and the psychology of sales.
                        </Body>
                    </Card>
                </div>
            </div>

            {/* Team */}
            <div className="mb-16 max-w-4xl mx-auto">
                <Heading variant="md" as="h3" className="mb-6 text-center">Team</Heading>
                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { name: 'Medha Ajay', role: 'Brand and Venture Strategist' },
                        { name: 'Mohammed Suffiyan', role: 'Lead - Battery System Engineering' },
                        { name: 'Sunil Sheth', role: 'Technical Product Manager' },
                        { name: 'Kusumanjali D', role: 'Vendor & Compliance Manager' },
                        { name: 'Abhishek Sharma', role: 'Hardware Engineer' },
                        { name: 'Priyanka LK', role: 'Data Analyst' },
                        { name: 'Sidhant Bose', role: 'Software Engineer' },
                        { name: 'Jitendra Chute', role: 'Battery Modeling Engineer' }
                    ].map((member, index) => (
                        <Card key={index} padding="sm" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-foreground">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Partnerships */}
            <div>
                <Heading variant="md" as="h3" className="mb-8 text-center">In Association With</Heading>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Rubamin */}
                    <Card>
                        <figure className="mb-6 flex items-center justify-center h-24">
                            <img
                                src="/images/partners/rubamin-logo.png"
                                alt="Rubamin Logo"
                                className="max-h-full max-w-full object-contain"
                                loading="lazy"
                                onError={(e) => {
                                    // Fallback to text if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    const fallback = document.createElement('div');
                                    fallback.className = 'text-2xl font-bold text-muted-foreground tracking-wider';
                                    fallback.textContent = 'RUBAMIN';
                                    e.currentTarget.parentElement?.appendChild(fallback);
                                }}
                            />
                        </figure>
                        <Body variant="sm">
                            Rubamin is powering green mobility by providing a circular lifecycle management solution by recycling Lithium-Ion Batteries (LIBs). Their Zero-Waste, Industry 4.0-enabled, state-of-the-art recycling facility is designed to efficiently recover critical elements from end-of-life LIBs and Giga-factory production scrap.
                        </Body>
                    </Card>

                    {/* Battery 360 Alliance */}
                    <Card>
                        <figure className="mb-6 flex items-center justify-center h-24">
                            <img
                                src="/images/partners/battery-360-logo.png"
                                alt="Battery 360 Alliance Logo"
                                className="max-h-full max-w-full object-contain"
                                loading="lazy"
                                onError={(e) => {
                                    // Fallback to text if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    const fallback = document.createElement('div');
                                    fallback.className = 'text-xl font-semibold text-muted-foreground';
                                    fallback.textContent = 'Battery 360 Alliance';
                                    e.currentTarget.parentElement?.appendChild(fallback);
                                }}
                            />
                        </figure>
                        <Body variant="sm">
                            The Battery 360 Alliance is a multi-stakeholder platform launched to promote a sustainable and circular battery value chain in India. It aims to foster cross-sectoral collaborations and address challenges in the battery ecosystem, including localized manufacturing and battery reuse and recycling.
                        </Body>
                    </Card>

                    {/* Dezerv */}
                    <Card>
                        <div className="mb-6 flex items-center justify-center h-24">
                            <div className="text-2xl font-bold text-muted-foreground tracking-wider">
                                DEZERV
                            </div>
                        </div>
                        <Body variant="sm">
                            Dezerv is a Mumbai-based wealth tech startup that provides a suite of investment solutions tailored for India's affluent individuals, High Net Worth Individuals (HNIs), and family offices. The company's core offerings are built on an active portfolio monitoring philosophy, emphasizing data-driven decision-making to deliver superior investment outcomes through continuous market engagement and strategic adaptability.
                        </Body>
                    </Card>
                </div>
            </div>
        </Section>
    );
}
