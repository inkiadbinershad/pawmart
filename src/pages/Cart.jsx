import { useCart } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaTrash, FaArrowLeft, FaShoppingBag, FaPlus, FaMinus } from 'react-icons/fa'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to find something your pet will love!
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 button text-lg px-10 py-4"
            >
              <FaShoppingBag /> Start Shopping
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
          <Link to="/shop" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-warm-orange transition-colors mb-4">
            <FaArrowLeft /> Continue Shopping
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
          <p className="text-gray-600 dark:text-gray-400">{cart.length} item{cart.length !== 1 && 's'} in your cart</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-4"
                >
                  <Link to={`/product/${item.id}`}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-cover rounded-xl hover:opacity-80 transition-opacity"
                    />
                  </Link>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${item.id}`} className="font-semibold text-lg hover:text-warm-orange transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-4 py-2 text-lg hover:text-warm-orange transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </button>
                        <span className="px-6 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-4 py-2 text-lg hover:text-warm-orange transition-colors"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <span className="text-xl font-bold text-warm-orange">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-green-500 font-medium">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-warm-orange">${total.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                className="w-full button py-4 text-lg font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
              </motion.button>

              <p className="text-center text-sm text-gray-500 mt-4">
                🔒 Secure checkout powered by PawMart
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
