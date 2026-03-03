import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  MdPets, 
  MdOutlineFoodBank, 
  MdSportsEsports, 
  MdCardGiftcard,
  MdWaterDrop,
  MdFlutterDash 
} from 'react-icons/md';

const categories = [
  { name: 'Dogs', icon: MdPets, image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200', link: '/shop?category=Dogs' },
  { name: 'Cats', icon: MdPets, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200', link: '/shop?category=Cats' },
  { name: 'Birds', icon: MdFlutterDash, image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=200', link: '/shop?category=Birds' },
  { name: 'Fish', icon: MdWaterDrop, image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=200', link: '/shop?category=Fish' },
  { name: 'Accessories', icon: MdCardGiftcard, image: 'https://media.istockphoto.com/id/1408464111/vector/equestrian-sport-accessories-cartoon-illustration-set.jpg?s=1024x1024&w=is&k=20&c=4K0E-0tnbOlfAOIom1uMeE2JZHxxPPjUpZR07VIcijo=', link: '/shop?category=Accessories' },
  { name: 'Food', icon: MdOutlineFoodBank, image: 'https://media.istockphoto.com/id/1361708626/photo/various-types-of-dry-food-for-dog-on-table-top.jpg?s=612x612&w=0&k=20&c=SRi2ctbV6H0YtlNmwjnLxPC6Z9Z6MT6P1r9eJPlN70o=', link: '/shop?category=Food' },
  { name: 'Toys', icon: MdSportsEsports, image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=200', link: '/shop?category=Toys' },
]

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link to="/shop" className="hover:text-warm-orange transition-colors font-medium">
        Shop
      </Link>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 z-50"
          >
            <div className="grid grid-cols-4 gap-4">
              {categories.map((cat, index) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    to={cat.link}
                    className="block group"
                  >
                    <div className="relative overflow-hidden rounded-xl mb-3">
                      <img 
                        src={cat.image} 
                        alt={cat.name}
                        className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 group-hover:text-warm-orange transition-colors">
                      <cat.icon className="text-sm" />
                      <span className="font-medium text-sm">{cat.name}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
              <Link to="/shop" className="text-sm text-warm-orange hover:underline font-medium">
                View All Products →
              </Link>
              <div className="text-xs text-gray-500">
                Free shipping on orders over $50
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
