import { useState, useEffect } from 'react'

export default function SeasonCalendarModal({ isOpen, onClose, onSelectTour, animalTours = [], birdTours = [] }) {
  const [activeFilter, setActiveFilter] = useState('all') // 'all' | 'animals' | 'birds'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Combine and sort chronologically for 2026-2027 season
  const allDepartures = [
    // Nov 2026
    {
      month: 'November 2026',
      monthKey: '2026-11',
      tours: [
        {
          ...birdTours.find((t) => t.id === 'tour-western-ghats-shola'),
          type: 'birds',
          categoryLabel: 'Birding Expedition',
        },
        {
          ...animalTours.find((t) => t.id === 'tour-tadoba-feline'),
          type: 'animals',
          categoryLabel: 'Big Cat Safari',
        },
      ].filter(Boolean),
    },
    // Dec 2026
    {
      month: 'December 2026',
      monthKey: '2026-12',
      tours: [
        {
          ...animalTours.find((t) => t.id === 'tour-kabini-viceroy'),
          type: 'animals',
          categoryLabel: 'Big Cat Safari',
        },
        {
          ...animalTours.find((t) => t.id === 'tour-ranthambhore-solstice'),
          type: 'animals',
          categoryLabel: 'Tiger Expedition',
        },
      ].filter(Boolean),
    },
    // Jan 2027
    {
      month: 'January 2027',
      monthKey: '2027-01',
      tours: [
        {
          ...birdTours.find((t) => t.id === 'tour-bharatpur-odyssey'),
          type: 'birds',
          categoryLabel: 'Avian Odyssey',
        },
        {
          ...animalTours.find((t) => t.id === 'tour-bandipur-primeval'),
          type: 'animals',
          categoryLabel: 'Predator Safari',
        },
      ].filter(Boolean),
    },
    // Feb 2027
    {
      month: 'February 2027',
      monthKey: '2027-02',
      tours: [
        {
          ...birdTours.find((t) => t.id === 'tour-kutch-flamingos'),
          type: 'birds',
          categoryLabel: 'Desert Birding',
        },
        {
          ...birdTours.find((t) => t.id === 'tour-thattekad-munnar'),
          type: 'birds',
          categoryLabel: 'Rainforest Birding',
        },
      ].filter(Boolean),
    },
    // Mar 2027
    {
      month: 'March 2027',
      monthKey: '2027-03',
      tours: [
        {
          ...animalTours.find((t) => t.id === 'tour-jawai-granite'),
          type: 'animals',
          categoryLabel: 'Leopard Hills',
        },
        {
          ...birdTours.find((t) => t.id === 'tour-sattal-pangot'),
          type: 'birds',
          categoryLabel: 'Himalayan Birding',
        },
      ].filter(Boolean),
    },
  ]

  const filteredTimeline = allDepartures
    .map((block) => ({
      ...block,
      tours: block.tours.filter((tour) => {
        if (activeFilter === 'all') return true
        return tour.type === activeFilter
      }),
    }))
    .filter((block) => block.tours.length > 0)

  const getStatusColor = (status) => {
    if (status?.toLowerCase().includes('few') || status?.toLowerCase().includes('filling')) {
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    }
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  }

  const handleWhatsAppBooking = (tour) => {
    const text = encodeURIComponent(
      `Hi Vijay, I'm interested in booking the "${tour.packageName || tour.title}" expedition to ${tour.destination} scheduled for ${tour.dateRange}. Please share seat availability and booking details.`
    )
    window.open(`https://wa.me/919087394546?text=${text}`, '_blank')
  }

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#080908]/92 backdrop-blur-xl animate-fadeIn overflow-y-auto overscroll-contain"
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-5xl max-h-[88vh] flex flex-col rounded-3xl bg-[#0e100e] border border-[#242923] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden my-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-6 sm:p-8 border-b border-[#242923] bg-[#151815]/95 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-[#B87333]" />
              <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-[#D6A85C] font-semibold">
                CONFIRMED DEPARTURES
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#F2F0E8] font-light">
              2026–2027 Season <span className="italic text-[#D6A85C] font-normal">Calendar</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A7A59B] mt-1 font-light">
              Chronological schedule of all 10 wildlife & bird photography expeditions across India.
            </p>
          </div>

          <button
            onClick={onClose}
            className="self-end sm:self-center w-11 h-11 rounded-full bg-[#080908] border border-[#242923] text-[#F2F0E8] hover:text-[#D6A85C] hover:border-[#D6A85C] flex items-center justify-center text-lg transition-all cursor-pointer shadow-lg"
            aria-label="Close Season Calendar"
          >
            ✕
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 sm:px-8 py-3.5 bg-[#080908]/80 border-b border-[#242923] shrink-0 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-[0_2px_12px_rgba(214,168,92,0.3)]'
                  : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923]'
              }`}
            >
              All Expeditions (10)
            </button>
            <button
              onClick={() => setActiveFilter('animals')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeFilter === 'animals'
                  ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-[0_2px_12px_rgba(214,168,92,0.3)]'
                  : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923]'
              }`}
            >
              <span className="w-4 h-4 rounded-full overflow-hidden border border-[#D6A85C]/60 flex-shrink-0 inline-flex">
                <img
                  src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=100&q=80&auto=format&fit=crop"
                  alt="Wild"
                  className="w-full h-full object-cover"
                />
              </span>
              <span>Wild Safaris (5)</span>
            </button>
            <button
              onClick={() => setActiveFilter('birds')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeFilter === 'birds'
                  ? 'bg-[#D6A85C] text-[#080908] font-bold shadow-[0_2px_12px_rgba(214,168,92,0.3)]'
                  : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923]'
              }`}
            >
              <span className="w-4 h-4 rounded-full overflow-hidden border border-[#D6A85C]/60 flex-shrink-0 inline-flex">
                <img
                  src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=100&q=80&auto=format&fit=crop"
                  alt="Birds"
                  className="w-full h-full object-cover"
                />
              </span>
              <span>Birds Tours (5)</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-[#A7A59B]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Guaranteed Small Groups: Max 4 Photographers per Gypsy</span>
          </div>
        </div>

        {/* Calendar Departure List (Scrollable) */}
        <div
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 space-y-8 modal-scroll overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
        >
          {filteredTimeline.map((monthBlock) => (
            <div key={monthBlock.monthKey} className="space-y-4">
              {/* Month Header Banner */}
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-lg bg-[#242923] text-[#D6A85C] font-serif text-sm sm:text-base font-medium tracking-wide">
                  📅 {monthBlock.month}
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[#242923] to-transparent" />
                <span className="text-[11px] font-sans text-[#A7A59B] tracking-wider uppercase">
                  {monthBlock.tours.length} {monthBlock.tours.length === 1 ? 'Departure' : 'Departures'}
                </span>
              </div>

              {/* Tours in this Month */}
              <div className="grid grid-cols-1 gap-4">
                {monthBlock.tours.map((tour) => (
                  <div
                    key={tour.id}
                    className="p-5 sm:p-6 rounded-2xl bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/60 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
                  >
                    {/* Left: Tour Info */}
                    <div className="flex-1 space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {/* Dates Badge */}
                        <span className="px-3 py-1 rounded-full bg-[#D6A85C]/15 border border-[#D6A85C]/40 text-[#D6A85C] font-sans text-xs font-semibold tracking-wide flex items-center gap-1.5">
                          <span>🗓</span>
                          <span>{tour.dateRange}</span>
                        </span>

                        {/* Category Tag */}
                        <span className="px-2.5 py-0.5 rounded-full bg-[#080908] border border-[#242923] text-[11px] font-sans text-[#A7A59B]">
                          {tour.categoryLabel}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`px-2.5 py-0.5 rounded-full border text-[11px] font-sans font-medium ${getStatusColor(
                            tour.status
                          )}`}
                        >
                          ● {tour.status}
                        </span>

                        {/* Duration */}
                        <span className="text-xs font-sans text-[#A7A59B]">⏱ {tour.duration}</span>
                      </div>

                      {/* Title & Destination */}
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors">
                          {tour.packageName ? `${tour.packageName} — ${tour.title}` : tour.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#A7A59B] mt-0.5 flex items-center gap-1.5">
                          <span>📍</span>
                          <span>
                            {tour.destination} ({tour.state})
                          </span>
                        </p>
                      </div>

                      {/* Target Species Strip */}
                      {tour.targetSpeciesStrip && tour.targetSpeciesStrip.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] uppercase font-sans tracking-widest text-[#B87333] mr-1">
                            Focus:
                          </span>
                          {tour.targetSpeciesStrip.map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#080908] border border-[#242923] text-[11px] text-[#F2F0E8]/85"
                            >
                              <span>{item.icon}</span>
                              <span>{item.name}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Pricing & CTAs */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-[#242923] gap-4 min-w-[220px]">
                      <div className="text-left lg:text-right">
                        <span className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block">
                          Per Photographer
                        </span>
                        <div className="font-serif text-2xl sm:text-3xl text-[#D6A85C] font-semibold">
                          From ₹XX,XXX
                        </div>
                        <span className="text-[10.5px] font-sans text-[#A7A59B]">
                          Contact for seasonal quote & inclusions
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5 w-full lg:w-auto">
                        <button
                          type="button"
                          onClick={() => {
                            onClose()
                            if (onSelectTour) onSelectTour(tour)
                          }}
                          className="flex-1 lg:flex-initial px-4 py-2 rounded-xl bg-[#242923] hover:bg-[#343b32] text-[#F2F0E8] hover:text-[#D6A85C] text-xs font-sans uppercase tracking-wider font-semibold transition-all cursor-pointer text-center"
                        >
                          View Itinerary
                        </button>
                        <button
                          type="button"
                          onClick={() => handleWhatsAppBooking(tour)}
                          className="flex-1 lg:flex-initial px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#080908] text-xs font-sans uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(37,211,102,0.3)]"
                        >
                          <span>💬</span>
                          <span>Book</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 sm:p-5 bg-[#151815] border-t border-[#242923] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span className="text-xs text-[#A7A59B] font-light">
            Need customized dates or a private vehicle charter?
          </span>
          <a
            href="https://wa.me/919087394546?text=Hi%20Vijay,%20I'd%20like%20to%20inquire%20about%20a%20customized%20photo%20expedition."
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-sans uppercase tracking-wider text-[#D6A85C] hover:text-[#B87333] font-semibold flex items-center gap-1"
          >
            <span>Speak with Expedition Leader Vijay Mathiew</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
