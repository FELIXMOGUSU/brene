# 🖤 House of Brené

> Premium African streetwear — engineered for the bold.

A full-stack React e-commerce website for **House of Brené**, a Nairobi-based fashion brand. Features a premium dark aesthetic, M-Pesa payment integration, Supabase backend, admin dashboard, and full order management.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 Premium Design | Black/grey/brown palette, Cormorant Garamond + Bebas Neue typography |
| 🛍️ Shop Catalogue | Filter by category, search, sort — product cards with size picker |
| 🛒 Cart System | Global cart context, animated sidebar drawer |
| 📦 Order Flow | 3-step checkout: Details → Items → M-Pesa Payment |
| 💚 M-Pesa STK Push | Daraja API integration — sends payment prompt to phone |
| 🗄️ Supabase Backend | Stores customers, orders, catalogue, contact messages |
| 🔐 Admin Dashboard | Password-protected — manage orders + catalogue |
| 🚀 Deploy Guide | Built-in `/deploy` page with full step-by-step instructions |
| ✨ Animations | Framer Motion page transitions, hover effects, scroll animations |
| 🖱️ Custom Cursor | Branded cursor with interactive states |

---

## 🛠️ Tech Stack

- **React 18** + React Router v6
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Supabase** (PostgreSQL database + auth)
- **M-Pesa Daraja API** (payments)

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/house-of-brene.git
cd house-of-brene
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase and M-Pesa keys
```

### 3. Run Locally
```bash
npm run dev
# → http://localhost:3000
```

---

## 📁 Project Structure

```
house-of-brene/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation with mobile menu
│   │   ├── Footer.jsx          # Footer with newsletter signup
│   │   ├── CartSidebar.jsx     # Animated cart drawer
│   │   ├── ProductCard.jsx     # Product grid card with quick-add
│   │   └── GarmentIllustration.jsx  # SVG garment illustrations
│   ├── pages/
│   │   ├── HomePage.jsx        # Hero, flagship, product preview
│   │   ├── ShopPage.jsx        # Full catalogue with filters
│   │   ├── OrderPage.jsx       # 3-step checkout + M-Pesa
│   │   ├── AboutPage.jsx       # Brand story + size guide
│   │   ├── ContactPage.jsx     # Contact form
│   │   ├── AdminPage.jsx       # Order & catalogue management
│   │   └── DeployPage.jsx      # Step-by-step deployment guide
│   ├── hooks/
│   │   └── useCart.jsx         # Cart context & state
│   ├── data/
│   │   └── products.js         # Product catalogue data
│   ├── lib/
│   │   └── supabase.js         # Supabase client
│   ├── App.jsx                 # Router + layout
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles + Tailwind
├── .env.example                # Environment variable template
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🗄️ Database Schema (Supabase)

Run in **Supabase SQL Editor**:

```sql
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  items JSONB,
  total_price NUMERIC,
  payment_method TEXT DEFAULT 'mpesa',
  mpesa_code TEXT,
  payment_status TEXT DEFAULT 'pending',
  delivery_address TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE catalogue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC,
  category TEXT,
  image_url TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT, email TEXT, subject TEXT, message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 💚 M-Pesa Integration

The `/api/mpesa/pay` endpoint (Vercel serverless function) handles STK Push. See the full implementation in `src/pages/DeployPage.jsx` or visit `/deploy` in the running app.

**Sandbox credentials (for testing):**
- Shortcode: `174379`
- Test phone: `254708374149`

---

## 🔐 Admin Access

Navigate to `/admin` and enter the password set in `VITE_ADMIN_PASSWORD`.

Default: `brene2024` (change this before going live!)

---

## 🌐 Deploy to Vercel

```bash
# Push to GitHub first
git add . && git commit -m "deploy" && git push

# Then connect on vercel.com → New Project → Import from GitHub
# Add environment variables in Vercel dashboard
```

Full deployment guide: visit `/deploy` in the app, or see `src/pages/DeployPage.jsx`.

---

## 📞 Contact

**House of Brené**  
📍 Nairobi, Kenya  
📱 +254 712 345 678  
✉️ hello@houseofbrene.co.ke  
🎵 [TikTok @house.of.brene](https://www.tiktok.com/@house.of.brene)

---

*Made with intention. House of Brené © 2024*
