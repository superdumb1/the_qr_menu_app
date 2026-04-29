import Link from 'next/link';
import React from 'react';

const Home = () => {
  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      
      {/* Client Logo */}
      <div className="w-24 h-24 bg-orange-500 rounded-full mb-8 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
        K
      </div>
      
      <h1 className="text-2xl font-bold mb-8 text-slate-800 text-center">
        Welcome to Kalpa <br/> 
        <span className="text-sm font-normal text-slate-500 mt-2 block">
          Please select your language
        </span>
      </h1>
      
      {/* The 1-Click Action Links */}
      <div className="flex flex-col w-full max-w-xs gap-4 text-center">
         <Link 
            href="/logo?lang=en" // Formatted as a proper query parameter
            className="w-full py-4 text-center inline-block bg-white border-2 border-slate-200 rounded-xl font-bold text-lg text-slate-700 shadow-sm active:scale-95 transition-transform"
         >
            English
         </Link>
         
         <Link 
            href="/logo?lang=ne" // Formatted as a proper query parameter
            className="w-full py-4 text-center inline-block bg-white border-2 border-slate-200 rounded-xl font-bold text-lg text-slate-700 shadow-sm active:scale-95 transition-transform"
         >
            नेपाली
         </Link>
      </div>
    </div>
  );
}

export default Home;