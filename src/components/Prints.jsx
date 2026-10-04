import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// USER WILDLIFE PHOTOGRAPHS FROM D:\wildlife\images
const PRINTS = [
  {
    id: 1,
    title: 'Eyes of the Forest',
    species: 'Indian Leopard (Panthera pardus)',
    edition: 'Archival Fine Art · 25 Prints',
    price: '₹XX,XXX',
    sizes: ['20×30 cm', '40×60 cm', '60×90 cm'],
    src: '/images/user/IMG_4761.JPG',
  },
  {
    id: 2,
    title: 'The Primeval Monolith',
    species: 'Wild Bull Gaur (Bos gaurus)',
    edition: 'Museum Rag · 20 Prints',
    price: '₹XX,XXX',
    sizes: ['30×45 cm', '60×90 cm'],
    src: '/images/user/IMG_6853.PNG',
  },
  {
    id: 3,
    title: 'Texture of Time',
    species: 'Asian Elephant (Elephas maximus)',
    edition: 'Cotton Smooth · 15 Prints',
    price: '₹XX,XXX',
    sizes: ['40×60 cm', '80×120 cm'],
    src: '/images/user/IMG_7965.PNG',
  },
]

export default function Prints() {
  const sectionRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="px-8 md:px-16 pt-14 md:pt-18 pb-12 md:pb-16"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="mb-16">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3 text-emerald-400">
          Limited Edition · Signed Prints
        </p>
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 300,
            color: 'var(--text)',
          }}
        >
          Fine Art Editions
        </h2>
        <p className="font-sans text-sm mt-4" style={{ color: 'var(--muted)', maxWidth: 420 }}>
          Bring the wild into architectural spaces. Printed on Hahnemühle Photo Rag 308gsm,
          individually numbered, certified, and signed.
        </p>
      </div>

      {/* Prints grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRINTS.map((print, i) => (
          <div
            key={print.id}
            ref={(el) => (itemRefs.current[i] = el)}
            className="collection-item group flex flex-col"
          >
            {/* Image */}
            <div
              className="overflow-hidden mb-6 rounded-2xl border border-[#2A2B28]/80 bg-[#090A09]"
              style={{ aspectRatio: '3/4', position: 'relative' }}
            >
              <img
                src={print.src}
                alt={print.title}
                className="img-scale w-full h-full object-cover"
              />
              <div className="img-overlay" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2 flex-1">
              <p className="font-sans text-[9px] tracking-[0.22em] uppercase text-emerald-400">
                {print.species} — {print.edition}
              </p>
              <h3
                className="font-serif"
                style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--text)' }}
              >
                {print.title}
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {print.sizes.map((s) => (
                  <span
                    key={s}
                    className="font-sans text-[9px] tracking-[0.1em] px-2 py-1 rounded"
                    style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5 flex items-center justify-between">
                <span
                  className="font-serif text-lg text-[#F1EFE8]"
                >
                  From {print.price}
                </span>
                <button
                  className="font-sans text-[10px] tracking-[0.18em] uppercase flex items-center gap-2 group text-[#F1EFE8] hover:text-emerald-400 transition-colors"
                >
                  Inquire Edition
                  <svg
                    width="16"
                    height="6"
                    viewBox="0 0 16 6"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M0 3h14M11 1l3 2-3 2"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Services row */}
      <div
        className="mt-12 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {['Fine Art Archival Prints', 'Commercial Licensing', 'Editorial Publications', 'Field Expeditions & Workshops'].map(
          (s) => (
            <div key={s}>
              <p className="font-sans text-[9px] tracking-[0.2em] uppercase mb-2 text-[#666]">
                Capability
              </p>
              <p className="font-serif text-base" style={{ color: 'var(--text)', fontWeight: 300 }}>
                {s}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  )
}
