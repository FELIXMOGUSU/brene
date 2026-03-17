import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'brene2024'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [catalogueItems, setCatalogueItems] = useState([])
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('orders')
  const [loading, setLoading] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', category: 'sweatpants', price: '', description: '', image_url: '', in_stock: true })
  const [showForm, setShowForm] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else setPwError(true)
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const [{ data: cats }, { data: ords }] = await Promise.all([
        supabase.from('catalogue').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
      ])
      setCatalogueItems(cats || [])
      setOrders(ords || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (authed) loadData() }, [authed])

  const addItem = async () => {
    if (!newItem.name || !newItem.price) return
    const { data } = await supabase.from('catalogue').insert([{ ...newItem, price: parseFloat(newItem.price) }]).select().single()
    if (data) { setCatalogueItems(p => [data, ...p]); setNewItem({ name: '', category: 'sweatpants', price: '', description: '', image_url: '', in_stock: true }); setShowForm(false) }
  }

  const toggleStock = async (id, current) => {
    await supabase.from('catalogue').update({ in_stock: !current }).eq('id', id)
    setCatalogueItems(p => p.map(i => i.id === id ? { ...i, in_stock: !current } : i))
  }

  const deleteItem = async (id) => {
    if (!window.confirm('Delete this item?')) return
    await supabase.from('catalogue').delete().eq('id', id)
    setCatalogueItems(p => p.filter(i => i.id !== id))
  }

  const updateOrderStatus = async (id, status) => {
    await supabase.from('orders').update({ payment_status: status }).eq('id', id)
    setOrders(p => p.map(o => o.id === id ? { ...o, payment_status: status } : o))
  }

  if (!authed) {
    return (
      <div className="bg-obsidian min-h-screen flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="ornament-line justify-center mb-8">Admin Access</div>
          <h1 className="font-headline text-4xl text-pearl tracking-widest text-center mb-8">ADMIN</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Password</label>
              <input type="password" className={`form-input ${pwError ? 'border-red-500' : ''}`} value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter admin password"/>
              {pwError && <p className="text-red-400 text-xs mt-1">Incorrect password</p>}
            </div>
            <button type="submit" className="btn-primary w-full">Enter</button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-obsidian min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-headline text-4xl text-pearl tracking-widest">ADMIN DASHBOARD</h1>
            <p className="font-display italic text-taupe mt-1">House of Brené · Backend</p>
          </div>
          <button onClick={() => setAuthed(false)} className="btn-outline text-xs py-2 px-6">Sign Out</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Orders', value: orders.length },
            { label: 'Catalogue Items', value: catalogueItems.length },
            { label: 'Revenue (KES)', value: orders.reduce((s, o) => s + (o.total_price || 0), 0).toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} className="bg-charcoal border border-graphite p-6">
              <div className="font-headline text-3xl text-taupe">{value}</div>
              <div className="font-sans text-xs text-ash uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-graphite">
          {['orders', 'catalogue'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`font-sans text-xs uppercase tracking-widest px-8 py-3 transition-all ${tab === t ? 'border-b-2 border-mocha text-pearl' : 'text-ash hover:text-pearl'}`}>
              {t}
            </button>
          ))}
        </div>

        {loading && <div className="text-center py-12 font-display italic text-ash">Loading...</div>}

        {/* ORDERS */}
        {tab === 'orders' && !loading && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans">
              <thead>
                <tr className="border-b border-graphite">
                  {['Order ID','Customer','Phone','Items','Total','Status','Action'].map(h => (
                    <th key={h} className="py-3 px-3 text-left text-ash uppercase tracking-widest font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr><td colSpan={7} className="py-12 text-center text-ash font-display italic">No orders yet</td></tr>
                )}
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-graphite/30 hover:bg-charcoal/40 transition-colors">
                    <td className="py-3 px-3 font-mono text-taupe text-xs">{String(order.id).slice(0, 8)}</td>
                    <td className="py-3 px-3 text-pearl">{order.customer_name}</td>
                    <td className="py-3 px-3 text-ash">{order.customer_phone}</td>
                    <td className="py-3 px-3 text-ash max-w-xs truncate">{
                      (() => {
                        try { const items = JSON.parse(order.items); return items.map(i => i.name).join(', ') }
                        catch { return order.items }
                      })()
                    }</td>
                    <td className="py-3 px-3 text-pearl">KES {(order.total_price || 0).toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 text-xs uppercase tracking-wide ${
                        order.payment_status === 'paid' ? 'bg-green-900/30 text-green-400'
                        : order.payment_status === 'pending' ? 'bg-yellow-900/30 text-yellow-400'
                        : 'bg-red-900/30 text-red-400'
                      }`}>
                        {order.payment_status || 'pending'}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={order.payment_status || 'pending'}
                        onChange={e => updateOrderStatus(order.id, e.target.value)}
                        className="bg-graphite text-ash text-xs px-2 py-1 border border-graphite/50 focus:outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CATALOGUE */}
        {tab === 'catalogue' && !loading && (
          <>
            <div className="flex justify-end mb-6">
              <button onClick={() => setShowForm(!showForm)} className="btn-primary text-xs py-3 px-8">
                {showForm ? '✕ Cancel' : '+ Add Product'}
              </button>
            </div>

            {showForm && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-charcoal border border-graphite p-8 mb-8 grid md:grid-cols-2 gap-6">
                <h3 className="font-sans text-xs text-pearl uppercase tracking-widest col-span-full pb-4 border-b border-graphite">New Product</h3>
                {[
                  { key: 'name', label: 'Product Name', ph: 'Brené Essential Sweatpant' },
                  { key: 'price', label: 'Price (KES)', ph: '4800' },
                  { key: 'image_url', label: 'Image URL', ph: 'https://...' },
                  { key: 'description', label: 'Description', ph: 'Short product description...' },
                ].map(({ key, label, ph }) => (
                  <div key={key}>
                    <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">{label}</label>
                    <input className="form-input" value={newItem[key]} onChange={e => setNewItem(p => ({ ...p, [key]: e.target.value }))} placeholder={ph}/>
                  </div>
                ))}
                <div>
                  <label className="font-sans text-xs text-ash uppercase tracking-widest block mb-2">Category</label>
                  <select className="form-input" value={newItem.category} onChange={e => setNewItem(p => ({ ...p, category: e.target.value }))}>
                    <option value="sweatpants">Sweatpants</option>
                    <option value="sweatshirts">Sweatshirts</option>
                    <option value="sets">Sets</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="instock" checked={newItem.in_stock} onChange={e => setNewItem(p => ({ ...p, in_stock: e.target.checked }))} className="accent-mocha w-4 h-4"/>
                  <label htmlFor="instock" className="font-sans text-xs text-ash uppercase tracking-widest">In Stock</label>
                </div>
                <div className="col-span-full">
                  <button onClick={addItem} className="btn-primary text-xs py-3 px-10">Save Product</button>
                </div>
              </motion.div>
            )}

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {catalogueItems.length === 0 && (
                <div className="col-span-full py-12 text-center font-display italic text-ash">
                  No catalogue items yet. Add your first product above.
                </div>
              )}
              {catalogueItems.map(item => (
                <div key={item.id} className="bg-charcoal border border-graphite p-5">
                  {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover mb-4"/>}
                  <div className="font-sans text-xs text-pearl uppercase tracking-wide leading-snug mb-1">{item.name}</div>
                  <div className="font-display text-taupe text-lg mb-1">KES {(item.price || 0).toLocaleString()}</div>
                  <div className="font-sans text-xs text-ash mb-4">{item.category}</div>
                  <div className="flex justify-between items-center gap-2">
                    <button
                      onClick={() => toggleStock(item.id, item.in_stock)}
                      className={`font-sans text-xs px-3 py-1 uppercase tracking-wider transition-colors ${item.in_stock ? 'bg-green-900/30 text-green-400' : 'bg-graphite text-ash'}`}
                    >
                      {item.in_stock ? 'In Stock' : 'Out of Stock'}
                    </button>
                    <button onClick={() => deleteItem(item.id)} className="text-ash hover:text-red-400 transition-colors text-xs">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
