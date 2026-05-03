"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { newJson } from '@/lib/NewJson';
import ItemsGridView from '@/components/client/ItemsGridView';
import CategoryGridView from '@/components/client/CategoryGridView';
import ItemPage from '@/components/client/ItemPage';

function MenuContent() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedCategoryId = searchParams.get('cat');
  const rawCategories = newJson[0]?.data || [];
  const selectedItemId=searchParams.get('item')

  const sortedCategories = [...rawCategories]
    .filter(cat => cat.isActive)
    .sort((a, b) => a.name.localeCompare(b.name));

  const selectedCategory = sortedCategories.find(
    (cat) => cat.id.toString() === selectedCategoryId
  );

  // Hydration safety
  if (!mounted) return <div className="min-h-screen bg-bg" />;

  if(selectedItemId) return <ItemPage itemId={selectedItemId}/>
  if (selectedCategory) {
    return <ItemsGridView selectedCategory={selectedCategory}/>;
  }

  return <CategoryGridView sortedCategories={sortedCategories}/>;
}

export default function MenuPage() {
  return (
    /* Changed bg-black to bg-bg and text-white to text-text */
    <main className="min-h-screen bg-bg text-text p-4 pb-40 transition-colors duration-300">
      <div className="max-w-md mx-auto">
        <Suspense fallback={<div className="text-text-muted p-10 text-center uppercase text-[10px] tracking-widest">Loading Menu...</div>}>
          <MenuContent />
        </Suspense>
      </div>
    </main>
  );
}