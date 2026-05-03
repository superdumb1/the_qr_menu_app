"use client"
import React, { useState, useEffect } from 'react';
import { useMenu } from '@/providers/MenuDataProvider';
import { BellRing, Loader2, Info, ReceiptText, X } from 'lucide-react';

const WaiterButton = () => {
    const { lang, tableNo } = useMenu();
    const [isCalling, setIsCalling] = useState<'WAITER' | 'BILL' | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isUnknownTable = !tableNo || tableNo === "Unknown" || tableNo === "??";

    const triggerAction = async (type: 'WAITER' | 'BILL') => {
        if (isCalling || isUnknownTable) return;
        setIsCalling(type);
        setIsOpen(false);
        try {
            await fetch('/api/waiter/call', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tableNo, type })
            });
        } catch (err) {
            console.error("API Error:", err);
        } finally {
            setIsCalling(null);
        }
    };

    if (!mounted) return null;

    return (
        <div className="fixed bottom-8 right-6 z-[100] flex flex-col items-end gap-4">
            
            {/* Expanded Options */}
            {isOpen && !isUnknownTable && (
                <div className="flex flex-col gap-4 mb-2 animate-in fade-in zoom-in slide-in-from-bottom-10 duration-500 origin-bottom">
                    <button
                        onClick={() => triggerAction('BILL')}
                        className="flex items-center gap-3 bg-card/90 backdrop-blur-2xl border border-border p-2 pr-6 rounded-full shadow-2xl active:scale-95 transition-all group"
                    >
                        <div className="h-11 w-11 rounded-full bg-success/10 flex items-center justify-center text-success group-hover:bg-success group-hover:text-white transition-colors">
                            <ReceiptText size={20} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-text">
                            {lang === 'en' ? 'Get Bill' : 'बिल माग्नुहोस्'}
                        </span>
                    </button>

                    <button
                        onClick={() => triggerAction('WAITER')}
                        className="flex items-center gap-3 bg-card/90 backdrop-blur-2xl border border-border p-2 pr-6 rounded-full shadow-2xl active:scale-95 transition-all group"
                    >
                        <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <BellRing size={20} />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-text">
                            {lang === 'en' ? 'Call Waiter' : 'वेटर बोलाउनुहोस्'}
                        </span>
                    </button>
                </div>
            )}

            <div className="relative">
                {/* SONAR ENGINE (Pure Orange) */}
                {!isOpen && !isCalling && !isUnknownTable && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {[0, 1, 2, 3].map((i) => (
                            <div 
                                key={i}
                                className="absolute h-full w-full rounded-full border-[3px] border-primary animate-sonar-active" 
                                style={{ animationDelay: `${i}s` }} 
                            />
                        ))}
                    </div>
                )}

                {/* THE NEW "PREMIUM" TABLE BADGE */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="flex flex-col items-center">
                        <div className="bg-background/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full shadow-2xl flex items-center gap-2">
                           {/* Micro Signal Icon */}
                           <div className="flex gap-0.5 items-end h-2">
                                <div className="w-0.5 h-1 bg-primary rounded-full" />
                                <div className="w-0.5 h-1.5 bg-primary rounded-full" />
                                <div className="w-0.5 h-2 bg-primary rounded-full" />
                           </div>
                           <span className="text-[10px] font-black text-text tracking-tighter">
                             TABLE <span className="text-primary">{tableNo || '??'}</span>
                           </span>
                        </div>
                        {/* Little connecting stem to make it look anchored */}
                        <div className="w-[2px] h-2 bg-white/20 shadow-glow" />
                    </div>
                </div>

                <button
                    onClick={() => isUnknownTable ? null : setIsOpen(!isOpen)}
                    className={`h-16 w-16 rounded-full flex items-center justify-center shadow-orange-glow transition-all duration-500 active:scale-75 border-4 z-10 relative ${
                        isUnknownTable 
                        ? 'bg-card border-border text-text-muted opacity-50' 
                        : isOpen 
                            ? 'bg-bg border-primary text-primary rotate-180 shadow-none' 
                            : 'bg-primary border-white/20 text-white hover:scale-105'
                    }`}
                >
                    {isCalling ? (
                        <Loader2 size={28} className="animate-spin" />
                    ) : isOpen ? (
                        <X size={28} />
                    ) : isUnknownTable ? (
                        <Info size={28} />
                    ) : (
                        <UtensilsIcon size={28} />
                    )}
                </button>
            </div>
        </div>
    );
};

const UtensilsIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
);

export default WaiterButton;