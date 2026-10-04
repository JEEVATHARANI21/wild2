import { useState } from 'react'

export default function FoundersSection({ founders, onViewFullAbout, onPlanTrip, onExploreTrips }) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (!founders || founders.length === 0) return null

  const founder = founders[activeIdx] || founders[0]

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + founders.length) % founders.length)
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % founders.length)
  }

  return (
    <section id="founders" className="py-24 px-4 sm:px-8 md:px-16 bg-[#080a08] border-b border-[#20251f] select-none relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-[#B87333]/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Tag */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#D6A85C] font-semibold">
              FIELD LEADERSHIP & TOUR MENTORSHIP
            </span>
            <span className="w-8 h-[1.5px] bg-[#B87333]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F2F0E8] font-light leading-tight">
            Meet Our <span className="italic text-[#D6A85C] font-normal">Expedition Leaders</span>
          </h2>
        </div>

        {/* Big Size Founder Showcase Card (Reference Design) */}
        <div className="relative">
          {/* Main Card */}
          <div className="rounded-3xl bg-[#111511] border border-[#242923] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px] transition-all duration-500">
            {/* Left Half: Big Size Founder Photo */}
            <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[460px] lg:min-h-full overflow-hidden bg-[#0a0d0a] flex items-center justify-center">
              <img
                key={founder.id}
                src={founder.image}
                alt={founder.name}
                className="w-full h-full object-cover object-top sm:object-center transition-all duration-700 hover:scale-103"
                loading="eager"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d0a] via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Floating Bottom Badge (Exact match to reference) */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto z-20 p-4 rounded-2xl bg-[#080a08]/90 backdrop-blur-md border border-[#242923] shadow-2xl max-w-[280px]">
                <h4 className="font-serif text-sm font-semibold text-[#F2F0E8] leading-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C]" />
                  <span>Wildlife Photographer</span>
                </h4>
                <p className="font-sans text-[11px] text-[#A7A59B] mt-1 leading-snug">
                  {founder.mentorPill || 'Field mentor for safaris & birding'}
                </p>
              </div>

              {/* Founder Switch Indicator on Mobile */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-full bg-[#080a08]/85 text-[#D6A85C] text-[9px] font-sans tracking-widest uppercase font-bold border border-[#242923]">
                  0{activeIdx + 1} / 0{founders.length}
                </span>
              </div>
            </div>

            {/* Right Half: Details & Actions */}
            <div className="lg:col-span-6 p-7 sm:p-10 md:p-12 flex flex-col justify-between bg-gradient-to-br from-[#121612] to-[#0c0f0c]">
              <div>
                {/* Top Pill Badge */}
                <span className="px-3.5 py-1.5 rounded-full bg-[#1c221c] border border-[#D6A85C]/35 text-[#D6A85C] text-[10px] font-sans tracking-widest uppercase font-bold inline-block mb-5 shadow-sm">
                  TALK WITH THE EXPERT
                </span>

                {/* Big Headline */}
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F2F0E8] font-light leading-tight mb-5">
                  Explore the wild with{' '}
                  <span className="text-[#D6A85C] font-normal block sm:inline">
                    {founder.displayName || founder.name}
                  </span>
                </h3>

                {/* Bio Description */}
                <p className="font-sans text-xs sm:text-sm text-[#A7A59B] leading-relaxed font-light mb-6">
                  {founder.bio}
                </p>

                {/* Badges / Tags */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {founder.tags && founder.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full bg-[#181d18] border border-[#242923] text-xs font-sans text-[#F2F0E8] font-medium shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Bottom Links */}
              <div>
                <div className="flex flex-wrap items-center gap-3.5 pb-6 border-b border-[#202620]">
                  <button
                    onClick={onPlanTrip}
                    className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold shadow-lg hover:shadow-[0_4px_22px_rgba(214,168,92,0.45)] hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Talk to Expert</span>
                    <span>→</span>
                  </button>

                  <button
                    onClick={onExploreTrips}
                    className="px-6 py-3.5 rounded-full bg-[#151915] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#D6A85C] font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
                  >
                    <span>Explore Trips</span>
                  </button>
                </div>

                {/* Footer Metadata & Social Links (Instagram & WhatsApp) */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Instagram Link */}
                    <a
                      href={founder.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a16] border border-[#242923] hover:border-[#E1306C] text-[#F2F0E8] hover:text-[#E1306C] text-xs font-sans transition-all group"
                      title="Follow on Instagram"
                    >
                      <svg className="w-3.5 h-3.5 text-[#E1306C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      <span>{founder.instagramHandle}</span>
                      <span className="text-[10px] text-[#A7A59B] group-hover:text-[#E1306C]">↗</span>
                    </a>

                    {/* WhatsApp Link */}
                    <a
                      href={`https://wa.me/919087394546?text=Hi%20${encodeURIComponent(founder.displayName || founder.name)},%20I'm%20reaching%20out%20to%20connect%20with%20you%20from%20VM%20Wild%20Expeditions.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161a16] border border-[#242923] hover:border-[#25D366] text-[#F2F0E8] hover:text-[#25D366] text-xs font-sans transition-all group"
                      title="Chat on WhatsApp"
                    >
                      <svg className="w-3.5 h-3.5 text-[#25D366] fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>WhatsApp</span>
                      <span className="text-[10px] text-[#A7A59B] group-hover:text-[#25D366]">↗</span>
                    </a>
                  </div>

                  {onViewFullAbout && (
                    <button
                      onClick={onViewFullAbout}
                      className="text-xs font-sans text-[#A7A59B] hover:text-[#D6A85C] transition-colors cursor-pointer text-left sm:text-right"
                    >
                      Read Full Story →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous leader"
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#111511] hover:bg-[#181d18] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] flex items-center justify-center text-lg sm:text-xl transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer active:scale-95"
          >
            ‹
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next leader"
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#111511] hover:bg-[#181d18] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] flex items-center justify-center text-lg sm:text-xl transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer active:scale-95"
          >
            ›
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {founders.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActiveIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIdx ? 'w-8 bg-[#D6A85C]' : 'w-2 bg-[#242923] hover:bg-[#384038]'
              }`}
              title={f.name}
              aria-label={`Show ${f.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
