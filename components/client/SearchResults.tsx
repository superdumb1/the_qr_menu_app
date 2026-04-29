"use client"
import React from 'react'
import { useMenu } from '@/providers/MenuDataProvider'
import Link from 'next/link'
import { SearchX, ChevronRight, Utensils, Zap } from 'lucide-react'

const SearchResults = () => {
    const { searchQuery, setSearchQuery, filteredItems } = useMenu()

    if (!searchQuery) return null;

    const fallbackImage = "/images/placeholder-food.jpg";

    return (
        <div className="fixed inset-0 top-[90px] z-[999] bg-bg/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300">
            <div className="max-w-md mx-auto p-4 pb-40">
                
                {/* --- Header Section --- */}
                <div className="flex justify-between items-center mb-8 px-2">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                            <Zap size={12} className="text-primary fill-primary" />
                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Quick Search</span>
                        </div>
                        <h3 className="text-4xl font-black text-text uppercase tracking-tighter italic">
                            Results
                        </h3>
                    </div>
                    
                    <button 
                        onClick={() => setSearchQuery('')} 
                        className="h-12 w-12 flex items-center justify-center bg-card hover:bg-red-500/10 rounded-[1.2rem] border border-border transition-all group active:scale-90"
                    >
                        <SearchX size={20} className="text-text-muted group-hover:text-red-500" />
                    </button>
                </div>

                {/* --- Result Count --- */}
                <div className="flex items-center gap-3 mb-6 px-2">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.2em] whitespace-nowrap">
                        {filteredItems.length} {filteredItems.length === 1 ? 'Match' : 'Matches'} Found
                    </p>
                </div>

                {/* --- Vertical List --- */}
                <div className="flex flex-col gap-4">
                    {filteredItems.map((item: any) => (
                        <Link
                            key={item.id}
                            href={`?cat=${item.categoryId}`}
                            onClick={() => setSearchQuery('')}
                            className={`group flex items-center gap-4 bg-card p-3 rounded-[2rem] border border-border shadow-sm active:scale-[0.97] transition-all ${!item.isAvailable ? 'opacity-50 grayscale' : ''}`}
                        >
                            {/* Improved Thumbnail */}
                            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[1.5rem] border border-border bg-surface">
                                <img 
                                    src={item.localImagePath ? `/${item.localImagePath}` : (item.imageUrl !== "-" ? item.imageUrl : fallbackImage)}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt={item.itemName}
                                    onError={(e: any) => { e.target.src = fallbackImage; }}
                                />
                                {!item.isAvailable && (
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                                        <span className="text-[8px] font-black text-white uppercase tracking-widest bg-red-600 px-2 py-1 rounded-md shadow-lg">OUT</span>
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 min-w-0 py-1">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <span className="text-[8px] font-black text-primary uppercase tracking-[0.15em]">
                                        {item.categoryName || 'Chef Special'}
                                    </span>
                                </div>
                                
                                <h4 className="text-[17px] font-black text-text capitalize truncate tracking-tight">
                                    {item.itemName}
                                </h4>
                                
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-xl font-black text-text tracking-tighter">
                                        <span className="text-[10px] font-bold text-text-muted mr-1">Rs.</span>
                                        {item.rate}
                                    </p>
                                    <div className="h-9 w-9 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                                        <ChevronRight size={16} className="text-text-muted group-hover:text-white" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* --- Empty State --- */}
                {filteredItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in-95 duration-500">
                        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6 border border-dashed border-border">
                            <Utensils className="text-text-muted opacity-20" size={40} />
                        </div>
                        <h4 className="text-text font-black uppercase tracking-[0.2em] text-sm">No Flavor Found</h4>
                        <p className="text-text-muted text-[11px] mt-3 max-w-[200px] leading-relaxed font-medium">
                            We couldn't find "<span className="text-primary italic">{searchQuery}</span>". Try searching for 'Momo' or 'Pizza'.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchResults;