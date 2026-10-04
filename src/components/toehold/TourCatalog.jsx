import { useState } from 'react'

const SHORT_DESCRIPTIONS = {
  'tour-tadoba-feline':
    "Immersive tiger photography opportunities across Tadoba's prime waterholes and bamboo corridors.",
  'tour-kabini-viceroy':
    "Track and photograph the legendary Black Panther, leopards, and temple elephants in Nagarhole's mist.",
  'tour-ranthambhore-solstice':
    'Photograph majestic royal tigers against ancient Rajput fort ruins, banyan trees, and lake vistas.',
  'tour-bandipur-primeval':
    'Untamed tracking of elephant herds and apex predators through ancient Western Ghats teak forests.',
  'tour-jawai-granite':
    'Cave-dwelling Indian leopards perched atop prehistoric monolithic granite boulders at golden hour.',
  'tour-western-ghats-shola':
    'High-altitude rainforest birding for rare Western Ghats endemics, Great Hornbills, and canopy jewels.',
  'tour-bharatpur-odyssey':
    'Millions of winter migratory waterfowl, Sarus Cranes, and soaring raptors in UNESCO wetland hides.',
  'tour-thattekad-munnar':
    'Intensive eye-level hide photography for Ceylon Frogmouth, Malabar Trogon, and mountain avifauna.',
  'tour-sattal-pangot':
    'High-altitude oak and rhododendron forest hides for Cheer Pheasants, laughingthrushes, and kingfishers.',
  'tour-kutch-flamingos':
    'Thousands of Greater Flamingos, Desert Foxes, and hunting harriers across the surreal white salt desert.',
}

const getCardTitle = (tour) => {
  return tour.title || tour.packageName || tour.destination
}

