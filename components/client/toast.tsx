"use client";

import React, { useEffect } from "react";

type ToastProps = {
    type: "WAITER" | "BILL" | null;
    onClose: () => void;
};

const Toast = ({ type, onClose }: ToastProps) => {
    useEffect(() => {
        if (!type) return;

        const timer = setTimeout(() => {
            onClose();
        }, 3200);

        return () => clearTimeout(timer);
    }, [type, onClose]);

    if (!type) return null;

    const config = {
        WAITER: {
            title: "Waiter Called",
            icon: "🍽️",
        },
        BILL: {
            title: "Bill Requested",
            icon: "💳",
        },
    };

    const current = config[type];

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-full flex justify-center px-4">
            <div className="
                relative overflow-hidden
                bg-card/80 backdrop-blur-2xl
                border border-border
                rounded-2xl
                px-5 py-4
                flex items-center gap-4
                shadow-2xl shadow-orange-glow
                animate-in fade-in slide-in-from-bottom-6 duration-500
                max-w-md w-full
            ">

                {/* shimmer */}
                <div className="absolute inset-0 animate-shimmer pointer-events-none" />

                {/* icon */}
                <div className="h-12 w-12 rounded-xl bg-surface flex items-center justify-center text-2xl border border-border">
                    {current.icon}
                </div>

                {/* text */}
                <div className="flex flex-col">
                    <p className="text-xs uppercase tracking-widest text-text-muted">
                        Request Received
                    </p>
                    <p className="text-sm font-bold text-text">
                        {current.title}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                        A staff member will arrive shortly at your table.
                    </p>
                </div>

                {/* pulse */}
                <div className="ml-auto flex items-center">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-60"></span>
                        <span className="relative h-3 w-3 rounded-full bg-primary"></span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Toast;