"use client"
import React, { useMemo } from 'react';
import { ChevronLeft, Share2, Heart, Clock, Utensils, Leaf, Flame, Info } from 'lucide-react';
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
        <div className="min-h-screen bg-bg text-text animate-in fade-in duration-500">

            {/* HERO */}
            <div className="relative h-[45vh] w-full overflow-hidden">
                <img
                    src={imageSrc}
                    alt={item.itemName}
                    className="h-full w-full object-cover scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/60" />

                <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-10">
                    <button
                        onClick={handleBack}
                        className="h-12 w-12 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
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
                    <h1 className="text-5xl font-black uppercase tracking-tighter leading-none italic text-white">
                        {item.itemName}
                    </h1>
                </div>
                <div className="fixed bottom-[100px] left-0 right-0 px-6 z-50">
                    <div className="max-w-lg mx-auto">
                        <div className="bg-card/40 backdrop-blur-3xl border border-white/10 p-4 rounded-[3rem] shadow-2xl flex justify-center items-center">
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-black text-primary">Rs.</span>
                                <span className="text-4xl font-black italic tracking-tighter text-white">
                                    {item.rate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* STATS
                <div className="grid grid-cols-3 gap-3 mb-10">
                    {[
                        { icon: Clock, label: "15 Mins", color: "text-primary" },
                        { icon: Flame, label: "450 Cal", color: "text-danger" },
                        { icon: Utensils, label: "Organic", color: "text-accent" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-card p-4 rounded-[2rem] border border-border/40 flex flex-col items-center gap-1">
                            <stat.icon size={18} className={stat.color} />
                            <span className="text-[10px] font-black uppercase text-text-muted">{stat.label}</span>
                        </div>
                    ))}
                </div> */}


                <div className="space-y-4">
                    {/* <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-primary/80">Ingredients</h3> */}
                    <p className="text-text/70 leading-relaxed font-medium">
                        {item.description !== "-" ? item.description : "A signature resort special, crafted with fresh seasonal ingredients and traditional spices."}
                    </p>
                </div>

                {/* CHEF NOTE
                <div className="mt-8 p-6 rounded-[2.5rem] bg-card border border-border flex gap-4 items-center">
                    <Info size={20} className="text-primary shrink-0" />
                    <p className="text-sm italic text-text-muted leading-snug">
                        Pairs perfectly with our house specialty chilled beverages.
                    </p>
                </div> */}

                <div className="h-72 w-full" />
            </div>


        </div>
    );
};

export default ItemPage;