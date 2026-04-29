'use client';

import React from 'react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggleClient';
import { useMenu } from '@/providers/MenuDataProvider';
import SearchResults from './SearchResults';

const Header = () => {
    const { searchQuery } = useMenu();

    return (
        <header className="sticky top-0 z-[100] bg-bg/80 backdrop-blur-xl pb-4 pt-6 px-4 border-b border-white/5 transition-all duration-300">
            <div className="max-w-md mx-auto">
                {/* The Flex Container: 
                  We keep only the Input and Toggle here so they stay perfectly centered.
                */}
                <div className="flex items-center w-full gap-2">
                    <div className="flex-1 relative group">
                        {searchQuery && (
                            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full transition-opacity" />
                        )}
                        <SearchBar />
                    </div>

                    <ThemeToggle />
                </div>

                {/* Divider and SearchResults 
                */}
                <div className={`mt-4 h-[1px] w-full transition-opacity duration-500 ${
                    searchQuery 
                    ? 'bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-100' 
                    : 'bg-white/5 opacity-50'
                }`} />
            </div>

            <SearchResults />
        </header>
    );
};

export default Header;