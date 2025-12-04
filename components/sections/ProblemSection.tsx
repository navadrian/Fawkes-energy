'use client'

import React, { useState, useRef } from 'react'
import {
    Battery, Zap, Shield, TrendingUp, Recycle, Brain, BarChart3, Users
} from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, ChartOptions, ChartData } from 'chart.js';
import { Bar, Doughnut, Line, Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
import annotationPlugin from 'chartjs-plugin-annotation';
import Section from '@/components/ui/Section'
import ChartContainer from '@/components/ui/ChartContainer'
import { Heading, Subheading, Body } from '@/components/ui/Typography'
import { chartData, chartSources, painPointsData, painPoints, ChartConfig } from '@/lib/data'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, ChartDataLabels, FunnelController, TrapezoidElement, annotationPlugin);

export default function ProblemSection() {
    const [activeTab, setActiveTab] = useState(0);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    const tabs = [
        { name: 'EV OEMs', icon: <Shield className="w-4 h-4 md:w-5 md:h-5" /> },
        { name: 'Fleet Operators', icon: <Users className="w-4 h-4 md:w-5 md:h-5" /> },
        { name: 'Financiers', icon: <BarChart3 className="w-4 h-4 md:w-5 md:h-5" /> },
        { name: 'Recyclers', icon: <Recycle className="w-4 h-4 md:w-5 md:h-5" /> },
        { name: 'BESS Developers', icon: <Battery className="w-4 h-4 md:w-5 md:h-5" /> },
        { name: 'CPOs', icon: <Zap className="w-4 h-4 md:w-5 md:h-5" /> },
    ];

    const renderChart = (chart: ChartConfig) => {
        const commonOptions: ChartOptions<any> = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0, // Disable animations to prevent size jumping
                resize: { duration: 0 }
            },
            interaction: {
                intersect: false // Improve performance
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'hsl(0 0% 70%)',
                        usePointStyle: true,
                        padding: 12,
                        boxWidth: 14,
                        font: {
                            family: 'Inter, system-ui, sans-serif',
                            size: 13,
                            weight: '500'
                        }
                    },
                    position: 'bottom',
                    align: 'center'
                },
                title: { display: false },
                // Hide numbers on nodes/slices globally
                datalabels: { display: false }
            },
            scales: chart.type !== 'Doughnut' && chart.type !== 'Funnel' ? {
                x: {
                    ticks: {
                        color: 'hsl(0 0% 70%)',
                        font: {
                            family: 'Inter, system-ui, sans-serif',
                            size: 13,
                            weight: '500'
                        },
                        maxTicksLimit: 8
                    },
                    grid: {
                        color: 'hsl(0 0% 25%)',
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: 'hsl(0 0% 70%)',
                        font: {
                            family: 'Inter, system-ui, sans-serif',
                            size: 13,
                            weight: '500'
                        },
                        maxTicksLimit: 6
                    },
                    grid: {
                        color: 'hsl(0 0% 25%)',
                        drawBorder: false
                    }
                }
            } : undefined,
            layout: {
                padding: {
                    top: 10,
                    bottom: 30,
                    left: 10,
                    right: 10
                }
            },
            // Optimized for mobile responsiveness
            resizeDelay: 0,
            devicePixelRatio: 1,
            elements: {
                point: { radius: 0, hoverRadius: 3 },
                line: { borderWidth: 2, tension: 0.3 },
                bar: {
                    borderWidth: 1,
                    borderRadius: 4
                },
                arc: {
                    borderWidth: 2
                }
            }
        };

        // Responsive chart options optimized for containers
        const mergedOptions = chart.options ? {
            // Common defaults first, chart-specific overrides after
            ...commonOptions,
            ...chart.options,
            responsive: true,
            maintainAspectRatio: false,
            resizeDelay: 0,
            layout: { ...commonOptions.layout, ...chart.options.layout },
            plugins: {
                ...commonOptions.plugins,
                ...chart.options.plugins,
                legend: { ...((commonOptions.plugins as any)?.legend || {}), ...((chart.options.plugins as any)?.legend || {}) }
            },
            // Merge scales so chart-specific axes (e.g., titles) are preserved
            scales: chart.type !== 'Doughnut' && chart.type !== 'Funnel' ? {
                x: { ...((commonOptions.scales as any)?.x || {}), ...(((chart.options as any)?.scales?.x) || {}) },
                y: { ...((commonOptions.scales as any)?.y || {}), ...(((chart.options as any)?.scales?.y) || {}) }
            } : (chart.options as any)?.scales
        } : {
            ...commonOptions,
            responsive: true,
            maintainAspectRatio: false,
            resizeDelay: 0
        };

        // Responsive chart props without fixed dimensions
        const chartKey = `${chart.type.toLowerCase()}-${activeTab}`;
        const chartProps = {
            data: chart.data,
            options: mergedOptions,
            redraw: true
        };

        switch (chart.type) {
            case 'Bar': return <Bar key={chartKey} {...chartProps} />;
            case 'Line': return <Line key={chartKey} {...chartProps} />;
            case 'Doughnut': return <Doughnut key={chartKey} {...chartProps} />;
            case 'Funnel': return <Chart key={chartKey} type='funnel' {...chartProps} />;
            default: return null;
        }
    };

    return (
        <Section id="problem" maxWidth="6xl" background="secondary" className="min-h-screen">
            <div className="text-center mb-12">
                <Heading variant="lg" className="mb-4">The Problem Landscape</Heading>
                <Body variant="lg" className="max-w-2xl mx-auto">
                    The battery ecosystem is fragmented and opaque. Different stakeholders operate in silos, leading to massive inefficiencies and risks.
                </Body>
            </div>

            {/* Unified Card Container - Responsive Width */}
            <div className="bg-secondary/50 border border-border rounded-lg overflow-x-hidden mx-auto w-full">
                {/* Tab Navigation */}
                <div className="border-b border-border overflow-x-hidden">
                    <div className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-6 py-4 scrollbar-hide">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(index)}
                                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${activeTab === index
                                    ? 'text-primary border-primary'
                                    : 'text-muted-foreground border-transparent hover:text-foreground'
                                    }`}
                            >
                                {tab.icon}
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Horizontal Layout - Chart on Left, Text on Right */}
                <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[480px]">
                    {/* Chart Section - Responsive Width */}
                    <div className="w-full md:w-2/5 lg:w-5/12 min-h-[280px] md:min-h-full bg-card border-b md:border-b-0 md:border-r border-border flex flex-col justify-center overflow-hidden flex-shrink-0">
                        <ChartContainer source={chartSources[activeTab] && chartSources[activeTab].trim() !== '' ? chartSources[activeTab] : undefined}>
                            <div ref={chartContainerRef} className="w-full h-full">
                                {renderChart(chartData[activeTab])}
                            </div>
                        </ChartContainer>
                    </div>

                    {/* Content Section - Takes Remaining Space */}
                    <div className="flex-1 p-6 flex flex-col justify-start overflow-x-hidden min-w-0 min-h-0 md:min-h-full">
                        <div className="flex-shrink-0 mb-6 w-full">
                            <Subheading className="mb-2 break-words">
                                {painPointsData[activeTab].title}
                            </Subheading>
                            <p className="text-sm font-medium text-primary mb-4 break-words">
                                {painPointsData[activeTab].subtitle}
                            </p>
                            {painPointsData[activeTab].keyInsight && (
                                <Body variant="sm" className="mb-4 break-words">
                                    {painPointsData[activeTab].keyInsight}
                                </Body>
                            )}
                        </div>

                        {/* Standard Layout for All Tabs */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
                            <h5 className="text-sm font-medium text-foreground mb-4">Key Challenges</h5>
                            <ul className="space-y-4 w-full">
                                {painPoints[activeTab].map((point, index) => (
                                    <li key={index} className="flex items-center text-sm text-muted-foreground leading-relaxed break-words w-full">
                                        <span className="text-primary mr-2 text-xs flex-shrink-0">•</span>
                                        <span className="flex-1 min-w-0 break-words">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
