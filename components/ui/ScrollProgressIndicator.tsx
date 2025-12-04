'use client'

import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export const ScrollProgressIndicator = ({ container }: { container?: React.RefObject<HTMLElement> }) => {
    const { scrollYProgress } = useScroll({
        container: container?.current ? { current: container.current } : undefined
    });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Hide when at top (scaleX === 0)
    const opacity = useSpring(
        scrollYProgress,
        {
            stiffness: 100,
            damping: 30
        }
    );

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
            style={{
                scaleX,
                opacity: scaleX.get() > 0.01 ? opacity : 0,
                transformOrigin: "0%"
            }}
        />
    );
};
