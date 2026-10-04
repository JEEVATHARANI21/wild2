import { useState } from 'react'

export default function FeaturedTours({
  animalTours = [],
  birdTours = [],
  tours = [],
  onSelectTour,
  onSelectCategory,
}) {
  const [activeTab, setActiveTab] = useState('all')

  // Resolve pool of tours
  const allAnimals = animalTours.length > 0 ? animalTours : tours.filter(t => !t.id.includes('bird') && !t.id.includes('western') && !t.id.includes('bharatpur') && !t.id.includes('thattekad') && !t.id.includes('sattal') && !t.id.includes('kutch'))
  const allBirds = birdTours.length > 0 ? birdTours : tours.filter(t => t.id.includes('bird') || t.id.includes('western') || t.id.includes('bharatpur') || t.id.includes('thattekad') || t.id.includes('sattal') || t.id.includes('kutch'))

  // 6 Flagship expeditions for 'all': 3 animals + 3 birds
  const curatedAll = [
    allAnimals[0] || tours[0],
    allAnimals[1] || tours[1],
    allBirds[0] || tours[2],
    allBirds[1] || tours[3],
    allAnimals[2] || allAnimals[0],
    allBirds[2] || allBirds[0],
  ].filter(Boolean)

  const displayedTours =
    activeTab === 'animals'
      ? allAnimals
      : activeTab === 'birds'
      ? allBirds
      : curatedAll

  return (
    <section id="featured" className="py-24 sm:py-28 px-5 sm:px-8 md:px-16 bg-[#151815] border-b border-[#242923]">
      <div className="max-w-7xl mx-auto">
        {/* 1. Spacious Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2.5 mb-3.5 select-none">
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
              HANDPICKED EXPEDITIONS · 2026–27
            </span>
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
            Featured <span className="italic text-[#D6A85C] font-normal">Expeditions</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed max-w-xl mx-auto">
            Discover our most sought-after wildlife photography journeys, selected for exceptional wildlife encounters, beautiful light and unforgettable field experiences.
          </p>
        </div>

        {/* 2. Category Filter Tabs: ALL / ANIMALS / BIRDS */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-14 select-none">
          {[
            { key: 'all', label: 'ALL' },
            { key: 'animals', label: 'ANIMALS' },
            { key: 'birds', label: 'BIRDS' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 sm:px-6 py-2 rounded-full font-sans text-xs tracking-[0.16em] uppercase font-bold transition-all duration-300 cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-[#D6A85C] text-[#080908] shadow-[0_4px_20px_rgba(214,168,92,0.35)] scale-105'
                  : 'bg-[#080908]/70 text-[#A7A59B] border border-[#242923] hover:text-[#F2F0E8] hover:border-[#D6A85C]/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. Tour Cards: 3-Column Grid on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 mb-24">
          {displayedTours.map((tour) => (
            <article
              key={tour.id}
              onClick={() => onSelectTour && onSelectTour(tour)}
              className="group relative rounded-2xl overflow-hidden bg-[#151815] border border-[#242923] hover:border-[#D6A85C] transition-all duration-500 shadow-2xl cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* 1. Large High-Quality Wildlife Photograph (50-55% of card height) */}
                <div className="relative w-full aspect-[16/11] overflow-hidden bg-[#080908]">
                  <img
                    src={tour.heroImage}
                    alt={tour.packageName || tour.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151815] via-transparent to-transparent pointer-events-none" />

                  {/* 2. Small Status Badge (Subtle dark translucent background with gold text) */}
                  <div className="absolute top-3.5 right-3.5 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[#080908]/85 backdrop-blur-md text-[9.5px] font-sans tracking-wider uppercase font-semibold text-[#D6A85C] border border-[#D6A85C]/35 shadow-md">
                      {tour.status || 'OPEN FOR BOOKING'}
                    </span>
                  </div>
                </div>

                {/* Card Editorial Information */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* 3. Category / Location */}
                  <div className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase text-[#D6A85C] font-semibold flex items-center gap-1.5">
                    <span>📍</span>
                    <span>{tour.destination}</span>
                  </div>

                  {/* 4. Package Name */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] group-hover:text-[#D6A85C] transition-colors leading-tight font-normal">
                    {tour.packageName || tour.title}
                  </h3>

                  {/* 5. Date & Duration */}
                  <div className="flex items-center gap-2 text-xs font-sans text-[#A7A59B]">
                    <span>📅</span>
                    <span>{tour.dateRange}</span>
                    <span className="text-[#242923]">•</span>
                    <span>{tour.duration}</span>
                  </div>

                  {/* 6. Photography Highlights */}
                  <div className="pt-2 border-t border-[#242923]/70">
                    <div className="text-xs font-sans leading-relaxed">
                      <span className="text-[#A7A59B] text-[11px] block uppercase tracking-wider mb-0.5">
                        Target Species
                      </span>
                      <span className="text-[#F2F0E8]/95 font-medium">
                        {tour.targetSpeciesLine ||
                          (tour.targetSpecies && tour.targetSpecies.slice(0, 3).join(' · ')) ||
                          'Apex Predators & Rare Endemics'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7 & 8. Cost & Explore CTA Footer */}
              <div className="p-6 sm:p-7 pt-4 border-t border-[#242923] flex items-end justify-between gap-4 bg-[#151815]">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#A7A59B] block">
                    Starts From
                  </span>
                  <div className="flex items-baseline gap-1 text-[#F2F0E8]">
                    <span className="font-serif text-2xl sm:text-3xl font-light text-[#D6A85C]">
                      From ₹XX,XXX
                    </span>
                    <span className="text-[10px] font-sans text-[#A7A59B] ml-1.5">(Contact for Quote)</span>
                  </div>
                </div>

                <div className="text-xs font-sans uppercase tracking-widest font-bold text-[#D6A85C] group-hover:text-[#B87333] flex items-center gap-1.5 transition-colors">
                  <span>Explore Expedition</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
