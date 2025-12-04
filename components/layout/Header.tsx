'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const navLinks = ['Problem', 'Vision', 'Products', 'About', 'Blog', 'Contact'];

    // Scroll spy to highlight active navigation link
    useEffect(() => {
        const sections = ['hero', 'problem', 'vision', 'products', 'differentiators', 'value', 'about', 'blog', 'contact'];
        const observerOptions = {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observers = sections.map(sectionId => {
            const element = document.getElementById(sectionId);
            if (!element) return null;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(sectionId);
                    }
                });
            }, observerOptions);

            observer.observe(element);
            return observer;
        });

        return () => {
            observers.forEach(observer => observer?.disconnect());
        };
    }, []);

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
        <header
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-border ${
                activeSection === 'hero'
                    ? 'bg-background/40 md:bg-background/80'
                    : 'bg-background/80'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
                <div className="flex items-center">
                    <a href="#hero" aria-label="Fawkes Energy Home">
                        <Logo />
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-muted-foreground text-sm">
                    {navLinks.map(link => {
                        const sectionId = link.toLowerCase();
                        const isActive = activeSection === sectionId;

                        return (
                            <a
                                key={link}
                                href={`#${sectionId}`}
                                className={`transition-colors duration-200 font-medium border-b-2 ${isActive
                                        ? 'text-primary border-primary'
                                        : 'border-transparent hover:text-foreground'
                                    }`}
                                aria-label={`Navigate to ${link} section`}
                            >
                                {link}
                            </a>
                        );
                    })}
                </nav>

                <Button asChild className="hidden md:inline-flex border border-primary/30">
                    <a href="#contact" aria-label="Get in touch">
                        Get in Touch
                    </a>
                </Button>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-foreground"
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
                >
                    <nav className="flex flex-col items-center space-y-6 py-8">
                        {navLinks.map(link => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-lg"
                                onClick={() => setIsMenuOpen(false)}
                                aria-label={`Navigate to ${link} section`}
                            >
                                {link}
                            </a>
                        ))}
                        <Button asChild className="mt-4 border border-primary/30">
                            <a
                                href="#contact"
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Get in touch"
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
