"use client"
import React, { useMemo } from 'react';
import { ChevronLeft, Leaf, Flame } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMenu } from '@/providers/MenuDataProvider';

interface ItemPageProps {
    itemId: string;
}

const ItemPage = ({ itemId }: ItemPageProps) => {
    const { allCategories } = useMenu();
    const router = useRouter();
    const searchParams = useSearchParams();

    const item = useMemo(() => {
        return allCategories
            .flatMap((cat: any) => cat.menuItems)
            .find((i: any) => i.id == itemId);
    }, [allCategories, itemId]);

    const handleBack = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('item');
        router.push(`?${params.toString()}`);
    };

    if (!item) return null;

    const imageSrc = item.localImagePath && item.localImagePath !== "-"
        ? `/${item.localImagePath}`
        : item.imageUrl;

    return (
        /* Use bg-bg to ensure background follows theme */
        <div className="min-h-screen bg-bg text-text animate-in fade-in duration-500">

            {/* HERO */}
            <div className="relative h-[45vh] w-full overflow-hidden">
                <img
                    src={imageSrc}
                    alt={item.itemName}
                    className="h-full w-full object-cover scale-105"
                />
                {/* Gradient: use bg-bg/60 for a smooth blend into the theme background */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />

                <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-10">
                    <button
                        onClick={handleBack}
                        /* Use bg-surface/20 and text-text to ensure visibility */
                        className="h-12 w-12 rounded-2xl bg-surface/40 backdrop-blur-xl border border-border flex items-center justify-center text-text active:scale-90 transition-transform"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>
            </div>

            {/* CONTENT */}
            <div className="relative -mt-12 px-6 pb-20 rounded-t-[3rem] bg-bg border-t border-border shadow-2xl">
                <div className="w-12 h-1.5 bg-border rounded-full mx-auto mt-4 mb-8 opacity-50" />

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-success bg-success/10 px-2 py-0.5 rounded-md">
                            <Leaf size={10} /> Veg
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-warning bg-warning/10 px-2 py-0.5 rounded-md">
                            <Flame size={10} /> Popular
                        </span>
                    </div>
                    {/* FIXED: Changed text-white to text-text */}
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-none italic text-text">
                        {item.itemName}
                    </h1>
                </div>

                {/* PRICE BAR */}
                <div className="fixed bottom-[100px] left-0 right-0 px-6 z-50">
                    <div className="max-w-lg mx-auto">
                        {/* Use bg-card/60 and border-border */}
                        <div className="bg-card/80 backdrop-blur-3xl border border-border p-4 rounded-[3rem] shadow-glow flex justify-center items-center">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-black text-primary">Rs.</span>
                                {/* FIXED: Changed text-white to text-text */}
                                <span className="text-4xl font-black italic tracking-tighter text-text">
                                    {item.rate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* text-text/70 ensures it's readable but muted in both themes */}
                    <p className="text-text/70 leading-relaxed font-medium">
                        {item.description !== "-" ? item.description : "A signature resort special, crafted with fresh seasonal ingredients and traditional spices."}
                    </p>
                </div>

                <div className="h-72 w-full" />
            </div>
        </div>
    );
};

export default ItemPage;