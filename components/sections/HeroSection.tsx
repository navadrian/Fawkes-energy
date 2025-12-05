'use client'

import React from 'react'
import AnimatedSection from '../ui/AnimatedSection'
import { useVideoOptimization } from '@/hooks/useVideoOptimization'
import HeroScrollIndicator from '../ui/HeroScrollIndicator'

export default function HeroSection() {
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
                    <source src="/videos/hero-mobile.webm" type="video/webm" />
                    <source src="/videos/hero-mobile.mp4" type="video/mp4" />
                    {/* Fallback to desktop versions if mobile versions aren't available */}
                    <source src="/videos/hero.webm" type="video/webm" />
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </>
            );
        }

        // Desktop sources - full quality
        return (
            <>
                <source src="/videos/hero.webm" type="video/webm" />
                <source src="/videos/hero.mp4" type="video/mp4" />
            </>
        );
    };

    // Determine if video should be loaded
    const shouldLoadVideo = !hasSlowConnection && isInView;

    return (
        <AnimatedSection id="hero" className="h-[100dvh] md:h-screen flex items-center justify-center px-0 md:px-6 pt-0 md:pt-16">
            <div
                ref={containerRef}
                className="relative w-full h-[calc(100dvh-4rem)] md:h-[80vh] md:max-w-6xl overflow-hidden rounded-none md:rounded-lg shadow-none md:shadow-2xl"
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
                        poster="/images/hero-poster.jpg"
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'
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
                    className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ${shouldLoadVideo && isVideoLoaded ? 'opacity-0' : 'opacity-100'
                        }`}
                    style={{
                        backgroundImage: 'url(/images/hero-poster.jpg)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                />

                {/* Poster image shows until video loads - no loading spinner needed */}

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />

                {/* Content */}
                <div className="relative h-full flex items-end justify-start px-6 pb-16 pt-20 md:px-12 md:pb-16 md:pt-24 min-h-[60vh]">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading leading-tight text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                            Deep Tech Battery Intelligence
                        </h1>
                        <p className="text-lg text-white/90 leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                            Unlocking safety, performance, and sustainability across the entire battery lifecycle through a unified intelligence layer.
                        </p>
                    </div>

                    {/* Scroll indicator to next section */}
                    <HeroScrollIndicator targetId="problem" />
                </div>
            </div>
        </AnimatedSection>
    );
}
