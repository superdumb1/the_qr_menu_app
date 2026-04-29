import React from 'react'

const CatagoryChips = ({ CATEGORIES, setActiveCategory, activeCategory }: any) => {
    return (
        <div className="flex flex-wrap gap-2 flex-autofit">             {
            CATEGORIES.map((cat: string) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace px-4 py-1.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                        ? 'bg-slate-800 text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    {cat}
                </button>
            ))
        }
        </div >
    )
}

export default CatagoryChips