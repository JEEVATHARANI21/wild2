import { useState } from 'react'

export default function FoundersSection({ founders, onViewFullAbout, onPlanTrip, onExploreTrips }) {
  const [activeIdx, setActiveIdx] = useState(0)

  // Safe fallback list if prop is empty
  const founderList = (founders && founders.length > 0) ? founders : [
    {
      id: 'founder-vijay',
      name: 'Vijay Mathiew',
      displayName: 'Vijay Mathiew',
      role: 'Co-Founder & Principal Wildlife Photographer',
      mentorPill: 'Field mentor for big cats & natural light',
      image: '/images/vijay.jpeg',
      bio: 'With 5+ years tracking apex predators across India, Vijay leads small-group expeditions focused on natural light, animal behavior, and hands-on 1-on-1 field mentoring.',
      tags: ['5+ Years Field Exp', 'Big Cat Specialist', '1-on-1 Mentorship'],
      instagram: 'https://www.instagram.com/vijaymathiew_photography?stkn=MXRxZW55ZDg3Z21pdw==',
      instagramHandle: '@vijaymathiew_photography',
    },
    {
      id: 'founder-jayavignesh',
      name: 'Jayavignesh Hariharan',
      displayName: 'Jayavignesh',
      role: 'Founder of Jungle Voyages & Co-Founder',
      mentorPill: 'Field mentor for safaris & birding',
      image: '/images/jayavignesh.jpg',
      bio: 'Founder of Jungle Voyages with 10+ years in the field, Jayavignesh specializes in avian photography, habitat tracking, and ethical field coaching.',
      tags: ['10+ Years Experience', 'Avian Specialist', 'Safari Mentor'],
      instagram: 'https://www.instagram.com/jayavignesh_hariharan?stkn=Y3k2czVub3cwcDQz',
      instagramHandle: '@jayavignesh_hariharan',
    },
  ]

  const founder = founderList[activeIdx] || founderList[0]

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + founderList.length) % founderList.length)
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % founderList.length)
  }

  return (
    <section id="founders" className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-[#080908] via-[#0d110d] to-[#080908] border-t border-b border-[#B87333]/30 select-none relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B87333]/[0.05] blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10px] sm:text-[10.5px] tracking-[0.25em] uppercase text-[#D6A85C] font-semibold">
              FIELD LEADERSHIP & TOUR MENTORSHIP
            </span>
            <span className="w-6 sm:w-8 h-[1.5px] bg-[#B87333]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#F2F0E8] font-light leading-tight">
            Meet Our <span className="italic text-[#D6A85C] font-normal">Expedition Leaders</span>
          </h2>
        </div>

        {/* Compact Founder Showcase Card */}
        <div className="relative">
          {/* Main Card */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#111511] border border-[#D6A85C]/30 shadow-[0_15px_40px_rgba(0,0,0,0.85)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[400px] sm:min-h-[440px] transition-all duration-500">
            {/* Left Half: Founder Photo */}
            <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] overflow-hidden bg-[#0a0d0a] flex items-center justify-center">
              <img
                key={founder.id}
                src={founder.image}
                alt={founder.name}
                className="w-full h-full object-cover object-top sm:object-center transition-all duration-700 hover:scale-103"
                loading="eager"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d0a] via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Floating Bottom Badge */}
              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-auto z-20 p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#080a08]/90 backdrop-blur-md border border-[#242923] shadow-xl max-w-[250px]">
                <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#F2F0E8] leading-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C]" />
                  <span>Wildlife Photographer</span>
                </h4>
                <p className="font-sans text-[10px] sm:text-[11px] text-[#A7A59B] mt-1 leading-snug">
                  {founder.mentorPill || 'Field mentor for safaris & birding'}
                </p>
              </div>

              {/* Founder Switch Indicator */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-0.5 rounded-full bg-[#080a08]/85 text-[#D6A85C] text-[9px] font-sans tracking-widest uppercase font-bold border border-[#D6A85C]/40 shadow-md">
                  0{activeIdx + 1} / 0{founderList.length}
                </span>
              </div>
            </div>

            {/* Right Half: Details & Actions */}
            <div className="lg:col-span-6 p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-gradient-to-br from-[#121612] to-[#0c0f0c]">
              <div>
                {/* Top Pill Badge */}
                <span className="px-3 py-1 rounded-full bg-[#1c221c] border border-[#D6A85C]/35 text-[#D6A85C] text-[9.5px] font-sans tracking-widest uppercase font-semibold inline-block mb-3 sm:mb-3.5 shadow-sm">
                  EXPEDITION MENTOR
                </span>

                {/* Scaled Headline */}
                <h3 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-[#F2F0E8] font-light leading-snug mb-3">
                  Explore the wild with{' '}
                  <span className="text-[#D6A85C] font-normal block sm:inline">
                    {founder.displayName || founder.name}
                  </span>
                </h3>

                {/* Simplified Bio Description */}
                <p className="font-sans text-xs sm:text-[13px] text-[#A7A59B] leading-relaxed font-light mb-4 sm:mb-5">
                  {founder.bio}
                </p>

                {/* Badges / Tags */}
                <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                  {founder.tags && founder.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#181d18] border border-[#242923] text-[11px] font-sans text-[#E0DED5] font-medium shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Bottom Links */}
              <div>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pb-4 sm:pb-5 border-b border-[#202620]">
                  <button
                    onClick={onPlanTrip}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-[11px] sm:text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-[0_4px_20px_rgba(214,168,92,0.4)] hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Talk to Expert</span>
                    <span>→</span>
                  </button>

                  <button
                    onClick={onExploreTrips}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#151915] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#D6A85C] font-sans text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer"
                  >
                    <span>Explore Trips</span>
                  </button>
                </div>

                {/* Footer Metadata & Social Links */}
                <div className="pt-3 sm:pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Instagram Link */}
                    {founder.instagram && (
                      <a
                        href={founder.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161a16] border border-[#242923] hover:border-[#E1306C] text-[#F2F0E8] hover:text-[#E1306C] text-[11px] font-sans transition-all group"
                        title="Follow on Instagram"
                      >
                        <svg className="w-3 h-3 text-[#E1306C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        <span>{founder.instagramHandle || '@vm_wild_expeditions'}</span>
                        <span className="text-[9px] text-[#A7A59B] group-hover:text-[#E1306C]">↗</span>
                      </a>
                    )}

                    {/* WhatsApp Link */}
                    <a
                      href={`https://wa.me/919087394546?text=Hi%20${encodeURIComponent(founder.displayName || founder.name)},%20I'm%20reaching%20out%20to%20connect%20with%20you%20from%20VM%20Wild%20Expeditions.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161a16] border border-[#242923] hover:border-[#25D366] text-[#F2F0E8] hover:text-[#25D366] text-[11px] font-sans transition-all group"
                      title="Chat on WhatsApp"
                    >
                      <svg className="w-3 h-3 text-[#25D366] fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>WhatsApp</span>
                      <span className="text-[9px] text-[#A7A59B] group-hover:text-[#25D366]">↗</span>
                    </a>
                  </div>

                  {onViewFullAbout && (
                    <button
                      onClick={onViewFullAbout}
                      className="text-[11px] font-sans text-[#A7A59B] hover:text-[#D6A85C] transition-colors cursor-pointer text-left sm:text-right"
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
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#111511] hover:bg-[#181d18] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] flex items-center justify-center text-base sm:text-lg transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer active:scale-95"
          >
            ‹
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next leader"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#111511] hover:bg-[#181d18] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] flex items-center justify-center text-base sm:text-lg transition-all duration-300 shadow-2xl backdrop-blur-md cursor-pointer active:scale-95"
          >
            ›
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {founderList.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIdx ? 'w-6 bg-[#D6A85C]' : 'w-2 bg-[#242923] hover:bg-[#384038]'
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
