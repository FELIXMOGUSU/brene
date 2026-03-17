// Beautiful SVG placeholder illustrations for each product type
export function SweatpantIllustration({ color = "#2d2b26", size = 400 }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sp1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.6"/>
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="4" dy="8" stdDeviation="12" floodOpacity="0.3"/>
        </filter>
      </defs>
      {/* Waistband */}
      <rect x="80" y="40" width="240" height="30" rx="4" fill={color} opacity="0.9"/>
      <line x1="80" y1="52" x2="320" y2="52" stroke="#ffffff" strokeWidth="0.5" opacity="0.2"/>
      <line x1="80" y1="62" x2="320" y2="62" stroke="#ffffff" strokeWidth="0.5" opacity="0.2"/>
      {/* Drawstring */}
      <path d="M 160 55 Q 180 45 200 55 Q 220 45 240 55" stroke="#c4c4c4" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="156" cy="55" r="3" fill="#8b6e4e"/>
      <circle cx="244" cy="55" r="3" fill="#8b6e4e"/>
      {/* Left leg */}
      <path d="M 80 70 L 100 360 Q 105 385 115 390 L 175 390 Q 185 385 190 360 L 200 200" fill="url(#sp1)" filter="url(#shadow)"/>
      {/* Right leg */}
      <path d="M 320 70 L 300 360 Q 295 385 285 390 L 225 390 Q 215 385 210 360 L 200 200" fill="url(#sp1)" opacity="0.85"/>
      {/* Crotch seam */}
      <path d="M 130 240 Q 200 260 270 240" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.15"/>
      {/* Left ankle cuff */}
      <rect x="100" y="380" width="90" height="20" rx="3" fill={color} opacity="0.9"/>
      {/* Right ankle cuff */}
      <rect x="210" y="380" width="90" height="20" rx="3" fill={color} opacity="0.75"/>
      {/* Pocket outline left */}
      <rect x="92" y="130" width="55" height="65" rx="3" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.2"/>
      {/* Seam detail */}
      <path d="M 200 70 L 200 200" stroke="#ffffff" strokeWidth="0.5" opacity="0.12"/>
      {/* Logo text */}
      <text x="200" y="300" textAnchor="middle" fontFamily="serif" fontSize="11" fill="#ffffff" opacity="0.25" letterSpacing="4">BRENÉ</text>
    </svg>
  )
}

export function SweatshirtIllustration({ color = "#1a1a1a", size = 400 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sw1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.7"/>
        </linearGradient>
        <filter id="swshadow">
          <feDropShadow dx="3" dy="6" stdDeviation="10" floodOpacity="0.4"/>
        </filter>
      </defs>
      {/* Body */}
      <path d="M 100 120 L 60 80 L 40 160 L 100 170 L 100 350 Q 100 365 115 365 L 285 365 Q 300 365 300 350 L 300 170 L 360 160 L 340 80 L 300 120 Q 270 100 200 100 Q 130 100 100 120 Z" fill="url(#sw1)" filter="url(#swshadow)"/>
      {/* Left sleeve */}
      <path d="M 100 120 L 60 80 L 40 160 L 100 170" fill={color} opacity="0.8"/>
      {/* Right sleeve */}
      <path d="M 300 120 L 340 80 L 360 160 L 300 170" fill={color} opacity="0.65"/>
      {/* Neckline */}
      <path d="M 150 100 Q 200 85 250 100" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round"/>
      {/* Ribbed collar */}
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <line key={i} x1={152 + i * 10} y1="94" x2={148 + i * 10} y2="105" stroke="#ffffff" strokeWidth="1" opacity="0.1"/>
      ))}
      {/* Bottom rib */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(i => (
        <line key={i} x1={100 + i * 13.5} y1="355" x2={100 + i * 13.5} y2="365" stroke="#ffffff" strokeWidth="1" opacity="0.12"/>
      ))}
      {/* Left cuff rib */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={40 + i * 5} y1="155" x2={43 + i * 5} y2="165" stroke="#ffffff" strokeWidth="1" opacity="0.1"/>
      ))}
      {/* Right cuff rib */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={340 + i * 5} y1="155" x2={343 + i * 5} y2="165" stroke="#ffffff" strokeWidth="1" opacity="0.1"/>
      ))}
      {/* Seam lines */}
      <path d="M 155 105 L 140 365" stroke="#ffffff" strokeWidth="0.5" opacity="0.1"/>
      <path d="M 245 105 L 260 365" stroke="#ffffff" strokeWidth="0.5" opacity="0.1"/>
      {/* Logo embroidery area */}
      <rect x="170" y="190" width="60" height="30" rx="2" stroke="#8b6e4e" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <text x="200" y="209" textAnchor="middle" fontFamily="serif" fontSize="9" fill="#8b6e4e" opacity="0.5" letterSpacing="3">HOB</text>
      {/* Chest highlight */}
      <path d="M 120 140 Q 200 130 280 145" stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.06"/>
    </svg>
  )
}

