import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const VIDEO_SRC = '/videos/wild.mp4'
const TOTAL_SECONDS = 8 // 8 seconds duration

const TIMED_QUOTES = [
  { time: 0, text: 'The forest holds its breath.' },
  { time: 1.8, text: 'A shadow stirs between the leaves.' },
  { time: 3.5, text: 'Patience — the only equipment that matters.' },
  { time: 5.2, text: 'Closer now. Unhurried. Certain.' },
  { time: 6.8, text: 'One frame. One heartbeat. One truth.' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const videoRef = useRef(null)

  const counterRef = useRef(null)
  const quoteRef = useRef(null)
  const progressRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const scrollHintRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(true)
  const [mobileFit, setMobileFit] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Setup initial video state
    video.muted = true
    video.playsInline = true
    video.loop = true

    // Ensure video starts playing immediately
    const startPlay = () => {
      video.play().catch(() => {
        // Fallback for strict browser autoplay
        video.muted = true
        video.play().catch(() => {})
      })
    }
    startPlay()

    // Title entrance animations on mount
    gsap.fromTo(
      titleRef.current,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' }
    )
    gsap.fromTo(
      subtitleRef.current,
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, delay: 0.5, ease: 'power3.out' }
    )
    gsap.fromTo(
      scrollHintRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 0.8 }
    )

    // Update time displays and quotes smoothly as video plays
    const onTimeUpdate = () => {
      if (!video) return
      // Cap/loop at 8 seconds
      if (video.currentTime >= TOTAL_SECONDS) {
        video.currentTime = 0
      }

      const cur = Math.min(video.currentTime, TOTAL_SECONDS)
      const progress = cur / TOTAL_SECONDS

      // Update progress bar
      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`
      }

      // Update seconds counter: e.g. 03s / 08s
      if (counterRef.current) {
        const secs = Math.floor(cur)
        counterRef.current.textContent = `${String(secs + 1).padStart(2, '0')}s`
      }

      // Update quote based on elapsed seconds
      if (quoteRef.current) {
        const match = [...TIMED_QUOTES].reverse().find((q) => q.time <= cur)
        if (match && quoteRef.current.textContent !== match.text) {
          quoteRef.current.textContent = match.text
        }
      }
    }

    video.addEventListener('timeupdate', onTimeUpdate)

    // Sticky ScrollTrigger to seamlessly pin the 8s cinematic hero while user explores
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyRef.current,
      onLeave: () => {
        // Pause when user leaves section to save GPU/battery
        video.pause()
        setIsPlaying(false)
      },
      onEnterBack: () => {
        video.play().catch(() => {})
        setIsPlaying(true)
      },
    })

    return () => {
      st.kill()
      video.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ height: '180vh', background: '#0B0C0A' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between"
      >
        {/* Ambient atmospheric backlight on mobile when in Fit mode */}
        {mobileFit && (
          <div
            className="md:hidden absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 45%, rgba(179,135,75,0.2) 0%, rgba(16,185,129,0.08) 40%, transparent 70%)',
            }}
          />
        )}

        {/* Desktop Cinematic Vignette & Bottom Dark Gradient */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(11,12,10,0.92) 0%, rgba(11,12,10,0.18) 55%, transparent 100%)',
          }}
        />
        <div
          className="hidden md:block absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(11,12,10,0.6) 100%)',
          }}
        />

        {/* Top Navbar Header */}
        <div
          className="relative md:absolute top-0 left-0 right-0 flex justify-between items-center px-5 sm:px-8 md:px-16 py-4 md:py-6 z-20"
          style={{
            background:
              'linear-gradient(to bottom, rgba(11,12,10,0.85), transparent)',
          }}
        >
          <a
            href="#"
            className="group logo-brand-group flex items-center gap-2.5 sm:gap-4 no-underline"
          >
            <div className="flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-black/45 backdrop-blur-md border border-white/12 shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-all">
              <img
                src="/logo-icon.png"
                alt="VM Wild Expeditions"
                className="logo-icon-img animate-leopard-prowl h-9 sm:h-11 md:h-12 w-auto object-contain"
                style={{
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease',
                }}
              />
            </div>
            <div className="flex flex-col">
              <span
                className="logo-brand-title shimmer-gold-text font-sans text-sm sm:text-base md:text-xl tracking-[0.24em] sm:tracking-[0.28em] uppercase font-bold leading-tight"
                style={{
                  transition: 'letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                VM WILD <span style={{ color: '#B3874B', fontWeight: 300 }}>EXPEDITIONS</span>
              </span>
              <span className="font-sans text-[7px] sm:text-[9px] tracking-[0.3em] text-[#F1EFE8]/70 uppercase mt-0.5 sm:mt-1 font-normal hidden xs:inline">
                Wildlife Photography Studio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['WORK', 'ABOUT', 'CONTACT'].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-sans text-[11px] tracking-[0.2em] text-[#A7A59B] hover:text-[#F1EFE8] no-underline uppercase transition-colors"
              >
                {l}
              </a>
            ))}
            <a
              href="https://www.instagram.com/vijaymathiew_photography?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.2em] text-[#F1EFE8] hover:text-[#B3874B] no-underline uppercase px-3.5 py-1.5 rounded-full border border-white/15 bg-white/6 backdrop-blur-md transition-all"
              title="Follow on Instagram"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B3874B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>

          {/* Mobile Quick Action Pill */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#work"
              className="px-3 py-1 rounded-full border border-white/20 bg-white/10 text-[9px] tracking-[0.2em] uppercase text-[#F1EFE8] font-sans hover:bg-white/20 transition-all"
            >
              EXPLORE
            </a>
            <a
              href="https://wa.me/919087394546"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366]"
              title="WhatsApp Support"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>
        </div>

        {/* High Performance 8-Second Cinematic Video Player */}
        <div
          className={`transition-all duration-500 ease-out ${
            mobileFit
              ? 'relative z-10 w-[94%] max-w-lg aspect-video mx-auto my-auto rounded-2xl overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.9)] border border-white/15'
              : 'absolute inset-0 w-full h-full'
          } md:absolute md:inset-0 md:w-full md:h-full md:max-w-none md:aspect-auto md:rounded-none md:border-none md:shadow-none md:z-0 md:m-0`}
        >
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            className={`w-full h-full object-cover select-none transition-all duration-500 ${
              mobileFit ? 'object-center' : 'object-[24%_center]'
            } md:object-center`}
            autoPlay
            muted
            loop
            playsInline
            style={{
              filter: 'contrast(1.04) brightness(0.96)',
            }}
          />

          {/* Quick Fit / Fill Mode Toggle Button (Mobile Only) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setMobileFit((prev) => !prev)
            }}
            className="md:hidden absolute top-3 right-3 z-30 px-3 py-1 rounded-full bg-black/70 border border-white/20 text-[9px] tracking-wider uppercase text-[#F1EFE8] backdrop-blur-md flex items-center gap-1.5 shadow-xl active:scale-95 transition-all cursor-pointer"
            title={mobileFit ? 'Switch to Full Bleed' : 'Switch to Fit Screen'}
          >
            <span>{mobileFit ? '⛶ Full Bleed' : '▣ Fit Screen'}</span>
          </button>
        </div>

        {/* Hero Title & Information */}
        <div
          className={`${
            mobileFit
              ? 'relative z-20 px-5 text-center flex flex-col items-center gap-2 pb-2'
              : 'absolute z-20 left-5 sm:left-8 md:left-16 bottom-14 sm:bottom-16 md:bottom-20'
          } md:absolute md:z-20 md:left-16 md:bottom-20 md:text-left md:items-start md:px-0 md:pb-0`}
        >
          <h1
            ref={titleRef}
            className={`font-serif font-light text-[var(--text)] leading-[0.9] tracking-[0.08em] opacity-0 ${
              mobileFit
                ? 'text-2xl sm:text-3xl'
                : 'text-[clamp(3rem,8vw,9.5rem)]'
            } md:text-[clamp(3.2rem,8.5vw,9.5rem)]`}
          >
            INTO THE
            <span className={mobileFit ? 'inline' : 'hidden'}> </span>
            <br className={mobileFit ? 'hidden md:inline' : 'inline'} />
            WILD
          </h1>

          <div
            ref={subtitleRef}
            className="flex items-center gap-3 sm:gap-5 mt-1 sm:mt-3 md:mt-5 opacity-0"
          >
            <span className="font-sans text-[9px] sm:text-xs tracking-[0.25em] text-[#B3874B] uppercase font-semibold">
              Wildlife Photography in Tamil Nadu
            </span>
            <span className="w-4 sm:w-8 h-[1px] bg-[var(--border)] inline-block" />
            <span className="font-sans text-[9px] sm:text-xs tracking-[0.2em] text-[var(--muted)] uppercase">
              India · Fine Art Portfolio
            </span>
          </div>

          {/* Atmospheric Quote for mobile when in Fit mode */}
          {mobileFit && (
            <p className="md:hidden font-serif text-xs italic text-[#F1EFE8]/75 mt-0.5">
              The forest holds its breath.
            </p>
          )}
        </div>

        {/* Dynamic Atmospheric Quote (Desktop / Full bleed) */}
        <div
          className={`${
            mobileFit ? 'hidden' : 'block'
          } sm:block md:block absolute z-20 right-6 md:right-16 bottom-16 md:bottom-20 text-right max-w-[260px] md:max-w-[340px]`}
        >
          <p
            ref={quoteRef}
            className="font-serif text-[clamp(0.95rem,1.4vw,1.25rem)] italic font-light text-[#F1EFE8]/75 leading-relaxed transition-opacity duration-400"
          >
            The forest holds its breath.
          </p>
        </div>

        {/* 8-Second Timeline Progress Bar & Time Counter */}
        <div
          className={`z-20 flex items-center gap-3 sm:gap-4 ${
            mobileFit
              ? 'relative pb-3 sm:pb-4 justify-center'
              : 'absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2'
          } md:absolute md:bottom-7 md:left-1/2 md:-translate-x-1/2 md:pb-0`}
        >
          <span
            ref={counterRef}
            className="font-sans text-[10px] sm:text-xs text-[var(--text)] tabular-nums min-w-[3ch] tracking-wider"
          >
            01s
          </span>

          <div
            onClick={togglePlayback}
            className="w-24 sm:w-36 md:w-44 h-0.5 bg-[rgba(42,43,40,0.8)] relative cursor-pointer"
            title={isPlaying ? 'Click to Pause' : 'Click to Play'}
          >
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-[#10B981] w-0 transition-[width] duration-100 linear"
            />
          </div>

          <span className="font-sans text-[10px] sm:text-xs text-[var(--muted)] tracking-wider">
            08s
          </span>
        </div>

        {/* Scroll To Explore Indicator (Desktop) */}
        <div
          ref={scrollHintRef}
          className="hidden md:flex flex-col items-center gap-3 absolute z-20 right-8 md:right-16 top-1/2 -translate-y-1/2 opacity-0"
        >
          <span
            className="font-sans text-[9px] tracking-[0.22em] text-[var(--muted)] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll to Explore
          </span>
          <div className="scroll-pulse text-[var(--muted)]">
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
              <rect
                x="1"
                y="1"
                width="12"
                height="18"
                rx="6"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="7" cy="6" r="2" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
