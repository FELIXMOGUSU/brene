import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../hooks/useCart'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, setIsOpen } = useCart()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/order', label: 'Order Now' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-obsidian/95 backdrop-blur-md border-b border-graphite/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-headline text-2xl md:text-3xl text-pearl tracking-widest2 group-hover:text-taupe transition-colors duration-300">
              HOUSE OF
            </span>
            <span className="font-display italic text-sm md:text-base text-taupe tracking-widest -mt-1">
              Brené
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link font-sans text-xs tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === to ? 'text-taupe' : 'text-ash hover:text-pearl'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 text-ash hover:text-pearl transition-colors duration-300"
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="cart-badge rounded-none font-sans font-bold"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-pearl transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-4 h-px bg-pearl"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-px bg-pearl"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-obsidian flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map(({ to, label }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
              >
                <Link
                  to={to}
                  className="font-headline text-5xl text-pearl tracking-widest hover:text-taupe transition-colors duration-300"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 font-display italic text-ash text-sm tracking-widest"
            >
              Redefine Your Silhouette
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
