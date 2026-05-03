"use client"
import React, { useState, useEffect } from 'react';
import { useMenu } from '@/providers/MenuDataProvider';
import { BellRing, Loader2, Info, ReceiptText } from 'lucide-react';

const WaiterButton = () => {
    const { lang, tableNo } = useMenu(); 
    // tracks which specific action is currently in flight
    const [isCalling, setIsCalling] = useState<'WAITER' | 'BILL' | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // If tableNo is missing, we disable all functionality
    const isUnknownTable = !tableNo || tableNo === "Unknown" || tableNo === "??";

    const triggerAction = async (type: 'WAITER' | 'BILL') => {
        if (isCalling || isUnknownTable) return;
        setIsCalling(type);
        
        try {
            // hitting your dummy API proxy
            await fetch('/api/waiter/call', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tableNo, type })
            });
        } catch (err) {
            console.error("API Error:", err);
        } finally {
            // reset state after delay/response
            setIsCalling(null);
        }
    };

    if (!mounted) return null;

    return (
        <div className="fixed bottom-8 right-6 z-[100] flex flex-col items-end gap-3 animate-in slide-in-from-right-10 duration-700">
            
            {/* Secondary Action: Bill Request */}
            {!isUnknownTable && (
                <button 
                    onClick={() => triggerAction('BILL')}
                    disabled={!!isCalling}
                    className="group bg-surface/80 backdrop-blur-md border border-border px-5 py-3 rounded-2xl text-text-muted hover:text-success hover:border-success/30 transition-all shadow-lg flex items-center gap-3 active:scale-95"
                >
                    {isCalling === 'BILL' ? (
                        <Loader2 size={18} className="animate-spin text-success" />
                    ) : (
                        <ReceiptText size={18} className="group-hover:scale-110 transition-transform" />
                    )}
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        {isCalling === 'BILL' ? 'Processing...' : (lang === 'en' ? 'Get Bill' : 'बिल माग्नुहोस्')}
                    </span>
                </button>
            )}

            {/* Table Identification Badge */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 text-white text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                <div className={`h-1.5 w-1.5 rounded-full ${isUnknownTable ? 'bg-danger' : 'bg-success animate-pulse'}`} />
                {lang === 'en' ? 'Table' : 'टेबल'} {tableNo || '??'}
            </div>

            {/* Primary Action: Call Waiter */}
            <button
                onClick={() => triggerAction('WAITER')}
                disabled={!!isCalling || isUnknownTable}
                className={`relative group flex items-center gap-4 pl-6 pr-5 py-4 rounded-[2rem] shadow-glow transition-all active:scale-95 overflow-hidden ${
                    isCalling || isUnknownTable 
                    ? 'bg-card border-border text-text-muted opacity-80 cursor-not-allowed' 
                    : 'bg-primary text-white border border-primary/20'
                }`}
            >
                {isCalling === 'WAITER' && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                )}

                <div className="flex flex-col items-start">
                    <span className="font-black text-[13px] uppercase tracking-tighter leading-none">
                        {isCalling === 'WAITER' 
                            ? (lang === 'en' ? 'Calling...' : 'बोलाउँदै...') 
                            : (lang === 'en' ? 'Call Waiter' : 'वेटर बोलाउनुहोस्')}
                    </span>
                    <span className="text-[8px] font-bold opacity-60 uppercase tracking-widest mt-1">
                        {isUnknownTable ? 'Scan QR to start' : 'Direct Assistance'}
                    </span>
                </div>

                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all ${
                    isCalling === 'WAITER' ? 'bg-transparent' : 'bg-black/10 group-hover:bg-black/20'
                }`}>
                    {isCalling === 'WAITER' ? (
                        <Loader2 size={20} className="animate-spin text-white" />
                    ) : (
                        isUnknownTable ? <Info size={18} /> : <BellRing size={20} className="group-hover:rotate-12 transition-transform" />
                    )}
                </div>
            </button>
        </div>
    );
};

export default WaiterButton;