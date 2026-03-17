import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    phase: 'Phase 1',
    title: 'Set Up Supabase',
    color: 'text-green-400',
    badge: 'bg-green-900/20 border-green-900/40',
    items: [
      { step: '1', desc: 'Go to supabase.com and create a free account' },
      { step: '2', desc: 'Click "New Project", name it house-of-brene, set a database password' },
      { step: '3', desc: 'Wait ~2 min for the project to provision' },
      { step: '4', desc: 'Go to Settings → API, copy your Project URL and anon public key' },
      {
        step: '5',
        desc: 'Open the SQL Editor in Supabase and run this schema:',
        code: `-- Customers table
CREATE TABLE customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
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

-- Catalogue table
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

-- Contact messages
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (optional for production)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for orders/customers (for demo)
CREATE POLICY "Allow public insert" ON customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select catalogue" ON catalogue FOR SELECT USING (true);`
      },
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Configure Environment',
    color: 'text-taupe',
    badge: 'bg-espresso/40 border-walnut/30',
    items: [
      { step: '1', desc: 'In the project root, rename .env.example to .env.local' },
      {
        step: '2',
        desc: 'Fill in your environment variables:',
        code: `# Supabase (from Settings → API in your Supabase project)
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# M-Pesa Daraja API (from developer.safaricom.co.ke)
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=123456
MPESA_PASSKEY=your_lipa_na_mpesa_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/mpesa/callback

# Admin
VITE_ADMIN_PASSWORD=your_secure_password_here`
      },
    ]
  },
  {
    phase: 'Phase 3',
    title: 'M-Pesa API Setup',
    color: 'text-green-400',
    badge: 'bg-green-900/20 border-green-900/40',
    items: [
      { step: '1', desc: 'Go to developer.safaricom.co.ke and create an account' },
      { step: '2', desc: 'Create a new App, select "Lipa Na M-Pesa Sandbox" API' },
      { step: '3', desc: 'Copy your Consumer Key and Consumer Secret into .env.local' },
      { step: '4', desc: 'For production: apply for a till/paybill number at Safaricom' },
      {
        step: '5',
        desc: 'Create the backend API route (Node.js/Express or Vercel serverless):',
        code: `// api/mpesa/pay.js (Vercel Serverless Function)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  
  const { phone, amount, reference } = req.body
  
  // 1. Get access token
  const auth = Buffer.from(
    \`\${process.env.MPESA_CONSUMER_KEY}:\${process.env.MPESA_CONSUMER_SECRET}\`
  ).toString('base64')
  
  const tokenRes = await fetch(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: \`Basic \${auth}\` } }
  )
  const { access_token } = await tokenRes.json()
  
  // 2. Format timestamp
  const ts = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
  const password = Buffer.from(
    \`\${process.env.MPESA_SHORTCODE}\${process.env.MPESA_PASSKEY}\${ts}\`
  ).toString('base64')
  
  // 3. Send STK push
  const stkRes = await fetch(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      method: 'POST',
      headers: { 
        Authorization: \`Bearer \${access_token}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: ts,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.ceil(amount),
        PartyA: phone.replace(/^0/, '254'),
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone.replace(/^0/, '254'),
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: reference,
        TransactionDesc: 'House of Brene Order'
      })
    }
  )
  
  const result = await stkRes.json()
  res.json(result)
}`
      },
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Deploy to GitHub + Vercel',
    color: 'text-pearl',
    badge: 'bg-charcoal border-graphite',
    items: [
      {
        step: '1',
        desc: 'Initialize git and push to GitHub:',
        code: `git init
git add .
git commit -m "feat: House of Brené initial release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/house-of-brene.git
git push -u origin main`
      },
      { step: '2', desc: 'Go to vercel.com → New Project → Import your GitHub repo' },
      { step: '3', desc: 'Under Environment Variables, add all keys from your .env.local' },
      {
        step: '4',
        desc: 'Set the build settings:',
        code: `Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install`
      },
      { step: '5', desc: 'Click Deploy — Vercel will auto-deploy on every git push' },
      { step: '6', desc: 'Add a custom domain in Vercel → Settings → Domains (e.g. houseofbrene.co.ke)' },
    ]
  }
]

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="relative mt-4 bg-obsidian border border-graphite rounded-none overflow-hidden">
      <button onClick={copy} className="absolute top-3 right-3 font-sans text-xs text-ash hover:text-pearl transition-colors px-3 py-1 border border-graphite hover:border-taupe">
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <pre className="p-5 text-xs font-mono text-ash overflow-x-auto leading-relaxed">{code}</pre>
    </div>
  )
}

export default function DeployPage() {
  return (
    <div className="bg-obsidian min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="ornament-line mb-6 max-w-xs">Developer Guide</div>
          <h1 className="font-headline text-5xl md:text-7xl text-pearl tracking-widest mb-4">DEPLOY GUIDE</h1>
          <p className="font-display italic text-taupe text-xl mb-4">From local to live — step by step.</p>
          <p className="font-sans text-sm text-ash leading-relaxed mb-16 max-w-2xl">
            This guide walks you through setting up Supabase, configuring M-Pesa, and deploying your House of Brené store to Vercel with a custom domain.
          </p>
        </motion.div>

        {/* Prerequisites */}
        <div className="bg-charcoal border border-graphite p-8 mb-12">
          <h3 className="font-sans text-xs text-pearl uppercase tracking-widest mb-4">Prerequisites</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Node.js v18+ installed',
              'Git installed and configured',
              'GitHub account (free)',
              'Supabase account (free)',
              'Vercel account (free)',
              'Safaricom Developer account (for M-Pesa)',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 font-sans text-xs text-ash">
                <span className="text-mocha">◆</span>{item}
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps.map((phase, pi) => (
            <motion.section
              key={phase.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: pi * 0.1 }}
            >
              <div className={`inline-flex items-center gap-3 border px-4 py-2 mb-6 ${phase.badge}`}>
                <span className={`font-sans text-xs uppercase tracking-widest ${phase.color}`}>{phase.phase}</span>
                <span className="text-graphite">·</span>
                <span className="font-sans text-xs text-pearl uppercase tracking-widest">{phase.title}</span>
              </div>

              <div className="space-y-8 pl-4 border-l border-graphite/40">
                {phase.items.map(({ step, desc, code }) => (
                  <div key={step} className="relative">
                    <div className="absolute -left-6 w-3 h-3 bg-mocha/40 border border-mocha/60 rounded-full top-1"/>
                    <div className="flex gap-4">
                      <span className={`font-headline text-lg ${phase.color} flex-shrink-0`}>{step}.</span>
                      <div className="flex-1">
                        <p className="font-sans text-sm text-ash leading-relaxed">{desc}</p>
                        {code && <CodeBlock code={code}/>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Local dev reminder */}
        <div className="mt-16 bg-charcoal border border-graphite p-8">
          <h3 className="font-sans text-xs text-pearl uppercase tracking-widest mb-4">Local Development</h3>
          <CodeBlock code={`# Clone and install
git clone https://github.com/YOUR_USERNAME/house-of-brene.git
cd house-of-brene
npm install

# Copy env file and fill in your keys
cp .env.example .env.local

# Start dev server
npm run dev
# → http://localhost:3000

# Build for production
npm run build`}/>
        </div>

        <div className="mt-12 text-center">
          <p className="font-display italic text-ash text-lg">Questions? Reach us at hello@houseofbrene.co.ke</p>
        </div>
      </div>
    </div>
  )
}
