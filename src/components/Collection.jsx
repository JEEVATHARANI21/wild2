import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// REPLACE THESE WITH YOUR PHOTOGRAPHS
const PHOTOS = [
  {
    id: 1,
    category: 'Tigers',
    title: 'The Silent Hunter',
    location: 'Bandhavgarh, India',
    src: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=900&q=80&auto=format&fit=crop',
    aspect: '3/4',
    align: 'right',
    size: 'large',
  },
  {
    id: 2,
    category: 'Elephants',
    title: 'Emerging from Mist',
    location: 'Kaziranga, India',
    src: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=900&q=80&auto=format&fit=crop',
    aspect: '4/3',
    align: 'left',
    size: 'xlarge',
  },
  {
    id: 3,
    category: 'Birds',
    title: 'First Flight',
    location: 'Bharatpur, India',
    src: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=900&q=80&auto=format&fit=crop',
    aspect: '3/4',
    align: 'center-right',
    size: 'medium',
  },
  {
    id: 4,
    category: 'Big Cats',
    title: 'Golden Hour',
    location: 'Masai Mara, Kenya',
    src: 'https://images.unsplash.com/photo-1517817748493-49ec54a32465?w=900&q=80&auto=format&fit=crop',
    aspect: '4/3',
    align: 'left',
    size: 'medium',
  },
  {
    id: 5,
    category: 'Wilderness',
    title: 'The Crossing',
    location: 'Sundarbans, India',
    src: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=900&q=80&auto=format&fit=crop',
    aspect: '3/2',
    align: 'right',
    size: 'large',
  },
]

const CATEGORIES = ['All', 'Tigers', 'Elephants', 'Birds', 'Big Cats', 'Wilderness']

const alignClass = {
  right: 'ml-auto',
  left: 'mr-auto',
  'center-right': 'mx-auto mr-0 md:mr-24',
}

const sizeClass = {
  small: 'w-full md:w-5/12',
  medium: 'w-full md:w-7/12',
  large: 'w-full md:w-8/12',
  xlarge: 'w-full md:w-10/12',
}

export default function Collection() {
  const sectionRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
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
      className="px-8 md:px-16 py-20 md:py-32"
      style={{ background: 'var(--bg)' }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <p
            className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3"
            style={{ color: 'var(--muted)' }}
          >
            Selected Work
          </p>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}
          >
            The Collection
          </h2>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-4">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className="font-sans text-[10px] tracking-[0.18em] uppercase py-1 px-3 transition-all duration-300"
              style={{
                color: i === 0 ? 'var(--text)' : 'var(--muted)',
                border: '1px solid',
                borderColor: i === 0 ? 'var(--border)' : 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Grid */}
      <div className="flex flex-col gap-16 md:gap-24">
        {PHOTOS.map((photo, i) => (
          <div
            key={photo.id}
            ref={el => itemRefs.current[i] = el}
            className={`collection-item group ${sizeClass[photo.size]} ${alignClass[photo.align]}`}
            style={{ aspectRatio: photo.aspect }}
          >
            {/* Image container */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={photo.src}
                alt={photo.title}
                className="img-scale absolute inset-0 w-full h-full object-cover"
              />

              {/* Hover overlay */}
              <div className="img-overlay" />

              {/* Hover text */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              >
                <p
                  className="font-sans text-[9px] tracking-[0.25em] uppercase mb-2"
                  style={{ color: 'var(--muted)' }}
                >
                  {photo.category} — {photo.location}
                </p>
                <h3
                  className="font-serif mb-4"
                  style={{
                    fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                    fontWeight: 300,
                    color: 'var(--text)',
                  }}
                >
                  {photo.title}
                </h3>
                <span
                  className="font-sans text-xs tracking-[0.15em] uppercase flex items-center gap-3"
                  style={{ color: 'var(--text)' }}
                >
                  View Story
                  <svg width="20" height="8" viewBox="0 0 20 8" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              {/* Index number */}
              <div
                className="absolute top-6 left-6 font-sans text-[10px] tabular-nums"
                style={{ color: 'rgba(241,239,232,0.3)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
