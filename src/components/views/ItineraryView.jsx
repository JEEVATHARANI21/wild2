import { useState, useEffect } from 'react'
import { useSiteContent } from '../../context/SiteContentContext'
import ContactFooter from '../toehold/ContactFooter'

export default function ItineraryView({ tour, onBack, onPlanTrip, openLegal }) {
  if (!tour) return null

  const { content } = useSiteContent()
  const currentTour =
    content?.animalTours?.find((t) => t.id === tour.id) ||
    content?.birdTours?.find((t) => t.id === tour.id) ||
    tour

  const handleWhatsAppInquiry = () => {
    const tourTitle = currentTour.packageName || currentTour.title || 'Safari'
    const dest = currentTour.destination || 'India'
    const whatsappNum = content?.social?.whatsappNumber || '919087394546'
    const msg = `Hi Vijay, I'm reviewing the "${tourTitle}" (${dest}) itinerary on your website. I'd like to discuss customized departure dates and reserve a seat.`
    window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  // Detect category to use matching fallback background photos
  const isBird =
    content?.birdTours?.some((t) => t.id === currentTour.id) ||
    currentTour.category === 'birdTours' ||
    currentTour.id?.includes('sattal') ||
    currentTour.id?.includes('thattekkad') ||
    currentTour.id?.includes('bharatpur') ||
    currentTour.id?.includes('ranganathittu') ||
    currentTour.id?.includes('dandeli') ||
    currentTour.id?.includes('ladakh') ||
    currentTour.id?.includes('mahananda') ||
    currentTour.id?.includes('sikkim') ||
    currentTour.id?.includes('kutch') ||
    currentTour.id?.includes('desert')

  const birdFallbacks = [
    '/images/birds/bird1.png',
    '/images/birds/bird2.png',
    '/images/birds/bird3.png',
    '/images/birds/bird4.png',
    '/images/birds/bird5.png',
    '/images/birds/bird6.png',
    '/images/birds/bird7.png',
    '/images/birds/bird8.png',
    '/images/birds/bird9.png',
    '/images/birds/bird10.png',
  ]

  const animalFallbacks = [
    '/images/animals/animal1.jpg',
    '/images/animals/animal2.jpg',
    '/images/animals/animal3.jpg',
    '/images/animals/animal4.jpg',
    '/images/animals/animal5.jpg',
    '/images/animals/animal6.jpg',
    '/images/animals/animal7.jpg',
    '/images/animals/animal8.jpg',
    '/images/animals/animal9.jpg',
  ]

  // Collect background hero images for slideshow
  const tourImages = [
    currentTour.heroImage,
    currentTour.gallery?.[0] || currentTour.additionalImages?.[0],
    currentTour.gallery?.[1] || currentTour.additionalImages?.[1],
    currentTour.gallery?.[2] || currentTour.additionalImages?.[2],
  ].filter(Boolean)

  const defaultFallbacks = isBird ? birdFallbacks : animalFallbacks

  const slides = Array.from(new Set([...tourImages, ...defaultFallbacks])).slice(0, 4)

  const [activeSlide, setActiveSlide] = useState(0)

  // Auto-fading slideshow timer (4.5s)
  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)

  // Fallback Day-by-Day if itinerary array is compact
  const days = currentTour.itinerary && currentTour.itinerary.length > 0 ? currentTour.itinerary : [
    {
      day: 1,
      title: 'Arrival, Forest Check-in & Orientation Drive',
      desc: `Meet our private expedition vehicle and transfer to luxury jungle lodge near ${currentTour.destination || 'the park'}. Afternoon gear setup, camera calibration, and first twilight game drive.`,
      photoTip: 'Golden hour field technique: Low vehicle perspective with 1-on-1 mentorship by Vijay Mathew.',
    },
    {
      day: 2,
      title: 'Deep Core Safaris — Dawn & Dusk Tracking',
      desc: `Full day tracking ${currentTour.targetSpecies?.[0] || 'wildlife'} across prime territories. Morning drive followed by midday file reviews, histogram analysis, and afternoon field vigil.`,
      photoTip: 'Eye-level vehicle beanbag perspective at known watering holes.',
    },
    {
      day: 3,
      title: 'Predator Corridors & Avian Canopies',
      desc: 'Morning safari exploring remote boundary tracks for elusive leopards, tuskers, and rare birds. Afternoon game drive dedicated to dramatic light sculpting.',
      photoTip: 'High shutter speed (1/1600s+) for sudden bursts of movement.',
    },
    {
      day: 4,
      title: 'Final Morning Game Drive & Departure',
      desc: 'One last dawn drive through misty teak groves. Return for hot breakfast, portfolio review with Vijay Mathiew, and airport transfer.',
      photoTip: 'Misty landscape compositions and parting portraits.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#080908] text-[#F2F0E8] pt-20 pb-24 select-none">
      {/* Top Back Navigation Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-4 flex items-center justify-between border-b border-[#242923]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A7A59B] hover:text-[#D6A85C] transition-colors cursor-pointer"
        >
          <span>←</span>
          <span>Back to All Expeditions</span>
        </button>

        <span className="text-xs font-sans text-[#D6A85C] uppercase tracking-wider font-semibold">
          {currentTour.duration} · {currentTour.destination}
        </span>
      </div>

      {/* Hero Banner Section with Auto-Fading 4-Photo Slideshow */}
      <section className="relative h-[55vh] min-h-[420px] md:h-[65vh] md:min-h-[500px] flex items-end overflow-hidden group select-none">
        {/* Background Slides */}
        {slides.map((imgUrl, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={imgUrl}
              alt={`${currentTour.packageName || currentTour.title} slide ${index + 1}`}
              className="w-full h-full object-cover object-center md:object-[center_35%] brightness-[0.72] contrast-[1.04] transition-transform duration-[8000ms] ease-linear"
              style={{
                transform: index === activeSlide ? 'scale(1.02)' : 'scale(1.0)',
              }}
            />
          </div>
        ))}

        {/* Dark Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-[#080908]/40 to-transparent z-10 pointer-events-none" />

        {/* Previous / Next Arrow Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#080908]/65 hover:bg-[#D6A85C] border border-white/20 hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center text-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-md shadow-2xl"
          title="Previous Image"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#080908]/65 hover:bg-[#D6A85C] border border-white/20 hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center text-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-md shadow-2xl"
          title="Next Image"
        >
          ›
        </button>

        {/* Slide Counter & Dot Controls (Bottom Right) */}
        <div className="absolute bottom-6 right-5 sm:right-8 z-20 flex items-center gap-3 bg-[#080908]/75 backdrop-blur-md px-4 py-2 rounded-full border border-[#242923] shadow-2xl">
          <span className="font-mono text-xs text-[#D6A85C] tracking-widest font-semibold">
            0{activeSlide + 1} / 0{slides.length}
          </span>
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeSlide
                    ? 'w-6 bg-[#D6A85C]'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                title={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Hero Title & Information */}
        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pb-14 w-full">
          <span className="inline-block bg-[#D6A85C] text-[#080908] text-[10.5px] font-sans font-bold px-3 py-1 uppercase tracking-wider mb-3.5 rounded-full shadow-lg">
            Sample Itinerary — All Tours Customised
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] leading-tight mb-2">
            {currentTour.packageName || currentTour.title}
          </h1>
          <p className="font-sans text-[#A7A59B] text-sm sm:text-lg max-w-2xl font-light">
            {currentTour.photoHighlight || currentTour.overview?.split('.')[0] + '.'}
          </p>
        </div>
      </section>

      {/* Quick Specs Ribbon (Duration, Group Size, Best Season, From Price) */}
      <section className="bg-[#121412] border-y border-[#242923]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest mb-1 font-semibold">
                Duration
              </p>
              <p className="font-serif text-base sm:text-lg text-[#F2F0E8]">{currentTour.duration}</p>
            </div>
            <div>
              <p className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest mb-1 font-semibold">
                Group Size
              </p>
              <p className="font-serif text-base sm:text-lg text-[#F2F0E8]">Max 4 per Gypsy</p>
            </div>
            <div>
              <p className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest mb-1 font-semibold">
                Best Photographic Season
              </p>
              <p className="font-serif text-base sm:text-lg text-[#D6A85C]">{currentTour.bestSeason}</p>
            </div>
            <div>
              <p className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest mb-1 font-semibold">
                Investment (All-Inclusive)
              </p>
              <p className="font-serif text-base sm:text-lg text-[#D6A85C]">
                From ₹XX,XXX{' '}
                <span className="text-[10px] text-[#A7A59B] font-sans block sm:inline">(All Taxes & Permits Included)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout: 2-Column fototrails 365 format */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Overview + Day by Day */}
          <div className="lg:col-span-8 space-y-12">
            {/* About This Tour */}
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-[1.5px] bg-[#B87333]" />
                <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-[#D6A85C] font-semibold">
                  OVERVIEW
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#F2F0E8] mb-4 font-light">
                About This Tour
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#A7A59B] leading-relaxed font-light">
                {currentTour.overview}
              </p>
            </div>



            {/* Day by Day Section */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] mb-8 font-light flex items-center gap-3">
                <span>Day by Day Itinerary</span>
                <span className="text-xs font-sans text-[#D6A85C] font-normal uppercase tracking-wider bg-[#242923] px-3 py-1 rounded-full">
                  {days.length} Days Breakdown
                </span>
              </h3>

              <div className="space-y-6">
                {days.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 sm:gap-6 group">
                    {/* Day Number Badge */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#151815] border border-[#D6A85C]/50 flex items-center justify-center group-hover:border-[#D6A85C] group-hover:bg-[#D6A85C] transition-colors shadow-lg">
                      <span className="font-serif text-[#D6A85C] group-hover:text-[#080908] font-bold text-sm sm:text-base transition-colors">
                        {item.day || idx + 1}
                      </span>
                    </div>

                    {/* Day Content */}
                    <div className="flex-1 pb-6 border-b border-[#242923] last:border-0">
                      <h4 className="font-serif text-lg sm:text-xl text-[#F2F0E8] mb-2 leading-snug">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#A7A59B] leading-relaxed font-light mb-3">
                        {item.desc}
                      </p>
                      {item.photoTip && (
                        <p className="font-sans text-xs text-[#D6A85C] italic flex items-center gap-1.5">
                          <span>📷</span>
                          <span>{item.photoTip}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: fototrails 365 Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Customise This Safari Box */}
            <div className="bg-[#151815] rounded-3xl border border-[#242923] p-6 sm:p-7 text-center shadow-xl">
              <p className="font-sans text-[10px] text-[#D6A85C] uppercase tracking-widest mb-2 font-semibold">
                CUSTOMISE THIS EXPEDITION
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F2F0E8] mb-2">
                Plan With Vijay Mathiew
              </h3>
              <p className="font-sans text-xs text-[#A7A59B] mb-5 font-light leading-relaxed">
                Tell us your preferred travel window and photography goals — we'll tailor every detail, permit, and vehicle setup.
              </p>

              <button
                onClick={onPlanTrip}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold hover:shadow-[0_4px_20px_rgba(214,168,92,0.4)] transition-all cursor-pointer mb-3"
              >
                Plan This Safari →
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full py-3 px-4 rounded-xl bg-[#080908] border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-[#080908] font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp Vijay Mathiew</span>
              </button>
            </div>

            {/* 3. Included Checklist (✓) */}
            <div className="bg-[#151815] rounded-3xl border border-[#242923] p-6 sm:p-7 shadow-lg">
              <span className="text-[10px] font-sans uppercase tracking-widest text-emerald-400 font-semibold block mb-3">
                WHAT'S INCLUDED
              </span>
              <ul className="space-y-2.5">
                {(currentTour.inclusions || []).map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#F2F0E8]/85 font-light">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span className="leading-tight">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Not Included Checklist (—) */}
            <div className="bg-[#151815] rounded-3xl border border-[#242923] p-6 sm:p-7 shadow-lg">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] font-semibold block mb-3">
                NOT INCLUDED
              </span>
              <ul className="space-y-2">
                {(currentTour.exclusions || []).map((exc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#A7A59B] font-light">
                    <span className="text-[#A7A59B]/50 shrink-0">—</span>
                    <span className="leading-tight">{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Details & Inquiry Footer */}
      <div className="mt-16 border-t border-[#242923]">
        <ContactFooter
          openLegal={openLegal}
          onPlanTrip={onPlanTrip}
        />
      </div>
    </div>
  )
}
