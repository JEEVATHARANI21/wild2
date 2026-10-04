import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── USER WILDLIFE PHOTOGRAPHS FROM D:\wildlife\images ──────────────────────────
const ALBUM = [
  {
    id: 1,
    src: '/images/user/IMG_4761.JPG',
    category: 'Big Cats',
    title: 'Eyes of the Forest — Leopard Gaze',
    location: 'Jawaï Rocks, Rajasthan',
    year: '2026',
    lens: '400mm f/2.8',
    iso: 'ISO 800',
    shutter: '1/1600s',
    story:
      'Observed this elusive leopard surveying the valley from ancient granite boulders. Two hours of complete silence culminated in this piercing gaze.',
  },
  {
    id: 2,
    src: '/images/user/IMG_4634.JPG',
    category: 'Reptiles',
    title: 'Emerald Pit Viper — Sensory Drift',
    location: 'Agumbe Rainforest',
    year: '2026',
    lens: '100mm Macro f/2.8',
    iso: 'ISO 640',
    shutter: '1/250s',
    story:
      'Tasting the humid monsoon air with its forked tongue. The precise scales and iridescent green hue shimmer under dense tropical canopy.',
  },
  {
    id: 3,
    src: '/images/user/IMG_4632.JPG',
    category: 'Amphibians',
    title: 'Malabar Gliding Frog — Night Sentinel',
    location: 'Western Ghats, India',
    year: '2026',
    lens: '90mm Macro',
    iso: 'ISO 400',
    shutter: '1/200s',
    story:
      'Perched on a solitary vine above a torrential mountain stream, waiting for nocturnal insects in absolute equilibrium.',
  },
  {
    id: 4,
    src: '/images/user/IMG_7965.PNG',
    category: 'Giants',
    title: 'Texture of Time — Bull Elephant',
    location: 'Kabini Reserve',
    year: '2026',
    lens: '600mm f/4',
    iso: 'ISO 320',
    shutter: '1/1000s',
    story:
      'Every crack along the tusk and furrowed skin speaks of decades migrating across primeval forest corridors.',
  },
  {
    id: 5,
    src: '/images/user/IMG_4642.JPG',
    category: 'Macro Specimen',
    title: 'Banded Gecko — Dewdrop Crown',
    location: 'Kudremukh Forest',
    year: '2026',
    lens: '105mm Macro',
    iso: 'ISO 500',
    shutter: '1/160s',
    story:
      'Microscopic water droplets cling to the scales and eyes of this rare nocturnal gecko following pre-dawn condensation.',
  },
  {
    id: 6,
    src: '/images/user/IMG_6853.PNG',
    category: 'Wildlife',
    title: 'Indian Gaur — Primeval Monolith',
    location: 'Nilgiri Foothills',
    year: '2026',
    lens: '300mm f/2.8',
    iso: 'ISO 400',
    shutter: '1/800s',
    story:
      'Enormous strength framed against pure void. The curled horns tell tales of territorial clashes deep in the teak forests.',
  },
  {
    id: 7,
    src: '/images/user/IMG_4638.JPG',
    category: 'Nocturnal',
    title: 'Night Bullfrog — Marshland Guardian',
    location: 'Anamalai Foothills',
    year: '2026',
    lens: '100mm Macro',
    iso: 'ISO 800',
    shutter: '1/125s',
    story:
      'Basking amidst submerged freshwater vegetation as night falls, vocal sacs vibrating to call across the swamp.',
  },
  {
    id: 8,
    src: '/images/user/IMG_7964.JPG',
    category: 'Giants',
    title: 'Emergence in Verdant Light',
    location: 'Periyar Sanctuary',
    year: '2026',
    lens: '500mm f/4',
    iso: 'ISO 250',
    shutter: '1/1250s',
    story:
      'Towering elephant stepping through waist-high grassland in radiant golden morning light.',
  },
  {
    id: 9,
    src: '/images/user/IMG_4639.JPG',
    category: 'Reptiles',
    title: 'Bamboo Viper — The Coiled Path',
    location: 'Valparai Canopies',
    year: '2026',
    lens: '70-200mm f/2.8',
    iso: 'ISO 1000',
    shutter: '1/500s',
    story:
      'Camouflaged seamlessly among thorny vines, motionless for hours waiting for unsuspecting tree frogs.',
  },
  {
    id: 10,
    src: '/images/user/IMG_4637.JPG',
    category: 'Macro Biology',
    title: 'Genesis — Glass Frog Embryos',
    location: 'Rainforest Stream',
    year: '2026',
    lens: '65mm 2x-5x Ultra Macro',
    iso: 'ISO 200',
    shutter: '1/100s',
    story:
      'Life suspended in transparent jelly clutches beneath broad leaves, developing tadpoles visible to the naked eye.',
  },
  {
    id: 11,
    src: '/images/user/IMG_4643.JPG',
    category: 'Reptiles',
    title: 'Vine Snake Alert — Leaf Mimic',
    location: 'Coorg Valley',
    year: '2026',
    lens: '100mm Macro',
    iso: 'ISO 400',
    shutter: '1/320s',
    story:
      'Slender as a whip, floating horizontally like a vine swaying in the forest breeze.',
  },
  {
    id: 12,
    src: '/images/user/IMG_4633.JPG',
    category: 'Amphibians',
    title: 'Golden Tree Frog — Luminescent Reach',
    location: 'Silent Valley',
    year: '2026',
    lens: '105mm Macro',
    iso: 'ISO 640',
    shutter: '1/180s',
    story:
      'Grasping vertical bark with suction pads, throat glowing luminous yellow in the flashlight illumination.',
  },
]

