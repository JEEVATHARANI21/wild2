import { useSiteContent } from '../../context/SiteContentContext'

export default function ToursHero({ onPlanTrip }) {
  const { content } = useSiteContent()
  const hero = content?.hero || {
    eyebrow: 'WILDLIFE & BIRD PHOTOGRAPHY EXPEDITIONS',
    headlinePart1: 'Go Where the Wild',
    headlinePart2: 'Still Roams.',
    description: "Expert-led wildlife and bird photography tours across India's most extraordinary wildernesses — designed for photographers, birders, and nature lovers who want more than a typical safari.",
    heroBgImage: '/images/home-bg.png',
  }

  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden bg-[#080908] select-none">
      {/* Background High-Impact Wildlife Photography Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.heroBgImage || '/images/home-bg.png'}
          alt="Wild Bengal Tiger — VM Wild Expeditions"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[80%_35%] sm:object-[75%_center] md:object-[80%_center] lg:object-[84%_center] brightness-[0.88] contrast-[1.05]"
        />

        {/* Responsive Mobile & Desktop Gradients for Pristine Text Legibility */}
        {/* Mobile top-to-bottom dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-[#080908]/85 to-[#080908]/50 sm:hidden pointer-events-none" />
        
        {/* Desktop left-to-right negative space gradient */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#080908] via-[#080908]/85 md:via-[#080908]/60 to-transparent pointer-events-none" />

        {/* Subtle Top Gradient for Header Blend */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#080908]/90 to-transparent pointer-events-none" />

        {/* Subtle Bottom Gradient for Section Blend */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-28 bg-gradient-to-t from-[#080908] to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 pt-24 sm:pt-36 md:pt-40 pb-20 sm:pb-24 flex flex-col justify-center">
        <div className="max-w-2xl text-left">
          {/* Small Eyebrow */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-5">
            <span className="w-5 sm:w-7 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[9.5px] sm:text-xs tracking-[0.22em] sm:tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
              {hero.eyebrow || 'WILDLIFE & BIRD PHOTOGRAPHY EXPEDITIONS'}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-light text-[#F2F0E8] leading-[1.08] sm:leading-[1.04] tracking-tight mb-4 sm:mb-6">
            <span className="block">{hero.headlinePart1 || 'Go Where the Wild'}</span>
            <span className="block italic text-[#D6A85C] font-normal mt-0.5 sm:mt-1">
              {hero.headlinePart2 || 'Still Roams.'}
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="font-sans text-xs sm:text-base md:text-lg text-[#F2F0E8]/90 max-w-xl font-light leading-relaxed mb-6 sm:mb-9">
            {hero.description || "Expert-led wildlife and bird photography tours across India's most extraordinary wildernesses — designed for photographers, birders, and nature lovers who want more than a typical safari."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-7 sm:mb-9 w-full sm:w-auto">
            {/* Primary CTA */}
            <a
              href="#tours"
              className="py-3.5 sm:py-4 px-6 sm:px-8 rounded-full font-sans text-[11px] sm:text-xs uppercase tracking-widest font-bold bg-[#D6A85C] text-[#080908] hover:bg-[#B87333] hover:shadow-[0_6px_30px_rgba(214,168,92,0.4)] hover:scale-[1.02] transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer shadow-xl whitespace-nowrap"
            >
              <span>EXPLORE EXPEDITIONS</span>
              <span>→</span>
            </a>

            {/* Secondary CTA */}
            <button
              type="button"
              onClick={onPlanTrip}
              className="py-3.5 sm:py-4 px-6 sm:px-8 rounded-full font-sans text-[11px] sm:text-xs uppercase tracking-widest font-semibold border border-[#D6A85C]/70 text-[#F2F0E8] hover:border-[#D6A85C] hover:bg-[#D6A85C]/15 transition-all duration-300 text-center flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm whitespace-nowrap"
            >
              <span>✨ PLAN MY WILD TRIP</span>
              <span>→</span>
            </button>
          </div>

          {/* Core Trust & Value Pillars */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2.5 pt-4 text-[10px] sm:text-xs font-sans tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#F2F0E8]/80 font-medium border-t border-[#242923]/80">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-base">📍</span>
              <span>India's Premier Wilds</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-base">📷</span>
              <span>Field Masterclasses</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-base">👥</span>
              <span>Max 4 / Gypsy</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-base">🌿</span>
              <span>Ethical Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Center Minimal Scroll Indicator */}
      <div className="hidden sm:flex absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 pointer-events-none select-none opacity-75 hover:opacity-100 transition-opacity">
        <span className="font-sans text-[9px] tracking-[0.28em] uppercase text-[#A7A59B] font-medium">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-[#D6A85C]/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#D6A85C] animate-bounce" />
        </div>
      </div>
    </section>
  )
}