export function HoodieIllustration({ color = "#4a4a4a", size = 400 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="h1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color}/>
          <stop offset="100%" stopColor={color} stopOpacity="0.65"/>
        </linearGradient>
      </defs>
      {/* Hood */}
      <path d="M 145 50 Q 150 20 200 15 Q 250 20 255 50 Q 270 80 260 110 Q 240 95 200 90 Q 160 95 140 110 Q 130 80 145 50 Z" fill={color} opacity="0.9"/>
      {/* Hood shadow */}
      <path d="M 175 90 Q 200 88 225 90 L 255 50 Q 250 20 200 15 Q 150 20 145 50 Z" fill="#000" opacity="0.1"/>
      {/* Body */}
      <path d="M 100 130 L 60 90 L 35 175 L 100 185 L 100 370 Q 100 382 112 382 L 288 382 Q 300 382 300 370 L 300 185 L 365 175 L 340 90 L 300 130 Q 268 112 200 110 Q 132 112 100 130 Z" fill="url(#h1)"/>
      {/* Zip line */}
      <line x1="200" y1="110" x2="200" y2="382" stroke="#ffffff" strokeWidth="1.5" opacity="0.15"/>
      {/* Zip pull */}
      <rect x="195" y="155" width="10" height="14" rx="2" fill="#8b6e4e" opacity="0.7"/>
      {/* Pockets */}
      <path d="M 110 270 L 140 260 L 160 275 L 150 310 L 105 310 Z" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.15"/>
      <path d="M 290 270 L 260 260 L 240 275 L 250 310 L 295 310 Z" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.15"/>
      {/* Hood strings */}
      <line x1="185" y1="110" x2="175" y2="165" stroke="#c4c4c4" strokeWidth="1.2" opacity="0.4"/>
      <line x1="215" y1="110" x2="225" y2="165" stroke="#c4c4c4" strokeWidth="1.2" opacity="0.4"/>
      <circle cx="173" cy="168" r="4" fill="#8b6e4e" opacity="0.6"/>
      <circle cx="227" cy="168" r="4" fill="#8b6e4e" opacity="0.6"/>
      {/* Bottom hem rib */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i => (
        <line key={i} x1={100 + i * 12.5} y1="372" x2={100 + i * 12.5} y2="382" stroke="#ffffff" strokeWidth="1" opacity="0.1"/>
      ))}
    </svg>
  )
}

export function TrackSetIllustration({ color = "#2d2b26", size = 400 }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Jacket top portion */}
      <path d="M 110 60 L 80 40 L 60 100 L 110 110 L 110 220 L 290 220 L 290 110 L 340 100 L 320 40 L 290 60 Q 260 48 200 48 Q 140 48 110 60 Z" fill={color} opacity="0.9"/>
      <line x1="200" y1="48" x2="200" y2="220" stroke="#ffffff" strokeWidth="1.5" opacity="0.15"/>
      {/* Sweatpant bottom */}
      <rect x="105" y="220" width="85" height="20" rx="2" fill={color}/>
      <rect x="210" y="220" width="85" height="20" rx="2" fill={color} opacity="0.85"/>
      <path d="M 105 240 L 120 390 Q 122 400 132 400 L 178 400 Q 188 400 190 390 L 200 280" fill={color} opacity="0.8"/>
      <path d="M 295 240 L 280 390 Q 278 400 268 400 L 222 400 Q 212 400 210 390 L 200 280" fill={color} opacity="0.7"/>
      {/* Logo */}
      <text x="200" y="175" textAnchor="middle" fontFamily="serif" fontSize="10" fill="#ffffff" opacity="0.2" letterSpacing="5">HOUSE OF BRENÉ</text>
    </svg>
  )
}

export function ProductIllustration({ category, color, size = 400 }) {
  if (category === 'sweatpants') return <SweatpantIllustration color={color} size={size}/>
  if (category === 'sets') return <TrackSetIllustration color={color} size={size}/>
  const name = category || ''
  if (name.includes('hoodie') || name.toLowerCase().includes('zip')) return <HoodieIllustration color={color} size={size}/>
  return <SweatshirtIllustration color={color} size={size}/>
}
