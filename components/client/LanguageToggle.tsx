'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useMenu } from '@/providers/MenuDataProvider';

const LanguageToggle: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Use toggleLang instead of setLang to avoid the TypeError
  const { lang, toggleLang } = useMenu();

  const isNepali = lang === 'ne';

  const handleToggle = () => {
    // 1. Update the Context State immediately
    toggleLang();

    // 2. Sync the URL for deep linking
    const params = new URLSearchParams(searchParams.toString());
    const newLang = isNepali ? 'en' : 'ne';
    
    params.set('lang', newLang);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleToggle();
      }}
      className="ml-auto flex items-center h-8 p-0.5 rounded-full bg-slate-200 shadow-inner transition-colors duration-300 shrink-0"
    >
      {/* English Option */}
      <div 
        className={`h-full flex items-center justify-center px-3 text-[8px] font-bold rounded-full transition-all duration-300 ${
          !isNepali 
            ? "bg-white text-slate-800 shadow-sm" 
            : "text-slate-500 hover:text-slate-700" 
        }`}
      >
        ENG
      </div>

      {/* Nepali Option */}
      <div 
        className={`h-full flex items-center justify-center px-3 text-[8px] font-bold rounded-full transition-all duration-300 ${
          isNepali 
            ? "bg-white text-slate-800 shadow-sm" 
            : "text-slate-500 hover:text-slate-700" 
        }`}
      >
        नेपाली
      </div>
    </button>
  );
};

export default LanguageToggle;