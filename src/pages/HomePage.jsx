import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { SweatpantIllustration, SweatshirtIllustration, HoodieIllustration } from '../components/GarmentIllustration'

// 3D Hero SVG illustration
function HeroSculpture() {
  return (
    <svg viewBox="0 0 600 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#8b6e4e" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="figGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d2b26"/>
          <stop offset="60%" stopColor="#1a1a1a"/>
          <stop offset="100%" stopColor="#0a0a0a"/>
        </linearGradient>
        <linearGradient id="fabricGrad" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#3d2b1a"/>
          <stop offset="100%" stopColor="#1a1a1a"/>
        </linearGradient>
        <filter id="heroBlur">
          <feGaussianBlur stdDeviation="20" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
        <filter id="softShadow">
          <feDropShadow dx="0" dy="20" stdDeviation="30" floodColor="#000" floodOpacity="0.6"/>
        </filter>
      </defs>

      {/* Background glow */}
      <ellipse cx="300" cy="350" rx="250" ry="300" fill="url(#heroGlow)"/>

      {/* Abstract fashion figure - sweatpant wearing silhouette */}
      {/* Body torso */}
      <path d="M 220 150 Q 200 120 200 90 Q 200 65 220 55 Q 240 45 260 50 Q 285 55 290 75 Q 295 100 280 120 Q 270 140 260 155 Z" fill="url(#figGrad)" filter="url(#softShadow)"/>

      {/* Oversized sweatshirt on figure */}
      <path d="M 155 180 Q 120 165 100 200 Q 85 235 95 260 Q 110 255 130 265 L 125 310 L 145 310 L 160 275 Q 175 290 200 295 Q 240 300 270 295 Q 295 290 310 275 L 325 310 L 345 310 L 340 265 Q 360 255 375 260 Q 385 235 370 200 Q 350 165 315 180 Q 295 165 245 158 Q 200 150 155 180 Z" fill="url(#fabricGrad)" filter="url(#softShadow)"/>

      {/* Sleeve shadows */}
      <path d="M 100 200 Q 90 225 95 260 Q 110 255 130 265 L 125 310 L 145 310 L 155 275" fill="#0a0a0a" opacity="0.3"/>
      <path d="M 370 200 Q 380 225 375 260 Q 360 255 340 265 L 345 310 L 325 310 L 315 275" fill="#0a0a0a" opacity="0.25"/>

      {/* Wide-leg sweatpants */}
      <path d="M 145 310 Q 120 330 105 400 Q 90 470 100 560 Q 110 620 140 640 Q 160 650 185 640 Q 205 630 215 600 Q 225 560 220 500 L 230 460 L 240 500 Q 235 560 240 600 Q 250 630 270 640 Q 295 650 315 640 Q 345 620 355 560 Q 365 470 350 400 Q 335 330 310 310 Z" fill="url(#figGrad)" filter="url(#softShadow)"/>

      {/* Pant leg highlight/crease */}
      <path d="M 155 320 Q 140 390 145 480 Q 148 550 165 610" stroke="#8b6e4e" strokeWidth="1" fill="none" opacity="0.2"/>
      <path d="M 295 320 Q 310 390 305 480 Q 302 550 285 610" stroke="#8b6e4e" strokeWidth="1" fill="none" opacity="0.2"/>

      {/* Waistband */}
      <rect x="143" y="305" width="170" height="18" rx="3" fill="#3d2b1a" opacity="0.8"/>
      {/* Drawcord */}
      <path d="M 195 314 Q 228 306 262 314" stroke="#b8a48a" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>

      {/* Logo on chest */}
      <text x="228" y="245" textAnchor="middle" fontFamily="serif" fontSize="13" fill="#b8a48a" opacity="0.35" letterSpacing="5" fontStyle="italic">Brené</text>

      {/* Ground shadow */}
      <ellipse cx="228" cy="680" rx="120" ry="15" fill="#000" opacity="0.4"/>

      {/* Decorative geometric elements */}
      <rect x="60" y="80" width="1" height="80" fill="#3d2b1a" opacity="0.4"/>
      <rect x="60" y="80" width="40" height="1" fill="#3d2b1a" opacity="0.4"/>
      <rect x="395" y="400" width="1" height="60" fill="#3d2b1a" opacity="0.3"/>
      <rect x="395" y="460" width="30" height="1" fill="#3d2b1a" opacity="0.3"/>

      {/* Floating fabric elements */}
      <path d="M 380 120 Q 420 100 450 130 Q 440 160 410 155 Z" fill="#2d2b26" opacity="0.5"/>
      <path d="M 50 450 Q 30 420 60 400 Q 85 420 80 450 Z" fill="#3d2b1a" opacity="0.4"/>

      {/* Measurement lines decoration */}
      <line x1="430" y1="180" x2="430" y2="640" stroke="#4a4a4a" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4"/>
      <text x="438" y="410" fontFamily="monospace" fontSize="9" fill="#4a4a4a" opacity="0.4">170cm</text>
    </svg>
  )
}

