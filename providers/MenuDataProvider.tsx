"use client"
import React, { createContext, useContext, useState, useMemo } from 'react'
import { newJson } from '@/lib/NewJson'

export const MenuContext = createContext<any>(null)

const MenuDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [lang, setLang] = useState<'en' | 'ne'>('en');

    // 1. Get the actual list of categories from your JSON structure
    const allCategories = useMemo(() => {
        return newJson[0]?.data || [];
    }, []);

    // 2. Flatten all menu items into a single array for fuzzy search
    const allItems = useMemo(() => {
        const items: any[] = [];
        allCategories.forEach((cat: any) => {
            cat.menuItems?.forEach((item: any) => {
                items.push({
                    ...item,
                    categoryName: cat.name, // Keep track of category for the search UI
                    categoryId: cat.id
                });
            });
        });
        return items;
    }, [allCategories]);

    // 3. Search Logic
    const filteredItems = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return [];

        return allItems.filter(item => {
            const itemName = item.itemName.toLowerCase();
            
            // Simple match
            if (itemName.includes(query)) return true;

            // Fuzzy logic (e.g., 'grn sld' matches 'Green Salad')
            let i = 0; let j = 0;
            while (i < query.length && j < itemName.length) {
                if (query[i] === itemName[j]) i++;
                j++;
            }
            return i === query.length;
        }).slice(0, 15); // Limit results for mobile performance
    }, [searchQuery, allItems]);

    const toggleLang = () => {
        setLang((prev) => (prev === 'en' ? 'ne' : 'en'));
    };

    const contextValue = useMemo(() => ({
        newJson,
        allCategories, // Useful for the main menu page
        filteredItems, // Used by your SearchResults component
        searchQuery,
        setSearchQuery,
        lang,
        toggleLang
    }), [searchQuery, filteredItems, lang]);

    return (
        <MenuContext.Provider value={contextValue}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuDataProvider;

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) throw new Error("useMenu must be used within a MenuDataProvider");
    return context;
}