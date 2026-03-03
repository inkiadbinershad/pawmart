import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa'

export default function Shop() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [sortBy, setSortBy] = useState('featured')

  // Read category from URL query parameter on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.includes(categoryParam)) {
      setCategory(categoryParam)
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'All' || p.category === category
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      return matchSearch && matchCategory && matchPrice
    })

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return result
  }, [search, category, priceRange, sortBy])

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop</h1>
          <p className="text-gray-600 dark:text-gray-400">Browse our collection of premium pet products</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-warm-orange focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaFilter className="text-warm-orange" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                        category === cat
                          ? 'bg-warm-orange text-white font-medium'
                          : 'hover:bg-orange-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, Number(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-warm-orange"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>$0</span>
                    <span className="font-medium text-warm-orange">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaSortAmountDown className="text-warm-orange" />
                  Sort By
                </h3>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-warm-orange"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <motion.div 
              className="mb-6 flex justify-between items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-600 dark:text-gray-400">
                Showing <span className="font-semibold">{filtered.length}</span> products
              </p>
            </motion.div>

            {/* Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
            >
              {filtered.map(product => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
