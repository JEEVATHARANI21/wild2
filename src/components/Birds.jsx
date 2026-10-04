import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BIRDS = [
  {
    id: '01',
    name: 'Malabar Grey Hornbill',
    scientific: 'Ocyceros griseus',
    location: 'Valparai Shola Canopies, Tamil Nadu',
    season: 'Post-Monsoon',
    optics: '600mm f/4 · 1/2000s · ISO 640',
    description: 'Endemic to the Western Ghats. Moving silently between towering fig trees, its curved beak perfectly adapted for dense rainforest foraging.',
    src: '/images/user/IMG_4639.JPG',
  },
  {
    id: '02',
    name: 'Indian Pitta — Jewel of the Forest',
    scientific: 'Pitta brachyura',
    location: 'Mudumalai Forest Floor, Tamil Nadu',
    season: 'Winter Migration',
    optics: '400mm f/2.8 · 1/1250s · ISO 800',
    description: 'A flash of nine radiant colors foraging through wet leaf litter under low light. Known colloquially as the six-o\'clock bird for its punctual evening calls.',
    src: '/images/user/IMG_4633.JPG',
  },
  {
    id: '03',
    name: 'White-throated Kingfisher',
    scientific: 'Halcyon smyrnensis',
    location: 'Bhavani River Basin, Tamil Nadu',
    season: 'Year-Round Resident',
    optics: '500mm f/4 · 1/3200s · ISO 500',
    description: 'Perched motionless above rushing freshwater currents, waiting for the split-second dive with explosive aerodynamic acceleration.',
    src: '/images/user/IMG_4638.JPG',
  },
]

export default function Birds() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    )
  }, [])

  return (
    <section
      id="birds"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-5 sm:px-8 md:px-16 overflow-hidden border-t border-[#2A2B28]/60"
      style={{ background: '#090A09' }}
    >
      {/* SEO Topic Header: Bird Photography */}
      <div ref={headerRef} className="max-w-4xl mb-12 sm:mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#B3874B] animate-pulse" />
          <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B3874B] font-medium">
            Main SEO Focus · Bird Photography
          </p>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F1EFE8] font-light leading-tight">
          Bird Photography <span className="italic text-[#B3874B] font-normal">in Tamil Nadu</span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-4 max-w-2xl font-light leading-relaxed">
          Documenting elusive endemic avifauna across the Western Ghats, Nilgiri Shola skies, and coastal wetlands of Tamil Nadu. High-speed avian tracking with prime optics.
        </p>
      </div>

      {/* Bird Photography Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {BIRDS.map((bird) => (
          <article
            key={bird.id}
            className="group relative rounded-2xl overflow-hidden bg-[#111310] border border-[#2A2B28]/70 hover:border-[#B3874B]/60 transition-all duration-500 shadow-xl flex flex-col"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#0B0C0A]">
              <img
                src={bird.src}
                alt={`${bird.name} - Bird Photography Tamil Nadu by Vijay Mathiew`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111310] via-transparent to-transparent pointer-events-none" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-sans tracking-widest text-[#B3874B] uppercase border border-white/10">
                {bird.season}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
              <div>
                <span className="font-sans text-[9px] tracking-[0.25em] text-[#777] uppercase block mb-1">
                  {bird.scientific}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#F1EFE8] group-hover:text-[#B3874B] transition-colors mb-3">
                  {bird.name}
                </h3>
                <p className="font-sans text-xs text-[#A7A59B] leading-relaxed font-light mb-4">
                  {bird.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-col gap-1.5 text-[10px] font-sans text-[#888]">
                <div>
                  <span className="text-[#555] uppercase tracking-wider">Habitat: </span>
                  <span className="text-[#F1EFE8]">{bird.location}</span>
                </div>
                <div>
                  <span className="text-[#555] uppercase tracking-wider">Optics: </span>
                  <span className="text-[#B3874B] font-mono">{bird.optics}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
