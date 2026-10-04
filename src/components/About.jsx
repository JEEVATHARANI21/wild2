import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Genuine wildlife photographer portrait
const PORTRAIT = '/images/vijay.jpeg'

const STATS = [
  { value: 5, suffix: '+', label: 'Years in the Wild' },
  { value: 38, suffix: '', label: 'National Parks' },
  { value: 240, suffix: '+', label: 'Species Documented' },
  { value: 18, suffix: '', label: 'Countries' },
]

function useCountUp(target, inView) {
  const [count, setCount] = useState(target)
  const started = useRef(false)
  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    setCount(0)
    const duration = 1600
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])
  return count
}

function StatItem({ value, suffix, label, inView, delay }) {
  const count = useCountUp(value, inView)
  return (
    <div
      className="stat-item"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="font-serif"
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 300,
          color: 'var(--text)',
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <p
        className="font-sans text-[10px] tracking-[0.18em] uppercase mt-2"
        style={{ color: 'var(--muted)' }}
      >
        {label}
      </p>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)
  const [statsInView, setStatsInView] = useState(false)

  useEffect(() => {
    // Text reveal
    const lines = textRef.current?.querySelectorAll('.about-line')
    if (lines) {
      gsap.fromTo(
        lines,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      )
    }

    // Stats trigger
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 80%',
      onEnter: () => {
        setStatsInView(true)
        statsRef.current?.querySelectorAll('.stat-item').forEach(el => el.classList.add('in-view'))
      },
    })
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-5 sm:px-8 md:px-16 pt-16 sm:pt-20 md:pt-28 pb-12 md:pb-16"
      style={{ background: 'var(--bg)' }}
    >
      <div className="flex flex-col md:flex-row gap-10 sm:gap-16 md:gap-24 items-start">
        {/* Left — text */}
        <div className="md:w-6/12" ref={textRef}>
          <div className="about-line flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#B3874B] animate-pulse" />
            <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B3874B] font-medium">
              Professional Wildlife Photographer · About
            </p>
          </div>

          <h2
            className="about-line font-serif mb-8"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              fontWeight: 300,
              color: 'var(--text)',
              lineHeight: 1.3,
            }}
          >
            I don't photograph animals.<br />
            <span style={{ fontStyle: 'italic' }}>I photograph the moments</span><br />
            between movement and silence.
          </h2>

          <div style={{ width: 40, height: 1, background: 'var(--border)', marginBottom: '2rem' }} className="about-line" />

          <p
            className="about-line font-sans text-sm leading-relaxed"
            style={{ color: 'var(--muted)', maxWidth: 440 }}
          >
            As a <strong className="text-[#F1EFE8] font-normal">professional wildlife photographer</strong> based in Tamil Nadu, five years in the wild have taught me that patience is the
            only equipment that truly matters. Every expedition begins with
            silence and ends with a single frame — the one that holds the
            breath of the forest, the weight of the moment, the animal in
            its complete, unguarded truth.
          </p>

          <p
            className="about-line font-sans text-sm leading-relaxed mt-5"
            style={{ color: 'var(--muted)', maxWidth: 440 }}
          >
            Based in Tamil Nadu, India. Working across Asia and Africa.
          </p>

          <div className="about-line mt-8">
            <a
              href="https://www.instagram.com/vijaymathiew_photography?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#B3874B] text-[#F1EFE8] transition-all duration-300 group shadow-lg text-xs font-sans tracking-wider"
            >
              <svg
                className="w-4 h-4 text-[#B3874B] group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Follow @vijaymathiew_photography</span>
              <span className="text-[#888] group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>
        </div>

        {/* Right — portrait */}
        <div className="md:w-6/12 flex flex-col gap-12">
          <div
            className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#090A09]"
            style={{ aspectRatio: '3/4', position: 'relative' }}
          >
            <img
              src={PORTRAIT}
              alt="The Photographer"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,12,10,0.5) 0%, transparent 50%)',
              }}
            />
          </div>

          {/* Stats grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-8"
          >
            {STATS.map((stat, i) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                inView={statsInView}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
