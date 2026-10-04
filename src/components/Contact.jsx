import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// REPLACE WITH YOUR PHOTOGRAPH — dark forest/dusk image
const BG_IMAGE = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80&auto=format&fit=crop'

export default function Contact({ openLegal }) {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const arrowRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )
    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    )
  }, [])

  useEffect(() => {
    if (!arrowRef.current) return
    gsap.to(arrowRef.current, {
      x: hovered ? 8 : 0,
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [hovered])

  const handleChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = `mailto:hello@vmwildexpeditions.com?subject=Enquiry from ${formData.name}&body=${formData.message}`
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background image */}
      <img
        src={BG_IMAGE}
        alt="Forest at dusk"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.2 }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(11,12,10,1) 0%, rgba(11,12,10,0.6) 60%, rgba(11,12,10,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 pt-12 sm:pt-16 md:pt-20 pb-20 md:pb-32 text-center">
        {/* Divider */}
        <div style={{ width: 40, height: 1, background: 'var(--border)', marginBottom: '2.5rem' }} />

        {/* SEO Topic Eyebrow */}
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#B3874B] animate-pulse" />
          <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#B3874B] font-medium">
            Inquiries · Wildlife Photographer Tamil Nadu
          </p>
        </div>

        {/* Big statement */}
        <div ref={titleRef}>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.2rem, 7.5vw, 6.8rem)',
              fontWeight: 300,
              color: 'var(--text)',
              lineHeight: 0.98,
              letterSpacing: '-0.01em',
            }}
          >
            Wildlife Photographer<br />
            <span style={{ fontStyle: 'italic' }}>Tamil Nadu, India</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] mt-4 max-w-lg mx-auto font-light leading-relaxed">
            Connect with Vijay Mathiew for fine art print acquisitions, guided photography tours, private field mentoring, and editorial licensing.
          </p>
        </div>

        {/* CTA */}
        <div ref={contentRef} className="flex flex-col items-center gap-8 mt-12">
          <a
            href="mailto:hello@vmwildexpeditions.com"
            className="group flex items-center gap-4"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span
              className="font-sans text-sm tracking-[0.25em] uppercase"
              style={{ color: 'var(--text)' }}
            >
              Let's Talk
            </span>
            <svg
              ref={arrowRef}
              width="32" height="12" viewBox="0 0 32 12" fill="none"
            >
              <path d="M0 6h30M24 1l6 5-6 5" stroke="var(--text)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-sans">
            <a
              href="mailto:hello@vmwildexpeditions.com"
              className="text-[#A7A59B] hover:text-[#F1EFE8] border-b border-[#2A2B28] pb-0.5 transition-colors"
            >
              hello@vmwildexpeditions.com
            </a>
            <span className="hidden sm:inline text-[#444]">·</span>
            <a
              href="https://wa.me/919087394546?text=Hello%20Vijay,%20I%20am%20reaching%20out%20from%20VM%20Wild%20Expeditions%20website%20regarding%20photography%20support%20/%20inquiries."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#25D366]/40 hover:border-[#25D366] bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-all font-medium tracking-wide shadow-sm"
              title="Chat on WhatsApp"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Minimal contact form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-8 w-full"
            style={{ maxWidth: 480 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 bg-transparent font-sans text-sm py-3 px-4"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  outline: 'none',
                  caretColor: 'var(--text)',
                }}
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 bg-transparent font-sans text-sm py-3 px-4"
                style={{
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  outline: 'none',
                  caretColor: 'var(--text)',
                }}
              />
            </div>
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent font-sans text-sm py-3 px-4 resize-none"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--text)',
                outline: 'none',
                caretColor: 'var(--text)',
              }}
            />
            <button
              type="submit"
              className="font-sans text-xs tracking-[0.22em] uppercase py-4 transition-all duration-300"
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'var(--text)'
                e.target.style.color = 'var(--bg)'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent'
                e.target.style.color = 'var(--text)'
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Divider */}
        <div style={{ width: 40, height: 1, background: 'var(--border)', marginTop: '5rem', marginBottom: '2rem' }} />

        {/* Footer */}
        <footer className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3 group logo-brand-group cursor-pointer">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 shadow-2xl group-hover:border-[#B3874B]/50 transition-all duration-300">
              <img
                src="/logo-icon.png"
                alt="VM Wild Expeditions"
                className="h-14 md:h-16 w-auto object-contain logo-icon-img animate-leopard-prowl"
                style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease' }}
              />
            </div>
            <p
              className="font-sans text-xl md:text-2xl tracking-[0.3em] uppercase font-bold text-[#F1EFE8] mt-2 logo-brand-title shimmer-gold-text"
              style={{ transition: 'letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              VM WILD <span className="text-[#B3874B] font-light">EXPEDITIONS</span>
            </p>
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#888]">
              Wildlife Photography Studio
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <a
              href="https://wa.me/919087394546?text=Hello%20Vijay,%20I%20am%20reaching%20out%20from%20VM%20Wild%20Expeditions%20website%20regarding%20photography%20support%20/%20inquiries."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#25D366]/40 hover:border-[#25D366] bg-[#25D366]/10 text-[#F1EFE8] hover:text-[#25D366] font-sans text-[11px] tracking-[0.18em] uppercase transition-all duration-300 shadow-md group"
              title="Chat on WhatsApp"
            >
              <svg className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.instagram.com/vijaymathiew_photography?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 hover:border-[#B3874B] bg-white/5 text-[#F1EFE8] hover:text-[#B3874B] font-sans text-[11px] tracking-[0.2em] uppercase transition-all duration-300 shadow-md group"
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
              <span>@vijaymathiew_photography</span>
              <span className="text-[#888] group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>

          {/* Legal: Terms & Privacy Policy Links */}
          <div className="flex items-center gap-5 text-xs text-[#888] font-sans mt-2">
            <button
              onClick={() => openLegal && openLegal('terms')}
              className="hover:text-[#B3874B] transition-colors cursor-pointer uppercase tracking-widest text-[10px]"
            >
              Terms of Service
            </button>
            <span className="text-[#444]">·</span>
            <button
              onClick={() => openLegal && openLegal('privacy')}
              className="hover:text-[#B3874B] transition-colors cursor-pointer uppercase tracking-widest text-[10px]"
            >
              Privacy Policy
            </button>
          </div>

          <p className="font-sans text-[10px]" style={{ color: 'var(--border)' }}>
            © 2026 VM WILD EXPEDITIONS. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  )
}
