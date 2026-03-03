import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHeart, FaShoppingBag } from 'react-icons/fa'

export default function Wishlist() {
  const { wishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-cream dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-8xl mb-6">
              <FaHeart className="mx-auto text-gray-300" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Save items you love by clicking the heart icon on any product. 
              They'll appear here for easy access!
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 button text-lg px-10 py-4"
            >
              <FaShoppingBag /> Browse Products
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {wishlist.length} item{wishlist.length !== 1 && 's'} saved
          </p>
        </motion.div>

        {/* Wishlist Items */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {wishlist.map(product => (
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

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/shop" className="text-warm-orange hover:underline">
            Continue Shopping →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
