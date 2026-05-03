"use client"
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useSearchParams } from 'next/navigation'; // Import this

const CategoryGridView = ({ sortedCategories }: { sortedCategories: any }) => {
    const fallbackImage = "/images/placeholder-food.jpg";
    const searchParams = useSearchParams(); // Get existing params (table, etc.)

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <header className="mb-8 px-2 pt-4">
                <h1 className="text-5xl font-black tracking-tighter text-text uppercase italic leading-none">
                    Menu
                </h1>
                <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mt-2">
                    Mechinagar Resort Specials
                </p>
            </header>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
                {sortedCategories.map((category: any) => {
                    // Logic to build the URL without losing the table
                    const createCategoryLink = () => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('cat', category.id.toString());
                        return `?${params.toString()}`;
                    };

                    const representativeItem = category.menuItems.find(
                        (i: any) => (i.localImagePath && i.localImagePath !== "-") || (i.imageUrl && i.imageUrl !== "-")
                    );

                    const displayImage = representativeItem?.localImagePath
                        ? `/${representativeItem.localImagePath}`
                        : representativeItem?.imageUrl;

                    return (
                        <Link
                            key={category.id}
                            /* FIXED: Now merges params instead of overwriting */
                            href={createCategoryLink()}
                            className="group relative flex flex-col justify-end h-42 overflow-hidden rounded-[2.5rem] active:scale-[0.96] transition-all border border-border bg-card shadow-xl"
                        >
                            <img
                                src={displayImage && displayImage !== "-" ? displayImage : fallbackImage}
                                alt={category.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                onError={(e: any) => { e.target.src = fallbackImage; }}
                            />

                            <div className="absolute inset-0 overlay-gradient" />

                            <div className="relative z-20 mt-auto p-3 rounded-[1.5rem] bg-glass backdrop-blur-lg border border-border shadow-2xl transition-transform group-hover:-translate-y-1">
                                <div className="flex flex-col">
                                    <h2 className="text-[15px] font-black leading-tight uppercase text-text tracking-tight italic ">
                                        {category.name}
                                    </h2>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                                            {category.menuItems.length} Items
                                        </span>
                                        <ArrowRight size={10} className="text-text-muted group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-tr from-primary/10 to-transparent" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryGridView;