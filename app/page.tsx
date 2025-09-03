'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Battery, Zap, Shield, TrendingUp, Recycle, Brain, BarChart3, Users, Mail, 
  ChevronDown, ArrowRight, Cpu, Database, RefreshCw, CheckCircle, 
  Building, Phone, Menu, X
} from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, ChartOptions, ChartData } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler);

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
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
  hidden: {},
};

const fadeIn = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } },
  hidden: { opacity: 0, y: 20 },
};

// --- HELPER COMPONENTS ---
const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, id }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.section 
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  return (
    <div className="bg-white text-gray-900 font-body antialiased overflow-x-hidden">
      <Header />
      <main className="relative">
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

// --- PAGE SECTIONS ---
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
            const handleScroll = () => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        setIsScrolled(mainElement.scrollTop > 10);
      }
    };

    const mainElement = document.querySelector('main');
    mainElement?.addEventListener('scroll', handleScroll);
    return () => mainElement?.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Problem', 'Solution', 'Products', 'About', 'Contact'];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        <div className="text-2xl font-bold font-heading text-gray-900">Fawkes <span className="text-brand-primary">Energy</span></div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-gray-600">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-brand-primary transition-colors duration-300 font-medium">
              {link}
            </a>
          ))}
        </nav>
        <a href="#contact" className="bg-brand-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-primary-dark transition-colors duration-300 hidden md:inline-flex">Book a Meeting</a>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-primary">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-dark-bg/95 backdrop-blur-custom absolute top-full left-0 w-full"
        >
          <nav className="flex flex-col items-center space-y-6 py-8">
            {navLinks.map(link => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="text-text-muted hover:text-ochre transition-colors duration-300 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a 
              href="#contact" 
              className="btn-primary mt-4"
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

function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-heading leading-tight text-gray-900">
            The Universal <span className="text-brand-primary">Operating System</span> for Batteries
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Unlocking safety, performance, and sustainability across the entire battery lifecycle through a unified intelligence layer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="bg-brand-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-primary-dark transition-colors duration-300 text-lg">
              Explore Platform
            </a>
            <a href="#contact" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-brand-primary hover:text-brand-primary transition-colors duration-300 text-lg">
              Request Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    if (!scrollContainerRef.current) return;
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const tabs = [
    { name: 'EV OEMs', icon: <Shield /> },
    { name: 'Fleet Operators', icon: <Users /> },
    { name: 'Financiers', icon: <BarChart3 /> },
    { name: 'BESS Developers', icon: <Battery /> },
    { name: 'Recyclers', icon: <Recycle /> },
    { name: 'Charge Point Operators', icon: <Zap /> },
  ];

  const chartData: ChartConfig[] = [
    { type: 'Bar', data: { labels: ['Warranty Claims', 'Recall Costs', 'R&D Inefficiency'], datasets: [{ label: 'Costs (in millions USD)', data: [450, 1200, 300], backgroundColor: 'rgba(255, 195, 0, 0.6)' }] }, options: { plugins: { title: { display: true, text: 'Annual Financial Impact of Poor Battery Visibility' } } } },
    { type: 'Line', data: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], datasets: [{ label: 'Unexpected Downtime Events', data: [25, 32, 45, 40], borderColor: '#00E676', tension: 0.3, fill: true, backgroundColor: 'rgba(0, 230, 118, 0.2)' }] }, options: { plugins: { title: { display: true, text: 'Downtime Events Per Quarter' } } } },
    { type: 'Doughnut', data: { labels: ['High-Risk', 'Medium-Risk', 'Low-Risk'], datasets: [{ data: [55, 30, 15], backgroundColor: ['#FF6384', '#FFC300', '#4BC0C0'] }] }, options: { plugins: { title: { display: true, text: 'Current Asset Risk Profile (Without Fawkes)' } } } },
    { type: 'Bar', data: { labels: ['Year 1', 'Year 5', 'Year 10'], datasets: [{ label: 'Predicted SOH', data: [98, 85, 65], backgroundColor: '#FFC300' }, { label: 'Actual SOH', data: [97, 78, 52], backgroundColor: '#DAA520' }] }, options: { plugins: { title: { display: true, text: 'State-of-Health (SOH) Prediction vs. Reality' } } } },
    { type: 'Doughnut', data: { labels: ['Landfilled', 'Recycled (Low-Value)', 'Remanufactured'], datasets: [{ data: [40, 50, 10], backgroundColor: ['#FF6384', '#FFC300', '#4BC0C0'] }] }, options: { plugins: { title: { display: true, text: 'End-of-Life Battery Fate' } } } },
    { type: 'Bar', data: { labels: ['Charger Downtime', 'Grid Fees', 'Battery Degradation Impact'], datasets: [{ label: 'Annual Lost Revenue (kUSD)', data: [250, 150, 100], backgroundColor: 'rgba(0, 230, 118, 0.6)' }] }, options: { plugins: { title: { display: true, text: 'CPO Revenue Loss Sources' } } } },
  ];

  const renderChart = (chart: ChartConfig) => {
    const commonOptions: ChartOptions<any> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#B0B8C4' } }, title: { display: false } },
      scales: { x: { ticks: { color: '#B0B8C4' }, grid: { color: 'rgba(176, 184, 196, 0.2)' } }, y: { ticks: { color: '#B0B8C4' }, grid: { color: 'rgba(176, 184, 196, 0.2)' } } }
    };
    const mergedOptions = { ...commonOptions, ...chart.options };

    switch (chart.type) {
      case 'Bar': return <Bar data={chart.data} options={mergedOptions} />;
      case 'Line': return <Line data={chart.data} options={mergedOptions} />;
      case 'Doughnut': return <Doughnut data={chart.data} options={mergedOptions} />;
      default: return null;
    }
  };

  return (
    <section id="problem" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center font-heading text-gray-900">The Problem Landscape</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
            The battery ecosystem is fragmented and opaque. Different stakeholders operate in silos, leading to massive inefficiencies and risks.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-8"
        >
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="border-b border-gray-200 flex items-center overflow-x-auto scrollbar-hide cursor-grab mb-8"
          >
            <div className="relative flex"> 
              {tabs.map((tab, index) => (
                <button 
                  key={tab.name}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center space-x-2 whitespace-nowrap px-6 py-4 text-sm md:text-base font-medium transition-colors duration-300 relative ${activeTab === index ? 'text-brand-primary' : 'text-gray-600 hover:text-gray-900'}`}>
                  {tab.icon}
                  <span>{tab.name}</span>
                  {activeTab === index && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" layoutId="underline" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-64 md:h-96 p-4 bg-white rounded-xl shadow-sm">
              {renderChart(chartData[activeTab])}
            </div>
            <div className="p-6 md:p-8">
              {activeTab === 0 && (
                <div>
                  <h4 className="font-bold text-xl mb-4 text-gray-900">For EV OEMs</h4>
                  <ul className="list-disc list-inside space-y-3 text-gray-600">
                    <li>High warranty and recall costs due to unpredictable battery failures.</li>
                    <li>Slow R&D cycles from a lack of real-world performance data.</li>
                    <li>Reputational damage from battery-related safety incidents.</li>
                  </ul>
                </div>
              )} 
              {activeTab === 1 && (
                <div>
                  <h4 className="font-bold text-lg mb-2 text-text-primary">For Fleet Operators</h4>
                  <ul className="list-disc list-inside space-y-2 text-text-muted">
                    <li>Unexpected vehicle downtime impacting operations and revenue.</li>
                    <li>Suboptimal charging strategies leading to accelerated battery degradation.</li>
                    <li>Uncertainty in vehicle residual values due to unknown battery health.</li>
                  </ul>
                </div>
              )} 
              {activeTab === 2 && (
                <div>
                  <h4 className="font-bold text-lg mb-2 text-text-primary">For Financiers</h4>
                  <ul className="list-disc list-inside space-y-2 text-text-muted">
                    <li>Difficulty in accurately assessing the residual value of battery assets.</li>
                    <li>High risk exposure in leasing and loan portfolios without SOH data.</li>
                    <li>Inability to create innovative financial products like battery-as-a-service.</li>
                  </ul>
                </div>
              )} 
              {activeTab === 3 && (
                <div>
                  <h4 className="font-bold text-lg mb-2 text-text-primary">For BESS Developers</h4>
                  <ul className="list-disc list-inside space-y-2 text-text-muted">
                    <li>Performance degradation faster than projected, affecting project ROI.</li>
                    <li>Safety risks associated with thermal runaway events in large-scale systems.</li>
                    <li>Inefficient grid augmentation strategies due to poor battery state awareness.</li>
                  </ul>
                </div>
              )} 
              {activeTab === 4 && (
                <div>
                  <h4 className="font-bold text-lg mb-2 text-text-primary">For Recyclers</h4>
                  <ul className="list-disc list-inside space-y-2 text-text-muted">
                    <li>Inaccurate State-of-Health (SOH) data leading to undervalued assets.</li>
                    <li>Contamination risks from improperly handled high-voltage batteries.</li>
                    <li>Inefficient sorting processes for second-life applications vs. raw material recovery.</li>
                  </ul>
                </div>
              )}
              {activeTab === 5 && (
                <div>
                  <h4 className="font-bold text-lg mb-2 text-text-primary">For Charge Point Operators</h4>
                  <ul className="list-disc list-inside space-y-2 text-text-muted">
                    <li>Unpredictable charger downtime from hardware faults and software glitches.</li>
                    <li>High operational costs from peak demand charges and grid instability.</li>
                    <li>Lack of visibility into the health of batteries being charged, leading to inefficient charging cycles.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </AnimatedSection>
  );
}



function VisionSection() {
  return (
    <section id="vision" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-heading text-gray-900">Vision for a Sustainable Future</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square max-w-sm mx-auto">
            <div className="absolute inset-0 bg-neon-cyan/10 rounded-full blur-3xl" />
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="core-gradient">
                  <stop offset="0%" stopColor="#FFC300" />
                  <stop offset="100%" stopColor="#DAA520" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="40" fill="url(#core-gradient)" />
              <text x="200" y="205" textAnchor="middle" fill="#FFFFFF" fontSize="20" className="font-heading">Vision</text>
              <ellipse cx="200" cy="200" rx="180" ry="70" stroke="#00E676" strokeWidth="1" strokeOpacity="0.3" fill="none" transform="rotate(30 200 200)" />
              <ellipse cx="200" cy="200" rx="180" ry="70" stroke="#00FFD1" strokeWidth="1" strokeOpacity="0.3" fill="none" transform="rotate(-30 200 200)" />
              <ellipse cx="200" cy="200" rx="120" ry="160" stroke="#FFC300" strokeWidth="1" strokeOpacity="0.3" fill="none" />
              <g>
                <circle cx="200" cy="40" r="8" fill="#FFC300" filter="url(#glow)"/>
                <text x="200" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="14">Circular</text>
              </g>
              <g transform="rotate(120 200 200)">
                <circle cx="200" cy="40" r="8" fill="#00E676" filter="url(#glow)"/>
                <text x="200" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="14">Efficient</text>
              </g>
              <g transform="rotate(240 200 200)">
                <circle cx="200" cy="40" r="8" fill="#00FFD1" filter="url(#glow)"/>
                <text x="200" y="25" textAnchor="middle" fill="#FFFFFF" fontSize="14">Safe</text>
              </g>
            </svg>
          </div>
          <div className="text-center md:text-left">
            <blockquote className="text-xl md:text-2xl italic text-gray-700 mt-8 leading-relaxed">
              "We envision a world where every battery is safe, efficient, and circular, powering a truly sustainable electric future."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductStackSection() {
  const products = [
    {
      name: "FawkesLink",
      description: "Our universal hardware interface plugs into any battery system, capturing high-fidelity data in real-time.",
      icon: <Zap/>,
      color: "ochre",
      infographic: (
        <svg viewBox="0 0 200 100">
          <motion.path d="M 10 50 L 70 50" stroke="#FFC300" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }} />
          <motion.path d="M 130 50 L 190 50" stroke="#00E676" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }} />
          <rect x="70" y="40" width="60" height="20" rx="5" fill="#1a1d21" stroke="#444" />
          <text x="100" y="55" textAnchor="middle" fill="#FFC300" fontSize="10">Link</text>
          <text x="40" y="35" textAnchor="middle" fill="#fff" fontSize="8">Battery</text>
          <text x="160" y="35" textAnchor="middle" fill="#fff" fontSize="8">Cloud</text>
        </svg>
      )
    },
    {
      name: "FawkesCore",
      description: "The AI-powered brain of our platform. It processes data to deliver predictive analytics, state-of-health monitoring, and optimization strategies.",
      icon: <Brain/>,
      color: "electric-green",
      infographic: (
        <svg viewBox="0 0 200 100">
          <motion.g animate={{ rotate: 360 }} transition={{ ease: "linear", duration: 20, repeat: Infinity }}>
            <circle cx="100" cy="50" r="30" fill="none" stroke="#00E676" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="50" r="40" fill="none" stroke="#00E676" strokeWidth="1" strokeOpacity="0.5" />
          </motion.g>
          <Brain className="w-10 h-10 text-electric-green" style={{ transform: 'translate(80px, 30px)' }}/>
          <motion.circle cx="100" cy="10" r="3" fill="#fff" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <motion.circle cx="140" cy="50" r="3" fill="#fff" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
          <motion.circle cx="60" cy="50" r="3" fill="#fff" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} />
        </svg>
      )
    },
    {
      name: "FawkesLoop",
      description: "A data-driven marketplace connecting end-of-life batteries with second-life applications and certified recyclers, closing the loop.",
      icon: <RefreshCw/>,
      color: "neon-cyan",
      infographic: (
        <svg viewBox="0 0 200 100">
          <motion.path d="M 50,80 A 40,40 0 1,1 150,80" stroke="#00FFD1" fill="none" strokeWidth="2" />
          <motion.circle cx="50" cy="80" r="5" fill="#00FFD1" animate={{ x: [50, 100, 150], y: [80, 20, 80] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <text x="30" y="90" fill="#fff" fontSize="8">EV</text>
          <text x="95" y="15" fill="#fff" fontSize="8">2nd Life</text>
          <text x="155" y="90" fill="#fff" fontSize="8">Recycle</text>
        </svg>
      )
    },
  ];

  const colorMap: { [key: string]: { bg: string; text: string } } = {
    ochre: { bg: 'bg-ochre/10', text: 'text-ochre' },
    'electric-green': { bg: 'bg-electric-green/10', text: 'text-electric-green' },
    'neon-cyan': { bg: 'bg-neon-cyan/10', text: 'text-neon-cyan' },
  };

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center font-heading text-gray-900">The Fawkes Product Stack</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto text-center leading-relaxed">
            A suite of interconnected products to monitor, manage, and monetize batteries at scale.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">
          {products.map((product, index) => {
            const colors = colorMap[product.color] || { bg: 'bg-gray-500/10', text: 'text-gray-500' };
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className={`text-left ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center`}>
                      {React.cloneElement(product.icon, { className: `w-6 h-6 ${colors.text}` })}
                    </div>
                    <h4 className="text-2xl font-bold font-heading text-gray-900">{product.name}</h4>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
                </div>
                <div className="h-48 bg-gray-50 p-6 rounded-xl border border-gray-200">
                  {product.infographic}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DifferentiatorsSection() {
  const items = [
    { title: "Physics-Based AI", description: "Models grounded in electrochemical reality, not just correlation.", icon: <Cpu/> },
    { title: "Real-World Data", description: "Calibrated with empirical data from millions of battery cycles.", icon: <Database/> },
    { title: "Hardware Agnostic", description: "Universal compatibility across battery types, chemistries, and manufacturers.", icon: <Battery/> },
  ];

  return (
    <section id="differentiators" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-gray-900">Our Competitive Edge</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're not just another analytics platform. Our core differentiators create a defensible moat.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-brand-primary/10">
                {React.cloneElement(item.icon, { className: 'w-8 h-8 text-brand-primary' })}
              </div>
              <h3 className="text-xl font-bold mb-4 font-heading text-gray-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueDeliveredSection() {
  const values = [
    { title: '20% Increase', description: 'in battery lifespan', icon: <TrendingUp/> },
    { title: '30% Reduction', description: 'in operational costs', icon: <Shield/> },
    { title: '50% Faster', description: 'fault detection', icon: <Zap/> },
    { title: '15% Improvement', description: 'in asset utilization', icon: <Recycle/> },
  ];

  return (
    <AnimatedSection id="value" className="snap-section">
      <div className="content-box bg-dark-surface text-text-primary-light">
      <div className="container-max">
        <motion.div variants={fadeIn} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Tangible Value, Delivered</h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto">
            Our intelligence translates into measurable improvements for your bottom line and operational efficiency.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, index) => (
            <motion.div key={index} variants={fadeIn} className="card text-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-dark-surface-alt">
                {React.cloneElement(v.icon, { className: 'w-8 h-8 text-electric-green' })}
              </div>
                            <p className="text-2xl font-bold text-text-primary-light font-heading">{v.title}</p>
              <p className="text-text-muted-light">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </AnimatedSection>
  );
}

function AboutSection() {
  return (
    <AnimatedSection id="about" className="snap-section">
      <div className="content-box text-text-primary-light">
      <div className="container-max">
        <motion.div variants={fadeIn} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">We Are Battery People</h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto">
            We are a team of scientists, engineers, and entrepreneurs obsessed with solving the hardest problems in energy storage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-start mb-16">
            <motion.div variants={fadeIn} className="md:col-span-2 card">
              <h3 className="text-2xl font-bold font-heading mb-4">Our Genesis</h3>
              <p className="text-text-primary text-lg mb-4">
                Our team combines decades of experience from organizations like Tesla, Google DeepMind, and MIT. We believe that intelligence is the key to unlocking the full potential of battery technology, and we're building the platform to make that a reality.
              </p>
              <p className="text-text-muted">
                Fawkes Energy is born out of a deep understanding of the challenges in the battery value chain, from materials science to end-of-life management.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="card text-center">
                <h3 className="text-xl font-bold font-heading mb-4">Co-Founder</h3>
                <div className="w-24 h-24 bg-dark-bg-alt rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xs text-text-muted">Photo</span>
                </div>
                <h4 className="text-lg font-bold">Co-Founder Name</h4>
                <p className="text-text-muted text-sm">
                    A brief, impactful bio about the co-founder's vision and background.
                </p>
            </motion.div>
        </div>

        <motion.div variants={fadeIn}>
            <h3 className="text-2xl font-bold font-heading mb-8 text-center">Backed By & In Alliance With</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
                <div className="h-12 flex items-center justify-center">
                    <p className="text-2xl font-bold text-text-muted tracking-wider">RUBAMIN</p>
                </div>
                <div className="h-12 flex items-center justify-center">
                    <p className="text-xl font-semibold text-text-muted">Battery 360 Alliance</p>
                </div>
            </div>
        </motion.div>
      </div>
      </div>
    </AnimatedSection>
  );
}

function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission here (e.g., send to an API)
    alert("Thank you for your message! We'll be in touch soon.");
  };

  return (
    <AnimatedSection id="contact" className="snap-section">
      <div className="content-box text-text-primary-light">
        <div className="container-max">
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Get in Touch</h2>
            <p className="text-lg md:text-xl text-text-muted-light max-w-3xl mx-auto">
              Let's talk about how Fawkes can unlock value in your battery assets.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" className="form-input" required />
                <input type="email" placeholder="Your Email" className="form-input" required />
              </div>
              <input type="text" placeholder="Subject" className="form-input" required />
              <textarea placeholder="Your Message" className="form-input" rows={5} required />
              <button type="submit" className="btn btn-primary w-full md:w-auto">Send Message</button>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Footer() {
  return (
    <footer className="snap-section">
            <div className="content-box bg-dark-surface-alt flex items-center justify-center">
            <div className="container-max text-center text-text-muted-light">
        <p>&copy; {new Date().getFullYear()} Fawkes Energy Inc. All rights reserved.</p>
        <p className="text-sm mt-2">Powering the future, intelligently.</p>
      </div>
      </div>
    </footer>
  );
}