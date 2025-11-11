'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Battery, Zap, Shield, TrendingUp, Recycle, Brain, BarChart3, Users, Mail,
  ChevronDown, ArrowRight, Cpu, Database, RefreshCw, CheckCircle,
  Building, Phone, Menu, X, AlertCircle
} from 'lucide-react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, ChartOptions, ChartData } from 'chart.js';
import { Bar, Doughnut, Line, Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Button } from '@/components/ui/button'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler, ChartDataLabels, FunnelController, TrapezoidElement, annotationPlugin);

// --- TYPE DEFINITIONS ---
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface ChartConfig {
  type: 'Bar' | 'Line' | 'Doughnut' | 'Funnel';
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
      <main ref={mainRef} className="h-screen overflow-y-auto scroll-smooth">
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
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
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

        <Button asChild className="hidden md:inline-flex">
          <a href="#contact">
            Get in Touch
          </a>
        </Button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground">
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            <Button asChild className="mt-4">
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Get in Touch
              </a>
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

// --- VIDEO OPTIMIZATION HOOK ---
function useVideoOptimization() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasSlowConnection, setHasSlowConnection] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadStartTime = performance.now();

    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check connection speed with more comprehensive detection
    const checkConnection = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const isSlowConnection =
          connection &&
          (connection.effectiveType === '2g' ||
           connection.effectiveType === 'slow-2g' ||
           (connection.downlink && connection.downlink < 1.5)); // Less than 1.5 Mbps
        setHasSlowConnection(isSlowConnection);
      }
    };

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // Load once
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    checkMobile();
    checkConnection();

    const handleLoadComplete = () => {
      const loadTime = performance.now() - loadStartTime;
      setLoadingTime(loadTime);
      setIsVideoLoaded(true);
    };

    window.addEventListener('resize', checkMobile);

    // Monitor video loading performance
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', handleLoadComplete);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
      if (video) {
        video.removeEventListener('loadeddata', handleLoadComplete);
      }
    };
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn('Video failed to load, using fallback');
    setIsVideoLoaded(false);
  };

  // Performance monitoring
  useEffect(() => {
    if (isVideoLoaded && loadingTime > 0) {
      // Log performance metrics (could be sent to analytics)
      console.log(`Video loading performance:`, {
        loadTime: `${(loadingTime / 1000).toFixed(2)}s`,
        isMobile,
        hasSlowConnection,
        connectionType: 'connection' in navigator ?
          (navigator as any).connection?.effectiveType : 'unknown'
      });
    }
  }, [isVideoLoaded, loadingTime, isMobile, hasSlowConnection]);

  return {
    videoRef,
    containerRef,
    isVideoLoaded,
    isMobile,
    hasSlowConnection,
    isInView,
    loadingTime,
    handleVideoLoad,
    handleVideoError
  };
}