export default function TourCatalog({
  animalTours = [],
  birdTours = [],
  activeCategory = 'animals',
  setActiveCategory,
  onSelectTour,
  onOpenCalendar,
}) {
  const [destinationFilter, setDestinationFilter] = useState('all')
  const [monthFilter, setMonthFilter] = useState('all')
  const [durationFilter, setDurationFilter] = useState('all')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')

  const currentList = activeCategory === 'animals' ? animalTours : birdTours

  const filteredTours = currentList.filter((tour) => {
    if (destinationFilter !== 'all') {
      if (!tour.destination.toLowerCase().includes(destinationFilter.toLowerCase())) return false
    }
    if (monthFilter !== 'all') {
      if (!tour.dateRange.toLowerCase().includes(monthFilter.toLowerCase())) return false
    }
    if (durationFilter !== 'all') {
      if (!tour.duration.toLowerCase().includes(durationFilter.toLowerCase())) return false
    }
    if (availabilityFilter !== 'all') {
      if (!tour.status.toLowerCase().includes(availabilityFilter.toLowerCase())) return false
    }
    return true
  })

  const sortedTours = [...filteredTours]

  const hasActiveFilters =
    destinationFilter !== 'all' ||
    monthFilter !== 'all' ||
    durationFilter !== 'all' ||
    availabilityFilter !== 'all'

  const resetFilters = () => {
    setDestinationFilter('all')
    setMonthFilter('all')
    setDurationFilter('all')
    setAvailabilityFilter('all')
  }

  return (
    <section id="destinations" className="py-20 sm:py-24 bg-[#080908] border-b border-[#242923] select-none">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* 1. Clean Minimal Section Header */}
        <div className="relative text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[1.5px] bg-[#B87333]" />
            <button
              type="button"
              onClick={onOpenCalendar}
              className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] hover:text-[#F2F0E8] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>📅</span>
              <span>2026–27 EXPEDITION SCHEDULES</span>
            </button>
            <span className="w-6 h-[1.5px] bg-[#B87333]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight mb-6">
            Photo Tour <span className="italic text-[#D6A85C] font-normal">Schedules</span>
          </h2>

          {/* Category Selector Tabs */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#151815] border border-[#242923] shadow-xl">
            <button
              type="button"
              onClick={() => {
                setActiveCategory && setActiveCategory('animals')
                resetFilters()
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                activeCategory === 'animals'
                  ? 'bg-[#D6A85C] text-[#080908] shadow-[0_2px_14px_rgba(214,168,92,0.35)] font-bold'
                  : 'text-[#A7A59B] hover:text-[#F2F0E8]'
              }`}
            >
              <span className="w-5 h-5 rounded-full overflow-hidden border border-black/20 flex-shrink-0 inline-flex">
                <img
                  src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=100&q=80&auto=format&fit=crop"
                  alt="Wild"
                  className="w-full h-full object-cover"
                />
              </span>
              <span>Wild Expeditions</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveCategory && setActiveCategory('birds')
                resetFilters()
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-sans uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                activeCategory === 'birds'
                  ? 'bg-[#D6A85C] text-[#080908] shadow-[0_2px_14px_rgba(214,168,92,0.35)] font-bold'
                  : 'text-[#A7A59B] hover:text-[#F2F0E8]'
              }`}
            >
              <span className="w-5 h-5 rounded-full overflow-hidden border border-black/20 flex-shrink-0 inline-flex">
                <img
                  src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=100&q=80&auto=format&fit=crop"
                  alt="Birds"
                  className="w-full h-full object-cover"
                />
              </span>
              <span>Birds Expeditions</span>
            </button>
          </div>
        </div>

        {/* 2. Expedition Cards Grid: Showing only the requested details in the website dark theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16 max-w-6xl mx-auto">
          {sortedTours.map((tour) => {
            const displayTitle = getCardTitle(tour)
            const expeditionBadge = activeCategory === 'animals' ? 'Wild Expedition' : 'Bird Expedition'

            return (
              <article
                key={tour.id}
                onClick={() => onSelectTour && onSelectTour(tour)}
                className="group relative rounded-[28px] overflow-hidden bg-[#121512] border border-[#242923] hover:border-[#D6A85C] shadow-2xl transition-all duration-400 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(214,168,92,0.2)]"
              >
                {/* Upper Wildlife Photo Area with Overlay Badges and Title */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#080908]">
                  <img
                    src={tour.heroImage}
                    alt={displayTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Gradient for title contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121512] via-[#121512]/35 to-transparent pointer-events-none" />

                  {/* Top Left Badge: Wild / Bird Expedition */}
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#080a08]/90 text-[#D6A85C] font-sans text-[11px] font-semibold tracking-wide shadow-md border border-[#242923] backdrop-blur-md">
                      {expeditionBadge}
                    </span>
                  </div>

                  {/* Top Right Badge: Status */}
                  <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[#080a08]/90 text-[#D6A85C] font-sans text-[10px] font-bold tracking-wider uppercase shadow-md border border-[#242923] backdrop-blur-md">
                      {tour.status}
                    </span>
                  </div>

                  {/* Bottom Title Overlay on Photo */}
                  <div className="absolute bottom-3.5 left-5 right-5 z-10 text-left pointer-events-none">
                    <h3 className="font-serif text-xl sm:text-[23px] text-[#F2F0E8] font-normal leading-snug drop-shadow-md group-hover:text-[#D6A85C] transition-colors">
                      {displayTitle}
                    </h3>
                  </div>
                </div>

                {/* Standardized Photography Specs Strip matching benchmark */}
                <div className="px-5 pt-3.5 pb-1 bg-[#121512] border-t border-[#1e241e] space-y-2 text-left">
                  {/* Focus line */}
                  <div className="flex items-center gap-1.5 text-[11px] font-sans text-[#D6A85C] font-medium truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C] shrink-0" />
                    <span className="truncate">{tour.photoFocus || tour.targetSpeciesLine}</span>
                  </div>

                  {/* 3 Key Spec Pills: Duration | Max 4 / Jeep | All-Inclusive Price */}
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <div className="p-2 rounded-xl bg-[#0a0d0a] border border-[#202620]">
                      <span className="text-[9px] uppercase tracking-wider text-[#A7A59B] block font-light">Duration</span>
                      <span className="text-[11px] font-sans font-semibold text-[#F2F0E8] block truncate">{tour.duration}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-[#0a0d0a] border border-[#202620]">
                      <span className="text-[9px] uppercase tracking-wider text-[#A7A59B] block font-light">Vehicle</span>
                      <span className="text-[11px] font-sans font-semibold text-[#F2F0E8] block truncate">Max 4 / Jeep</span>
                    </div>

                    <div className="p-2 rounded-xl bg-[#0a0d0a] border border-[#202620]">
                      <span className="text-[9px] uppercase tracking-wider text-[#A7A59B] block font-light">Package</span>
                      <span className="text-[11px] font-sans font-semibold text-[#D6A85C] block truncate">
                        From ₹XX,XXX
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lower Body: Dark Luxury Theme with the 2 Action Buttons */}
                <div className="p-5 sm:p-6 bg-[#121512] space-y-3">
                  {/* Button 1: VIEW ITINERARY with dropdown triangle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectTour && onSelectTour(tour)
                    }}
                    className="w-full py-3.5 px-6 rounded-full font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-between transition-all duration-300 cursor-pointer bg-[#1c221d] hover:bg-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] border border-[#2a332c] hover:border-[#D6A85C] shadow-sm group/btn"
                  >
                    <span>VIEW ITINERARY</span>
                    <span className="w-5 h-5 rounded-full bg-white/10 group-hover/btn:bg-[#080908]/20 flex items-center justify-center text-[9px] transition-colors">
                      ▼
                    </span>
                  </button>

                  {/* Button 2: EXPLORE THIS JOURNEY */}
                  <a
                    href={`https://wa.me/919087394546?text=Hello%20VM%20Wild%20Expeditions,%20I'm%20inquiring%20about%20the%20${encodeURIComponent(displayTitle)}%20(${tour.destination})%20Expedition.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2.5 pl-6 pr-2 rounded-full bg-[#080a08] hover:bg-[#161d17] border border-[#D6A85C]/60 hover:border-[#D6A85C] transition-all duration-300 flex items-center justify-between shadow-md cursor-pointer group/exp"
                  >
                    <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#D6A85C] group-hover:text-[#F2F0E8] transition-colors">
                      EXPLORE THIS JOURNEY
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#D6A85C] group-hover:bg-[#e2bb74] text-[#080908] flex items-center justify-center font-bold text-sm transition-transform group-hover/exp:translate-x-0.5 shadow-sm">
                      →
                    </span>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
        {/* 6. Final Cinematic Call to Action Banner */}
        <div className="relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[400px] flex flex-col items-center justify-center p-8 sm:p-14 text-center border border-[#242923] group">
          <img
            src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1920&q=85&auto=format&fit=crop"
            alt="VM Wild Expeditions"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-[#080908]/75 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="font-sans text-[10px] sm:text-xs tracking-[0.28em] uppercase text-[#D6A85C] font-semibold block mb-3">
              YOUR EXPEDITION AWAITS
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#F2F0E8] font-light mb-4 leading-tight">
              Which story will you photograph next?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#F2F0E8]/85 font-light mb-8 max-w-xl mx-auto leading-relaxed">
              Tell us what you want to photograph. We'll help you choose the right expedition, destination and season.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/919087394546?text=Hello%20VM%20Wild%20Expeditions,%20I'm%20ready%20to%20plan%20my%20photography%20expedition.%20Please%20help%20me%20choose%20the%20right%20destination."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-4 px-9 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-[#D6A85C] text-[#080908] hover:bg-[#B87333] hover:shadow-[0_6px_30px_rgba(214,168,92,0.45)] hover:scale-105 transition-all inline-flex items-center justify-center gap-2 shadow-xl"
              >
                <span>PLAN MY EXPEDITION</span>
                <span>→</span>
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto py-4 px-9 rounded-full font-sans text-xs uppercase tracking-widest font-semibold border border-[#D6A85C]/70 text-[#F2F0E8] hover:bg-[#D6A85C]/15 transition-all text-center"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
