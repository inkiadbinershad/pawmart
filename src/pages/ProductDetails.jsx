import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { FaArrowLeft, FaShoppingCart, FaHeart, FaStar, FaCheck } from 'react-icons/fa'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Product not found</h2>
        <Link to="/shop" className="button">Back to Shop</Link>
      </div>
    )
  }

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/shop" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-warm-orange transition-colors">
            <FaArrowLeft /> Back to Shop
          </Link>
        </motion.div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="relative mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-cover rounded-3xl shadow-xl"
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail Gallery (simulated with same image) */}
            <div className="flex gap-3">
              {[product.image, product.image, product.image].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-warm-orange' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-warm-orange px-4 py-1 rounded-full text-sm font-medium mb-4">
              {product.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-gray-500">({product.rating} rating)</span>
            </div>

            <p className="text-4xl font-bold text-warm-orange mb-6">${product.price.toFixed(2)}</p>

            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 mb-8">
              {['Free Shipping', 'Easy Returns', 'Secure Checkout'].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <FaCheck className="text-green-500" /> {benefit}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-lg ${
                  isAdded 
                    ? 'bg-green-500 text-white' 
                    : 'bg-warm-orange text-white hover:bg-orange-600'
                } transition-colors`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAdded ? (
                  <>
                    <FaCheck /> Added to Cart
                  </>
                ) : (
                  <>
                    <FaShoppingCart /> Add to Cart
                  </>
                )}
              </motion.button>

              <button className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-warm-orange hover:text-warm-orange transition-colors">
                <FaHeart className="text-xl" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
