import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Expedition locations with genuine user wildlife specimens from D:\wildlife\images
const LOCATIONS = [
  {
    id: 'jawai',
    name: 'Jawaï & Thar',
    sub: 'Granite Hills · Big Cats Habitat',
    x: 560,
    y: 190,
    photos: [
      '/images/user/IMG_4761.JPG',
      '/images/user/IMG_6853.PNG',
    ],
    count: '8 Expeditions',
  },
  {
    id: 'western_ghats',
    name: 'Western Ghats',
    sub: 'Agumbe · Kudremukh · Rainforest Macro',
    x: 580,
    y: 230,
    photos: [
      '/images/user/IMG_4634.JPG',
      '/images/user/IMG_4632.JPG',
      '/images/user/IMG_4642.JPG',
    ],
    count: '16 Expeditions',
  },
  {
    id: 'kabini',
    name: 'Kabini & Nilgiris',
    sub: 'Elephant Corridors · Teak Forests',
    x: 585,
    y: 260,
    photos: [
      '/images/user/IMG_7965.PNG',
      '/images/user/IMG_7964.JPG',
      '/images/user/IMG_6853.PNG',
    ],
    count: '12 Expeditions',
  },
  {
    id: 'valparai',
    name: 'Anamalai & Valparai',
    sub: 'Cloud Canopies · Nocturnal Herpetology',
    x: 590,
    y: 280,
    photos: [
      '/images/user/IMG_4639.JPG',
      '/images/user/IMG_4638.JPG',
      '/images/user/IMG_4633.JPG',
    ],
    count: '9 Expeditions',
  },
  {
    id: 'coorg',
    name: 'Coorg Valley Streams',
    sub: 'Micro-Ecosystems · Embryonic Life',
    x: 575,
    y: 250,
    photos: [
      '/images/user/IMG_4637.JPG',
      '/images/user/IMG_4643.JPG',
    ],
    count: '5 Expeditions',
  },
]

export default function Expeditions() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(LOCATIONS[1]) // Default to Western Ghats
  const panelRef = useRef(null)

  const handleDot = (loc) => {
    setActive(loc)
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
      )
    }
  }

  return (
    <section
      ref={sectionRef}
      className="px-8 md:px-16 py-24 md:py-40"
      style={{ background: 'var(--bg)' }}
    >
      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3 text-emerald-400">
            Field Maps & Coordinates · Section 05
          </p>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--text)',
            }}
          >
            Expeditions
          </h2>
        </div>
        <p className="font-sans text-sm" style={{ color: 'var(--muted)', maxWidth: 320 }}>
          High-canopy microhabitats, granite escarpments, and riverine corridors. Click any coordinates to explore specimens.
        </p>
      </div>

      {/* Interactive Map */}
      <div
        className="relative w-full overflow-hidden rounded-3xl border border-[#2A2B28]/80 bg-[#090A09] p-6 md:p-10"
      >
        <svg
          viewBox="0 0 900 480"
          className="w-full"
          style={{ maxHeight: '420px' }}
          fill="none"
        >
          {/* Subtle Grid System */}
          {[80, 160, 240, 320, 400].map((y) => (
            <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="rgba(42,43,40,0.5)" strokeWidth="1" strokeDasharray="4 4" />
          ))}
          {[150, 300, 450, 600, 750].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="480" stroke="rgba(42,43,40,0.5)" strokeWidth="1" strokeDasharray="4 4" />
          ))}

          {/* Location Dots */}
          {LOCATIONS.map((loc) => {
            const isSelected = active?.id === loc.id
            return (
              <g
                key={loc.id}
                onClick={() => handleDot(loc)}
                className="cursor-pointer group"
              >
                {/* Ripple ring */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isSelected ? 22 : 12}
                  fill={isSelected ? 'rgba(16,185,129,0.15)' : 'transparent'}
                  stroke={isSelected ? '#10B981' : 'rgba(167,165,155,0.25)'}
                  strokeWidth="1"
                  className="transition-all duration-300"
                />
                {/* Center dot */}
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r={isSelected ? 6 : 4}
                  fill={isSelected ? '#10B981' : '#F1EFE8'}
                  className="transition-all duration-300"
                />
                {/* Text label */}
                <text
                  x={loc.x + 16}
                  y={loc.y + 4}
                  fontSize="10"
                  fill={isSelected ? '#F1EFE8' : '#A7A59B'}
                  fontFamily="Inter, sans-serif"
                  letterSpacing="1.5"
                  className="uppercase select-none transition-colors duration-300 font-medium"
                >
                  {loc.name}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Selected Location HUD Panel */}
        {active && (
          <div
            ref={panelRef}
            className="mt-8 pt-8 border-t border-[#2A2B28]/80 flex flex-col md:flex-row gap-8 items-start justify-between"
          >
            <div className="md:w-4/12">
              <span className="text-[10px] tracking-[0.25em] uppercase text-emerald-400 font-sans block mb-1">
                {active.count}
              </span>
              <h3 className="font-serif text-3xl text-[#F1EFE8] font-light mb-2">
                {active.name}
              </h3>
              <p className="font-sans text-xs text-[#A7A59B] leading-relaxed">
                {active.sub}
              </p>
            </div>

            <div className="flex gap-4 flex-wrap md:w-8/12">
              {active.photos.map((src, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-[#2A2B28] group relative"
                  style={{ width: 170, height: 120, flexShrink: 0 }}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
