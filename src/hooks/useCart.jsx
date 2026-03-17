import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = useCallback((product, size, color) => {
    setItems(prev => {
      const key = `${product.id}-${size}-${color}`
      const exists = prev.find(i => i.key === key)
      if (exists) return prev.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, size, color, qty: 1, key }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((key) => {
    setItems(prev => prev.filter(i => i.key !== key))
  }, [])

  const updateQty = useCallback((key, qty) => {
    if (qty < 1) return removeItem(key)
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i))
  }, [removeItem])

  const clearCart = useCallback(() => setItems([]), [])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