// Marquee text component
function Marquee({ items }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-graphite py-4 bg-charcoal">
      <div className="marquee-track flex gap-12 whitespace-nowrap w-max">
        {doubled.map((item, i) => (
          <span key={i} className="font-headline text-2xl tracking-widest text-ash flex items-center gap-12">
            {item}
            <span className="text-mocha text-lg">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const flagshipProducts = products.filter(p => p.flagship)

  return (
    <div className="bg-obsidian">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* BG texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-espresso/20 via-obsidian to-obsidian"/>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(61,43,26,0.15) 0%, transparent 60%)',
        }}/>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <div className="z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="ornament-line mb-8 max-w-xs"
            >
              Nairobi · Est. 2024
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="font-headline text-[clamp(4rem,12vw,10rem)] leading-none text-pearl"
              >
                HOUSE
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="font-headline text-[clamp(4rem,12vw,10rem)] leading-none text-pearl"
              >
                OF
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="font-display italic text-[clamp(3.5rem,10vw,8.5rem)] leading-none text-taupe"
              >
                Brené
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-sans text-sm text-ash leading-relaxed max-w-md mb-10"
            >
              Premium streetwear engineered for the bold. Oversized silhouettes, premium fleece,
              and the kind of craftsmanship that doesn't compromise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/shop" className="btn-primary inline-block text-center">Shop the Collection</Link>
              <Link to="/order" className="btn-outline inline-block text-center">Order Now</Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex gap-10 mt-14 pt-10 border-t border-graphite/50"
            >
              {[['08', 'Signature Pieces'], ['100%', 'Premium Fleece'], ['KE', 'Made in Kenya']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-headline text-3xl text-taupe">{n}</div>
                  <div className="font-sans text-xs text-ash uppercase tracking-widest mt-1">{l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative hidden lg:flex items-center justify-center"
            style={{ height: '80vh', maxHeight: 700 }}
          >
            {/* Glow behind figure */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 bg-mocha/10 rounded-full blur-3xl"/>
            </div>
            <HeroSculpture/>
            {/* Floating labels */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 right-4 bg-espresso border border-taupe/20 px-4 py-3"
            >
              <div className="font-sans text-xs text-ash uppercase tracking-widest">Flagship</div>
              <div className="font-display italic text-taupe text-sm mt-0.5">Sweatpant</div>
              <div className="font-sans text-xs text-pearl mt-1">KES 4,800</div>
            </motion.div>
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-32 left-0 bg-espresso border border-taupe/20 px-4 py-3"
            >
              <div className="font-sans text-xs text-ash uppercase tracking-widest">Premium</div>
              <div className="font-display italic text-taupe text-sm mt-0.5">Heavyweight Fleece</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ash"
        >
          <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <rect x="1" y="1" width="18" height="28" rx="9" stroke="#4a4a4a" strokeWidth="1"/>
            <motion.rect
              animate={{ y: [6, 14, 6] }}
              transition={{ duration: 2, repeat: Infinity }}
              x="8" y="6" width="4" height="6" rx="2" fill="#8b6e4e"
            />
          </svg>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee items={['New Collection', 'Sweatpants', 'Sweatshirts', 'Oversized Fits', 'Nairobi Born', 'World Class', 'Premium Fleece', 'House of Brené']}/>

      {/* ── FLAGSHIP ── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="ornament-line justify-center mb-6"
          >
            The Essentials
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-headline text-5xl md:text-7xl text-pearl tracking-widest"
          >
            FLAGSHIP
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-display italic text-taupe text-xl mt-3"
          >
            The pieces that define us.
          </motion.p>
        </div>

        {/* Large flagship cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {flagshipProducts.map((product, i) => (
            <motion.div
              key={product.id}
              className="group relative overflow-hidden bg-charcoal aspect-[4/5] flex items-center justify-center cursor-pointer"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10"/>
              <div className="p-12 relative z-0">
                {product.category === 'sweatpants'
                  ? <SweatpantIllustration color={product.svgColor} size={320}/>
                  : <SweatshirtIllustration color={product.svgColor} size={300}/>
                }
              </div>
              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-sans text-xs text-taupe uppercase tracking-widest">Flagship</span>
                    <h3 className="font-headline text-3xl text-pearl tracking-wide mt-1">{product.name.toUpperCase()}</h3>
                    <p className="font-sans text-xs text-ash mt-2 max-w-xs leading-relaxed">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-taupe text-2xl">KES {product.price.toLocaleString()}</div>
                    <Link to="/shop" className="btn-primary mt-3 inline-block text-xs py-3 px-6">Shop</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/shop" className="btn-outline inline-block">View Full Collection</Link>
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <section className="py-20 bg-charcoal border-y border-graphite/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: '◈', title: 'Premium Fleece', desc: 'Heavyweight 380gsm cotton-blend' },
            { icon: '◉', title: 'Made in Kenya', desc: 'Locally crafted, globally inspired' },
            { icon: '◎', title: 'M-Pesa Checkout', desc: 'Fast and secure local payment' },
            { icon: '◐', title: 'Free Delivery', desc: 'Orders over KES 8,000 in Nairobi' },
          ].map(({ icon, title, desc }) => (
            <motion.div
              key={title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl text-mocha mb-3">{icon}</div>
              <h4 className="font-sans text-xs text-pearl uppercase tracking-widest mb-2">{title}</h4>
              <p className="font-sans text-xs text-ash leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CATALOGUE PREVIEW ── */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="ornament-line mb-4 max-w-xs">Just dropped</div>
              <h2 className="font-headline text-4xl md:text-6xl text-pearl tracking-widest">THE RANGE</h2>
            </div>
            <Link to="/shop" className="font-sans text-xs text-ash hover:text-pearl transition-colors tracking-widest uppercase hidden md:block">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND PHILOSOPHY ── */}
      <section className="py-24 bg-espresso grain relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.blockquote
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display italic text-[clamp(1.5rem,4vw,3rem)] text-pearl leading-tight"
          >
            "Fashion is not about being seen — it's about being <span className="text-taupe">felt</span>."
          </motion.blockquote>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 ornament-line justify-center"
          >
            House of Brené · Nairobi
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-10"
          >
            <Link to="/about" className="btn-outline inline-block">Our Story</Link>
          </motion.div>
        </div>
        {/* BG text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="font-headline text-[20vw] text-espresso/80 opacity-30 select-none whitespace-nowrap">BRENÉ</span>
        </div>
      </section>

      {/* ── MPESA CTA ── */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-charcoal border border-graphite p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-green-900/30 border border-green-700/40 flex items-center justify-center">
                  <span className="text-green-400 text-xs font-bold">M</span>
                </div>
                <span className="font-sans text-xs text-green-400 uppercase tracking-widest">M-Pesa Enabled</span>
              </div>
              <h3 className="font-headline text-3xl md:text-5xl text-pearl tracking-widest">ORDER WITH EASE</h3>
              <p className="font-sans text-sm text-ash mt-3 max-w-lg leading-relaxed">
                Place your order and pay instantly with M-Pesa. No card needed. 
                Delivery within Nairobi in 24–48 hours.
              </p>
            </div>
            <Link to="/order" className="btn-primary flex-shrink-0 text-sm py-5 px-10">Order Now</Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
