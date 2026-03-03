import { Link } from 'react-router-dom'
import { FaSun, FaMoon, FaHeart, FaShoppingCart, FaPaw } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import MegaMenu from './MegaMenu'

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme()
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()

  return (
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-warm-orange flex items-center gap-2">
        <FaPaw className="text-3xl" />
        PawMart
      </Link>

      <div className="flex items-center gap-8">
        <MegaMenu />

        <button onClick={toggleDarkMode} className="text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
        </button>

        <Link to="/wishlist" className="relative text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <FaHeart />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-warm-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {wishlist.length}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-warm-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  )
}
