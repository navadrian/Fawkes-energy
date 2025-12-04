import { useState, useEffect, useRef } from 'react';

export function useVideoOptimization() {
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
