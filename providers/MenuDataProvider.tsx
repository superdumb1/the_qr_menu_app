"use client"

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { newJson } from '@/lib/NewJson'
import Fuse from 'fuse.js'

export const MenuContext = createContext<any>(null)

const normalize = (str: string = '') =>
    str.toLowerCase().trim().replace(/\s+/g, ' ')

const MenuDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const [searchQuery, setSearchQuery] = useState('')
    const [lang, setLang] = useState<'en' | 'ne'>('en')

    // --- Table Number Logic ---
    // Get table from URL (e.g., ?table=12)
    const tableNo = searchParams.get('table')

    // Function to update table number in URL without a full page reload
    const setTableNo = (num: string | number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('table', num.toString())
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    // 1. Categories
    const allCategories = useMemo(() => {
        return newJson[0]?.data || []
    }, [])

    // 2. Flatten items + precompute normalized fields
    const allItems = useMemo(() => {
        const items: any[] = []
        allCategories.forEach((cat: any) => {
            cat.menuItems?.forEach((item: any) => {
                items.push({
                    ...item,
                    categoryName: cat.name,
                    categoryId: cat.id,
                    _name: normalize(item.itemName),
                    _category: normalize(cat.name),
                    _nameNe: normalize(item.itemNameNe || '')
                })
            })
        })
        return items
    }, [allCategories])

    // 3. Fuse instance
    const fuse = useMemo(() => {
        return new Fuse(allItems, {
            keys: [
                { name: '_name', weight: 0.6 },
                { name: '_nameNe', weight: 0.25 },
                { name: '_category', weight: 0.15 }
            ],
            threshold: 0.3,
            minMatchCharLength: 2,
            includeScore: true,
            shouldSort: true
        })
    }, [allItems])

    // 4. Search logic
    const filteredItems = useMemo(() => {
        const queryRaw = searchQuery.trim()
        if (!queryRaw) return []
        const query = normalize(queryRaw)
        const results = fuse.search(query)

        return results
            .sort((a, b) => {
                const aName = a.item._name
                const bName = b.item._name
                const aExact = aName === query
                const bExact = bName === query
                if (aExact) return -1
                if (bExact) return 1
                const aStarts = aName.startsWith(query)
                const bStarts = bName.startsWith(query)
                if (aStarts && !bStarts) return -1
                if (bStarts && !aStarts) return 1
                return (a.score ?? 1) - (b.score ?? 1)
            })
            .slice(0, 15)
            .map(res => res.item)
    }, [searchQuery, fuse])

    const toggleLang = () => setLang(prev => (prev === 'en' ? 'ne' : 'en'))

    // 5. Context value (Now includes tableNo)
    const contextValue = useMemo(() => ({
        newJson,
        allCategories,
        filteredItems,
        searchQuery,
        setSearchQuery,
        lang,
        toggleLang,
        tableNo,    // The current table number from URL
        setTableNo  // Function to change it
    }), [searchQuery, filteredItems, lang, allCategories, tableNo])

    return (
        <MenuContext.Provider value={contextValue}>
            {children}
        </MenuContext.Provider>
    )
}

export default MenuDataProvider

export const useMenu = () => {
    const context = useContext(MenuContext)
    if (!context) throw new Error("useMenu must be used within a MenuDataProvider")
    return context
}