const AUTO_CHANGE_INTERVAL = 4000 // 4 seconds per photo

export default function Album() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  const [active, setActive] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const currentImgRef = useRef(null)
  const prevImgRef = useRef(null)
  const metaRef = useRef(null)
  const specRef = useRef(null)

  // Drag / Swipe handling
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const isDragging = useRef(false)

  // ── CINEMATIC BLUR-DISSOLVE TRANSITION (NO BLANK / FLASH) ──
  const goTo = useCallback(
    (nextIdx, dir = 1) => {
      if (animating) return
      const bounded = (nextIdx + ALBUM.length) % ALBUM.length
      if (bounded === active) return

      setAnimating(true)
      // Retain the old image underneath while blurring to the next
      setPrevIndex(active)
      setActive(bounded)

      // Animate metadata texts with a gentle fade
      gsap.fromTo(
        [metaRef.current, specRef.current],
        { opacity: 0.2, y: 10 * dir },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )

      // Cross-dissolve blur transition: incoming image blurs into sharp focus while previous stays visible underneath
      const currentEl = currentImgRef.current
      const prevEl = prevImgRef.current

      if (currentEl) {
        gsap.fromTo(
          currentEl,
          {
            opacity: 0,
            filter: 'blur(16px)',
            scale: 1.05,
          },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            onComplete: () => {
              setPrevIndex(null)
              setAnimating(false)
            },
          }
        )
      }

      if (prevEl) {
        gsap.to(prevEl, {
          opacity: 0,
          filter: 'blur(14px)',
          scale: 0.98,
          duration: 0.85,
          ease: 'power2.inOut',
        })
      }
    },
    [active, animating]
  )

  const next = useCallback(() => goTo(active + 1, 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1, -1), [active, goTo])

  // ── AUTO-CHANGE TIMER (Switches every 4.0s) ──
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      next()
    }, AUTO_CHANGE_INTERVAL)

    return () => clearInterval(timer)
  }, [isAutoPlaying, next])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Swipe & Touch
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }
  const onTouchEnd = (e) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX
    const deltaY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      deltaX > 0 ? next() : prev()
    }
  }

  // Mouse Drag
  const onMouseDown = (e) => {
    isDragging.current = true
    touchStartX.current = e.clientX
  }
  const onMouseUp = (e) => {
    if (!isDragging.current) return
    isDragging.current = false
    const deltaX = touchStartX.current - e.clientX
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? next() : prev()
    }
  }

  const currentPhoto = ALBUM[active]
  const previousPhoto = prevIndex !== null ? ALBUM[prevIndex] : null

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full pt-10 md:pt-14 pb-24 md:pb-32 overflow-hidden"
      style={{ background: '#0B0C0A' }}
    >
      {/* Editorial Header */}
      <div
        ref={headerRef}
        className="px-5 sm:px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-5 sm:gap-6"
      >
        <div>
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#B3874B] animate-pulse" />
            <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B3874B] font-medium">
              Fine Art Specimen Archive · Section 03
            </p>
          </div>
          <h2
            className="font-serif text-[#F1EFE8] leading-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light"
          >
            Wildlife Photography <span className="italic text-[#B3874B] font-normal">Gallery</span>
          </h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 sm:gap-6 font-sans text-xs">
          {/* Auto-Slide Toggle Button */}
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-[#2A2B28] bg-[#111310] text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A7A59B] hover:text-[#F1EFE8] hover:border-emerald-500 transition-all cursor-pointer"
            title={isAutoPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
          >
            <span
              className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full ${
                isAutoPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-[#555]'
              }`}
            />
            <span>{isAutoPlaying ? 'Auto Blur: Active' : 'Auto Blur: Paused'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-2xl font-serif text-[#F1EFE8] font-light">
              {String(active + 1).padStart(2, '0')}
            </span>
            <span className="text-[#A7A59B]">/</span>
            <span className="text-[#A7A59B]">
              {String(ALBUM.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage with Seamless Dual-Layer Blur Crossfade */}
      <div
        className="relative w-full mx-auto px-3 sm:px-8 md:px-16 select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={() => setIsAutoPlaying(false)} // Pause when hovering
        onMouseLeave={() => setIsAutoPlaying(true)}  // Resume when cursor leaves
      >
        <div className="relative w-full h-[65vh] md:h-[78vh] rounded-2xl md:rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing border border-[#2A2B28]/60 shadow-2xl bg-[#090A09]">
          {/* PREVIOUS IMAGE (stays underneath while blurring away to prevent blank white/black flashes) */}
          {previousPhoto && (
            <img
              ref={prevImgRef}
              src={previousPhoto.src}
              alt={previousPhoto.title}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none will-change-[filter,opacity,transform]"
            />
          )}

          {/* ACTIVE / INCOMING IMAGE (smoothly dissolves from blur into sharpness) */}
          <img
            ref={currentImgRef}
            src={currentPhoto.src}
            alt={currentPhoto.title}
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover object-center will-change-[filter,opacity,transform]"
          />

          {/* Cinematic Vignette and Dark Gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(11,12,10,0.92) 0%, rgba(11,12,10,0.2) 50%, rgba(11,12,10,0.4) 100%)',
            }}
          />

          {/* Left / Right Click Swipe Zones */}
          <div
            onClick={prev}
            className="absolute top-0 left-0 w-1/2 h-full z-20 cursor-w-resize flex items-center pl-6 opacity-0 hover:opacity-100 transition-opacity duration-300"
            title="Previous Specimen"
          >
            <div className="w-12 h-12 rounded-full bg-[#0B0C0A]/80 border border-[#2A2B28] flex items-center justify-center text-[#F1EFE8] backdrop-blur-md">
              ←
            </div>
          </div>

          <div
            onClick={next}
            className="absolute top-0 right-0 w-1/2 h-full z-20 cursor-e-resize flex items-center justify-end pr-6 opacity-0 hover:opacity-100 transition-opacity duration-300"
            title="Next Specimen"
          >
            <div className="w-12 h-12 rounded-full bg-[#0B0C0A]/80 border border-[#2A2B28] flex items-center justify-center text-[#F1EFE8] backdrop-blur-md">
              →
            </div>
          </div>

          {/* Category Tag */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 z-30 pointer-events-none flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-[10px] font-sans tracking-[0.25em] uppercase bg-[#0B0C0A]/70 border border-[#2A2B28] text-emerald-400 backdrop-blur-md">
              {currentPhoto.category}
            </span>
          </div>

          {/* Bottom Story & EXIF Specimen Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 z-30 pointer-events-none flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6">
            <div ref={metaRef} className="max-w-2xl">
              <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#A7A59B] mb-1.5 sm:mb-2">
                {currentPhoto.location} · {currentPhoto.year}
              </p>
              <h3
                className="font-serif text-[#F1EFE8] mb-2 sm:mb-3 leading-tight text-xl sm:text-3xl md:text-4xl font-light"
              >
                {currentPhoto.title}
              </h3>
              <p className="font-sans text-[11px] sm:text-xs md:text-sm text-[#A7A59B] font-light leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">
                "{currentPhoto.story}"
              </p>
            </div>

            {/* Technical EXIF Metadata Tag */}
            <div
              ref={specRef}
              className="flex items-center gap-3 sm:gap-4 bg-[#0B0C0A]/80 border border-[#2A2B28] rounded-xl px-3.5 sm:px-5 py-2 sm:py-3 backdrop-blur-md text-[10px] sm:text-[11px] font-sans text-[#A7A59B]"
            >
              <div>
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-[#666]">
                  Optics
                </span>
                <span className="text-[#F1EFE8]">{currentPhoto.lens}</span>
              </div>
              <div className="w-[1px] h-5 sm:h-6 bg-[#2A2B28]" />
              <div>
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-[#666]">
                  Sensitivity
                </span>
                <span className="text-[#F1EFE8]">{currentPhoto.iso}</span>
              </div>
              <div className="w-[1px] h-5 sm:h-6 bg-[#2A2B28]" />
              <div>
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-[#666]">
                  Speed
                </span>
                <span className="text-[#F1EFE8]">{currentPhoto.shutter}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Interactive Thumbnail Reel */}
      <div className="mt-6 sm:mt-8 px-3 sm:px-8 md:px-16 overflow-x-auto scrollbar-none flex gap-2.5 sm:gap-3 py-2">
        {ALBUM.map((item, index) => {
          const isCurrent = index === active
          return (
            <button
              key={item.id}
              onClick={() => goTo(index, index > active ? 1 : -1)}
              className={`flex-shrink-0 group relative w-20 md:w-28 h-14 md:h-18 rounded-lg overflow-hidden border transition-all duration-300 ${
                isCurrent
                  ? 'border-emerald-400 scale-105 shadow-lg shadow-emerald-950/40 opacity-100'
                  : 'border-[#2A2B28] opacity-40 hover:opacity-80 hover:border-[#444]'
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-1 left-1.5 text-[9px] font-sans font-mono text-[#F1EFE8]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
