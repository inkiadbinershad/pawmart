import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { FaArrowRight, FaPaw, FaShieldAlt, FaShippingFast, FaHeart } from 'react-icons/fa'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const categories = [
  { name: 'Dogs', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', count: 45 },
  { name: 'Cats', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400', count: 38 },
  { name: 'Birds', image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400', count: 24 },
  { name: 'Fish', image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400', count: 52 },
]

const features = [
  { icon: FaShippingFast, title: 'Free Shipping', desc: 'On orders over $50' },
  { icon: FaShieldAlt, title: 'Secure Payment', desc: '100% secure checkout' },
  { icon: FaHeart, title: 'Pet First', desc: 'Loved by 10k+ pets' },
]

export default function Home() {
  const featured = products.slice(0, 8)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-cream to-beige dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-8 pb-20">
        {/* Blob Backgrounds */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FaPaw className="text-warm-orange" />
                <span className="text-sm font-medium">Premium Pet Products</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Everything Your Pet{' '}
                <span className="text-warm-orange relative">
                  Needs & Loves
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" preserveAspectRatio="none">
                    <path d="M0,8 Q50,0 100,8 T200,8" stroke="#ff8c00" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Discover premium products for dogs, cats, birds, fish and more. 
                Quality items your pet will absolutely love.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/shop">
                  <motion.button 
                    className="button text-lg px-10 py-4 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Shop Now
                    <FaArrowRight className="inline ml-2" />
                  </motion.button>
                </Link>
                <Link to="/shop?category=Food">
                  <motion.button 
                    className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-10 py-4 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Food
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Images */}
            <div className="flex-1 relative">
              <motion.div 
                className="relative w-full max-w-lg mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Main Image */}
                <motion.div 
                  className="relative z-10"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600" 
                    alt="Happy Dog"
                    className="w-full h-80 object-cover rounded-3xl shadow-2xl"
                  />
                </motion.div>
                
                {/* Floating Image */}
                <motion.div 
                  className="absolute -bottom-10 -left-10 z-20 hidden md:block"
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300" 
                    alt="Cute Cat"
                    className="w-48 h-48 object-cover rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800"
                  />
                </motion.div>

                {/* Floating Badge */}
                <motion.div 
                  className="absolute -top-5 -right-5 z-30 hidden md:block"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                    <div className="text-3xl font-bold text-warm-orange">50K+</div>
                    <div className="text-sm text-gray-500">Happy Pets</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white dark:bg-gray-800 shadow-lg -mt-10 relative z-20 mx-4 rounded-2xl">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                  <feature.icon className="text-warm-orange text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-cream dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-400">Find exactly what your pet needs</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {categories.map((cat) => (
              <motion.div key={cat.name} variants={item}>
                <Link to={`/shop?category=${cat.name}`}>
                  <motion.div 
                    className="group relative overflow-hidden rounded-2xl"
                    whileHover={{ y: -8 }}
                  >
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{cat.name}</h3>
                      <p className="text-sm opacity-80">{cat.count} Products</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Top picks for your furry friends</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {featured.map(product => (
              <motion.div key={product.id} variants={item}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/shop">
              <motion.button 
                className="bg-white dark:bg-gray-700 text-warm-orange border-2 border-warm-orange px-8 py-3 rounded-xl font-medium hover:bg-warm-orange hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Products
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-400 to-amber-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Spoil Your Pet?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of happy pet parents who trust PawMart for their pet's needs.
            </p>
            <Link to="/shop">
              <motion.button 
                className="bg-white text-warm-orange px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
