"use client"
import React, { useState, useEffect } from 'react';
import { useMenu } from '@/providers/MenuDataProvider';
import { BellRing, Loader2, Info, ReceiptText, Plus, X } from 'lucide-react';

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
        // Auto-close menu on action
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
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
            
            {/* Expanded Menu Options */}
            {isOpen && !isUnknownTable && (
                <div className="flex flex-col gap-3 mb-2 animate-in fade-in zoom-in slide-in-from-bottom-10 duration-300 origin-bottom">
                    {/* Bill Option */}
                    <button
                        onClick={() => triggerAction('BILL')}
                        className="flex items-center gap-3 bg-surface/90 backdrop-blur-xl border border-border p-2 pr-5 rounded-full shadow-2xl group active:scale-95 transition-all"
                    >
                        <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                            <ReceiptText size={18} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-text">
                            {lang === 'en' ? 'Check Bill' : 'बिल हेर्नुहोस्'}
                        </span>
                    </button>

                    {/* Waiter Option */}
                    <button
                        onClick={() => triggerAction('WAITER')}
                        className="flex items-center gap-3 bg-surface/90 backdrop-blur-xl border border-border p-2 pr-5 rounded-full shadow-2xl group active:scale-95 transition-all"
                    >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <BellRing size={18} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-text">
                            {lang === 'en' ? 'Call Service' : 'सेवा बोलाउनुहोस्'}
                        </span>
                    </button>
                </div>
            )}

            {/* Main Toggle / Status FAB */}
            <div className="relative">
                {/* Table Badge Overlay */}
                <div className="absolute -top-2 -left-2 z-10 bg-black text-[8px] font-black px-2 py-0.5 rounded-md border border-white/10 text-white uppercase tracking-tighter">
                    T-{tableNo || '??'}
                </div>

                <button
                    onClick={() => isUnknownTable ? null : setIsOpen(!isOpen)}
                    className={`h-16 w-16 rounded-full flex items-center justify-center shadow-glow transition-all active:scale-90 border-2 ${
                        isUnknownTable 
                        ? 'bg-card border-border text-text-muted' 
                        : isOpen ? 'bg-background border-primary text-primary rotate-0' : 'bg-primary border-primary/20 text-white'
                    }`}
                >
                    {isCalling ? (
                        <Loader2 size={24} className="animate-spin" />
                    ) : isOpen ? (
                        <X size={24} />
                    ) : isUnknownTable ? (
                        <Info size={24} />
                    ) : (
                        <div className="relative">
                           <UtensilsIcon size={24} />
                           {/* Pulse indicator for 'active session' */}
                           <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                           </span>
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};

// Simple custom icon or use UtensilsCrossed
const UtensilsIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
);

export default WaiterButton;