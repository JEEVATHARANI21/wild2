export default function ChooseYourWild({ onSelectCategory, onPlanTrip }) {
  const pathways = [
    {
      id: 'wildlife',
      badge: 'APEX PREDATORS & MAMMALS',
      title: 'Wildlife Tracking Safaris',
      highlight: 'Royal Bengal Tigers · Leopards · Black Panthers · Sloth Bears',
      description:
        'Immerse in India’s premier tiger corridors and rocky predator havens. Designed around dawn and dusk golden light with maximum 4 photographers per open 4x4 Gypsy.',
      image: '/images/animals/animal1.jpg',
      ctaText: 'View Wildlife Safaris',
      action: () => {
        if (onSelectCategory) onSelectCategory('animals')
        const el = document.getElementById('tours')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'birding',
      badge: 'AVIAN PARADISE & HIDES',
      title: 'Bird Photography Expeditions',
      highlight: 'Western Ghats Endemics · UNESCO Wetlands · Himalayan Valleys',
      description:
        'Purpose-built eye-level hides, rainforest canopy treks, and wetland boat hides to photograph rare and elusive birds under masterclass lighting techniques.',
      image: '/images/birds/bird1.png',
      ctaText: 'View Birding Expeditions',
      action: () => {
        if (onSelectCategory) onSelectCategory('birds')
        const el = document.getElementById('tours')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      },
    },
    {
      id: 'custom',
      badge: 'BESPOKE CHARTER & PRIVATE DATES',
      title: 'Custom Private Expeditions',
      highlight: 'Dedicated Vehicle · 1-on-1 Skipper · Tailored Species Focus',
      description:
        'Have a specific target species or private group? We engineer tailored multi-park itineraries with exclusive vehicle charters, private guides, and bespoke pacing.',
      image: '/images/animals/animal6.jpg',
      ctaText: 'Plan Custom Trip',
      action: () => {
        if (onPlanTrip) onPlanTrip()
      },
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-[#0a0c0a] border-b border-[#242923] select-none relative overflow-hidden">
      {/* Subtle ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#D6A85C]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
              EXPEDITION PATHWAYS
            </span>
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
            Choose Your <span className="italic text-[#D6A85C] font-normal">Wild</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed max-w-2xl mx-auto">
            Select your photography focus. Every expedition is guided by dedicated field skippers with intimate knowledge of light, habitat, and animal behavior.
          </p>
        </div>

        {/* 3 Pathway Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {pathways.map((pathway) => (
            <div
              key={pathway.id}
              onClick={pathway.action}
              className="group relative rounded-3xl bg-[#151815] border border-[#242923] hover:border-[#D6A85C]/60 transition-all duration-400 overflow-hidden cursor-pointer flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_rgba(214,168,92,0.15)] hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#080908]">
                <img
                  src={pathway.image}
                  alt={pathway.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.88] group-hover:brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-[#151815]/30 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#080908]/85 backdrop-blur-md border border-[#242923] text-[#D6A85C] font-sans text-[9.5px] font-bold tracking-[0.2em] uppercase">
                    {pathway.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-snug">
                    {pathway.title}
                  </h3>

                  <p className="font-sans text-xs text-[#D6A85C] font-medium tracking-wide">
                    {pathway.highlight}
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed">
                    {pathway.description}
                  </p>
                </div>

                {/* Bottom CTA Link */}
                <div className="pt-4 border-t border-[#242923] flex items-center justify-between">
                  <span className="font-sans text-xs uppercase tracking-widest font-semibold text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors flex items-center gap-2">
                    <span>{pathway.ctaText}</span>
                    <span className="text-base transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#242923] group-hover:bg-[#D6A85C] group-hover:text-[#080908] text-[#F2F0E8] flex items-center justify-center text-xs transition-all">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
