import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../hooks/useCart'
import { products } from '../data/products'
import { supabase } from '../lib/supabase'

const STEPS = ['Details', 'Order', 'Payment', 'Confirm']

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-12">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`flex items-center gap-2 px-4 py-2 transition-all duration-500 ${
            i < current ? 'opacity-40' : i === current ? 'opacity-100' : 'opacity-20'
          }`}>
            <div className={`w-6 h-6 flex items-center justify-center text-xs font-sans border transition-all duration-300 ${
              i < current ? 'bg-mocha border-mocha text-cream'
              : i === current ? 'border-taupe text-taupe'
              : 'border-graphite text-steel'
            }`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className="font-sans text-xs uppercase tracking-widest hidden sm:block text-pearl">{s}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 md:w-16 h-px transition-all duration-500 ${i < current ? 'bg-mocha' : 'bg-graphite'}`}/>
          )}
        </div>
      ))}
    </div>
  )
}

export default function OrderPage() {
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [mpesaCode, setMpesaCode] = useState('')
  const [stkSent, setStkSent] = useState(false)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '',
    city: 'Nairobi', notes: '',
    // order fields (if not coming from cart)
    product: '', size: '', color: '', quantity: 1,
  })

  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  // Cart items or manual order
  const orderItems = items.length > 0
    ? items
    : form.product
      ? [{ ...products.find(p => p.name === form.product) || {}, size: form.size, color: form.color, qty: form.quantity, price: products.find(p => p.name === form.product)?.price || 0 }]
      : []

  const orderTotal = items.length > 0 ? total : orderItems.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0)

  const validateStep0 = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = 'Valid email required'
    if (!form.phone.match(/^(\+254|0)[17]\d{8}$/)) e.phone = 'Valid Kenyan number required'
    if (!form.address.trim()) e.address = 'Delivery address required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep1 = () => {
    if (orderItems.length === 0) {
      setErrors({ product: 'Please select a product or add items to cart' })
      return false
    }
    setErrors({})
    return true
  }

  const handleNext = () => {
    if (step === 0 && !validateStep0()) return
    if (step === 1 && !validateStep1()) return
    setStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSendSTK = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/mpesa/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: form.phone,
          amount: orderTotal,
          reference: `HOB-${Date.now()}`,
        }),
      })
      setStkSent(true)
    } catch (err) {
      console.error(err)
      // In dev mode without backend, simulate it
      setStkSent(true)
    } finally {
      setLoading(false)
    }
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      // Save customer to Supabase
      const { data: customer, error: custErr } = await supabase
        .from('customers')
        .upsert([{ name: form.name, email: form.email, phone: form.phone, address: form.address + ', ' + form.city }], { onConflict: 'email' })
        .select()
        .single()

      const customerId = customer?.id || null

      // Save order
      const { data: order } = await supabase
        .from('orders')
        .insert([{
          customer_id: customerId,
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email,
          items: JSON.stringify(orderItems),
          total_price: orderTotal,
          payment_method: 'mpesa',
          mpesa_code: mpesaCode,
          payment_status: mpesaCode ? 'paid' : 'pending',
          delivery_address: form.address + ', ' + form.city,
          notes: form.notes,
        }])
        .select()
        .single()

      setOrderId(order?.id || `HOB-${Date.now()}`)
      clearCart()
      setStep(3)
    } catch (err) {
      console.error(err)
      // For demo without Supabase connected
      setOrderId(`HOB-${Math.floor(Math.random() * 90000) + 10000}`)
      clearCart()
      setStep(3)
    } finally {
      setLoading(false)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const inputClass = (field) =>
    `form-input ${errors[field] ? 'border-red-500' : ''}`

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="ornament-line mb-6 max-w-xs">Complete Your Order</div>
          <h1 className="font-headline text-5xl md:text-7xl text-pearl tracking-widest mb-2">ORDER NOW</h1>
          <p className="font-display italic text-taupe mb-10">Fast checkout · M-Pesa enabled</p>
        </motion.div>

        <StepIndicator current={step}/>

        <AnimatePresence mode="wait">

          {/* ── STEP 0: Customer Details ── */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
              <h2 className="font-sans text-xs text-pearl uppercase tracking-widest mb-8 pb-3 border-b border-graphite">Your Details</h2>
              <div className="space-y-8">
                <div>
                  <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Full Name *</label>
                  <input className={inputClass('name')} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Amara Okonkwo"/>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Email *</label>
                  <input type="email" className={inputClass('email')} value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com"/>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Phone (M-Pesa) *</label>
                  <input type="tel" className={inputClass('phone')} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="0712345678 or +254712345678"/>
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Delivery Address *</label>
                  <input className={inputClass('address')} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Street, Estate, Building"/>
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">City</label>
                  <input className="form-input" value={form.city} onChange={e => set('city', e.target.value)} placeholder="Nairobi"/>
                </div>
                <div>
                  <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Order Notes</label>
                  <textarea className="form-input resize-none h-20" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Size preferences, special instructions..."/>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 1: Order Items ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
              <h2 className="font-sans text-xs text-pearl uppercase tracking-widest mb-8 pb-3 border-b border-graphite">Your Order</h2>

              {items.length > 0 ? (
                <div className="space-y-4 mb-8">
                  {items.map(item => (
                    <div key={item.key} className="flex justify-between items-center py-4 border-b border-graphite/50">
                      <div>
                        <p className="font-sans text-xs text-pearl uppercase tracking-wide">{item.name}</p>
                        <p className="font-sans text-xs text-ash mt-1">{item.size} · {item.color} · Qty {item.qty}</p>
                      </div>
                      <span className="font-display text-taupe">KES {(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-4">
                    <span className="font-sans text-xs text-ash uppercase tracking-widest">Total</span>
                    <span className="font-display text-pearl text-xl">KES {total.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 mb-8">
                  <p className="font-sans text-xs text-ash mb-4">No items in cart — select a product below:</p>
                  <div>
                    <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Product *</label>
                    <select className="form-input" value={form.product} onChange={e => set('product', e.target.value)}>
                      <option value="">Select a product</option>
                      {products.map(p => (
                        <option key={p.id} value={p.name}>{p.name} — KES {p.price.toLocaleString()}</option>
                      ))}
                    </select>
                    {errors.product && <p className="text-red-400 text-xs mt-1">{errors.product}</p>}
                  </div>
                  {form.product && (() => {
                    const prod = products.find(p => p.name === form.product)
                    return prod ? (
                      <>
                        <div>
                          <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Size</label>
                          <div className="flex gap-2 flex-wrap">
                            {prod.sizes.map(s => (
                              <button key={s} onClick={() => set('size', s)}
                                className={`w-10 h-10 font-sans text-xs border transition-all ${form.size === s ? 'bg-mocha border-mocha text-cream' : 'border-graphite text-ash hover:border-taupe'}`}>
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Color</label>
                          <select className="form-input" value={form.color} onChange={e => set('color', e.target.value)}>
                            <option value="">Select color</option>
                            {prod.colors.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Quantity</label>
                          <div className="flex items-center border border-graphite w-fit">
                            <button onClick={() => set('quantity', Math.max(1, form.quantity - 1))} className="px-4 py-2 text-ash hover:text-pearl">−</button>
                            <span className="px-4 py-2 border-x border-graphite font-sans text-sm text-pearl">{form.quantity}</span>
                            <button onClick={() => set('quantity', form.quantity + 1)} className="px-4 py-2 text-ash hover:text-pearl">+</button>
                          </div>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-graphite">
                          <span className="font-sans text-xs text-ash uppercase tracking-widest">Subtotal</span>
                          <span className="font-display text-taupe text-xl">KES {(prod.price * form.quantity).toLocaleString()}</span>
                        </div>
                      </>
                    ) : null
                  })()}
                </div>
              )}
            </motion.div>
          )}

          {/* ── STEP 2: Payment ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
              <h2 className="font-sans text-xs text-pearl uppercase tracking-widest mb-8 pb-3 border-b border-graphite">Payment</h2>

              {/* Order summary */}
              <div className="bg-charcoal border border-graphite p-6 mb-8">
                <h3 className="font-sans text-xs text-ash uppercase tracking-widest mb-4">Order Summary</h3>
                {orderItems.map((item, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-graphite/30 last:border-0">
                    <span className="font-sans text-xs text-pearl">{item.name} {item.size && `(${item.size})`} ×{item.qty || 1}</span>
                    <span className="font-sans text-xs text-taupe">KES {((item.price || 0) * (item.qty || 1)).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-4 mt-2">
                  <span className="font-sans text-xs text-ash uppercase tracking-widest">Total</span>
                  <span className="font-display text-pearl text-2xl">KES {orderTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* M-Pesa STK Push */}
              <div className="border border-green-900/40 bg-green-900/10 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-900/30 flex items-center justify-center">
                    <span className="text-green-400 font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h3 className="font-sans text-xs text-green-400 uppercase tracking-widest">M-Pesa STK Push</h3>
                    <p className="font-sans text-xs text-ash mt-0.5">Pay to: 0712 345 678 · Till: 123456</p>
                  </div>
                </div>
                {!stkSent ? (
                  <>
                    <p className="font-sans text-xs text-ash leading-relaxed mb-4">
                      Click below to receive an M-Pesa payment prompt on <span className="text-pearl">{form.phone || 'your phone'}</span>. Enter your PIN to complete payment.
                    </p>
                    <button
                      onClick={handleSendSTK}
                      disabled={loading}
                      className="w-full bg-green-800 text-green-100 font-sans text-xs tracking-widest uppercase py-3 hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Sending prompt...' : `Send M-Pesa Prompt · KES ${orderTotal.toLocaleString()}`}
                    </button>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="font-sans text-xs text-green-400">Prompt sent! Check your phone and enter your M-Pesa PIN.</p>
                    </div>
                    <div>
                      <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">M-Pesa Confirmation Code</label>
                      <input
                        className="form-input font-mono tracking-widest uppercase"
                        value={mpesaCode}
                        onChange={e => setMpesaCode(e.target.value.toUpperCase())}
                        placeholder="e.g. QHK7X2LPAB"
                        maxLength={12}
                      />
                      <p className="font-sans text-xs text-ash mt-2">Enter the code from your M-Pesa confirmation SMS</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Manual pay info */}
              <div className="border border-graphite p-4 mb-6">
                <p className="font-sans text-xs text-ash leading-relaxed">
                  <span className="text-pearl">Alternative:</span> Send KES {orderTotal.toLocaleString()} to Till No. <span className="text-taupe font-bold">123456</span> (House of Brené), then enter your confirmation code above.
                </p>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Confirmation ── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 bg-mocha/20 border border-mocha/40 flex items-center justify-center mx-auto mb-8"
              >
                <span className="text-mocha text-3xl">✓</span>
              </motion.div>
              <h2 className="font-headline text-4xl text-pearl tracking-widest mb-3">ORDER PLACED</h2>
              <p className="font-display italic text-taupe text-xl mb-6">Thank you, {form.name.split(' ')[0]}.</p>
              <div className="bg-charcoal border border-graphite p-6 mb-8 text-left max-w-sm mx-auto">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-ash">Order ID</span>
                    <span className="font-mono text-xs text-taupe">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-ash">Total Paid</span>
                    <span className="font-sans text-xs text-pearl">KES {orderTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-ash">Delivery to</span>
                    <span className="font-sans text-xs text-pearl text-right max-w-[150px]">{form.address}, {form.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-xs text-ash">Expected delivery</span>
                    <span className="font-sans text-xs text-pearl">24–48 hours</span>
                  </div>
                </div>
              </div>
              <p className="font-sans text-xs text-ash mb-8">A confirmation will be sent to <span className="text-pearl">{form.email}</span></p>
              <a href="/" className="btn-primary inline-block">Back to Home</a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        {step < 3 && (
          <div className="flex justify-between mt-12 pt-8 border-t border-graphite">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} className="btn-outline text-xs py-3 px-8">← Back</button>
            ) : <div/>}
            {step < 2 ? (
              <button onClick={handleNext} className="btn-primary text-xs py-3 px-10">
                {step === 0 ? 'Continue to Order →' : 'Continue to Payment →'}
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={loading || (!stkSent && orderTotal > 0)}
                className="btn-primary text-xs py-3 px-10 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing order...' : 'Place Order →'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
