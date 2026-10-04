import { useRef, useState, useEffect } from 'react'

// Real video from D:\wildlife\video (copied to /videos/wild.mp4)
const VIDEO_SRC = '/videos/wild.mp4'

export default function VideoSection() {
  const videoRef = useRef(null)
  const [soundOn, setSoundOn] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback: muted autoplay will work
        if (videoRef.current) {
          videoRef.current.muted = true
          videoRef.current.play()
        }
      })
    }
  }, [])

  const handleSound = () => {
    if (!videoRef.current) return
    const nextSound = !soundOn
    videoRef.current.muted = !nextSound
    setSoundOn(nextSound)
  }

  const handlePlayToggle = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        minHeight: '85vh',
        background: '#090A09',
      }}
    >
      {/* Background Cinematic Looping Video */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={!soundOn}
        playsInline
        autoPlay
        style={{
          opacity: 0.65,
          filter: 'contrast(1.05) brightness(0.9)',
        }}
      />

      {/* Cinematic Vignette and Dark Overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(9,10,9,0.95) 0%, rgba(9,10,9,0.3) 50%, rgba(9,10,9,0.85) 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(9,10,9,0.7) 100%)',
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 py-24 gap-8">
        {/* Subtle accent line */}
        <div style={{ width: 48, height: 1, background: 'rgba(241,239,232,0.2)' }} />

        <div>
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p
              className="font-sans text-[11px] tracking-[0.3em] uppercase text-emerald-400"
            >
              Documentary Footage · In Motion
            </p>
          </div>

          <h2
            className="font-serif text-[#F1EFE8]"
            style={{
              fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              lineHeight: 0.95,
            }}
          >
            Watch the Wild
          </h2>
        </div>

        {/* Interactive Controls Bar */}
        <div className="flex items-center gap-4 mt-2">
          {/* Play / Pause Toggle Button */}
          <button
            onClick={handlePlayToggle}
            className="group flex items-center gap-3 px-6 py-3 rounded-full border border-[#2A2B28] bg-[#0B0C0A]/70 backdrop-blur-md text-[#F1EFE8] text-xs font-sans tracking-[0.2em] uppercase transition-all duration-300 hover:border-emerald-400 hover:bg-[#0B0C0A]"
          >
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-400 group-hover:text-black transition-colors">
              {isPlaying ? (
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <rect x="1" y="1" width="3" height="10" rx="1" />
                  <rect x="6" y="1" width="3" height="10" rx="1" />
                </svg>
              ) : (
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                  <path d="M1 1l8 5-8 5V1z" />
                </svg>
              )}
            </span>
            <span>{isPlaying ? 'Pause' : 'Play'} Experience</span>
          </button>

          {/* Sound On / Off Toggle */}
          <button
            onClick={handleSound}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-full border text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 backdrop-blur-md ${
              soundOn
                ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300 shadow-lg shadow-emerald-950/30'
                : 'border-[#2A2B28] bg-[#0B0C0A]/70 text-[#A7A59B] hover:text-[#F1EFE8] hover:border-[#444]'
            }`}
          >
            <svg width="15" height="14" viewBox="0 0 16 14" fill="none">
              <path
                d="M1 4h3l4-3v12l-4-3H1V4z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {soundOn ? (
                <>
                  <path
                    d="M11 2c1.5 1 2.5 2.8 2.5 5s-1 4-2.5 5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.5 0c2.2 1.8 3.5 4.6 3.5 7s-1.3 5.2-3.5 7"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <line
                  x1="11"
                  y1="3"
                  x2="15"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              )}
            </svg>
            <span>{soundOn ? 'Sound On' : 'Sound Off'}</span>
          </button>
        </div>

        {/* Subtle accent line */}
        <div style={{ width: 48, height: 1, background: 'rgba(241,239,232,0.2)' }} />
      </div>
    </section>
  )
}
