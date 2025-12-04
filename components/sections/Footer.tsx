'use client'

import React from 'react'

export default function Footer() {
    return (
        <footer className="py-8 border-t border-border">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} Fawkes Energy Inc. All rights reserved.</p>
                <p className="text-muted-foreground text-xs mt-2">Powering the future, intelligently.</p>
            </div>
        </footer>
    );
}
