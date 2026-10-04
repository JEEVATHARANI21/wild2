import { useEffect } from 'react'

export default function TourDetailModal({ tour, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!tour) return null

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#080908]/90 backdrop-blur-md overflow-y-auto overscroll-contain animate-fadeIn"
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl bg-[#151815] border border-[#242923] shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-left my-auto modal-scroll overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#080908]/80 border border-[#242923] text-[#F2F0E8] hover:text-[#B87333] hover:border-[#B87333] flex items-center justify-center text-lg transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* 1. Hero Image Header */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden bg-[#080908]">
          <img
            src={tour.heroImage}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-[#B87333] text-[#080908] font-sans text-[10px] font-bold tracking-widest uppercase mb-2 inline-block">
              {tour.badge} · {tour.duration}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#F2F0E8] leading-tight mb-1">
              {tour.title}
            </h2>
            <span className="text-xs font-sans text-[#D6A85C]">
              📍 {tour.destination} · 📅 Scheduled: {tour.dateRange}
            </span>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Photography Experience Intro Quote */}
          <div className="p-4 rounded-2xl bg-[#080908]/70 border-l-2 border-[#B87333] border-y border-r border-[#242923]">
            <p className="font-serif italic text-sm sm:text-base text-[#F2F0E8]/90 leading-relaxed font-normal">
              “A photography-focused wildlife experience crafted to maximize opportunities to photograph{' '}
              <strong className="text-[#D6A85C] not-italic font-medium">
                {tour.targetSpecies[0]}
              </strong>{' '}
              and prime wildlife in raw, untamed natural habitats with dedicated field skippers.”
            </p>
          </div>

          {/* 2. Key Photography Specs Table Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 rounded-2xl bg-[#242923]/40 border border-[#242923] text-xs font-sans">
            <div>
              <span className="text-[10px] text-[#A7A59B] uppercase tracking-wider block mb-0.5">
                🐾 Key Species
              </span>
              <span className="text-[#F2F0E8] font-medium truncate block">{tour.targetSpecies[0]}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A7A59B] uppercase tracking-wider block mb-0.5">
                ⏱ Duration
              </span>
              <span className="text-[#F2F0E8] font-semibold">{tour.duration}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A7A59B] uppercase tracking-wider block mb-0.5">
                📅 Best Season
              </span>
              <span className="text-[#D6A85C] font-medium">{tour.bestSeason || 'Oct – May'}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A7A59B] uppercase tracking-wider block mb-0.5">
                👥 Group Size
              </span>
              <span className="text-[#F2F0E8] font-medium">Strict Max 4/Jeep</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A7A59B] uppercase tracking-wider block mb-0.5">
                📸 Skill Level
              </span>
              <span className="text-[#D6A85C] font-medium">{tour.skillLevel || 'Beginner → Pro'}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A7A59B] uppercase tracking-wider block mb-0.5">
                🦁 Field Skipper
              </span>
              <span className="text-[#F2F0E8] font-medium">{tour.skipper}</span>
            </div>
          </div>

          {/* Photography Logistics & Masterclass Guarantee */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#080908] border border-[#242923] flex items-start gap-3">
              <span className="text-xl">🚙</span>
              <div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block mb-1">
                  VEHICLE & SHOOTING LOGISTICS
                </span>
                <p className="text-xs font-sans text-[#F2F0E8]/90 leading-relaxed font-light">
                  {tour.vehicleLogistics || 'Guaranteed Open-top 4x4 Gypsy · Max 4 photographers (1 per row) · 360° unobstructed shooting angles & beanbag mounts.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#080908] border border-[#242923] flex items-start gap-3">
              <span className="text-xl">🎓</span>
              <div>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block mb-1">
                  1-ON-1 FIELD MASTERCLASS
                </span>
                <p className="text-xs font-sans text-[#F2F0E8]/90 leading-relaxed font-light">
                  Daily in-Gypsy coaching by Vijay Mathiew on exposure, histogram, and eye-AF tracking, plus evening RAW critiques in Lightroom.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Target Species Strip & Photography Highlight */}
          <div>
            <h3 className="font-serif text-xl text-[#F2F0E8] mb-3 font-normal flex items-center gap-2">
              <span>🎯</span>
              <span>What You'll Photograph (Target Species)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
              {tour.targetSpecies.map((sp, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#242923]/40 border border-[#242923] text-xs font-sans text-[#F2F0E8]"
                >
                  <span className="text-[#B87333] font-bold">✦</span>
                  <span className="font-medium">{sp}</span>
                </div>
              ))}
            </div>

            {/* Field Photographic Opportunity Note */}
            <div className="p-3.5 rounded-xl bg-[#080908]/80 border border-[#B87333]/30 flex items-start gap-2.5 text-xs font-sans text-[#D6A85C] leading-relaxed">
              <span className="text-base text-[#B87333]">📷</span>
              <div>
                <strong className="block text-[#F2F0E8] text-[11px] uppercase tracking-wider mb-0.5">
                  Photographic Field Opportunities:
                </strong>
                <span>{tour.photoHighlight}</span>
              </div>
            </div>
          </div>

          {/* 4. Expedition Overview */}
          <div>
            <h3 className="font-serif text-xl text-[#F2F0E8] mb-2 font-normal">
              Expedition Overview & Masterclass Philosophy
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] leading-relaxed font-light">
              {tour.overview}
            </p>
          </div>

          {/* 5. Day-by-Day Field Itinerary */}
          <div>
            <h3 className="font-serif text-xl text-[#F2F0E8] mb-4 font-normal">
              Day-by-Day Field Itinerary
            </h3>
            <div className="space-y-3">
              {tour.itinerary.map((it, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-[#242923]/40 border border-[#242923]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B87333]/20 text-[#D6A85C] border border-[#B87333]/40 flex items-center justify-center font-serif text-sm font-bold">
                    0{it.day}
                  </div>
                  <div>
                    <h4 className="font-serif text-base text-[#F2F0E8] mb-1">
                      Day {it.day}: {it.title}
                    </h4>
                    <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light">
                      {it.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Recommended Photography Gear Checklist */}
          <div className="p-5 rounded-2xl bg-[#242923]/40 border border-[#B87333]/30">
            <h4 className="font-sans text-xs uppercase tracking-widest text-[#D6A85C] font-semibold mb-3 flex items-center gap-2">
              <span className="text-[#B87333]">📷</span> Recommended Camera Gear Checklist & Focal Lengths
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#A7A59B]">
              {tour.recommendedGear.map((gear, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#B87333] font-bold">•</span>
                  <span>{gear}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Inclusions vs Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-[#242923]/20 border border-[#242923]">
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#D6A85C] font-semibold mb-3 flex items-center gap-1.5">
                <span className="text-[#B87333]">✓</span> What's Included
              </h4>
              <ul className="space-y-1.5 text-xs font-sans text-[#A7A59B]">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#D6A85C] font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs uppercase tracking-widest text-[#A7A59B] font-semibold mb-3 flex items-center gap-1.5">
                <span>✕</span> What's Excluded
              </h4>
              <ul className="space-y-1.5 text-xs font-sans text-[#A7A59B]/70">
                {tour.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#A7A59B] font-bold">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 8. Action Footer with Strong CTA */}
          <div className="pt-6 border-t border-[#242923] flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <span className="text-[10px] font-sans text-[#A7A59B] uppercase tracking-wider block">
                Expedition Package Rate
              </span>
              <div className="flex flex-wrap items-baseline gap-2 text-[#F2F0E8]">
                <span className="text-2xl sm:text-3xl font-serif font-light text-[#D6A85C]">
                  From ₹XX,XXX
                </span>
                <span className="text-xs font-sans text-[#A7A59B]">(All-Inclusive Custom Quote)</span>
                <span className="text-xs font-sans text-[#D6A85C] font-medium bg-[#242923] px-2.5 py-0.5 rounded-full border border-[#D6A85C]/30">
                  {tour.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/919087394546?text=Hello%20VM%20Wild%20Expeditions,%20I'm%20interested%20in%20joining%20the%20${encodeURIComponent(tour.title)}%20(${tour.destination})%20Photo%20Tour.%20Please%20share%20the%20detailed%20itinerary,%20seasonal%20pricing,%20and%20booking%20steps.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-copper-primary w-full sm:w-auto py-3.5 px-8 rounded-full font-sans text-xs uppercase tracking-widest shadow-[0_4px_25px_rgba(184,115,51,0.45)] text-center cursor-pointer flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                <span>📸 Inquire & Reserve on WhatsApp</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
