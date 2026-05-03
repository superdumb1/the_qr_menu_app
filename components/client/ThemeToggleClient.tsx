"use client"
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    // Default to null or a safe guess to prevent hydration mismatch
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const root = window.document.documentElement;
        const savedTheme = localStorage.getItem('theme');
        
        // If user explicitly saved 'light', or if no save exists but system prefers light
        if (savedTheme === 'light') {
            setIsDark(false);
            root.classList.add('light');
        } else {
            setIsDark(true);
            root.classList.remove('light'); // Default is dark
        }
    }, []);

    const toggleTheme = () => {
        const root = window.document.documentElement;
        
        if (isDark) {
            // Switch to LIGHT
            setIsDark(false);
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to DARK
            setIsDark(true);
            root.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            /* Used hover:bg-surface and text-text-muted to stay consistent with your theme */
            className="flex items-center justify-center h-12 w-12 rounded-full active:scale-90 transition-all duration-500 ease-in-out text-text-muted hover:bg-surface border border-transparent hover:border-border"
            aria-label="Toggle Theme"
        >
            <div className="relative h-6 w-6">
                {/* 
                   Icon Logic: 
                   If isDark is true, show the Sun (to switch to light)
                   If isDark is false, show the Moon (to switch to dark)
                */}
                <Sun
                    className={`absolute inset-0 transform transition-all duration-500 ${
                        isDark 
                        ? 'rotate-0 scale-100 opacity-100 text-primary' 
                        : 'rotate-90 scale-0 opacity-0'
                    }`}
                />

                <Moon
                    className={`absolute inset-0 transform transition-all duration-500 ${
                        !isDark 
                        ? 'rotate-0 scale-100 opacity-100 text-primary' 
                        : '-rotate-90 scale-0 opacity-0'
                    }`}
                />
            </div>
        </button>
    );
};

export default ThemeToggle;