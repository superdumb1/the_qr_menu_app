"use client"
import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ItemsGridView from '@/components/client/ItemsGridView';
import CategoryGridView from '@/components/client/CategoryGridView';
import ItemPage from '@/components/client/ItemPage';
import { useMenu } from '@/providers/MenuDataProvider';
// 1. Import your hook

function MenuContent() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  
  // 2. Grab data and states from your context
  const { allCategories, isLoading, error } = useMenu();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedCategoryId = searchParams.get('cat');
  const selectedItemId = searchParams.get('item');

  // 3. Filter and Sort from the live API data
  const sortedCategories = useMemo(() => {
    return [...allCategories]
      .filter(cat => cat.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allCategories]);

  const selectedCategory = sortedCategories.find(
    (cat) => cat.id.toString() === selectedCategoryId
  );

  // Hydration safety
  if (!mounted) return <div className="min-h-screen bg-bg" />;

  // 4. Handle API Loading and Error States
  if (isLoading) return <div className="text-text-muted p-10 text-center uppercase text-[10px] tracking-widest">Loading Menu...</div>;
  if (error) return <div className="text-red-500 p-10 text-center uppercase text-[10px] tracking-widest">Error: {error}</div>;

  // 5. Navigation Logic
  if (selectedItemId) return <ItemPage itemId={selectedItemId}/>;
  
  if (selectedCategory) {
    return <ItemsGridView selectedCategory={selectedCategory}/>;
  }

  return <CategoryGridView sortedCategories={sortedCategories}/>;
}

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-bg text-text p-4 pb-40 transition-colors duration-300">
      <div className="max-w-md mx-auto">
        {/* Note: MenuContent now uses Context, so ensure this Page is wrapped in <MenuDataProvider> in your layout */}
        <Suspense fallback={<div className="text-text-muted p-10 text-center uppercase text-[10px] tracking-widest">Initial Load...</div>}>
          <MenuContent />
        </Suspense>
      </div>
    </main>
  );
}