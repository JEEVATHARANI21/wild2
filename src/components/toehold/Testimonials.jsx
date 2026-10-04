import { useState, useEffect, useRef } from 'react'

export default function Testimonials({ testimonials = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const total = testimonials.length

  // Auto-play animation every 5 seconds
  useEffect(() => {
    if (isPaused || total <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused, total])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }

  return (
    <section
      id="testimonials"
      className="py-24 px-5 sm:px-8 md:px-16 bg-[#080908] border-b border-[#242923] relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D6A85C]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D6A85C] font-semibold flex items-center gap-1.5">
              <span>💬</span>
              <span>COMMUNITY STORIES · SECTION 05</span>
            </span>
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight">
            Word from the <span className="italic text-[#D6A85C] font-normal">Field</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-3 font-light leading-relaxed max-w-xl mx-auto">
            Live Instagram community feedback and unedited reviews from photographers who shared our Gypsy vehicles across India’s wildest sanctuaries.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Main Animated Card */}
          <div className="overflow-hidden rounded-3xl bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/60 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="p-6 sm:p-9 transition-all duration-500 ease-out">
              {/* Instagram Card Header */}
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#242923]">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-[#D6A85C] via-[#B87333] to-[#E1306C]">
                    <img
                      src={testimonials[currentIndex]?.avatar}
                      alt={testimonials[currentIndex]?.name}
                      className="w-full h-full rounded-full object-cover border border-[#080908]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans text-sm sm:text-base font-semibold text-[#F2F0E8] leading-tight">
                        {testimonials[currentIndex]?.name}
                      </span>
                      <span className="text-sky-400 text-xs" title="Verified Photographer">
                        ✓
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-sans text-[#A7A59B] mt-0.5">
                      <span className="text-[#D6A85C] font-medium">{testimonials[currentIndex]?.handle}</span>
                      <span>•</span>
                      <span>{testimonials[currentIndex]?.location}</span>
                    </div>
                  </div>
                </div>

                {/* Star rating & Instagram badge */}
                <div className="text-right">
                  <div className="flex items-center justify-end gap-0.5 text-[#D6A85C] text-xs sm:text-sm mb-1">
                    {'★★★★★'}
                  </div>
                  <span className="text-[10px] font-sans tracking-wider uppercase text-[#A7A59B] bg-[#080908] px-2.5 py-1 rounded-full border border-[#242923]">
                    {testimonials[currentIndex]?.date || 'Verified Review'}
                  </span>
                </div>
              </div>

              {/* Instagram Comment / Review Quote */}
              <div className="py-6 sm:py-7">
                <blockquote className="font-serif italic text-base sm:text-lg md:text-xl text-[#F2F0E8] leading-relaxed font-light">
                  “{testimonials[currentIndex]?.quote}”
                </blockquote>
              </div>

              {/* Card Footer: Tour Name, Gear & Instagram Reactions */}
              <div className="pt-4 border-t border-[#242923] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold">
                      EXPEDITION:
                    </span>
                    <span className="text-[#F2F0E8] font-medium">
                      {testimonials[currentIndex]?.tour}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#A7A59B]">
                    <span>📷</span>
                    <span>{testimonials[currentIndex]?.gear}</span>
                  </div>
                </div>

                {/* Simulated Instagram Heart reaction */}
                <div className="flex items-center gap-2 text-[11px] font-sans text-[#A7A59B] bg-[#080908] px-3.5 py-1.5 rounded-full border border-[#242923] self-start sm:self-auto">
                  <span className="text-rose-500">❤️</span>
                  <span>{testimonials[currentIndex]?.likes || 184} likes on Instagram</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] hover:bg-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all cursor-pointer shadow-lg group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform text-sm font-bold">←</span>
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-gradient-to-r from-[#D6A85C] to-[#B87333]'
                      : 'w-2 bg-[#242923] hover:bg-[#A7A59B]'
                  }`}
                />
              ))}
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next review"
              className="w-10 h-10 rounded-full bg-[#151815] border border-[#242923] hover:border-[#D6A85C] hover:bg-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all cursor-pointer shadow-lg group"
            >
              <span className="group-hover:translate-x-0.5 transition-transform text-sm font-bold">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
