import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// USER'S GENUINE WILDLIFE PHOTOGRAPHS FROM D:\wildlife\images
const MOMENTS = [
  {
    id: '01',
    category: 'LATEST CATALOGUE',
    title: 'THE STARE ACROSS GRANITE',
    species: 'INDIAN LEOPARD (PANTHERA PARDUS FUSCA)',
    location: 'JAWAÏ ROCKS, RAJASTHAN',
    subtitle: 'LIGHT & SHADOWS',
    description:
      'Light and Shadows aims to magnify the withering world we live in using transitional elements of nature. Through the clouds of change and the fading mist, the leopard stands in quiet supremacy, signifying vanishing grandeur in an authentic photographic finish.',
    src: '/images/user/IMG_4761.JPG',
  },
  {
    id: '02',
    category: 'CANOPY CHRONICLES',
    title: 'FORKED PERCEPTION',
    species: 'MALABAR PIT VIPER (CRASPEDOCEPHALUS)',
    location: 'AGUMBE RAINFOREST, KARNATAKA',
    subtitle: 'SENSORY EMERGENCE',
    description:
      'Sensing vibrations through darkness — precision in miniature. Perched in absolute equilibrium amidst wet tropical foliage, tasting the monsoon air in search of thermal signatures.',
    src: '/images/user/IMG_4634.JPG',
  },
  {
    id: '03',
    category: 'RAINFOREST NOCTURNE',
    title: 'SUSPENDED GRAVITY',
    species: 'MALABAR GLIDING FROG',
    location: 'WESTERN GHATS, INDIA',
    subtitle: 'NIGHT SENTINEL',
    description:
      'Perched on a whisper of wood, waiting for monsoon droplets. An emblem of undisturbed rainforest ecosystems, adapted with luminous pigments and webbed membranes for high-canopy navigation.',
    src: '/images/user/IMG_4632.JPG',
  },
  {
    id: '04',
    category: 'PRIMEVAL CORRIDORS',
    title: 'THE ANCIENT TUSKER',
    species: 'ASIAN ELEPHANT (ELEPHAS MAXIMUS)',
    location: 'KABINI RESERVE, KARNATAKA',
    subtitle: 'TEXTURE OF TIME',
    description:
      'Decades etched into ivory and furrowed hide. Moving like smoke through towering teak groves, leaving colossal footprints that nurture micro-habitats across ancient migration corridors.',
    src: '/images/user/IMG_7965.PNG',
  },
  {
    id: '05',
    category: 'DEWPOINT MACRO',
    title: 'THE DEWDROP SENTINEL',
    species: 'BANDED GROUND GECKO',
    location: 'KUDREMUKH RAINFOREST',
    subtitle: 'LIQUID JEWELS',
    description:
      'Condensation clinging to scales finer than grains of sand. Navigating leaf litter and wet boulders with micro-lamellae in absolute silence under starless midnight skies.',
    src: '/images/user/IMG_4642.JPG',
  },
  {
    id: '06',
    category: 'VERDANT REALMS',
    title: 'THE MONOLITH EMERGES',
    species: 'WILD BULL GAUR & ELEPHANT',
    location: 'PERIYAR SANCTUARY, KERALA',
    subtitle: 'ELEMENTAL SILENCE',
    description:
      'Parting the waist-high emerald grass as morning mist burns off the lake. An emblem of undisturbed wilderness, gentle yet possessing boundless elemental strength.',
    src: '/images/user/IMG_7964.JPG',
  },
]

