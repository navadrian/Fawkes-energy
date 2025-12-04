'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const fadeIn = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hidden: { opacity: 0, y: 20 },
};

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

export default AnimatedSection;
