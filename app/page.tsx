'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Battery, Zap, Shield, TrendingUp, Recycle, Brain, BarChart3, Users, Mail,
  ChevronDown, ArrowRight, Cpu, Database, RefreshCw, CheckCircle,
  Building, Phone, Menu, X
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
            text: 'CY2021 Vehicle Claim Share by Model Year',
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
          borderColor: 'hsl(43 87% 50%)',
          backgroundColor: 'hsl(43 87% 50% / 0.1)',
          tension: 0.3,
          fill: true
        }]
      }
    },
    {
      type: 'Doughnut',
      data: {
        labels: ['High-Risk', 'Medium-Risk', 'Low-Risk'],
        datasets: [{
          data: [55, 30, 15],
          backgroundColor: ['hsl(0 84% 60%)', 'hsl(43 87% 50%)', 'hsl(220 14% 96%)']
        }]
      }
    }
  ];

  const tabs = [
    { name: 'EV OEMs', icon: <Shield className="w-4 h-4" /> },
    { name: 'Fleet Operators', icon: <Users className="w-4 h-4" /> },
    { name: 'Financiers', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const painPoints = [
    [
      'High warranty and recall costs due to unpredictable battery failures',
      'Slow R&D cycles from a lack of real-world performance data',
      'Reputational damage from battery-related safety incidents'
    ],
    [
      'Unexpected vehicle downtime impacting operations and revenue',
      'Suboptimal charging strategies leading to accelerated battery degradation',
      'Uncertainty in vehicle residual values due to unknown battery health'
    ],
    [
      'Limited credit histories and high upfront EV costs',
      'Outdated ICE-style templates and limited performance data',
      'No traceability of battery health for asset recovery'
    ]
  ];

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

    // Force exact dimensions through Chart.js options
    const mergedOptions = chart.options ? { 
      ...chart.options, 
      ...commonOptions,
      // CRITICAL: Disable responsive and set explicit size
      responsive: false,
      maintainAspectRatio: false,
      aspectRatio: undefined,
      devicePixelRatio: 1,
      // Disable all resizing behavior
      resizeDelay: 0,
      onResize: null,
      // Force exact pixel dimensions in Chart.js
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
      responsive: false,
      maintainAspectRatio: false,
      aspectRatio: undefined,
      devicePixelRatio: 1,
      resizeDelay: 0,
      onResize: null
    };

    // Force exact dimensions via props when responsive is false
    const chartKey = `${chart.type.toLowerCase()}-${activeTab}`;
    const chartProps = {
      data: chart.data,
      options: mergedOptions,
      width: 350,
      height: 280,
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

        {/* Unified Card Container - Fixed Width */}
        <div className="bg-secondary/50 border border-border rounded-lg overflow-hidden mx-auto" style={{ width: '900px' }}>
          {/* Tab Navigation */}
          <div className="border-b border-border">
            <div className="flex space-x-8 overflow-x-auto px-6 py-4">
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center space-x-2 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
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
          <div className="h-96 flex">
            {/* Chart Section - Fixed Width */}
            <div className="flex-shrink-0 bg-background border-r border-border flex items-center justify-center" style={{ width: '420px' }}>
              <div ref={chartContainerRef} className="p-6" style={{ width: '350px', height: '280px', minWidth: '350px', minHeight: '280px', maxWidth: '350px', maxHeight: '280px' }}>
                {renderChart(chartData[activeTab])}
              </div>
            </div>
            
            {/* Content Section - Takes Remaining Space */}
            <div className="flex-1 p-6 flex flex-col justify-start overflow-y-auto">
              <h4 className="font-semibold text-lg text-foreground mb-4 flex-shrink-0">
                For {tabs[activeTab].name}
              </h4>
              <div className="flex-1 overflow-y-auto">
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

        <div className="space-y-12">
          {products.map((product, index) => (
            <div key={index} className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
              <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {React.cloneElement(product.icon, { className: 'w-5 h-5 text-primary' })}
                  </div>
                  <h3 className="text-xl font-semibold font-heading text-foreground">{product.name}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
              <div className={`h-40 bg-secondary/50 border border-border rounded-lg flex items-center justify-center ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                <div className="text-muted-foreground text-sm">Interactive Demo</div>
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
  const values = [
    { title: '20% Increase', description: 'in battery lifespan', icon: <TrendingUp className="w-5 h-5" /> },
    { title: '30% Reduction', description: 'in operational costs', icon: <Shield className="w-5 h-5" /> },
    { title: '50% Faster', description: 'fault detection', icon: <Zap className="w-5 h-5" /> },
    { title: '15% Improvement', description: 'in asset utilization', icon: <Recycle className="w-5 h-5" /> },
  ];

  return (
    <AnimatedSection id="value" className="min-h-screen flex items-center py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-heading text-foreground">Tangible Value, Delivered</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our intelligence translates into measurable improvements for your bottom line and operational efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {React.cloneElement(value.icon, { className: 'w-5 h-5 text-primary' })}
              </div>
              <div className="text-2xl font-bold text-foreground font-heading mb-1">{value.title}</div>
              <div className="text-sm text-muted-foreground">{value.description}</div>
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

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold font-heading text-foreground">Our Genesis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our team combines decades of experience from organizations like Tesla, Google DeepMind, and MIT. We believe that intelligence is the key to unlocking the full potential of battery technology, and we're building the platform to make that a reality.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Fawkes Energy is born out of a deep understanding of the challenges in the battery value chain, from materials science to end-of-life management.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-semibold font-heading text-foreground mb-4">Co-Founder</h4>
            <div className="w-20 h-20 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Photo</span>
            </div>
            <h5 className="font-medium text-foreground">Co-Founder Name</h5>
            <p className="text-sm text-muted-foreground mt-2">
              A brief, impactful bio about the co-founder's vision and background.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold font-heading text-foreground mb-6">Backed By & In Alliance With</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="text-xl font-bold text-muted-foreground tracking-wider">RUBAMIN</div>
            <div className="text-lg font-semibold text-muted-foreground">Battery 360 Alliance</div>
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