'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Battery, Zap, Shield, TrendingUp, Recycle, Brain, BarChart3, Users, Mail,
  ChevronDown, ArrowRight, Cpu, Database, RefreshCw, CheckCircle,
  Building, Phone, Menu, X, AlertCircle
} from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, ChartOptions, ChartData } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, ChartDataLabels);

// --- TYPE DEFINITIONS ---
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface ChartConfig {
  type: 'Bar' | 'Line' | 'Doughnut';
  data: ChartData<any, any, any>;
  options?: ChartOptions<any>;
}

// --- ANIMATION VARIANTS ---
const fadeIn = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hidden: { opacity: 0, y: 20 },
};

// --- HELPER COMPONENTS ---
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, id }) => {
  return (
    <motion.section
      id={id}
      className={className}
      style={{ scrollSnapAlign: 'start' }}
      initial="visible"
      animate="visible"
      variants={fadeIn}
    >
      {children}
    </motion.section>
  );
};

// --- SCROLL PROGRESS INDICATOR ---
const ScrollProgressIndicator = ({ container }: { container?: React.RefObject<HTMLElement> }) => {
  const { scrollYProgress } = useScroll({ 
    container: container?.current ? { current: container.current } : undefined 
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
      style={{
        scaleX,
        transformOrigin: "0%"
      }}
    />
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  
  return (
    <div className="min-h-screen bg-background font-body antialiased">
      <ScrollProgressIndicator container={mainRef} />
      <Header />
      <main ref={mainRef} className="h-screen overflow-y-auto scroll-smooth" style={{ scrollSnapType: 'y mandatory' }}>
        <HeroSection />
        <ProblemSection />
        <VisionSection />
        <ProductStackSection />
        <DifferentiatorsSection />
        <ValueDeliveredSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}

// --- HEADER COMPONENT ---
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ['Problem', 'Vision', 'Products', 'About', 'Contact'];

  const Logo = () => (
    <img 
      src="/images/fawkes logo dark.svg" 
      alt="Fawkes Energy Logo" 
      width="120" 
      height="32" 
      className="mr-3"
    />
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-3">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-muted-foreground text-sm">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
               className="hover:text-foreground transition-colors duration-200 font-medium">
              {link}
            </a>
          ))}
        </nav>

        <a href="#contact"
           className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-200 hidden md:inline-flex">
          Book a Meeting
        </a>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border"
        >
          <nav className="flex flex-col items-center space-y-6 py-8">
            {navLinks.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200 mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Book a Meeting
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

// --- HERO SECTION ---
function HeroSection() {
  return (
    <AnimatedSection id="hero" className="min-h-screen flex items-center justify-center pt-16 px-6">
      <div className="relative w-full max-w-6xl h-[80vh] overflow-hidden rounded-lg shadow-2xl">
        {/* Video Background */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/battery-blueprint-3.webm" type="video/webm" />
          <source src="/videos/battery-blueprint-3.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        
        {/* Content */}
        <div className="relative h-full flex items-end justify-start p-8 md:p-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading leading-tight text-white">
              Deep Tech Battery Intelligence
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Unlocking safety, performance, and sustainability across the entire battery lifecycle through a unified intelligence layer.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// --- PROBLEM SECTION ---
function ProblemSection() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartData: ChartConfig[] = [
    {
      type: 'Bar',
      data: {
        labels: ['MY2011', 'MY2012', 'MY2013', 'MY2014', 'MY2015', 'MY2016', 'MY2017', 'MY2018', 'MY2019', 'MY2020', 'MY2021', 'MY2022'],
        datasets: [
          {
            label: 'EV Claims (%)',
            data: [0.2, 0.5, 2.2, 2.3, 3.7, 5.2, 6.8, 18.8, 15.7, 23.2, 21.1, 0.3],
            backgroundColor: 'hsl(43 87% 50%)',
            borderColor: 'hsl(43 87% 45%)',
            borderWidth: 1
          },
          {
            label: 'Non-EV Claims (%)',
            data: [3.6, 4.5, 5.5, 6.1, 7.2, 7.5, 8.2, 7.7, 7.9, 6.4, 3.9, 0.2],
            backgroundColor: 'hsl(220 14% 96%)',
            borderColor: 'hsl(220 13% 91%)',
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'EV vs Non-EV Claims by Model Year (CY2021)',
            font: { size: 14, weight: 'normal' }
          },
          legend: { display: true, position: 'top' },
          datalabels: { display: false }
        },
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: { beginAtZero: true, max: 25 },
          y: { grid: { display: false } }
        }
      }
    },
    {
      type: 'Line',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Downtime Events',
          data: [25, 32, 45, 40],
          borderColor: 'hsl(37 100% 48%)',
          backgroundColor: 'hsl(37 100% 48% / 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Fleet Downtime Events (Quarterly)',
            font: { size: 14, weight: 'normal' }
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    },
    {
      type: 'Bar',
      data: {
        labels: ['EV Financing Gap', 'ICE Traditional', 'EV Premium'],
        datasets: [{
          label: 'Interest Rate (%)',
          data: [8.5, 6.2, 10.8],
          backgroundColor: ['hsl(0 84% 60%)', 'hsl(142 76% 36%)', 'hsl(37 100% 48%)'],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Financing Cost Comparison (India)',
            font: { size: 14, weight: 'normal' }
          }
        },
        scales: {
          y: { beginAtZero: true, max: 12 }
        }
      }
    },
    {
      type: 'Bar',
      data: {
        labels: ['Formal Recycling', 'Informal Processing', 'Reuse/Repurpose'],
        datasets: [{
          label: 'Value ($B)',
          data: [1.2, 0.8, 1.5],
          backgroundColor: ['hsl(142 76% 36%)', 'hsl(0 84% 60%)', 'hsl(37 100% 48%)'],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Circular Economy Value Streams',
            font: { size: 14, weight: 'normal' }
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    },
    {
      type: 'Line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Maintenance Cost ($k)',
          data: [45, 52, 38, 41, 33, 29],
          borderColor: 'hsl(37 100% 48%)',
          backgroundColor: 'hsl(37 100% 48% / 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'BESS Maintenance Costs',
            font: { size: 14, weight: 'normal' }
          }
        }
      }
    },
    {
      type: 'Doughnut',
      data: {
        labels: ['Fast Charging', 'Standard Charging', 'Smart Charging'],
        datasets: [{
          data: [40, 35, 25],
          backgroundColor: ['hsl(0 84% 60%)', 'hsl(37 100% 48%)', 'hsl(142 76% 36%)']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Charging Method Distribution',
            font: { size: 14, weight: 'normal' }
          }
        }
      }
    }
  ];

  const tabs = [
    { name: 'EV OEMs', icon: <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
    { name: 'Fleet Operators', icon: <Users className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
    { name: 'Financiers', icon: <BarChart3 className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
    { name: 'Recyclers', icon: <Recycle className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
    { name: 'BESS Operators', icon: <Battery className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
    { name: 'CPOs', icon: <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  ];

  const painPointsData = [
    {
      title: 'EV OEMs',
      subtitle: 'Insurance Claims & Warranty Risk',
      keyInsight: 'Recent U.S. data shows a sharp rise in EV insurance claims, driven largely by the vulnerability of batteries to damage. Without deeper visibility into battery health and intelligence, managing this risk remains a significant challenge.',
      dataPoint: 'Insurance premiums are 26% higher for EVs than ICE vehicles',
      source: 'Euromonitor, CCC Report',
      painPoints: [
        'High warranty and recall costs due to unpredictable battery failures',
        'Slow R&D cycles from a lack of real-world performance data', 
        'Reputational damage from battery-related safety incidents'
      ]
    },
    {
      title: 'Fleet Operators',
      subtitle: 'Capacity Cliffs & Downtime Risk',
      keyInsight: 'Lithium-ion batteries don\'t always degrade gradually—sometimes they face abrupt "capacity cliffs," with losses of up to 20% in just a few charge cycles. This sudden drop can cause unexpected range loss or vehicle downtime, creating major risks for EV fleets.',
      dataPoint: 'Up to 20% capacity loss in just a few charge cycles',
      source: 'Battery degradation studies',
      painPoints: [
        'Unexpected vehicle downtime impacting operations and revenue',
        'Suboptimal charging strategies leading to accelerated battery degradation',
        'Uncertainty in vehicle residual values due to unknown battery health'
      ]
    },
    {
      title: 'Financiers',
      subtitle: 'Financing Cost & Risk Premiums',
      keyInsight: 'EV financing costs 26% more than ICE vehicles due to higher insurance premiums, uncertain residual values, and lack of battery health data. Traditional financing models fail to account for battery degradation patterns, leading to higher interest rates and limited credit availability.',
      dataPoint: 'EV interest rates 26% higher than ICE vehicles in India',
      source: 'ADB, BCG, Niti Aayog Report',
      painPoints: [
        'Limited credit histories and high upfront EV costs',
        'Outdated ICE-style templates and limited performance data',
        'No traceability of battery health for asset recovery',
        'Higher insurance premiums due to battery vulnerability'
      ]
    },
    {
      title: 'Recyclers',
      subtitle: 'Circular Economy Potential',
      keyInsight: 'According to a recent ICEA–Accenture report, India could build a $3.5 billion domestic circular battery economy by 2030, driven by EVs and energy storage. Achieving this potential depends on reliable battery diagnostics. Without accurate data, batteries risk being diverted into informal, low-value processing instead of powering high-value reuse and recycling.',
      dataPoint: '$3.5 billion circular battery economy potential by 2030',
      source: 'ICEA–Accenture Report',
      painPoints: [
        'Lack of standardized battery health assessment protocols',
        'Risk of batteries entering informal, low-value processing chains',
        'Inability to optimize recycling processes without battery intelligence'
      ]
    },
    {
      title: 'BESS Operators',
      subtitle: 'Predictive Maintenance Challenges',
      keyInsight: 'For BESS operators, predictive maintenance enables early fault detection, reducing downtime, lowering costs, and improving ROI over time. But this is only possible with advanced battery intelligence. Without it, operators are stuck with reactive maintenance—driving up costs and operational risks.',
      dataPoint: 'Predictive maintenance can reduce costs by 20-30%',
      source: 'Energy storage studies',
      painPoints: [
        'Reactive maintenance leading to unexpected downtime',
        'Inability to optimize energy storage performance',
        'Higher operational costs due to lack of predictive insights'
      ]
    },
    {
      title: 'CPOs',
      subtitle: 'Charging Infrastructure Optimization',
      keyInsight: 'Charge Point Operators face challenges in optimizing charging infrastructure without visibility into battery health patterns. Understanding battery degradation and charging behavior is crucial for network planning and customer experience.',
      dataPoint: 'Optimized charging can extend battery life by 15-25%',
      source: 'Charging infrastructure studies',
      painPoints: [
        'Suboptimal charging strategies affecting customer satisfaction',
        'Inability to predict and prevent charging infrastructure failures',
        'Limited insights into customer battery health and charging patterns'
      ]
    }
  ];

  const painPoints = painPointsData.map(data => data.painPoints);

  const renderChart = (chart: ChartConfig) => {
    const commonOptions: ChartOptions<any> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0, // Disable animations to prevent size jumping
        resize: {
          duration: 0 // Also disable resize animations
        }
      },
      interaction: {
        intersect: false // Improve performance
      },
      plugins: {
        legend: { 
          labels: { 
            color: 'hsl(220 9% 46%)',
            usePointStyle: true,
            padding: 12
          },
          position: 'bottom',
          align: 'center'
        },
        title: { display: false },
        datalabels: { display: false }
      },
      scales: chart.type !== 'Doughnut' ? {
        x: { 
          ticks: { color: 'hsl(220 9% 46%)' }, 
          grid: { color: 'hsl(220 13% 91%)' }
        },
        y: { 
          ticks: { color: 'hsl(220 9% 46%)' }, 
          grid: { color: 'hsl(220 13% 91%)' }
        }
      } : undefined,
      layout: {
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        }
      },
      // Force consistent sizing
      aspectRatio: undefined,
      resizeDelay: 0,
      // Additional responsive sizing controls
      devicePixelRatio: 1,
      elements: {
        point: {
          radius: 3
        }
      }
    };

    // Responsive chart options with consistent aspect ratio
    const mergedOptions = chart.options ? { 
      ...chart.options, 
      ...commonOptions,
      // Enable responsive behavior with aspect ratio
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 5 / 4,
      // Smooth resizing
      resizeDelay: 0,
      // Maintain layout configuration
      layout: {
        ...chart.options.layout,
        ...commonOptions.layout
      },
      plugins: {
        ...chart.options.plugins,
        legend: {
          ...chart.options.plugins?.legend,
          ...commonOptions.plugins?.legend
        }
      }
    } : {
      ...commonOptions,
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 5 / 4,
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
      default: return null;
    }
  };

  return (
    <AnimatedSection id="problem" className="min-h-screen flex items-center py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-heading text-foreground">The Problem Landscape</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The battery ecosystem is fragmented and opaque. Different stakeholders operate in silos, leading to massive inefficiencies and risks.
          </p>
        </div>

        {/* Unified Card Container - Responsive Width */}
        <div className="bg-secondary/50 border border-border rounded-lg overflow-hidden mx-auto w-full max-w-6xl">
          {/* Tab Navigation */}
          <div className="border-b border-border">
            <div className="flex space-x-2 md:space-x-8 overflow-x-auto px-4 md:px-6 py-3 md:py-4 scrollbar-hide">
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center space-x-1.5 md:space-x-2 whitespace-nowrap px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === index
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
          <div className="flex flex-col md:flex-row min-h-[24rem]">
            {/* Chart Section - Responsive Width */}
            <div className="w-full md:w-2/5 lg:w-5/12 bg-background border-b md:border-b-0 md:border-r border-border flex items-center justify-center">
              <div ref={chartContainerRef} className="p-4 md:p-6 w-full aspect-[5/4] min-h-[250px] md:min-h-[280px] max-h-[300px] md:max-h-[350px]">
                {renderChart(chartData[activeTab])}
              </div>
            </div>
            
            {/* Content Section - Takes Remaining Space */}
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-start overflow-y-auto">
              <div className="flex-shrink-0 mb-6">
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  {painPointsData[activeTab].title}
                </h4>
                <p className="text-sm font-medium text-primary mb-3">
                  {painPointsData[activeTab].subtitle}
                </p>
                
                {/* Key Insight */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                    {painPointsData[activeTab].keyInsight}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/10 px-3 py-1 rounded-full">
                      <p className="text-xs font-semibold text-primary">
                        {painPointsData[activeTab].dataPoint}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Source: {painPointsData[activeTab].source}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <h5 className="text-sm font-semibold text-foreground mb-3">Key Challenges</h5>
                <ul className="space-y-3">
                  {painPoints[activeTab].map((point, index) => (
                    <li key={index} className="flex items-start text-sm text-muted-foreground leading-relaxed">
                      <span className="text-primary mr-2 mt-1 text-xs flex-shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// --- VISION SECTION ---
function VisionSection() {
  return (
    <AnimatedSection id="vision" className="min-h-screen flex items-center py-16 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6 font-heading text-foreground">Vision for a Sustainable Future</h2>

        <div className="relative max-w-sm mx-auto mb-8">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <radialGradient id="core-gradient">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary) / 0.8)" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="40" fill="url(#core-gradient)" />
            <text x="200" y="205" textAnchor="middle" fill="white" fontSize="18" className="font-heading font-semibold">Vision</text>
            <ellipse cx="200" cy="200" rx="160" ry="60" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" fill="none" transform="rotate(30 200 200)" />
            <ellipse cx="200" cy="200" rx="160" ry="60" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" fill="none" transform="rotate(-30 200 200)" />
            <ellipse cx="200" cy="200" rx="110" ry="140" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" fill="none" />

            <g>
              <circle cx="200" cy="60" r="6" fill="hsl(var(--primary))"/>
              <text x="200" y="40" textAnchor="middle" fill="hsl(220 9% 46%)" fontSize="12" className="font-medium">Circular</text>
            </g>
            <g transform="rotate(120 200 200)">
              <circle cx="200" cy="60" r="6" fill="hsl(var(--primary))"/>
              <text x="200" y="40" textAnchor="middle" fill="hsl(220 9% 46%)" fontSize="12" className="font-medium">Efficient</text>
            </g>
            <g transform="rotate(240 200 200)">
              <circle cx="200" cy="60" r="6" fill="hsl(var(--primary))"/>
              <text x="200" y="40" textAnchor="middle" fill="hsl(220 9% 46%)" fontSize="12" className="font-medium">Safe</text>
            </g>
          </svg>
        </div>

        <blockquote className="text-xl italic text-muted-foreground leading-relaxed">
          "We envision a world where every battery is safe, efficient, and circular, powering a truly sustainable electric future."
        </blockquote>
      </div>
    </AnimatedSection>
  );
}

// --- PRODUCT STACK SECTION ---
function ProductStackSection() {
  const products = [
    {
      name: "FawkesLink",
      description: "Our universal hardware interface plugs into any battery system, capturing high-fidelity data in real-time.",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      name: "FawkesCore",
      description: "The AI-powered brain of our platform. It processes data to deliver predictive analytics, state-of-health monitoring, and optimization strategies.",
      icon: <Brain className="w-5 h-5" />,
    },
    {
      name: "FawkesLoop",
      description: "A data-driven marketplace connecting end-of-life batteries with second-life applications and certified recyclers, closing the loop.",
      icon: <RefreshCw className="w-5 h-5" />,
    },
  ];

  return (
    <AnimatedSection id="products" className="min-h-screen flex items-center py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-heading text-foreground">The Fawkes Product Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A suite of interconnected products to monitor, manage, and monetize batteries at scale.
          </p>
        </div>

        <div className="space-y-16">
          {products.map((product, index) => (
            <div key={index} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
              <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {React.cloneElement(product.icon, { className: 'w-6 h-6 text-primary' })}
                  </div>
                  <h3 className="text-2xl font-semibold font-heading text-foreground">{product.name}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">{product.description}</p>
                
                {/* Product-specific metrics/features */}
                <div className="grid grid-cols-2 gap-4">
                  {index === 0 && (
                    <>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                        <div className="text-xs text-muted-foreground">Uptime SLA</div>
                      </div>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary mb-1">10ms</div>
                        <div className="text-xs text-muted-foreground">Latency</div>
                      </div>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary mb-1">95%</div>
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                      </div>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary mb-1">30s</div>
                        <div className="text-xs text-muted-foreground">Prediction Time</div>
                      </div>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary mb-1">$3.5B</div>
                        <div className="text-xs text-muted-foreground">Market Value</div>
                      </div>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-primary mb-1">500+</div>
                        <div className="text-xs text-muted-foreground">Partners</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Enhanced visual representation */}
              <div className={`h-80 bg-gradient-to-br from-secondary/30 to-secondary/10 border border-border rounded-xl flex items-center justify-center relative overflow-hidden ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                {index === 0 && (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Zap className="w-12 h-12 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div className="w-32 h-2 bg-primary/20 rounded-full mx-auto"></div>
                      <div className="w-24 h-2 bg-primary/30 rounded-full mx-auto"></div>
                      <div className="w-28 h-2 bg-primary/40 rounded-full mx-auto"></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">Real-time Data Flow</p>
                  </div>
                )}
                {index === 1 && (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Brain className="w-12 h-12 text-primary" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 w-32 mx-auto">
                      <div className="h-8 bg-primary/20 rounded"></div>
                      <div className="h-12 bg-primary/40 rounded"></div>
                      <div className="h-6 bg-primary/30 rounded"></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">AI Processing Pipeline</p>
                  </div>
                )}
                {index === 2 && (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <RefreshCw className="w-12 h-12 text-primary" />
                    </div>
                    <div className="w-32 h-32 mx-auto relative">
                      <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                      <div className="absolute inset-2 border-4 border-primary/40 rounded-full"></div>
                      <div className="absolute inset-4 border-4 border-primary/60 rounded-full"></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">Circular Economy Loop</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// --- DIFFERENTIATORS SECTION ---
function DifferentiatorsSection() {
  const items = [
    { title: "Physics-Based AI", description: "Models grounded in electrochemical reality, not just correlation.", icon: <Cpu className="w-6 h-6" /> },
    { title: "Real-World Data", description: "Calibrated with empirical data from millions of battery cycles.", icon: <Database className="w-6 h-6" /> },
    { title: "Hardware Agnostic", description: "Universal compatibility across battery types, chemistries, and manufacturers.", icon: <Battery className="w-6 h-6" /> },
  ];

  return (
    <AnimatedSection id="differentiators" className="min-h-screen flex items-center py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-heading text-foreground">Our Competitive Edge</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're not just another analytics platform. Our core differentiators create a defensible moat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {React.cloneElement(item.icon, { className: 'w-6 h-6 text-primary' })}
              </div>
              <h3 className="text-lg font-semibold mb-2 font-heading text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// --- VALUE DELIVERED SECTION ---
function ValueDeliveredSection() {
  const stakeholderValues = [
    {
      stakeholder: 'EV OEMs',
      icon: <Shield className="w-6 h-6" />,
      values: [
        { metric: '26% Reduction', description: 'in insurance premium costs' },
        { metric: '40% Fewer', description: 'warranty claims' },
        { metric: '3x Faster', description: 'R&D iteration cycles' },
      ]
    },
    {
      stakeholder: 'Fleet Operators',
      icon: <Users className="w-6 h-6" />,
      values: [
        { metric: '85% Reduction', description: 'in unexpected downtime' },
        { metric: '20% Lower', description: 'total cost of ownership' },
        { metric: '15% Higher', description: 'vehicle residual value' },
      ]
    },
    {
      stakeholder: 'Financiers',
      icon: <BarChart3 className="w-6 h-6" />,
      values: [
        { metric: '95% Accuracy', description: 'in asset valuation' },
        { metric: '30% Lower', description: 'default risk' },
        { metric: '2x Faster', description: 'loan processing' },
      ]
    },
    {
      stakeholder: 'Recyclers',
      icon: <Recycle className="w-6 h-6" />,
      values: [
        { metric: '40% Higher', description: 'recovery value' },
        { metric: '60% Better', description: 'sorting efficiency' },
        { metric: '25% More', description: 'second-life batteries' },
      ]
    },
    {
      stakeholder: 'BESS Operators',
      icon: <Battery className="w-6 h-6" />,
      values: [
        { metric: '30% Reduction', description: 'in maintenance costs' },
        { metric: '50% Faster', description: 'fault detection' },
        { metric: '15% Improvement', description: 'energy throughput' },
      ]
    },
    {
      stakeholder: 'CPOs',
      icon: <Zap className="w-6 h-6" />,
      values: [
        { metric: '25% Extension', description: 'in battery lifespan' },
        { metric: '35% Lower', description: 'infrastructure costs' },
        { metric: '20% Higher', description: 'customer satisfaction' },
      ]
    },
  ];

  return (
    <AnimatedSection id="value" className="min-h-screen flex items-center py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-heading text-foreground">Tangible Value, Delivered</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our intelligence translates into measurable improvements across every stakeholder in the battery ecosystem.
          </p>
        </div>

        {/* Core Value Propositions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
              </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">Reliability First</h3>
            <p className="text-sm text-muted-foreground">Longer battery life</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">Cost & ROI</h3>
            <p className="text-sm text-muted-foreground">Lower O&M costs</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">Data Transparency</h3>
            <p className="text-sm text-muted-foreground">Verified battery history</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">Market Differentiation</h3>
            <p className="text-sm text-muted-foreground">Predictive servicing advantage</p>
          </div>
        </div>

        {/* Stakeholder-Specific Values */}
        <div className="mb-8 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2 font-heading">Value by Stakeholder</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            See how our battery intelligence delivers specific benefits to each player in the ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakeholderValues.map((stakeholder, index) => (
            <div key={index} className="bg-background/50 border border-border rounded-lg p-6 hover:border-primary/30 transition-colors duration-300">
              {/* Stakeholder Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(stakeholder.icon, { className: 'w-6 h-6 text-primary' })}
                </div>
                <h3 className="text-lg font-semibold text-foreground font-heading">{stakeholder.stakeholder}</h3>
              </div>

              {/* Value Metrics */}
              <div className="space-y-4">
                {stakeholder.values.map((value, valueIndex) => (
                  <div key={valueIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-base font-bold text-foreground">{value.metric}</div>
              <div className="text-sm text-muted-foreground">{value.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// --- ABOUT SECTION ---
function AboutSection() {
  return (
    <AnimatedSection id="about" className="min-h-screen flex items-center py-16 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-heading text-foreground">We Are Battery People</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are a team of scientists, engineers, and entrepreneurs obsessed with solving the hardest problems in energy storage.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold font-heading text-foreground mb-6">Our Story</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Fawkes Energy was born from a clear insight: <strong className="text-foreground">the EV ecosystem in India struggles because accurate battery data is hard to access.</strong>
            </p>
            <p>
              Without it, batteries are often recycled too early, used EVs lose resale value, and many end-of-first-life batteries never reach the second-life applications they're best suited for.
            </p>
            <p>
              We set out to change that.
            </p>
            <p>
              Our mission is to <strong className="text-foreground">unlock high-quality battery intelligence</strong>, improving insights on <strong className="text-foreground">safety, State-of-Health (SoH), and Remaining Useful Life (RUL)</strong> to help every battery reach its full potential.
            </p>
            <p>
              By enabling smarter reuse, fairer resale, and more sustainable second-life applications, we're driving circularity across the battery value chain, and shaping a future where <strong className="text-foreground">every battery counts.</strong>
            </p>
          </div>
          </div>

        {/* Co-Founders */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold font-heading text-foreground mb-8 text-center">Co-Founders</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background/50 rounded-lg p-6 border border-border">
            <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Photo</span>
            </div>
              <h4 className="text-lg font-semibold text-foreground mb-2 text-center">Karthik Ganesh</h4>
              <p className="text-sm text-muted-foreground leading-relaxed text-center">
                Karthik brings 15+ years experience in powering clean tech with deep expertise in battery system design, thermal analysis, and real-world validation. From CFD to prototypes, he turns complex electrochemical systems into scalable energy solutions.
              </p>
            </div>

            <div className="bg-background/50 rounded-lg p-6 border border-border">
              <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Photo</span>
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2 text-center">Akshay Kumar</h4>
              <p className="text-sm text-muted-foreground leading-relaxed text-center">
                Blending physics with data, Akshay helps companies fast-track product development through digital prototyping. A CFD expert, machine learning enthusiast, and open-source geek who knows tech and the psychology of sales.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold font-heading text-foreground mb-6 text-center">Team</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-background/30 rounded-lg p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Medha Ajay</p>
                <p className="text-xs text-muted-foreground">Brand and Venture Strategist</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/30 rounded-lg p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Mohammed Suffiyan</p>
                <p className="text-xs text-muted-foreground">Lead - Battery System Engineering</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/30 rounded-lg p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Sunil Sheth</p>
                <p className="text-xs text-muted-foreground">Technical Product Manager</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/30 rounded-lg p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Kusumanjali D</p>
                <p className="text-xs text-muted-foreground">Vendor & Compliance Manager</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/30 rounded-lg p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Abhishek</p>
                <p className="text-xs text-muted-foreground">Hardware Engineer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Partnerships */}
        <div>
          <h3 className="text-2xl font-semibold font-heading text-foreground mb-8 text-center">In Association With</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Rubamin */}
            <div className="bg-background/50 rounded-lg p-6 border border-border">
              <div className="mb-6 flex items-center justify-center h-24">
                <img 
                  src="/images/partners/rubamin-logo.png" 
                  alt="Rubamin Logo" 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'text-2xl font-bold text-muted-foreground tracking-wider';
                    fallback.textContent = 'RUBAMIN';
                    e.currentTarget.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rubamin is powering green mobility by providing a circular lifecycle management solution by recycling Lithium-Ion Batteries (LIBs). Their Zero-Waste, Industry 4.0-enabled, state-of-the-art recycling facility is designed to efficiently recover critical elements from end-of-life LIBs and Giga-factory production scrap.
              </p>
            </div>

            {/* Battery 360 Alliance */}
            <div className="bg-background/50 rounded-lg p-6 border border-border">
              <div className="mb-6 flex items-center justify-center h-24">
                <img 
                  src="/images/partners/battery-360-logo.png" 
                  alt="Battery 360 Alliance Logo" 
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.currentTarget.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'text-xl font-semibold text-muted-foreground';
                    fallback.textContent = 'Battery 360 Alliance';
                    e.currentTarget.parentElement?.appendChild(fallback);
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A collaborative network dedicated to advancing battery technology and sustainability across the entire lifecycle, from manufacturing to recycling and second-life applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// --- CONTACT SECTION ---
function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll be in touch soon.");
  };

  return (
    <AnimatedSection id="contact" className="min-h-screen flex items-center py-16">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-heading text-foreground">Get in Touch</h2>
          <p className="text-muted-foreground leading-relaxed">
            Let's talk about how Fawkes can unlock value in your battery assets.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-background border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-background border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={5}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </AnimatedSection>
  );
}

// --- FOOTER ---
function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Fawkes Energy Inc. All rights reserved.</p>
        <p className="text-muted-foreground text-xs mt-2">Powering the future, intelligently.</p>
      </div>
    </footer>
  );
}