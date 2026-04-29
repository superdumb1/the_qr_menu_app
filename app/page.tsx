"use client"
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { newJson } from '@/lib/NewJson';
import { ChevronLeft } from 'lucide-react';
import { MenuItemCard } from '@/components/client/MenuItemCard';
import ItemsGridView from '@/components/client/ItemsGridView';
import CategoryGridView from '@/components/client/CategoryGridView';

function MenuContent() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  
  // Hydration fix: Only flag as mounted once on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedCategoryId = searchParams.get('cat');
  const rawCategories = newJson[0]?.data || [];

  const sortedCategories = [...rawCategories]
    .filter(cat => cat.isActive)
    .sort((a, b) => a.name.localeCompare(b.name));

  const selectedCategory = sortedCategories.find(
    (cat) => cat.id.toString() === selectedCategoryId
  );

  const getGradient = (id: number) => {
    const gradients = [
      'from-orange-600 to-amber-500',
      'from-blue-600 to-cyan-500',
      'from-emerald-600 to-teal-500',
      'from-purple-600 to-fuchsia-500',
      'from-rose-600 to-pink-500',
      'from-indigo-600 to-violet-500'
    ];
    return gradients[id % gradients.length];
  };

  // Return a skeleton or null during hydration to prevent mismatch
  if (!mounted) return <div className="min-h-screen bg-black" />;

  // --- RENDERING ITEMS ---
  if (selectedCategory) {
    return (
      <ItemsGridView selectedCategory={selectedCategory}/>
    );
  }

  // --- RENDERING CATEGORIES ---
  return (
  <CategoryGridView sortedCategories={sortedCategories}/>
  );
}

// Wrapper with Suspense is required for useSearchParams()
export default function MenuPage() {
  return (
    <main className="min-h-screen bg-black text-white p-4 pb-40">
      <div className="max-w-md mx-auto">
        <Suspense fallback={<div className="text-gray-500 p-10 text-center">Loading Menu...</div>}>
          <MenuContent />
        </Suspense>
      </div>
    </main>
  );
}