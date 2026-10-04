import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// REPLACE WITH YOUR FRAME SEQUENCE — drop frame_001.jpg ... frame_072.jpg in public/images/frames/
// For now, we simulate with a single image + zoom using canvas transform
const FRAME_TOTAL = 72
const FRAME_BASE = '/images/frames/frame_'
const FRAME_EXT = '.jpg'

// Atmospheric placeholder image for simulation
// REPLACE WITH YOUR PHOTOGRAPH
const SIM_IMAGE = 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1600&q=80&auto=format&fit=crop'

const QUOTES = [
  { frame: 1,  text: 'The forest holds its breath.' },
  { frame: 18, text: 'A shadow stirs.' },
  { frame: 36, text: 'Then — stillness.' },
  { frame: 54, text: 'The moment before everything changes.' },
  { frame: 68, text: 'One frame. One heartbeat.' },
]

export default function ScrollStory() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const canvasRef = useRef(null)
  const counterRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let frameIndex = 0
    let simImg = new window.Image()
    simImg.crossOrigin = 'anonymous'
    simImg.src = SIM_IMAGE

    // Attempt to use real frames; fall back to simulation
    const images = []
    let useReal = false

    const checkRealFrames = async () => {
      try {
        const testImg = new window.Image()
        testImg.src = `${FRAME_BASE}${String(1).padStart(3, '0')}${FRAME_EXT}`
        await new Promise((res, rej) => {
          testImg.onload = res
          testImg.onerror = rej
          setTimeout(rej, 2000)
        })
        useReal = true
        // Preload all frames
        for (let i = 1; i <= FRAME_TOTAL; i++) {
          const img = new window.Image()
          img.src = `${FRAME_BASE}${String(i).padStart(3, '0')}${FRAME_EXT}`
          images.push(img)
        }
      } catch {
        useReal = false
      }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      render(frameIndex)
    }

    const render = (index) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      if (useReal && images[index] && images[index].complete) {
        drawCover(ctx, images[index], w, h, index)
      } else if (simImg.complete) {
        // Simulate zoom progression
        const progress = index / FRAME_TOTAL
        const scale = 1 + progress * 0.35
        const offsetX = w / 2
        const offsetY = h / 2

        const ratio = Math.max(w / simImg.width, h / simImg.height) * scale
        const dw = simImg.width * ratio
        const dh = simImg.height * ratio
        const dx = offsetX - dw / 2 - (progress * w * 0.05)
        const dy = offsetY - dh / 2

        ctx.save()
        ctx.globalAlpha = 1
        ctx.drawImage(simImg, dx, dy, dw, dh)

        // Vignette
        const grad = ctx.createRadialGradient(offsetX, offsetY, h * 0.1, offsetX, offsetY, h * 0.8)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(1, 'rgba(11,12,10,0.7)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)

        ctx.restore()
      }
    }

    const drawCover = (ctx, img, w, h, index) => {
      const ratio = Math.max(w / img.width, h / img.height)
      const dw = img.width * ratio
      const dh = img.height * ratio
      const dx = (w - dw) / 2
      const dy = (h - dh) / 2
      ctx.drawImage(img, dx, dy, dw, dh)
    }

    checkRealFrames().then(() => {
      window.addEventListener('resize', resize)
      resize()
      simImg.onload = () => render(frameIndex)
    })

    // ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyRef.current,
      onUpdate: (self) => {
        const progress = self.progress
        frameIndex = Math.min(
          FRAME_TOTAL - 1,
          Math.floor(progress * FRAME_TOTAL)
        )
        render(frameIndex)

        // Update counter
        if (counterRef.current) {
          counterRef.current.textContent = String(frameIndex + 1).padStart(2, '0')
        }

        // Update quote
        if (quoteRef.current) {
          const currentQuote = QUOTES.slice().reverse().find(q => q.frame <= frameIndex + 1)
          if (currentQuote) {
            quoteRef.current.textContent = currentQuote.text
          }
        }
      },
    })

    return () => {
      st.kill()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ height: '500vh', background: 'var(--bg)' }}
    >
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Label */}
        <div
          className="absolute top-10 left-0 right-0 flex justify-center"
          style={{ zIndex: 10 }}
        >
          <div className="text-center">
            <p
              className="font-sans text-[10px] tracking-[0.3em] uppercase mb-2"
              style={{ color: 'var(--muted)' }}
            >
              The Wild
            </p>
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                color: 'var(--text)',
                fontWeight: 300,
                letterSpacing: '0.08em',
              }}
            >
              In 72 Moments
            </h2>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />

        {/* Dark vignette edges */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(11,12,10,0.6) 100%)',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />

        {/* Quote */}
        <div
          className="absolute left-0 right-0 flex justify-center"
          style={{ bottom: '20%', zIndex: 10 }}
        >
          <p
            ref={quoteRef}
            className="font-serif text-center"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
              color: 'rgba(241,239,232,0.7)',
              fontWeight: 300,
              fontStyle: 'italic',
              maxWidth: '600px',
              padding: '0 2rem',
              transition: 'opacity 0.5s ease',
            }}
          >
            The forest holds its breath.
          </p>
        </div>

        {/* Frame counter */}
        <div
          className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-4"
          style={{ zIndex: 10 }}
        >
          <span
            ref={counterRef}
            className="font-sans text-xs tabular-nums"
            style={{ color: 'var(--text)', minWidth: '2ch', textAlign: 'right' }}
          >
            01
          </span>
          <div
            style={{
              width: 120,
              height: 1,
              background: 'var(--border)',
              position: 'relative',
            }}
          >
            <div
              id="frame-progress"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                height: '100%',
                background: 'var(--muted)',
                width: '0%',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <span
            className="font-sans text-xs tabular-nums"
            style={{ color: 'var(--muted)' }}
          >
            {String(FRAME_TOTAL).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
