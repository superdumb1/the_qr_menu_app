"use client"
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const root = window.document.documentElement;

        if (savedTheme === 'light') {
            setIsDark(false);
            root.classList.remove('dark');
        } else {
            setIsDark(true);
            root.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const root = window.document.documentElement;
        if (isDark) {
            setIsDark(false);
            root.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            setIsDark(true);
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center h-12 w-12 rounded-full active:scale-90 transition-all duration-500 ease-in-out text-text hover:bg-white/5"
            aria-label="Toggle Theme"
        >
            <div className="relative h-6 w-6">
                {/* Sun Icon */}
                <Sun
                    className={`absolute inset-0 transform transition-all duration-500 ${isDark ? 'rotate-0 scale-100 opacity-100 text-orange-500' : 'rotate-90 scale-0 opacity-0'
                        }`}
                />

                <Moon
                    className={`absolute inset-0 transform transition-all duration-500 ${isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-primary'
                        }`}
                />
            </div>
        </button>
    );
};

export default ThemeToggle;