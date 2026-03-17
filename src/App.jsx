import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CartProvider } from './hooks/useCart'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import OrderPage from './pages/OrderPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'
import DeployPage from './pages/DeployPage'

// Custom cursor
function Cursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (followerRef.current) {
        followerRef.current.style.left = e.clientX + 'px'
        followerRef.current.style.top = e.clientY + 'px'
      }
    }
    const over = (e) => {
      if (e.target.closest('a,button,[role=button]')) {
        cursorRef.current?.classList.add('active')
        followerRef.current?.classList.add('active')
      } else {
        cursorRef.current?.classList.remove('active')
        followerRef.current?.classList.remove('active')
      }
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor"/>
      <div ref={followerRef} className="cursor-follower"/>
    </>
  )
}

// Page transition wrapper
function PageWrapper({ children }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Layout
function Layout() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  return (
    <>
      <Navbar/>
      <CartSidebar/>
      <PageWrapper>
        <Routes location={location}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/shop" element={<ShopPage/>}/>
          <Route path="/order" element={<OrderPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/deploy" element={<DeployPage/>}/>
        </Routes>
      </PageWrapper>
      {!isAdmin && <Footer/>}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Cursor/>
        <Layout/>
      </CartProvider>
    </BrowserRouter>
  )
}
