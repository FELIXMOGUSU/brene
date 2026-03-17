import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SweatpantIllustration, SweatshirtIllustration, HoodieIllustration } from '../components/GarmentIllustration'

export default function AboutPage() {
  return (
    <div className="bg-obsidian min-h-screen pt-20">

      {/* Hero */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden border-b border-graphite/40">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="ornament-line mb-8 max-w-xs">Est. Nairobi, 2024</div>
            <h1 className="font-headline text-6xl md:text-8xl text-pearl tracking-widest leading-none mb-8">
              OUR<br/>STORY
            </h1>
            <p className="font-display italic text-taupe text-2xl leading-relaxed mb-6">
              Born from the streets of Nairobi. Built for the world.
            </p>
            <p className="font-sans text-sm text-ash leading-relaxed mb-6">
              House of Brené started as a vision — that African fashion could be premium without apology. 
              That streetwear could be sophisticated. That comfort and elegance are not opposites.
            </p>
            <p className="font-sans text-sm text-ash leading-relaxed">
              Every piece we make is engineered for those who move with intention. 
              Heavyweight fleece, considered silhouettes, and details that reward the discerning eye.
              We don't follow trends — we set the tone.
            </p>
          </motion.div>

          {/* Illustration cluster */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center h-96"
          >
            <div className="absolute left-0 top-0 opacity-60"><SweatpantIllustration color="#3d2b1a" size={200}/></div>
            <div className="absolute right-0 bottom-0 opacity-50"><HoodieIllustration color="#2d2b26" size={180}/></div>
            <div className="z-10"><SweatshirtIllustration color="#4a4a4a" size={220}/></div>
          </motion.div>
        </div>
        {/* BG text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span className="font-headline text-[18vw] text-charcoal/60 select-none">BRENÉ</span>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="ornament-line justify-center mb-6">What We Stand For</div>
            <h2 className="font-headline text-5xl text-pearl tracking-widest">OUR VALUES</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-graphite/30">
            {[
              { symbol: 'I.', title: 'Craft First', desc: 'Every seam is deliberate. Every material selected for longevity. We build pieces that outlast trends and reward those who invest in quality.' },
              { symbol: 'II.', title: 'African Pride', desc: 'Made in Kenya, for the world. We are proud of our origins and wear them as loudly as our designs. Nairobi is our runway.' },
              { symbol: 'III.', title: 'Inclusivity', desc: 'Sizes XS–XXL. Styles for every body. Fashion that doesn\'t leave anyone behind — because style has no prerequisite.' },
            ].map(({ symbol, title, desc }, i) => (
              <motion.div
                key={title}
                className="bg-charcoal p-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="font-headline text-5xl text-mocha mb-4">{symbol}</div>
                <h3 className="font-sans text-sm text-pearl uppercase tracking-widest mb-4">{title}</h3>
                <p className="font-sans text-xs text-ash leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sizing Guide */}
      <section className="py-16 px-6 lg:px-12 bg-charcoal border-y border-graphite/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl text-pearl tracking-widest">SIZE GUIDE</h2>
            <p className="font-display italic text-taupe mt-2">All measurements in centimetres</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans">
              <thead>
                <tr className="border-b border-graphite">
                  {['Size','Chest','Waist','Hip','Length'].map(h => (
                    <th key={h} className="py-3 px-4 text-left text-ash uppercase tracking-widest font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['XS','82–87','66–71','88–93','68'],
                  ['S','88–93','72–77','94–99','69'],
                  ['M','94–99','78–83','100–105','70'],
                  ['L','100–105','84–89','106–111','71'],
                  ['XL','106–111','90–95','112–117','72'],
                  ['XXL','112–117','96–101','118–123','73'],
                ].map((row, i) => (
                  <tr key={row[0]} className={`border-b border-graphite/30 ${i % 2 === 0 ? 'bg-graphite/10' : ''}`}>
                    {row.map((cell, j) => (
                      <td key={j} className={`py-3 px-4 ${j === 0 ? 'text-taupe font-medium' : 'text-ash'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-sans text-xs text-ash mt-6 text-center">Our pieces are cut oversized by design. For a relaxed fit, choose your usual size. For a fitted look, size down.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-headline text-5xl md:text-7xl text-pearl tracking-widest mb-6">READY TO WEAR?</h2>
          <p className="font-display italic text-taupe text-xl mb-10">Explore the collection and find your piece.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/shop" className="btn-primary">Shop Now</Link>
            <Link to="/order" className="btn-outline">Custom Order</Link>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
