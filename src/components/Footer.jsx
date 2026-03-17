import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="bg-espresso border-t border-graphite/30">
      {/* Newsletter band */}
      <div className="border-b border-graphite/30 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-headline text-3xl text-pearl tracking-widest">JOIN THE MOVEMENT</h3>
            <p className="font-display italic text-taupe mt-1">Early access. New drops. Community first.</p>
          </div>
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display italic text-taupe text-lg"
            >
              You're in. Welcome to the family.
            </motion.p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-transparent border border-graphite border-r-0 px-5 py-3 font-sans text-xs text-pearl placeholder-ash focus:outline-none focus:border-taupe transition-colors"
                required
              />
              <button type="submit" className="bg-mocha text-cream font-sans text-xs tracking-widest px-6 py-3 hover:bg-walnut transition-colors uppercase">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="mb-4">
            <div className="font-headline text-2xl text-pearl tracking-widest2">HOUSE OF</div>
            <div className="font-display italic text-taupe tracking-widest text-base">Brené</div>
          </div>
          <p className="font-sans text-xs text-ash leading-relaxed max-w-xs">
            Premium streetwear crafted for those who move with intention. Born in Nairobi. Built for the world.
          </p>
          {/* Socials */}
          <div className="flex gap-4 mt-6">
            {[
              { label: 'TikTok', href: 'https://www.tiktok.com/@house.of.brene' },
              { label: 'IG', href: '#' },
              { label: 'X', href: '#' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="font-sans text-xs text-ash hover:text-taupe transition-colors tracking-widest uppercase">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-sans text-xs text-pearl tracking-widest uppercase mb-6">Shop</h4>
          <ul className="space-y-3">
            {['Sweatpants', 'Sweatshirts', 'Hoodies', 'Sets', 'New Arrivals', 'Sale'].map(item => (
              <li key={item}>
                <Link to="/shop" className="font-sans text-xs text-ash hover:text-pearl transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-sans text-xs text-pearl tracking-widest uppercase mb-6">Info</h4>
          <ul className="space-y-3">
            {['About Us', 'Sizing Guide', 'Sustainability', 'Careers'].map(item => (
              <li key={item}>
                <Link to="/about" className="font-sans text-xs text-ash hover:text-pearl transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-sans text-xs text-pearl tracking-widest uppercase mb-6">Support</h4>
          <ul className="space-y-3">
            {['Contact Us', 'Shipping Policy', 'Returns', 'FAQ', 'Track Order'].map(item => (
              <li key={item}>
                <Link to="/contact" className="font-sans text-xs text-ash hover:text-pearl transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-1">
            <p className="font-sans text-xs text-ash">📍 Nairobi, Kenya</p>
            <p className="font-sans text-xs text-ash">✉️ hello@houseofbrene.co.ke</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-graphite/30 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-ash">
            © {new Date().getFullYear()} House of Brené. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {/* M-Pesa badge */}
            <span className="bg-green-900/30 text-green-400 font-sans text-xs px-3 py-1 border border-green-900/50">M-PESA</span>
            <span className="bg-graphite text-ash font-sans text-xs px-3 py-1">VISA</span>
            <span className="bg-graphite text-ash font-sans text-xs px-3 py-1">MASTERCARD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
