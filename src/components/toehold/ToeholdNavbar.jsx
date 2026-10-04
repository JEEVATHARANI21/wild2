import { useState, useEffect } from 'react'
import { useSiteContent } from '../../context/SiteContentContext'

export default function ToeholdNavbar({
  currentView = 'home',
  onNavigate,
  onOpenEnquire,
}) {
  const { content } = useSiteContent()
  const brand = content?.brand || {
    siteName: 'VM Wild Expeditions',
    tagline: 'Beyond the Map. Into the Wild.',
    logoUrl: '/logo-clean.png',
  }
  const social = content?.social || {
    instagramUrl: 'https://www.instagram.com/vm_wild_expeditions?stkn=OTU3MGI0bHR6OWZz',
    instagramHandle: '@vm_wild_expeditions',
    whatsappNumber: '919087394546',
  }

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (target) => {
    setMobileMenuOpen(false)
    if (target === 'gallery') {
      if (onNavigate) onNavigate('gallery')
      return
    }
    if (target === 'about') {
      if (onNavigate) onNavigate('about')
      return
    }
    if (target === 'faq') {
      if (onNavigate) onNavigate('faq')
      return
    }

    // Anchor navigation on home view (destinations, contact)
    if (currentView !== 'home') {
      if (onNavigate) onNavigate('home', target)
    } else {
      const el = document.getElementById(target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else if (target === 'destinations') {
        const toursEl = document.getElementById('tours') || document.getElementById('destinations')
        if (toursEl) toursEl.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate('home')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 select-none ${
        scrolled
          ? 'bg-[#080908]/96 backdrop-blur-xl border-b border-[#242923] shadow-[0_12px_32px_rgba(0,0,0,0.85)] py-3 sm:py-3.5'
          : 'bg-gradient-to-b from-[#080908]/90 via-[#080908]/40 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4">
        {/* 1. Logo, Name & Tagline */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group no-underline flex-shrink-0"
          title={`${brand.siteName} — ${brand.tagline}`}
        >
          <img
            src={brand.logoUrl || '/logo-clean.png'}
            alt={`${brand.siteName} Logo`}
            className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md flex-shrink-0"
          />
          <div className="flex flex-col border-l border-[#242923] pl-2.5 sm:pl-3 py-0.5 flex-shrink-0">
            <span className="font-serif text-[11.5px] sm:text-[14px] tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#D6A85C] font-semibold leading-tight whitespace-nowrap">
              {brand.siteName}
            </span>
            <span className="hidden sm:block font-sans text-[8.5px] sm:text-[9.5px] tracking-[0.24em] uppercase text-[#B87333] font-light mt-0.5 whitespace-nowrap">
              {brand.tagline}
            </span>
          </div>
        </a>

        {/* 2. Exact User Requested Navigation: Destinations, Gallery, About, FAQ, Contact */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] font-sans tracking-[0.16em] uppercase font-medium">
          <button
            type="button"
            onClick={() => handleNav('destinations')}
            className={`py-2 transition-colors cursor-pointer whitespace-nowrap ${
              currentView === 'home'
                ? 'text-[#F2F0E8]/90 hover:text-[#D6A85C]'
                : 'text-[#A7A59B] hover:text-[#F2F0E8]'
            }`}
          >
            DESTINATIONS
          </button>

          <button
            type="button"
            onClick={() => handleNav('gallery')}
            className={`py-2 transition-colors cursor-pointer whitespace-nowrap relative ${
              currentView === 'gallery'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#F2F0E8]/90 hover:text-[#D6A85C]'
            }`}
          >
            <span>GALLERY</span>
            {currentView === 'gallery' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNav('about')}
            className={`py-2 transition-colors cursor-pointer whitespace-nowrap relative ${
              currentView === 'about'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#F2F0E8]/90 hover:text-[#D6A85C]'
            }`}
          >
            <span>ABOUT</span>
            {currentView === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNav('faq')}
            className={`py-2 transition-colors cursor-pointer whitespace-nowrap relative ${
              currentView === 'faq'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#F2F0E8]/90 hover:text-[#D6A85C]'
            }`}
          >
            <span>FAQ</span>
            {currentView === 'faq' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="py-2 text-[#F2F0E8]/90 hover:text-[#D6A85C] transition-colors cursor-pointer whitespace-nowrap"
          >
            CONTACT
          </button>
        </nav>

        {/* 3. Right Actions: Instagram, WhatsApp & ENQUIRE Gold Pill Button */}
        <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0">
          {/* Instagram Icon Button */}
          <a
            href={social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            title={`Follow us on Instagram ${social.instagramHandle || ''}`}
            className="w-9 h-9 rounded-full bg-[#151815] hover:bg-[#1f241f] border border-[#242923] hover:border-[#E1306C] text-[#F2F0E8] hover:text-[#E1306C] flex items-center justify-center transition-all duration-300 shadow-md group"
          >
            <svg className="w-4 h-4 text-[#E1306C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          {/* WhatsApp Icon Button */}
          <a
            href={`https://wa.me/${social.whatsappNumber}?text=Hi%20Vijay,%20I'm%20reaching%20out%20to%20inquire%20about%20${encodeURIComponent(brand.siteName)}.`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Concierge"
            title="Chat on WhatsApp"
            className="w-9 h-9 rounded-full bg-[#151815] hover:bg-[#1f241f] border border-[#242923] hover:border-[#25D366] text-[#F2F0E8] hover:text-[#25D366] flex items-center justify-center transition-all duration-300 shadow-md group"
          >
            <svg className="w-4 h-4 text-[#25D366] fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>

          <button
            type="button"
            onClick={() => onOpenEnquire && onOpenEnquire()}
            className="py-2.5 px-6 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] hover:shadow-[0_4px_22px_rgba(214,168,92,0.45)] hover:scale-[1.02] hover:brightness-105 transition-all duration-300 cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <span>ENQUIRE</span>
            <span className="text-sm font-bold">→</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-[#151815] border border-[#242923] text-[#F2F0E8] focus:outline-none cursor-pointer"
        >
          <span
            className={`block w-5 h-0.5 bg-[#F2F0E8] transition-transform duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-[#B87333]' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#F2F0E8] my-1 transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-[#F2F0E8] transition-transform duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-[#B87333]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden flex flex-col justify-between p-6 bg-[#080908]/98 backdrop-blur-2xl border-b border-[#242923] transition-all duration-300 ease-out overflow-y-auto ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#242923]">
          <div className="flex items-center gap-3">
            <img src={brand.logoUrl || '/logo-clean.png'} alt={brand.siteName} className="h-9 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="font-serif text-xs tracking-widest uppercase text-[#D6A85C] font-semibold">
                {brand.siteName}
              </span>
              <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-[#B87333]">
                {brand.tagline}
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-9 h-9 rounded-xl bg-[#151815] border border-[#242923] flex items-center justify-center text-[#F2F0E8] text-base hover:text-[#B87333] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3 py-6 my-auto text-left">
          <button
            onClick={() => handleNav('destinations')}
            className="py-3 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left cursor-pointer"
          >
            <span>Destinations</span>
            <span className="text-xs font-sans text-[#B87333]">01 →</span>
          </button>
          <button
            onClick={() => handleNav('gallery')}
            className={`py-3 border-b border-[#242923]/60 font-serif text-2xl flex items-center justify-between text-left cursor-pointer ${
              currentView === 'gallery' ? 'text-[#D6A85C]' : 'text-[#F2F0E8] hover:text-[#D6A85C]'
            }`}
          >
            <span>Gallery</span>
            <span className="text-xs font-sans text-[#B87333]">02 →</span>
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`py-3 border-b border-[#242923]/60 font-serif text-2xl flex items-center justify-between text-left cursor-pointer ${
              currentView === 'about' ? 'text-[#D6A85C]' : 'text-[#F2F0E8] hover:text-[#D6A85C]'
            }`}
          >
            <span>About</span>
            <span className="text-xs font-sans text-[#B87333]">03 →</span>
          </button>
          <button
            onClick={() => handleNav('faq')}
            className={`py-3 border-b border-[#242923]/60 font-serif text-2xl flex items-center justify-between text-left cursor-pointer ${
              currentView === 'faq' ? 'text-[#D6A85C]' : 'text-[#F2F0E8] hover:text-[#D6A85C]'
            }`}
          >
            <span>FAQ</span>
            <span className="text-xs font-sans text-[#B87333]">04 →</span>
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="py-3 border-b border-[#242923]/60 font-serif text-2xl text-[#F2F0E8] hover:text-[#D6A85C] flex items-center justify-between text-left cursor-pointer"
          >
            <span>Contact</span>
            <span className="text-xs font-sans text-[#B87333]">05 →</span>
          </button>
        </div>

        <div className="pt-4 border-t border-[#242923] flex flex-col gap-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              if (onOpenEnquire) onOpenEnquire()
            }}
            className="py-3 px-6 rounded-full font-sans text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-center cursor-pointer shadow-lg"
          >
            ENQUIRE NOW →
          </button>
          <a
            href={`https://wa.me/${social.whatsappNumber}?text=Hi%20Vijay,%20I'm%20reaching%20out%20to%20inquire%20about%20${encodeURIComponent(brand.siteName)}.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="py-3 rounded-xl bg-[#242923] text-[#F2F0E8] text-xs font-sans uppercase tracking-widest text-center flex items-center justify-center gap-2"
          >
            <span>💬 WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </header>
  )
}
