'use client';

import { Search, X, Command } from 'lucide-react';
import React from 'react';
import { useMenu } from '@/providers/MenuDataProvider';

const SearchBar = () => {
    const {
        searchQuery,
        setSearchQuery,
        lang,
    } = useMenu();

    const handleClear = () => {
        setSearchQuery('');
    };

    return (
        <div className="w-full group">
            <div className="relative bg-surface flex items-center px-5 py-3.5 border border-white/5 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 rounded-[1.5rem] text-text transition-all duration-300 shadow-inner">

                {/* Search Icon - Stays visible but dims when typing */}
                <Search
                    className={`transition-all duration-300 ${searchQuery ? 'text-primary scale-90' : 'text-text-muted opacity-50'}`}
                    size={18}
                />

                <input
                    type="text"
                    placeholder={lang === 'en' ? "Search dishes..." : "मेनु खोज्नुहोस्..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="focus:outline-none w-full bg-transparent px-3 text-[15px] font-bold tracking-tight placeholder:text-text-muted/40 placeholder:font-black placeholder:uppercase placeholder:tracking-[0.1em]"
                />

                {/* Dynamic Action Button */}
                <div className="flex items-center gap-2">
                    {searchQuery ? (
                        <button
                            onClick={handleClear}
                            className="bg-white/5 hover:bg-red-500/20 p-1.5 rounded-xl transition-all active:scale-90"
                            aria-label="Clear search"
                        >
                            <X className="text-red-400" size={16} />
                        </button>
                    ) : (
                        <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/5 pointer-events-none">
                            <Command size={10} className="text-text-muted" />
                            <span className="text-[9px] font-black text-text-muted">K</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Subtle "Quick Hint" below bar when empty */}
            {/* Subtle "Quick Hint" using ABSOLUTE positioning so it doesn't break flex alignment */}
            {!searchQuery && (
                <div className="absolute  bg-bg/80 backdrop-blur-xl  py-1 top-[calc(100%+12px)] left-0 w-full flex gap-4 px-2 overflow-x-auto no-scrollbar z-10">
                    {['Momo', 'Biryani', 'Coffee', 'Pizza'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="text-[12px] font-black uppercase tracking-widest text-text-muted/50 hover:text-primary transition-colors flex-shrink-0"
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;