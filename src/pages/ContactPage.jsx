import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await supabase.from('contact_messages').insert([form])
    } catch {}
    setTimeout(() => { setSent(true); setLoading(false) }, 800)
  }

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="ornament-line mb-6 max-w-xs">Get in Touch</div>
          <h1 className="font-headline text-6xl md:text-8xl text-pearl tracking-widest leading-none mb-4">CONTACT</h1>
          <p className="font-display italic text-taupe text-xl mb-16">We'd love to hear from you.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="w-16 h-16 bg-mocha/20 border border-mocha/40 flex items-center justify-center mx-auto mb-6">
                  <span className="text-mocha text-2xl">✓</span>
                </div>
                <h3 className="font-headline text-3xl text-pearl tracking-widest mb-3">MESSAGE SENT</h3>
                <p className="font-display italic text-taupe">We'll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Name</label>
                    <input required className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name"/>
                  </div>
                  <div>
                    <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Email</label>
                    <input required type="email" className="form-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com"/>
                  </div>
                </div>
                <div>
                  <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Subject</label>
                  <select className="form-input" value={form.subject} onChange={e => set('subject', e.target.value)}>
                    <option value="">Select a topic</option>
                    <option>Order Inquiry</option>
                    <option>Returns & Exchanges</option>
                    <option>Wholesale / Bulk Order</option>
                    <option>Press & Collaborations</option>
                    <option>General</option>
                  </select>
                </div>
                <div>
                  <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Message</label>
                  <textarea required rows={6} className="form-input resize-none" value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us what's on your mind..."/>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-12">
            {[
              { label: 'Email', value: 'hello@houseofbrene.co.ke', icon: '✉' },
              { label: 'Phone / WhatsApp', value: '+254 712 345 678', icon: '📱' },
              { label: 'Location', value: 'Nairobi, Kenya', icon: '📍' },
              { label: 'Hours', value: 'Mon–Sat: 9am–6pm EAT', icon: '🕐' },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex gap-6 pb-8 border-b border-graphite/30 last:border-0">
                <div className="text-2xl w-8">{icon}</div>
                <div>
                  <p className="font-sans text-xs text-ash uppercase tracking-widest mb-1">{label}</p>
                  <p className="font-display text-pearl text-lg">{value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div>
              <p className="font-sans text-xs text-ash uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { name: 'TikTok', href: 'https://www.tiktok.com/@house.of.brene', color: 'hover:text-pink-400' },
                  { name: 'Instagram', href: '#', color: 'hover:text-purple-400' },
                  { name: 'Twitter / X', href: '#', color: 'hover:text-sky-400' },
                ].map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    className={`font-sans text-xs text-ash ${s.color} transition-colors uppercase tracking-widest`}>
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
