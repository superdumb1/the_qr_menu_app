"use client"

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
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
    
    // API States
    const [allCategories, setAllCategories] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // --- Table Number Logic ---
    const tableNo = searchParams.get('table')

    const setTableNo = (num: string | number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('table', num.toString())
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
    
    // --- Fetch Data from Dummy API ---
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('/api/food')
                if (!response.ok) throw new Error('Failed to fetch menu')
                const data = await response.json()
                setAllCategories(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMenu()
    }, [])

    // 2. Flatten items + precompute normalized fields
    // This now depends on the dynamic 'allCategories' state
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


    // 5. Context value
    const contextValue = useMemo(() => ({
        allCategories,
        filteredItems,
        searchQuery,
        setSearchQuery,
        lang,
        tableNo,
        setTableNo,
        isLoading, 
        error
    }), [searchQuery, filteredItems, lang, allCategories, tableNo, isLoading, error])

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