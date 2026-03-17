import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../hooks/useCart'
import { Link } from 'react-router-dom'

export default function CartSidebar() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-obsidian/70 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-charcoal z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-graphite">
              <div>
                <h2 className="font-headline text-2xl text-pearl tracking-widest">YOUR BAG</h2>
                <p className="font-sans text-xs text-ash mt-1">{count} {count === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-ash hover:text-pearl transition-colors p-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-16 h-16 border border-graphite flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" strokeWidth="1">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </div>
                  <p className="font-display italic text-ash text-lg">Your bag is empty</p>
                  <button onClick={() => setIsOpen(false)} className="btn-outline text-xs">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 pb-6 border-b border-graphite/50"
                  >
                    {/* Mini product visual */}
                    <div className="w-20 h-24 bg-graphite flex items-center justify-center flex-shrink-0">
                      <span className="font-display italic text-taupe text-xs text-center px-1">
                        {item.name.split(' ').slice(-1)[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans text-xs text-pearl uppercase tracking-wide leading-tight">{item.name}</h3>
                      <p className="font-sans text-xs text-ash mt-1">{item.size} · {item.color}</p>
                      <p className="font-display text-taupe text-sm mt-1">KES {item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-graphite">
                          <button onClick={() => updateQty(item.key, item.qty - 1)} className="px-2 py-1 text-ash hover:text-pearl text-sm">−</button>
                          <span className="px-3 py-1 font-sans text-xs text-pearl border-x border-graphite">{item.qty}</span>
                          <button onClick={() => updateQty(item.key, item.qty + 1)} className="px-2 py-1 text-ash hover:text-pearl text-sm">+</button>
                        </div>
                        <button onClick={() => removeItem(item.key)} className="text-ash hover:text-red-400 transition-colors">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-graphite space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-xs text-ash uppercase tracking-widest">Subtotal</span>
                  <span className="font-display text-pearl text-xl">KES {total.toLocaleString()}</span>
                </div>
                <p className="font-sans text-xs text-ash">Shipping & taxes calculated at checkout</p>
                <Link
                  to="/order"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full text-center block"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