// --- HERO SECTION ---
function HeroSection() {
  const {
    videoRef,
    containerRef,
    isVideoLoaded,
    isMobile,
    hasSlowConnection,
    isInView,
    handleVideoLoad,
    handleVideoError
  } = useVideoOptimization();

  // Video optimization strategy based on device and connection
  const getVideoSources = () => {
    if (hasSlowConnection) {
      // For slow connections, skip video entirely
      return null;
    }

    if (isMobile) {
      // Mobile-optimized sources - smaller file sizes, lower resolution
      return (
        <>
          <source src="/videos/battery-blueprint-3-mobile.webm" type="video/webm" />
          <source src="/videos/battery-blueprint-3-mobile.mp4" type="video/mp4" />
          {/* Fallback to desktop versions if mobile versions aren't available */}
          <source src="/videos/battery-blueprint-3.webm" type="video/webm" />
          <source src="/videos/battery-blueprint-3.mp4" type="video/mp4" />
        </>
      );
    }

    // Desktop sources - full quality
    return (
      <>
        <source src="/videos/battery-blueprint-3.webm" type="video/webm" />
        <source src="/videos/battery-blueprint-3.mp4" type="video/mp4" />
      </>
    );
  };

  // Determine if video should be loaded
  const shouldLoadVideo = !hasSlowConnection && isInView;

  return (
    <AnimatedSection id="hero" className="min-h-screen flex items-center justify-center pt-16 px-6">
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl h-[70vh] md:h-[80vh] overflow-hidden rounded-lg shadow-2xl"
      >
        {/* Video Background - Lazy loaded and optimized */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload={isMobile ? "metadata" : "auto"}
            poster="/images/battery-blueprint-3-poster.jpg"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            // Mobile-specific optimizations
            style={{
              willChange: isVideoLoaded ? 'auto' : 'opacity',
              transform: 'translateZ(0)', // Force hardware acceleration
              backfaceVisibility: 'hidden', // Improve performance
            }}
            // Reduce memory usage on mobile
            {...(isMobile && {
              'x-webkit-airplay': 'deny',
              'webkit-playsinline': true,
              disablePictureInPicture: true,
              controlsList: 'nodownload noplaybackrate',
            })}
          >
            {getVideoSources()}
          </video>
        )}

        {/* Fallback background - Always present for instant display */}
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${
            shouldLoadVideo && isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage: 'url(/images/battery-blueprint-3-poster.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />

        {/* Loading indicator */}
        {shouldLoadVideo && !isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-white/70 text-sm">Loading video...</p>
            </div>
          </div>
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-end justify-start p-6 md:p-12">
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
            label: 'EV Claims',
            data: [0.2, 0.5, 2.2, 2.3, 3.7, 5.2, 6.8, 18.8, 15.7, 23.2, 21.1, 0.3],
            backgroundColor: 'hsl(37 100% 48%)',
            borderColor: 'hsl(37 100% 48%)',
            borderWidth: 1
          },
          {
            label: 'Non-EV Claims',
            data: [3.6, 4.5, 5.5, 6.1, 7.2, 7.5, 8.2, 7.7, 7.9, 6.4, 3.9, 0.2],
            backgroundColor: 'hsl(0 0% 100%)',
            borderColor: 'hsl(0 0% 100%)',
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'EV vs Non-EV Claims by Model Year',
            font: { size: 12, weight: 'normal' }
          },
          subtitle: {
            display: true,
            text: 'Source: CCC Intelligent Insights, (2022), Electric vs ICE Vehicles: Unpacking Repair Cost Impacts',
            font: { size: 10, style: 'italic', weight: 'normal' },
            color: 'hsl(0 0% 60%)',
            padding: { top: 4 }
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
        labels: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        datasets: [{
          label: 'Battery Capacity (%)',
          data: [100, 97, 96, 94.8, 93, 91, 89, 87, 86, 75, 70],
          borderColor: 'hsl(37 100% 48%)',
          backgroundColor: 'hsl(37 100% 48% / 0.2)',
          tension: 0.3,
          fill: true,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Battery Capacity vs. Cycles Showing Capacity Cliff',
            font: { size: 12, weight: 'normal' }
          },
          subtitle: {
            display: true,
            text: 'Source: Fawkes Energy internal analysis, 2025',
            font: { size: 10, style: 'italic', weight: 'normal' },
            color: 'hsl(0 0% 60%)',
            padding: { top: 4 }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Charge Cycles',
              color: 'hsl(0 0% 85%)'
            },
            ticks: {
              color: 'hsl(0 0% 70%)',
              maxTicksLimit: 6
            }
          },
          y: {
            beginAtZero: false,
            min: 60,
            max: 105,
            title: {
              display: true,
              text: 'Battery Capacity (%)',
              color: 'hsl(0 0% 85%)'
            },
            ticks: {
              color: 'hsl(0 0% 70%)'
            }
          }
        }
      }
    },
    {
      type: 'Line',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: [
          {
            label: 'Without Battery Intelligence',
            data: [60, 70, 80, 85, 90],
            borderColor: 'hsl(0 60% 50%)',
            backgroundColor: 'hsl(0 60% 50% / 0.2)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5
          },
          {
            label: 'With Battery Intelligence',
            data: [40, 42, 45, 48, 50],
            borderColor: 'hsl(150 70% 45%)',
            backgroundColor: 'hsl(150 70% 45% / 0.2)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            pointRadius: 3,
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Financing Risk Over Time: With vs Without Battery Data',
            font: { size: 12, weight: 'normal' }
          },
          subtitle: {
            display: true,
            text: 'Source: Fawkes Energy internal analysis, 2025',
            font: { size: 10, style: 'italic', weight: 'normal' },
            color: 'hsl(0 0% 60%)',
            padding: { top: 4 }
          },
          legend: {
            display: true,
            position: 'top'
          },
          datalabels: { display: false }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Vehicle Age',
              color: 'hsl(0 0% 85%)'
            },
            ticks: {
              color: 'hsl(0 0% 70%)',
              maxTicksLimit: 6
            },
            grid: {
              color: 'hsl(0 0% 20% / 0.3)'
            }
          },
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Risk Level (%)',
              color: 'hsl(0 0% 85%)'
            },
            ticks: {
              color: 'hsl(0 0% 70%)',
              callback: function(value: any) {
                return value + '%';
              }
            },
            grid: {
              color: 'hsl(0 0% 20% / 0.3)'
            }
          }
        }
      }
    },
    {
      type: 'Doughnut',
      data: {
        labels: ['Informally processed', 'Formally recycled'],
        datasets: [{
          data: [99, 1],
          backgroundColor: ['hsl(37 100% 48%)', 'hsl(150 70% 45%)'],
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'EV LiB Processing Split in India',
            font: { size: 12, weight: 'normal' },
            padding: { top: 0, bottom: 20 }
          },
          subtitle: {
            display: true,
            text: 'Source: ICEA-Accenture, (2025); Pathways to Circular Economy in Indian Electronics Sector',
            font: { size: 10, style: 'italic', weight: 'normal' },
            color: 'hsl(0 0% 60%)',
            padding: { top: 4 }
          },
          legend: { position: 'bottom' },
          datalabels: { 
            display: true,
            color: 'hsl(0 0% 100%)',
            font: {
              size: 12,
              weight: 'bold'
            },
            formatter: (value: number, context: any) => {
              return `${value}%`;
            },
            anchor: (context: any) => {
              // Show 1% outside with leader line, 99% inside
              return context.dataIndex === 1 ? 'end' : 'center';
            },
            align: (context: any) => {
              return context.dataIndex === 1 ? 'end' : 'center';
            },
            offset: (context: any) => {
              return context.dataIndex === 1 ? 15 : 0;
            },
            clamp: false
          }
        },
        cutout: '60%'
      }
    },
    {
      type: 'Line',
      data: {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: 'Predictive',
            data: [8, 12.5, 14, 16, 17.5, 19, 21, 21.5, 22, 24, 24.5, 25],
            borderColor: 'hsl(37 100% 48%)',
            backgroundColor: 'hsl(37 100% 48% / 0.2)',
            tension: 0.3,
            fill: true,
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 4
          },
          {
            label: 'Reactive',
            data: [1.5, 2.2, 5.8, 5, 4.8, 6.2, 3.5, 4.5, 8.5, 7.5, 6.2, 9],
            borderColor: 'hsl(0 0% 80%)',
            backgroundColor: 'hsl(0 0% 80% / 0.2)',
            tension: 0.3,
            fill: true,
            borderWidth: 2,
            pointRadius: 2,
            pointHoverRadius: 4
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'ROI: Predictive vs Reactive Maintenance Over Time',
            font: { size: 12, weight: 'normal' }
          },
          subtitle: {
            display: true,
            text: 'Source: Fawkes Energy internal analysis, 2025',
            font: { size: 10, style: 'italic', weight: 'normal' },
            color: 'hsl(0 0% 60%)',
            padding: { top: 4 }
          },
          datalabels: { display: false }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months Since Deployment',
              color: 'hsl(0 0% 85%)'
            },
            ticks: { color: 'hsl(0 0% 70%)' },
            grid: { color: 'hsl(0 0% 20% / 0.3)' }
          },
          y: {
            beginAtZero: true,
            min: 0,
            max: 26,
            title: {
              display: true,
              text: 'ROI Index',
              color: 'hsl(0 0% 85%)'
            },
            ticks: { color: 'hsl(0 0% 70%)' },
            grid: { color: 'hsl(0 0% 20% / 0.3)' }
          }
        }
      }
    },
    {
      type: 'Line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Charging Commissions Revenue',
            data: [45, 48, 52, 55, 58, 62, 65, 68, 71, 74, 77, 80],
            borderColor: 'hsl(37 100% 48%)',
            backgroundColor: 'hsl(37 100% 48% / 0.2)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointStyle: 'circle'
          },
          {
            label: 'Total Revenue with Battery Health Reports',
            data: [null, null, null, null, null, 62, 72, 80, 89, 97, 106, 115],
            borderColor: 'hsl(150 70% 45%)',
            backgroundColor: 'hsl(150 70% 45% / 0.2)',
            tension: 0.4,
            fill: true,
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointStyle: 'circle'
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Revenue Growth with Battery Health Reports Introduced Mid-Year',
            font: { size: 12, weight: 'normal' }
          },
          subtitle: {
            display: true,
            text: 'Source: Fawkes Energy internal analysis, 2025',
            font: { size: 10, style: 'italic', weight: 'normal' },
            color: 'hsl(0 0% 60%)',
            padding: { top: 4 }
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 12,
              font: {
                size: 12
              }
            }
          },
          annotation: {
            annotations: {
              line1: {
                type: 'line' as const,
                xMin: 5,
                xMax: 5,
                borderColor: 'hsl(0 0% 60%)',
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  display: true,
                  content: 'Battery Reports Introduced',
                  position: 'start' as const,
                  backgroundColor: 'hsl(0 0% 20%)',
                  color: 'hsl(0 0% 85%)',
                  font: {
                    size: 10
                  },
                  padding: {
                    x: 8,
                    y: 4
                  }
                }
              }
            }
          },
          datalabels: { display: false }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month',
              color: 'hsl(0 0% 85%)'
            },
            ticks: {
              color: 'hsl(0 0% 70%)',
              font: {
                family: 'Inter, sans-serif'
              }
            },
            grid: {
              color: 'hsl(0 0% 20% / 0.6)'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue ($K)',
              color: 'hsl(0 0% 85%)'
            },
            ticks: {
              color: 'hsl(0 0% 70%)',
              font: {
                family: 'Inter, sans-serif'
              },
              callback: function(value: any) {
                return '$' + value + 'K';
              }
            },
            grid: {
              color: 'hsl(0 0% 20% / 0.6)'
            }
          }
        }
      }
    }
  ];

  const tabs = [
    { name: 'EV OEMs', icon: <Shield className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'Fleet Operators', icon: <Users className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'Financiers', icon: <BarChart3 className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'Recyclers', icon: <Recycle className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'BESS Developers', icon: <Battery className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: 'CPOs', icon: <Zap className="w-4 h-4 md:w-5 md:h-5" /> },
  ];

  const chartSources = [
    'Source: CCC Intelligent Insights, (2022), Electric vs ICE Vehicles: Unpacking Repair Cost Impacts',
    'Source: Fawkes Energy internal analysis, 2025',
    'Source: Fawkes Energy internal analysis, 2025',
    'Source: ICEA-Accenture, (2025); Pathways to Circular Economy in Indian Electronics Sector',
    'Source: Fawkes Energy internal analysis, 2025',
    'Source: Fawkes Energy internal analysis, 2025'
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
        'Reputational damage from battery-related safety incidents',
        'Insufficient insight into battery health complicates assessing and managing risk'
      ]
    },
    {
      title: 'Fleet Operators',
      subtitle: 'Capacity Cliffs & Downtime Risk',
      keyInsight: 'Lithium-ion batteries don\'t always degrade gradually; sometimes they face abrupt "capacity cliffs," with losses of up to 20% in just a few charge cycles. This sudden drop can cause unexpected range loss or vehicle downtime, creating major risks for EV fleets.',
      dataPoint: 'Up to 20% capacity loss in just a few charge cycles',
      source: 'Battery degradation studies',
      painPoints: [
        'Unexpected vehicle downtime impacting operations and revenue',
        'Suboptimal charging strategies leading to accelerated battery degradation',
        'Uncertainty in vehicle residual values due to unknown battery health',
        'Abrupt capacity cliffs leading to significant loss in capacity in limited charging cycles'
      ]
    },
    {
      title: 'Financiers',
      subtitle: 'EV Financing Lifecycle Challenges',
      keyInsight: 'EV financing costs 26% more than ICE vehicles due to higher insurance premiums, uncertain residual values, and lack of battery health data. Traditional financing models fail to account for battery degradation patterns, leading to higher interest rates and limited credit availability.',
      dataPoint: 'EV interest rates 26% higher than ICE vehicles in India',
      source: 'ADB, BCG, Niti Aayog Report',
      painPoints: [
        'Lack of high-quality battery data and diagnostics',
        'Limited data transparency affecting risk assessment accuracy',
        'Inability to predict or quantify premature battery degradation',
        'Inadequate ICE-based risk models for evaluating EV performance and value',
        'Difficulty in assessing resale/ residual value'
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
        'Inability to optimize recycling processes without battery intelligence',
        'Inaccurate State-of-Health (SOH) data leading to undervalued assets',
        'Contamination risks from improperly handled high-voltage batteries',
        'Inefficient sorting processes for second-life applications vs. raw material recovery'
      ]
    },
    {
      title: 'BESS Developers',
      subtitle: 'Predictive Maintenance Challenges',
      keyInsight: 'For BESS developers, predictive maintenance enables early fault detection, reducing downtime, lowering costs, and improving ROI over time. But this is only possible with advanced battery intelligence. Without it, operators are stuck with reactive maintenance, driving up costs and operational risks.',
      dataPoint: 'Predictive maintenance can reduce costs by 20-30%',
      source: 'Energy storage studies',
      painPoints: [
        'Predictive insights enable early fault detection before failures occur',
        'Reduced system downtime through proactive maintenance scheduling',
        'Lower maintenance costs by preventing unplanned reactive repairs',
        'Improved ROI over time via optimized maintenance and uptime',
        'Requires advanced battery intelligence to realize these benefits',
        'Reactive maintenance drives higher costs and operational risks'
      ]
    },
    {
      title: 'CPOs',
      subtitle: 'Charging Infrastructure Optimization',
      keyInsight: 'In a cost-heavy ecosystem, CPOs can create new revenue streams by offering data-driven services like downloadable Battery State of Health (SoH) reports after each charge. This transforms routine charging into a premium, insight-driven experience, boosting customer trust, loyalty, and retention while improving charger utilization, offsetting operational costs, and driving long-term profitability.',
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
        resize: { duration: 0 }
      },
      interaction: {
        intersect: false // Improve performance
      },
      plugins: {
        legend: {
          labels: {
            color: 'hsl(0 0% 85%)',
            usePointStyle: true,
            padding: 12,
            boxWidth: 14,
            font: {
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
            color: 'hsl(0 0% 85%)',
            font: {
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
            color: 'hsl(0 0% 85%)',
            font: {
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
    <AnimatedSection id="problem" className="min-h-screen flex items-center py-6 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-foreground">The Problem Landscape</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The battery ecosystem is fragmented and opaque. Different stakeholders operate in silos, leading to massive inefficiencies and risks.
          </p>
        </div>

        {/* Unified Card Container - Responsive Width */}
        <div className="bg-secondary/50 border border-border rounded-lg overflow-x-hidden mx-auto w-full">
          {/* Tab Navigation */}
          <div className="border-b border-border overflow-x-hidden">
            <div className="flex space-x-2 md:space-x-6 overflow-x-auto px-4 md:px-6 py-4 scrollbar-hide">
              {tabs.map((tab, index) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center space-x-2 md:space-x-2 whitespace-nowrap px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors duration-200 border-b-2 ${
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
          <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[480px]">
            {/* Chart Section - Responsive Width */}
            <div className="w-full md:w-2/5 lg:w-5/12 min-h-[280px] md:min-h-full bg-card border-b md:border-b-0 md:border-r border-border flex flex-col justify-center overflow-hidden flex-shrink-0">
              <div ref={chartContainerRef} className="p-4 md:p-8 w-full max-w-full h-[280px] md:h-[460px]">
                {renderChart(chartData[activeTab])}
              </div>
              {chartSources[activeTab] && chartSources[activeTab].trim() !== '' && (
                <p className="px-4 md:px-8 pb-4 md:pb-8 text-[10px] italic text-muted-foreground text-center">
                  {chartSources[activeTab]}
                </p>
              )}
            </div>
            
            {/* Content Section - Takes Remaining Space */}
            <div className="flex-1 p-4 md:p-6 flex flex-col justify-start overflow-x-hidden min-w-0 min-h-0 md:min-h-full">
              <div className="flex-shrink-0 mb-4 md:mb-6 w-full">
                <h4 className="text-lg md:text-xl font-semibold text-foreground mb-2 break-words">
                  {painPointsData[activeTab].title}
                </h4>
                <p className="text-xs md:text-sm font-medium text-primary mb-4 break-words">
                  {painPointsData[activeTab].subtitle}
                </p>
                {painPointsData[activeTab].keyInsight && (
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 break-words">
                    {painPointsData[activeTab].keyInsight}
                  </p>
                )}
              </div>

              {/* Standard Layout for All Tabs */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden w-full">
                <h5 className="text-xs md:text-sm font-medium text-foreground mb-4">Key Challenges</h5>
                <ul className="space-y-2 md:space-y-4 w-full">
                  {painPoints[activeTab].map((point, index) => (
                    <li key={index} className="flex items-center text-xs md:text-sm text-muted-foreground leading-relaxed break-words w-full">
                      <span className="text-primary mr-2 text-xs flex-shrink-0">•</span>
                      <span className="flex-1 min-w-0 break-words">{point}</span>
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
    <AnimatedSection id="vision" className="min-h-screen flex items-center py-6 md:py-12 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 font-heading text-foreground">Vision for a Sustainable Future</h2>

        <div className="relative max-w-2xl mx-auto mb-8">
          <img 
            src="/images/fawkes.png" 
            alt="Circular Economy Vision - F43i Battery Lifecycle" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
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
    <AnimatedSection id="products" className="min-h-screen flex items-center py-6 md:py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-foreground">The Fawkes Product Stack</h2>
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
                  <h3 className="text-xl md:text-2xl font-semibold font-heading text-foreground">{product.name}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
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
    <AnimatedSection id="differentiators" className="flex items-center justify-center py-6 md:py-12 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-foreground">Our Competitive Edge</h2>
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
  return (
    <AnimatedSection id="value" className="flex items-center justify-center py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-foreground">Tangible Value, Delivered</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our intelligence translates into measurable improvements for your bottom line and operational efficiency.
          </p>
        </div>

        {/* Core Value Propositions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-primary" />
              </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">Reliable SOH Report in &lt;1 hour</h3>
            <p className="text-sm text-muted-foreground">Cutting testing time by 70%</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">±3% accuracy</h3>
            <p className="text-sm text-muted-foreground">in SOH &amp; RUL forecasts</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">Lower TCO by up to 15%</h3>
            <p className="text-sm text-muted-foreground">through predictive, optimized, value-driven maintenance tracking</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 font-heading">Cut unplanned down time by &gt; 20%</h3>
            <p className="text-sm text-muted-foreground">through anomaly alerts, reducing unexpected asset stoppages</p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// --- ABOUT SECTION ---
function AboutSection() {
  return (
    <AnimatedSection id="about" className="min-h-screen flex items-center py-6 md:py-12 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-foreground">We Are Battery People</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are a team of scientists, engineers, and entrepreneurs obsessed with solving the hardest problems in energy storage.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-semibold font-heading text-foreground mb-6">Our Story</h3>
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
            <p className="mt-4">
              Fawkes Energy is born out of a deep understanding of the challenges in the battery value chain, from materials science to end-of-life management.
            </p>
          </div>
          </div>

        {/* Co-Founders */}
        <div className="mb-16">
          <h3 className="text-xl md:text-2xl font-semibold font-heading text-foreground mb-8 text-center">Co-Founders</h3>
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
          <h3 className="text-xl md:text-2xl font-semibold font-heading text-foreground mb-6 text-center">Team</h3>
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
                <p className="text-sm font-medium text-foreground">Abhishek Sharma</p>
                <p className="text-xs text-muted-foreground">Hardware Engineer</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-background/30 rounded-lg p-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Priyanka LK</p>
                <p className="text-xs text-muted-foreground">Data Analyst</p>
              </div>
            </div>
          </div>
        </div>

        {/* Partnerships */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold font-heading text-foreground mb-8 text-center">In Association With</h3>
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
                The Battery 360 Alliance is a multi-stakeholder platform launched to promote a sustainable and circular battery value chain in India. It aims to foster cross-sectoral collaborations and address challenges in the battery ecosystem, including localized manufacturing and battery reuse and recycling.
              </p>
            </div>

            {/* Dezerv */}
            <div className="bg-background/50 rounded-lg p-6 border border-border">
              <div className="mb-6 flex items-center justify-center h-24">
                <div className="text-2xl font-bold text-muted-foreground tracking-wider">
                  DEZERV
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Dezerv is a Mumbai-based wealth tech startup that provides a suite of investment solutions tailored for India's affluent individuals, High Net Worth Individuals (HNIs), and family offices. The company's core offerings are built on an active portfolio monitoring philosophy, emphasizing data-driven decision-making to deliver superior investment outcomes through continuous market engagement and strategic adaptability.
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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <AnimatedSection id="contact" className="min-h-screen flex items-center py-6 md:py-12">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-heading text-foreground">Get in Touch</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Let's talk about how Fawkes can unlock value in your battery assets.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Address Column */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 font-heading">Contact Information</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Fawkes Energy</p>
                    <p>2nd Floor, C 59, Garudachar Palya</p>
                    <p>Mahadevpura, Bengaluru - 560048</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="flex flex-col gap-2">
                    <a href="mailto:medha@fawkes.energy" className="hover:text-foreground transition-colors">
                      medha@fawkes.energy
                    </a>
                    <a href="mailto:akshay@fawkes.energy" className="hover:text-foreground transition-colors">
                      akshay@fawkes.energy
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div>
            <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="bg-background border border-border rounded-md px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="bg-background border border-border rounded-md px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={5}
                required
              />
              
              {submitStatus === 'success' && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-500 rounded-md px-4 py-2 text-sm text-center">
                  Thank you! We'll be in touch soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-md px-4 py-2 text-sm text-center">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={submitStatus === 'success'}>
                Send Message
              </Button>
            </form>
          </div>
        </div>
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