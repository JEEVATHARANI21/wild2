import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Wildlife', 'is', 'never', 'still.']

export default function Intro() {
  const sectionRef = useRef(null)
  const wordsRef = useRef([])
  const lineRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      wordsRef.current,
      { y: '110%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    )
    gsap.fromTo(
      [lineRef.current, subRef.current],
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        delay: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="px-8 md:px-16 py-32 md:py-48"
      style={{ background: 'var(--bg)' }}
    >
      {/* Big serif statement */}
      <div
        className="overflow-hidden flex flex-wrap gap-x-6 gap-y-0"
        style={{ marginBottom: '3rem' }}
      >
        {WORDS.map((word, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <span
              ref={el => wordsRef.current[i] = el}
              className="font-serif block"
              style={{
                fontSize: 'clamp(3rem, 9vw, 8rem)',
                fontWeight: 300,
                color: 'var(--text)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              {word}
            </span>
          </div>
        ))}
      </div>

      {/* Divider line */}
      <div
        ref={lineRef}
        style={{
          height: 1,
          background: 'var(--border)',
          transformOrigin: 'left',
          marginBottom: '2rem',
        }}
      />

      {/* Sub-caption */}
      <p
        ref={subRef}
        className="font-sans text-sm tracking-[0.1em] uppercase"
        style={{ color: 'var(--muted)', maxWidth: 480 }}
      >
        We document the wild in moments that disappear in seconds —<br />
        shadows, breath, and the precise instant before movement.
      </p>
    </section>
  )
}
