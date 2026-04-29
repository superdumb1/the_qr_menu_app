"use client"
import { ChevronLeft, UtensilsCrossed } from 'lucide-react';
import React, { useMemo } from 'react';
import { MenuItemCard } from './MenuItemCard';
import Link from 'next/link';

interface MenuItem {
    id: number;
    itemName: string;
    description: string;
    rate: number;
    imageUrl: string;
    localImagePath: string;
    isAvailable: boolean;
}

interface Category {
    id: number;
    name: string;
    menuItems: MenuItem[];
}

const ItemsGridView = ({ selectedCategory }: { selectedCategory: Category }) => {
    const sortedItems = useMemo(() => {
        if (!selectedCategory?.menuItems) return [];
        
        return [...selectedCategory.menuItems].sort((a, b) => 
            a.itemName.localeCompare(b.itemName)
        );
    }, [selectedCategory]);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Navigation - Modernized Floating Button */}
            <div className="mb-6 px-1">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-3 bg-card border border-white/5 py-2.5 px-5 rounded-2xl shadow-lg transition-all active:scale-95 hover:border-primary/50"
                >
                    <ChevronLeft size={16} className="text-primary transition-transform group-hover:-translate-x-1" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text">
                        Back to Menu
                    </span>
                </Link>
            </div>

            {/* Header Section - Clean & High Contrast */}
            <header className="mb-10 px-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-text italic leading-none">
                            {selectedCategory.name}
                        </h1>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                            </div>
                            <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">
                                {sortedItems.length} Recipes Found
                            </p>
                        </div>
                    </div>
                    <div className="h-14 w-14 bg-surface rounded-full border border-border flex items-center justify-center text-primary/40">
                        <UtensilsCrossed size={24} />
                    </div>
                </div>
                
                {/* Visual Accent */}
                <div className="h-[2px] w-full bg-gradient-to-r from-primary via-primary/20 to-transparent mt-6 rounded-full opacity-30" />
            </header>

            {/* Items Grid - Matching the Category grid spacing */}
            <div className="grid grid-cols-2 gap-4">
                {sortedItems.map((item) => (
                    <MenuItemCard
                        key={item.id}
                        name={item.itemName}
                        price={item.rate}
                        description={item.description === "-" ? "" : item.description}
                        isAvailable={item.isAvailable}
                        // Prioritize local path, fallback to URL
                        imageSrc={item.localImagePath && item.localImagePath !== "-" ? item.localImagePath : item.imageUrl}
                    />
                ))}
            </div>

            {/* Empty State */}
            {sortedItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-dashed border-white/10">
                         <UtensilsCrossed size={32} className="text-gray-800" />
                    </div>
                    <p className="text-text-muted font-black uppercase text-[10px] tracking-[0.3em]">
                        Kitchen Restocking
                    </p>
                </div>
            )}
        </div>
    );
}

export default ItemsGridView;