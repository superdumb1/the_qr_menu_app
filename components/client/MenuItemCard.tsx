"use client"
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  description?: string;
  isAvailable: boolean;
  imageSrc?: string;
}

export const MenuItemCard = ({ id, name, price, description, isAvailable, imageSrc }: MenuItemProps) => {
  const fallbackLocalImage = "/images/placeholder-food.jpg";
  const searchParams = useSearchParams();

  // DEVELOPER LOGIC: Preserve everything (Table ID, etc.) EXCEPT the category
  const backHref = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    // Remove the item (in case we are coming back from a deep link)
    params.delete('item');

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '/';
  }, [searchParams]);

  const finalSrc = imageSrc?.startsWith('http') ? imageSrc : `/${imageSrc}`;

  return (
    /* CHANGED: aspect-[1/1] -> aspect-[4/5] for a taller, premium look */
    <div className={`relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-card transition-all duration-500 shadow-xl ${!isAvailable ? 'opacity-60' : 'active:scale-95 group'}`}>
      <Link
        href={`${backHref}&item=${id}`}
        className="block h-full w-full"
      >
        {/* Background Image */}
        <img
          src={imageSrc ? finalSrc : fallbackLocalImage}
          alt={name}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${isAvailable ? 'group-hover:scale-110' : 'grayscale'}`}
          loading="lazy"
          onError={(e: any) => { e.target.src = fallbackLocalImage; }}
        />

        {/* Modern Gradient Overlay - Darker at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 z-20">

          {/* Text Area */}
          <div className="mb-3 px-1">
            <h3 className="text-[15px] font-black uppercase leading-[1.1] text-white drop-shadow-lg line-clamp-2 italic tracking-tight">
              {name}
            </h3>
          </div>

          {/* Price & Status Glass Label */}
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 shadow-2xl">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-primary uppercase tracking-tighter leading-none mb-0.5">
                NPR
              </span>
              <span className="text-[16px] font-black text-white leading-none tracking-tight">
                {price}
              </span>
            </div>

            {!isAvailable ? (
              <div className="bg-red-500/20 border border-red-500/40 px-2 py-1 rounded-lg">
                <span className="text-red-500 text-[8px] font-black uppercase tracking-widest">
                  Out
                </span>
              </div>
            ) : (
              <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Premium Inner 3D Light Effect */}
        <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[2rem] z-30" />
      </Link>
    </div>
  );
}