"use client"
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMenu } from '@/providers/MenuDataProvider';
import { BellRing, Loader2, Info } from 'lucide-react';

const WaiterButton = () => {
    const { lang } = useMenu();
    const searchParams = useSearchParams();
    const [isCalling, setIsCalling] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const tableNumber = searchParams.get('table');
    const isUnknownTable = !tableNumber || tableNumber === "Unknown";

    const handleCallWaiter = async () => {
        if (isCalling || isUnknownTable) return;
        setIsCalling(true);
        
        // Simulating the API call to your local Windows server
        await new Promise(resolve => setTimeout(resolve, 2500));
        setIsCalling(false);
    };

    if (!mounted) return null;

    return (
        <div className="fixed bottom-8 right-6 z-[100] flex flex-col items-end gap-3 animate-in slide-in-from-right-10 duration-700">
            
            {/* Table Badge - Glassmorphism style */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 text-white text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                <div className={`h-1.5 w-1.5 rounded-full ${isUnknownTable ? 'bg-danger' : 'bg-success animate-pulse'}`} />
                {lang === 'en' ? 'Table' : 'टेबल'} {tableNumber || '??'}
            </div>

            {/* Main Action Button */}
            <button
                onClick={handleCallWaiter}
                disabled={isCalling || isUnknownTable}
                className={`relative group flex items-center gap-4 pl-6 pr-5 py-4 rounded-[2rem] shadow-glow transition-all active:scale-90 overflow-hidden ${
                    isCalling || isUnknownTable 
                    ? 'bg-card border-border text-text-muted opacity-80 cursor-not-allowed' 
                    : 'bg-primary text-white border border-primary/20'
                }`}
            >
                {/* Visual Feedback for "Call Successful" or "Progress" */}
                {isCalling && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                )}

                <div className="flex flex-col items-start">
                    <span className="font-black text-[13px] uppercase tracking-tighter leading-none">
                        {isCalling 
                            ? (lang === 'en' ? 'Calling...' : 'बोलाउँदै...') 
                            : (lang === 'en' ? 'Call Waiter' : 'वेटर बोलाउनुहोस्')}
                    </span>
                    {!isCalling && (
                        <span className="text-[8px] font-bold opacity-60 uppercase tracking-widest mt-1">
                            {isUnknownTable ? 'Missing Table ID' : 'Direct Assistance'}
                        </span>
                    )}
                </div>

                <div className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all ${
                    isCalling ? 'bg-transparent' : 'bg-black/10 group-hover:bg-black/20'
                }`}>
                    {isCalling ? (
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