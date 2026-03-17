import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory)
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'new') list.sort((a, b) => (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0))
    return list
  }, [activeCategory, sort, search])

  return (
    <div className="bg-obsidian min-h-screen pt-20">

      {/* Page header */}
      <section className="py-16 px-6 lg:px-12 border-b border-graphite/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="ornament-line mb-6 max-w-xs">The Collection</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-headline text-6xl md:text-8xl text-pearl tracking-widest leading-none">SHOP</h1>
                <p className="font-display italic text-taupe text-xl mt-2">
                  {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
                </p>
              </div>
              {/* Search */}
              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  placeholder="Search pieces..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="form-input border-b border-graphite pr-8"
                />
                <svg className="absolute right-0 bottom-3.5 text-ash" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters row */}
      <section className="sticky top-16 md:top-20 z-30 bg-obsidian/95 backdrop-blur-md border-b border-graphite/40 py-4 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Categories */}
          <div className="flex gap-1 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans text-xs px-5 py-2 uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-mocha text-cream'
                    : 'text-ash hover:text-pearl border border-transparent hover:border-graphite'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="bg-transparent border border-graphite text-ash font-sans text-xs px-4 py-2 focus:outline-none focus:border-taupe"
          >
            <option value="default">Sort: Featured</option>
            <option value="new">Sort: Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <p className="font-display italic text-ash text-2xl">No pieces found.</p>
                <button onClick={() => { setSearch(''); setActiveCategory('all') }} className="btn-outline mt-6 inline-block">
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + sort}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product}/>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  )
}
