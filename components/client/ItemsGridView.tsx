"use client"
import { ChevronLeft, UtensilsCrossed } from 'lucide-react';
import React, { useMemo } from 'react';
import { MenuItemCard } from './MenuItemCard';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Added this

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
    const searchParams = useSearchParams(); // Access current URL params

    // DEVELOPER LOGIC: Create a "Back" link that preserves the table ID but removes the category
    const backHref = useMemo(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('cat'); // Remove the category so we go back to the main list
        const queryString = params.toString();
        return queryString ? `?${queryString}` : '/';
    }, [searchParams]);

    const sortedItems = useMemo(() => {
        if (!selectedCategory?.menuItems) return [];
        return [...selectedCategory.menuItems].sort((a, b) =>
            a.itemName.localeCompare(b.itemName)
        );
    }, [selectedCategory]);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* STICKY BACK BUTTON */}
            <div className="sticky top-[130px] z-[50] mb-6 px-1 pointer-events-none">
                <Link
                    href={backHref} // FIXED: Now uses the memoized back link
                    className="group inline-flex items-center gap-3 bg-card/90 backdrop-blur-md border border-border py-2.5 px-5 rounded-2xl shadow-glow transition-all active:scale-95 hover:border-primary/50 pointer-events-auto"
                >
                    <ChevronLeft size={16} className="text-primary transition-transform group-hover:-translate-x-1" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-text">
                        Back to Menu
                    </span>
                </Link>
            </div>

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

                </div>
                <div className="h-[2px] w-full bg-gradient-to-r from-primary via-primary/20 to-transparent mt-6 rounded-full opacity-30" />
            </header>

            <div className="grid grid-cols-2 gap-4">
                {sortedItems.map((item) => (
                    <MenuItemCard
                        key={item.id}
                        id={item.id}
                        name={item.itemName}
                        price={item.rate}
                        description={item.description === "-" ? "" : item.description}
                        isAvailable={item.isAvailable}
                        imageSrc={item.localImagePath && item.localImagePath !== "-" ? item.localImagePath : item.imageUrl}
                    />
                ))}
            </div>

            {/* Empty State */}
            {sortedItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <div className="h-16 w-16 bg-surface rounded-full flex items-center justify-center mb-4 border border-dashed border-border">
                        <UtensilsCrossed size={32} className="text-text-muted" />
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