export default function Moments() {
  const containerRef = useRef(null)
  const pinSectionRef = useRef(null)
  const trackRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const total = MOMENTS.length
    if (!trackRef.current || !containerRef.current || !pinSectionRef.current) return

    // GSAP Horizontal Pinned Scroll:
    // Scrolls smoothly through all slides horizontally from 0 to -(total - 1) * 100vw
    // Down scroll advances to next slide (moves left)
    // Up scroll returns to previous slide (moves right)
    const tween = gsap.to(trackRef.current, {
      xPercent: -100 * (total - 1) / total,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinSectionRef.current,
        scrub: 1,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.round(self.progress * (total - 1)))
          setActiveIdx(idx)
        },
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  const scrollToSlide = (index) => {
    if (!containerRef.current) return
    const total = MOMENTS.length
    const startY = containerRef.current.offsetTop
    const totalDist = containerRef.current.offsetHeight - window.innerHeight
    const targetY = startY + (index / (total - 1)) * totalDist
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  const current = MOMENTS[activeIdx]

  return (
    <section
      id="wildlife"
      ref={containerRef}
      className="relative w-full"
      style={{
        height: `${MOMENTS.length * 100}vh`, // Dedicated scroll track for all moments
        background: '#ECE9E2', // Elegant Shaaz Jung warm editorial tone
        color: '#1A1B18',
      }}
    >
      {/* Pinned Editorial Stage */}
      <div
        ref={pinSectionRef}
        className="sticky top-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8 select-none"
      >
        {/* Top Editorial Header & Catalogue Breadcrumb */}
        <div className="flex justify-between items-center border-b border-[#D5D0C6] pb-2.5 sm:pb-3 px-4 sm:px-8 md:px-14 z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#888]">
              CATALOGUE {current.id} / 06
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B3874B]" />
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#B3874B] font-semibold truncate max-w-[140px] sm:max-w-none">
              Wildlife Photography India · {current.category}
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:inline font-sans text-[10px] tracking-[0.18em] uppercase text-[#777]">
              [ Scroll ↓ moves to next · Scroll ↑ moves to prev ]
            </span>
            <span className="font-serif text-base sm:text-lg text-[#1A1B18]">
              {current.id}
              <span className="text-[#999] text-xs font-sans"> / 06</span>
            </span>
          </div>
        </div>

        {/* Central Stage: Full Horizontal Sliding Track */}
        <div className="relative flex-1 w-full my-auto overflow-hidden flex items-center">
          <div
            ref={trackRef}
            className="flex flex-row h-full items-center will-change-transform"
            style={{ width: `${MOMENTS.length * 100}%` }}
          >
            {MOMENTS.map((item) => (
              <div
                key={item.id}
                className="h-full flex items-center justify-center flex-shrink-0 px-4 sm:px-8 md:px-12"
                style={{ width: `${100 / MOMENTS.length}%` }}
              >
                {/* Each Slide: Both Image & Description Centered Together on the Page */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-14 w-full max-w-5xl mx-auto">
                  {/* Left Column: Photograph */}
                  <div className="w-full lg:w-[46%] flex items-center justify-center flex-shrink-0">
                    <div className="relative w-[185px] xs:w-[215px] sm:w-[300px] md:w-[380px] lg:w-[410px] aspect-[4/5] bg-[#0E0F0D] rounded-sm overflow-hidden shadow-2xl border border-black/10">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />

                      {/* Subtle vignette border */}
                      <div
                        className="absolute inset-0 pointer-events-none border border-black/15"
                        style={{
                          background:
                            'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Column: Side-by-Side Description (Centered on page, never overlaps) */}
                  <div className="w-full lg:w-[54%] flex flex-col justify-center flex-shrink-0 max-w-md lg:max-w-lg text-left">
                    <h2
                      className="font-serif text-[#B3874B] tracking-[0.05em] uppercase leading-tight mb-1 sm:mb-2 text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-normal"
                    >
                      {item.subtitle}
                    </h2>

                    <p className="font-sans text-[9px] sm:text-[11px] tracking-[0.25em] uppercase font-semibold text-[#3A3B36] mb-1.5 sm:mb-2.5">
                      {item.category}
                    </p>

                    <p className="font-sans text-[11px] sm:text-xs md:text-sm text-[#4A4B45] font-light leading-relaxed mb-2.5 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                      {item.description}
                    </p>

                    <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#888] mb-3 sm:mb-5">
                      LOCATION: <span className="text-[#1A1B18]">{item.location}</span>
                      <br />
                      SPECIES: <span className="text-[#1A1B18]">{item.species}</span>
                    </p>

                    <div>
                      <a
                        href="#contact"
                        className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 bg-[#1C1D1A] text-[#F1EFE8] font-sans text-[9px] sm:text-[10px] tracking-[0.25em] uppercase hover:bg-[#B3874B] transition-colors duration-300 shadow-md"
                      >
                        Explore Catalogues
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination & Progress Line */}
        <div className="flex justify-between items-center pt-2.5 sm:pt-3 border-t border-[#D5D0C6] px-4 sm:px-8 md:px-14 z-20">
          <div className="flex items-center gap-2">
            {MOMENTS.map((m, i) => (
              <button
                key={m.id}
                onClick={() => scrollToSlide(i)}
                className="py-2.5 px-0.5 focus:outline-none group cursor-pointer"
                title={`Go to ${m.title}`}
              >
                <div
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    i === activeIdx
                      ? 'w-8 sm:w-10 bg-[#B3874B]'
                      : 'w-2.5 sm:w-3 bg-[#D5D0C6] group-hover:bg-[#999]'
                  }`}
                />
              </button>
            ))}
          </div>

          <span className="font-serif italic text-xs text-[#777] truncate max-w-[150px] xs:max-w-[200px] sm:max-w-[300px] md:max-w-none text-right">
            "{current.title}"
          </span>
        </div>
      </div>
    </section>
  )
}
