import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import { useTheme } from './context/ThemeContext'

function App() {
  const location = useLocation()
  const { darkMode } = useTheme()

  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      setShowNavbar(current < lastScrollY || current < 100)
      setLastScrollY(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-cream dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: showNavbar ? 0 : -100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
        >
          <Navbar />
        </motion.nav>

        <div className="pt-20">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route index element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default App