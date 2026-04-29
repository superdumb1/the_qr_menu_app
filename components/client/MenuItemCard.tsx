"use client"
import React from 'react';

interface MenuItemProps {
  name: string;
  price: number;
  description?: string;
  isAvailable: boolean;
  imageSrc?: string;
}

export const MenuItemCard = ({ name, price, description, isAvailable, imageSrc }: MenuItemProps) => {
  const fallbackLocalImage = "/images/placeholder-food.jpg"; 

  // Check if imageSrc is a URL or a local path
  const finalSrc = imageSrc?.startsWith('http') ? imageSrc : `/${imageSrc}`;

  return (
    <div className={`relative aspect-[1/1] w-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-card transition-all duration-500 shadow-xl ${!isAvailable ? 'opacity-60' : 'active:scale-95 group'}`}>
      
      {/* Background Image */}
      <img 
        src={imageSrc ? finalSrc : fallbackLocalImage} 
        alt={name}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${isAvailable ? 'group-hover:scale-110' : 'grayscale'}`}
        loading="lazy"
        onError={(e: any) => { e.target.src = fallbackLocalImage; }}
      />

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
        
        {/* Text Area */}
        <div className="mb-2">
          <h3 className="text-[14px] font-black uppercase leading-tight text-white drop-shadow-lg line-clamp-2 italic tracking-tight">
            {name}
          </h3>
        </div>

        {/* Price & Status Glass Label */}
        <div className="flex items-center justify-between bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-2 px-3 shadow-2xl">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-primary uppercase tracking-tighter leading-none mb-0.5">
              NPR
            </span>
            <span className="text-[15px] font-black text-white leading-none">
              {price}
            </span>
          </div>
          
          {!isAvailable ? (
            <div className="bg-red-500/20 border border-red-500/40 px-2 py-1 rounded-lg">
                <span className="text-red-500 text-[8px] font-black uppercase tracking-widest">
                    Sold Out
                </span>
            </div>
          ) : (
            <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                 <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Premium Inner 3D Light Effect */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[2.2rem] z-30" />
    </div>
  );
};