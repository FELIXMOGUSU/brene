import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../hooks/useCart'
import { SweatpantIllustration, SweatshirtIllustration, HoodieIllustration, TrackSetIllustration } from './GarmentIllustration'

function GarmentPreview({ product, size }) {
  const s = size || 280
  if (product.category === 'sweatpants') return <SweatpantIllustration color={product.svgColor} size={s}/>
  if (product.category === 'sets') return <TrackSetIllustration color={product.svgColor} size={s}/>
  if (product.name.toLowerCase().includes('hoodie') || product.name.toLowerCase().includes('zip'))
    return <HoodieIllustration color={product.svgColor} size={s}/>
  return <SweatshirtIllustration color={product.svgColor} size={s}/>
}

export default function ProductCard({ product, variant = 'default' }) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState('')
  const [added, setAdded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleAdd = () => {
    if (!selectedSize) return
    addItem(product, selectedSize, product.colors[0])
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      className="product-card group"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-charcoal aspect-[3/4] flex items-center justify-center">
        <motion.div
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full h-full flex items-center justify-center p-8"
        >
          <GarmentPreview product={product} size={220}/>
        </motion.div>

        {/* Tags */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.tags.includes('new') && (
            <span className="bg-mocha text-cream font-sans text-xs px-3 py-1 tracking-widest uppercase">New</span>
          )}
          {product.tags.includes('flagship') && (
            <span className="bg-espresso text-taupe font-sans text-xs px-3 py-1 tracking-widest uppercase border border-taupe/30">Flagship</span>
          )}
          {product.tags.includes('limited') && (
            <span className="bg-walnut/20 text-taupe font-sans text-xs px-3 py-1 tracking-widest uppercase border border-walnut/30">Limited</span>
          )}
        </div>

        {/* Quick-add overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 bg-obsidian/90 backdrop-blur-sm p-4"
        >
          {/* Size picker */}
          <div className="flex flex-wrap gap-1.5 mb-3 justify-center">
            {product.sizes.map(s => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`w-9 h-9 font-sans text-xs border transition-all duration-200 ${
                  selectedSize === s
                    ? 'bg-mocha border-mocha text-cream'
                    : 'border-graphite text-ash hover:border-taupe hover:text-pearl'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className={`w-full font-sans text-xs tracking-widest py-2.5 uppercase transition-all duration-300 ${
              !selectedSize
                ? 'bg-graphite text-steel cursor-not-allowed'
                : added
                ? 'bg-green-900 text-green-300'
                : 'bg-mocha text-cream hover:bg-walnut'
            }`}
          >
            {!selectedSize ? 'Select Size' : added ? '✓ Added to Bag' : 'Add to Bag'}
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-sans text-xs text-pearl uppercase tracking-wide leading-snug">{product.name}</h3>
          <span className="font-display text-taupe text-base whitespace-nowrap">KES {product.price.toLocaleString()}</span>
        </div>
        <p className="font-sans text-xs text-ash mt-1 leading-relaxed line-clamp-2">{product.description}</p>
        {/* Color dots */}
        <div className="flex gap-2 mt-3">
          {product.colors.map((c, i) => (
            <div
              key={c}
              className="w-3 h-3 rounded-full border border-graphite"
              style={{ background: ['#1a1a1a','#3d2b1a','#8b6e4e','#8a8a8a','#e8e4de','#b8a48a','#6b4f35'][i % 7] }}
              title={c}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
