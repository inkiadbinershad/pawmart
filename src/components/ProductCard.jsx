import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  return (
    <motion.div
      className="card group relative"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-t-2xl">
          <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full text-gray-600 dark:text-gray-300 z-10">
            {product.category}
          </span>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <motion.button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 text-2xl z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full shadow-md"
        whileTap={{ scale: 0.8 }}
      >
        <FaHeart className={`${inWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`} />
      </motion.button>

      <div className="p-5">
        <h3 className="font-semibold text-lg mt-1 group-hover:text-warm-orange transition-colors">{product.name}</h3>
        <div className="flex items-center mt-2 justify-between">
          <span className="text-xl font-bold text-warm-orange">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
