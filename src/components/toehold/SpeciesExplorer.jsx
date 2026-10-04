import { useState, useRef, useEffect, useCallback } from 'react'
import { SPECIES_DATA } from '../../data/speciesData'
import { TOURS_DATA } from '../../data/photoToursData'

export default function SpeciesExplorer({ onSelectTour }) {
  const [activeCategory, setActiveCategory] = useState('all') // 'all' | 'Big Cats & Mammals' | 'Rare & Endemic Birds'
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  const sliderRef = useRef(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const hasDraggedRef = useRef(false)

  const filteredSpecies = SPECIES_DATA.filter((item) => {
    if (activeCategory === 'all') return true
    return item.category === activeCategory
  })

  // Update scroll states & indicators
  const updateScrollState = useCallback(() => {
    if (!sliderRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)

    // Calculate approximate current card index
    const cards = sliderRef.current.children
    if (cards && cards.length > 0) {
      const cardWidth = cards[0].offsetWidth + 24 // card width + gap
      const index = Math.round(scrollLeft / cardWidth)
      setCurrentIndex(Math.min(Math.max(index, 0), filteredSpecies.length - 1))
    }
  }, [filteredSpecies.length])

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState, filteredSpecies])

  // Reset slider position when changing category filter
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  // Slide left & right programmatic animation
  const slide = (direction) => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const firstCard = container.querySelector('[data-card="species"]')
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 380
    const scrollAmount = cardWidth * 1.05

    if (direction === 'left') {
      if (container.scrollLeft <= 10) {
        // Loop to end
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      }
    } else {
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
        // Loop to start
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  // Scroll to a specific card index
  const scrollToIndex = (idx) => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const firstCard = container.querySelector('[data-card="species"]')
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 380
    container.scrollTo({ left: idx * cardWidth, behavior: 'smooth' })
  }

  // Auto-play interval: moves right gently every 4.5 seconds when not hovered
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return
    const timer = setInterval(() => {
      slide('right')
    }, 4500)
    return () => clearInterval(timer)
  }, [isAutoPlaying, isHovered])

  // Mouse Drag to slide left and right
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return
    isDraggingRef.current = true
    hasDraggedRef.current = false
    startXRef.current = e.pageX - sliderRef.current.offsetLeft
    scrollLeftRef.current = sliderRef.current.scrollLeft
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startXRef.current) * 1.5 // Multiplier for smooth glide
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true
    }
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  const handleCardClick = (species) => {
    if (hasDraggedRef.current) return // Prevent click if dragging
    if (onSelectTour) {
      const tour =
        TOURS_DATA.animalTours.find((t) => t.id === species.linkedTourId) ||
        TOURS_DATA.birdTours.find((t) => t.id === species.linkedTourId)
      if (tour) {
        onSelectTour(tour)
        return
      }
    }
    const el = document.getElementById('tours')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="species"
      className="py-24 sm:py-28 bg-[#0a0c0a] border-b border-[#242923] select-none relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] bg-[#D6A85C]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/6 w-[400px] h-[300px] bg-[#B87333]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="w-7 h-[1.5px] bg-[#B87333]" />
              <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
                WILDLIFE & AVIAN ENCOUNTERS · SECTION 05
              </span>
              <span className="w-7 h-[1.5px] bg-[#B87333]" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight">
              Target Species <span className="italic text-[#D6A85C] font-normal">Showcase</span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed mt-3 max-w-xl">
              Every expedition is calibrated around the behavioral rhythms, territory markers, and prime lighting angles of specific wildlife subjects. Slide through our flagship target species below.
            </p>
          </div>

          {/* Left / Right Movable Control Panel */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 self-start md:self-end">
            {/* Position Counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151815] border border-[#242923] text-xs font-mono">
              <span className="text-[#D6A85C] font-semibold">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-[#A7A59B]/40">/</span>
              <span className="text-[#A7A59B]">
                {String(filteredSpecies.length).padStart(2, '0')}
              </span>
            </div>

            {/* Auto-play toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              title={isAutoPlaying ? 'Pause Auto-slide' : 'Resume Auto-slide'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/60 text-[#A7A59B] hover:text-[#F2F0E8] text-[11px] font-sans transition-all cursor-pointer"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isAutoPlaying ? 'bg-[#25D366] animate-pulse' : 'bg-[#A7A59B]/40'
                }`}
              />
              <span>{isAutoPlaying ? 'Auto-Moving' : 'Paused'}</span>
            </button>

            {/* Left & Right Interactive Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => slide('left')}
                aria-label="Previous target species"
                className="w-11 h-11 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] hover:bg-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={() => slide('right')}
                aria-label="Next target species"
                className="w-11 h-11 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] hover:bg-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-[0_2px_14px_rgba(214,168,92,0.35)]'
                : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923]'
            }`}
          >
            All Encounters ({filteredSpecies.length})
          </button>
          <button
            onClick={() => handleCategoryChange('Big Cats & Mammals')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'Big Cats & Mammals'
                ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-[0_2px_14px_rgba(214,168,92,0.35)]'
                : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923]'
            }`}
          >
            <span>🐅</span>
            <span>Big Cats & Mammals</span>
          </button>
          <button
            onClick={() => handleCategoryChange('Rare & Endemic Birds')}
            className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'Rare & Endemic Birds'
                ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-[0_2px_14px_rgba(214,168,92,0.35)]'
                : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923]'
            }`}
          >
            <span>🦜</span>
            <span>Rare & Endemic Birds</span>
          </button>

          <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-sans text-[#A7A59B]/70 ml-auto italic">
            <span>← Drag or use arrows to explore all species →</span>
          </span>
        </div>

        {/* Carousel Container with Left/Right Movable Track */}
        <div
          className="relative group/track"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            handleMouseUp()
          }}
        >
          {/* Floating Left Arrow (Desktop) */}
          <button
            onClick={() => slide('left')}
            aria-label="Slide Left"
            className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#080908]/90 backdrop-blur-md border border-[#D6A85C]/40 text-[#D6A85C] hover:bg-[#D6A85C] hover:text-[#080908] shadow-2xl flex items-center justify-center opacity-0 group-hover/track:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hidden sm:flex"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Floating Right Arrow (Desktop) */}
          <button
            onClick={() => slide('right')}
            aria-label="Slide Right"
            className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#080908]/90 backdrop-blur-md border border-[#D6A85C]/40 text-[#D6A85C] hover:bg-[#D6A85C] hover:text-[#080908] shadow-2xl flex items-center justify-center opacity-0 group-hover/track:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer hidden sm:flex"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Left & Right Edge Gradients for Smooth Cinematic Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#0a0c0a] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#0a0c0a] to-transparent pointer-events-none z-10" />

          {/* Horizontal Movable Track */}
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-1 cursor-grab active:cursor-grabbing select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {filteredSpecies.map((species) => (
              <article
                key={species.id}
                data-card="species"
                onClick={() => handleCardClick(species)}
                className="group w-[300px] sm:w-[350px] md:w-[380px] shrink-0 snap-start rounded-3xl bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/70 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_22px_55px_rgba(214,168,92,0.22)] hover:-translate-y-2 relative"
              >
                {/* Top Image Section with Badges */}
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-[#080908]">
                  <img
                    src={species.image}
                    alt={species.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-[0.9] group-hover:brightness-100"
                  />
                  {/* Subtle Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-[#151815]/30 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-full bg-[#080908]/85 backdrop-blur-md border border-[#242923] text-[#D6A85C] font-sans text-[9.5px] font-bold tracking-wider uppercase">
                      {species.status}
                    </span>
                  </div>

                  {/* Category Avatar Icon */}
                  <div className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-[#080908]/85 backdrop-blur-md border border-[#242923] flex items-center justify-center text-lg shadow-lg group-hover:border-[#D6A85C] group-hover:scale-110 transition-all">
                    {species.icon}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Common & Scientific Name */}
                    <div>
                      <h3 className="font-serif text-2xl sm:text-[26px] text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                        {species.name}
                      </h3>
                      <p className="font-serif italic text-xs text-[#A7A59B] mt-1 tracking-wide">
                        {species.scientificName}
                      </p>
                    </div>

                    {/* Quick Facts Grid */}
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      <div className="flex items-start gap-2 text-xs text-[#A7A59B]">
                        <span className="text-[#D6A85C] shrink-0 mt-0.5">📍</span>
                        <span>
                          <strong className="text-[#F2F0E8] font-medium">Habitat:</strong>{' '}
                          {species.bestDestination}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#A7A59B]">
                        <span className="text-[#D6A85C] shrink-0 mt-0.5">🗓️</span>
                        <span>
                          <strong className="text-[#F2F0E8] font-medium">Prime Season:</strong>{' '}
                          {species.bestSeason}
                        </span>
                      </div>
                    </div>

                    {/* Field Photography Technique Box */}
                    <div className="p-3 rounded-2xl bg-[#080908]/70 border border-[#242923] group-hover:border-[#D6A85C]/30 transition-colors">
                      <div className="flex items-center gap-1.5 text-[10.5px] font-sans uppercase tracking-wider text-[#D6A85C] font-semibold mb-1">
                        <span>📷</span>
                        <span>Field Guidance & Optics:</span>
                      </div>
                      <p className="font-sans text-[11px] text-[#A7A59B] leading-relaxed font-light line-clamp-3">
                        {species.photoTips}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA Strip */}
                  <div className="pt-3 border-t border-[#242923] flex items-center justify-between">
                    <span className="text-xs font-sans uppercase tracking-wider text-[#D6A85C] font-semibold flex items-center gap-1.5 group-hover:text-[#F2F0E8] transition-colors">
                      <span>Explore Safari</span>
                      <span className="transition-transform group-hover:translate-x-1 font-bold">
                        →
                      </span>
                    </span>
                    <span className="text-xs font-sans text-[#A7A59B] group-hover:text-[#D6A85C] transition-colors">
                      From ₹XX,XXX
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Pagination & Progress Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-[#242923]/60">
          {/* Clickable Dots */}
          <div className="flex items-center gap-2">
            {filteredSpecies.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Jump to species ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 h-2 bg-[#D6A85C] shadow-[0_0_8px_rgba(214,168,92,0.6)]'
                    : 'w-2 h-2 bg-[#242923] hover:bg-[#A7A59B]'
                }`}
              />
            ))}
          </div>

          {/* Swipe / Movable Gesture Guidance */}
          <div className="flex items-center gap-3 text-xs font-sans text-[#A7A59B]">
            <span className="hidden sm:inline">Use trackpad, grab & drag, or arrows to slide</span>
            <span className="inline-flex items-center gap-1 text-[#D6A85C] font-semibold uppercase tracking-wider text-[10px]">
              <span>100% Photographic Mentorship</span>
              <span>✦</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

