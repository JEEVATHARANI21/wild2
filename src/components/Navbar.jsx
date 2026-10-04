import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Navbar({ openLegal }) {
  const navRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Only show navbar after scrolling past the hero section
      const threshold = window.innerHeight * 1.8
      setVisible(window.scrollY > threshold)
      setScrolled(window.scrollY > threshold + 80)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      y: visible ? 0 : -30,
      opacity: visible ? 1 : 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }, [visible])

  // Close mobile drawer when scrolling far or pressing Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-16 py-4 md:py-6"
        style={{
          opacity: 0,
          background: scrolled
            ? 'rgba(11, 12, 10, 0.92)'
            : 'linear-gradient(to bottom, rgba(11,12,10,0.92), transparent)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(42, 43, 40, 0.6)' : 'none',
          transition: 'all 0.4s ease',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <a
          href="#"
          className="flex items-center gap-2.5 sm:gap-3.5 group logo-brand-group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex items-center justify-center p-1.5 rounded-lg bg-black/40 border border-white/10 group-hover:border-[#B3874B]/50 transition-all duration-300">
            <img
              src="/logo-icon.png"
              alt="VM Wild Expeditions Logo"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain brightness-125 logo-icon-img animate-leopard-prowl"
              style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease' }}
            />
          </div>
          <div className="flex flex-col">
            <span
              className="font-sans text-sm sm:text-base md:text-lg tracking-[0.24em] sm:tracking-[0.26em] uppercase font-bold text-[#F1EFE8] leading-none logo-brand-title shimmer-gold-text"
              style={{ transition: 'letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              VM WILD <span className="text-[#B3874B] font-light">EXPEDITIONS</span>
            </span>
            <span className="font-sans text-[8px] tracking-[0.35em] uppercase text-[#888] mt-1 hidden sm:inline">
              Wildlife Photography Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-6">
          {[
            { label: 'DEALS', href: '#deals' },
            { label: 'SHARED SAFARIS', href: '#shared-safaris' },
            { label: 'DESTINATIONS', href: '#destinations' },
            { label: 'OPERATORS', href: '#operators' },
            { label: 'GALLERY', href: '#gallery' },
            { label: 'ABOUT', href: '#about' },
            { label: 'CONTACT', href: '#contact' },
          ].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link font-sans text-[11px] tracking-[0.16em] uppercase"
                style={{ color: 'var(--muted)', transition: 'color 0.3s ease' }}
                onMouseEnter={e => e.target.style.color = 'var(--text)'}
                onMouseLeave={e => e.target.style.color = 'var(--muted)'}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://www.instagram.com/vijaymathiew_photography?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 hover:border-[#B3874B] text-[10px] tracking-[0.18em] uppercase text-[#F1EFE8] hover:text-[#B3874B] transition-all bg-white/5"
              title="Follow @vijaymathiew_photography on Instagram"
            >
              <svg
                className="w-3.5 h-3.5 text-[#B3874B]"
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
              <span>Instagram</span>
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-[#141512]/90 border border-white/15 hover:border-[#B3874B] text-[#F1EFE8] transition-all focus:outline-none cursor-pointer"
        >
          <span
            className={`block w-5 h-0.5 bg-[#F1EFE8] transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-[#B3874B]' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#F1EFE8] my-1 transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#F1EFE8] transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-[#B3874B]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Fullscreen Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden flex flex-col justify-between p-6 sm:p-8 bg-[#0B0C0A]/98 backdrop-blur-2xl border-b border-[#2A2B28] transition-all duration-400 ease-out overflow-y-auto ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2A2B28]/80">
          <div className="flex items-center gap-3">
            <img
              src="/logo-icon.png"
              alt="VM Wild Expeditions"
              className="h-9 w-auto object-contain brightness-125"
            />
            <span className="font-sans text-base tracking-[0.24em] uppercase font-bold text-[#F1EFE8]">
              VM WILD <span className="text-[#B3874B] font-light">EXPEDITIONS</span>
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#F1EFE8] text-lg hover:border-[#B3874B] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col gap-3 my-auto py-4">
          {[
            { label: 'Safari Deals', href: '#deals', desc: 'Curated All-Inclusive Expeditions' },
            { label: 'Shared Safaris', href: '#shared-safaris', desc: 'Gypsy Vehicle Seat Pooling' },
            { label: 'Tiger Reserves', href: '#destinations', desc: '42+ National Parks & Habitats' },
            { label: 'Operators', href: '#operators', desc: 'Govt Registered Safari Fleets' },
            { label: 'Gallery', href: '#gallery', desc: 'Fine Art Wildlife Archive' },
            { label: 'About', href: '#about', desc: 'Photographer & Naturalist' },
            { label: 'Contact', href: '#contact', desc: 'WhatsApp Support & Custom Quotes' },
          ].map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              className="group flex flex-col gap-0.5 py-1.5 border-b border-white/5 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl sm:text-2xl text-[#F1EFE8] group-hover:text-[#B3874B] transition-colors tracking-wide">
                  {item.label}
                </span>
                <span className="font-sans text-[10px] text-[#B3874B] opacity-70 group-hover:opacity-100 transition-opacity">
                  0{idx + 1} →
                </span>
              </div>
              <span className="font-sans text-[9px] tracking-wider uppercase text-[#888] group-hover:text-[#A7A59B]">
                {item.desc}
              </span>
            </a>
          ))}
        </div>

        {/* Drawer Footer Actions */}
        <div className="flex flex-col gap-4 pt-6 border-t border-[#2A2B28]/80">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://wa.me/919087394546?text=Hello%20Vijay,%20I%20am%20reaching%20out%20from%20VM%20Wild%20Expeditions%20website%20regarding%20photography%20support%20/%20inquiries."
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 text-[#F1EFE8] font-sans text-xs tracking-wider uppercase transition-all shadow-md"
            >
              <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.instagram.com/vijaymathiew_photography?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/15 bg-white/5 text-[#F1EFE8] font-sans text-xs tracking-wider uppercase transition-all shadow-md"
            >
              <svg className="w-4 h-4 text-[#B3874B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-[#888] font-sans pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                openLegal && openLegal('terms')
              }}
              className="hover:text-[#B3874B] uppercase tracking-wider text-[10px] cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-[#444]">·</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                openLegal && openLegal('privacy')
              }}
              className="hover:text-[#B3874B] uppercase tracking-wider text-[10px] cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

