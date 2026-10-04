import { useState } from 'react'

export default function FAQView({ onBackToHome, onPlanTrip }) {
  const [openIndex, setOpenIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')

  const faqCategories = [
    'All',
    'General & Philosophy',
    'Destinations & Wildlife',
    'Photography Mentorship',
    'Pricing & Inclusions',
    'Booking & Gear',
  ]

  const faqs = [
    {
      category: 'General & Philosophy',
      q: 'What do you do?',
      a: 'Wildlife & Bird Photography Expeditions — not generic tourist safaris, but dedicated small-group experiences focused on wildlife, photography, and learning in the field.',
      icon: '📷',
    },
    {
      category: 'Destinations & Wildlife',
      q: 'Where do you go?',
      a: 'We explore India’s premier wilderness landscapes, including tiger corridors in Bandhavgarh, Tadoba, and Ranthambore; Black Panther & leopard territories in Kabini; endemic birding havens in Valparai and Thattekad; and wetland spectacles in Bharatpur.',
      icon: '📍',
    },
    {
      category: 'General & Philosophy',
      q: 'Why choose VM Wild Expeditions over standard safari operators?',
      a: 'Standard safaris pack 6 to 8 tourists into one vehicle with hurried sightings. At VM Wild Expeditions, we cap each Gypsy at just 4 photographers (or private charter), assign dedicated field mentors, arrange prime core zone permits, position vehicles for ideal natural backlight, and maintain unwavering field ethics that respect animal comfort.',
      icon: '🌿',
    },
    {
      category: 'Destinations & Wildlife',
      q: 'What will I see during an expedition?',
      a: 'Royal Bengal Tigers, Indian Leopards, Black Panthers (Melanistic Leopards), Asian Elephants, Dholes (Wild Dogs), Sloth Bears, Mugger Crocodiles, raptors, owls, hornbills, and high-altitude Western Ghats endemics — depending on your chosen route and season.',
      icon: '🐅',
    },
    {
      category: 'Pricing & Inclusions',
      q: 'What does an expedition cost?',
      a: 'Expeditions start from ₹XX,XXX per photographer on twin sharing. Final pricing varies according to destination, seasonality, permit zones, and whether you choose shared or private Gypsy charter. For customized quotes and transparent pricing, contact our concierge.',
      icon: '💰',
      hasCta: true,
    },
    {
      category: 'General & Philosophy',
      q: 'When can I travel?',
      a: 'Expeditions run throughout the year across our 2026–2027 calendar. Winter months (November to February) are ideal for avian diversity, lush golden light, and comfortable weather. Peak summer (March to June) delivers phenomenal tiger tracking around evaporating waterholes.',
      icon: '🗓',
    },
    {
      category: 'Booking & Gear',
      q: 'How do I book my seat?',
      a: 'Select your preferred departure, contact our team, and we will send you the itinerary, availability, and payment details. You can also connect directly with founder Vijay Mathiew via WhatsApp for immediate 1-on-1 assistance.',
      icon: '💬',
      hasWhatsApp: true,
    },
    {
      category: 'Photography Mentorship',
      q: 'Do I need professional camera gear to join?',
      a: 'Not at all! Our expeditions welcome everyone from enthusiastic beginners with bridge cameras to seasoned professionals with prime telephotos. Field mentors guide you on camera settings, histogram analysis, auto-focus tracking modes, and composition tailored to your specific gear.',
      icon: '🔍',
    },
    {
      category: 'Booking & Gear',
      q: 'What camera gear do you recommend bringing?',
      a: 'A DSLR or mirrorless body with a telephoto lens (100–400mm, 200–600mm, or 400mm/500mm primes) is ideal for mammals and birds. A wide-angle lens (24–70mm) is great for habitat shots. Extra batteries, fast SD/CFexpress cards, and vehicle beanbags are highly advised.',
      icon: '🎒',
    },
    {
      category: 'Pricing & Inclusions',
      q: 'What is included in the package?',
      a: 'All packages include luxury/boutique jungle lodge accommodation, all forest permits and Gypsy entry fees, private 4x4 Gypsy vehicle with professional tracker, 1-on-1 photographic mentoring, all meals, and local transfers from designated hubs.',
      icon: '✓',
    },
    {
      category: 'Pricing & Inclusions',
      q: 'What is excluded from the tour fee?',
      a: 'Airfare/train travel to the arrival city, personal camera lens rental fees charged by certain state forest departments, travel insurance, alcoholic beverages, and discretionary tips for forest trackers and lodge staff.',
      icon: '—',
    },
  ]

  const filteredFaqs =
    activeCategory === 'All'
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory)

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="min-h-screen bg-[#080908] text-[#F2F0E8] pt-24 pb-28 select-none">
      {/* Top Back Navigation Bar */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 mb-8 flex items-center justify-between border-b border-[#242923] pb-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#A7A59B] hover:text-[#D6A85C] transition-colors cursor-pointer"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-sans text-[#D6A85C] uppercase tracking-wider font-semibold">
          Essential Expedition Guide
        </span>
      </div>

      {/* Hero Intro */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center mb-14">
        <div className="inline-flex items-center gap-2.5 mb-3.5">
          <span className="w-7 h-[1.5px] bg-[#B87333]" />
          <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <span className="w-7 h-[1.5px] bg-[#B87333]" />
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
          Everything You Need <span className="italic text-[#D6A85C] font-normal">to Know</span>
        </h1>

        <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed">
          Comprehensive answers covering our photography expeditions, forest permits, vehicle positioning, pricing, gear advice, and custom itinerary options.
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat)
                setOpenIndex(0)
              }}
              className={`px-4 py-2 rounded-full text-xs font-sans uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-bold shadow-[0_4px_16px_rgba(214,168,92,0.35)]'
                  : 'bg-[#151815] text-[#A7A59B] hover:text-[#F2F0E8] border border-[#242923] hover:border-[#D6A85C]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12">
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#151815] border-[#D6A85C]/60 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
                    : 'bg-[#121412]/80 border-[#242923] hover:border-[#242923]/90'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#F2F0E8] font-normal flex items-center gap-3">
                    <span className="text-xl">{faq.icon}</span>
                    <span>{faq.q}</span>
                  </span>

                  <span
                    className={`w-7 h-7 rounded-full bg-[#080908] border border-[#242923] flex items-center justify-center text-xs text-[#D6A85C] transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#D6A85C] text-[#080908] font-bold' : ''
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#A7A59B] font-light leading-relaxed border-t border-[#242923]/60 animate-fadeIn space-y-3">
                    <p>{faq.a}</p>

                    {faq.hasCta && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={onPlanTrip}
                          className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider font-semibold text-[#D6A85C] hover:text-[#B87333] transition-colors cursor-pointer"
                        >
                          <span>Request Customized Quote</span>
                          <span>→</span>
                        </button>
                      </div>
                    )}

                    {faq.hasWhatsApp && (
                      <div className="pt-2">
                        <a
                          href="https://wa.me/919087394546?text=Hi%20Vijay,%20I'm%20inquiring%20about%20booking%20a%20VM%20Wild%20Expeditions%20photo%20tour."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-[#080908] text-xs font-sans uppercase tracking-wider font-bold shadow-md hover:bg-[#20bd5a] transition-all"
                        >
                          <span>💬</span>
                          <span>Connect on WhatsApp</span>
                          <span>→</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#151815] border border-[#242923] text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] mb-3">
            Still Have Questions?
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#A7A59B] max-w-lg mx-auto mb-8 font-light">
            Our expedition coordinators and mentors are always on hand to help customize dates, discuss specific photography gear recommendations, or tailor private family safaris.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onPlanTrip}
              className="w-full sm:w-auto py-3 px-6 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-wider font-bold hover:shadow-[0_4px_20px_rgba(214,168,92,0.4)] transition-all cursor-pointer"
            >
              Plan Your Expedition →
            </button>
            <a
              href="https://wa.me/919087394546?text=Hello%20Vijay,%20I%20have%20a%20few%20questions%20regarding%20VM%20Wild%20Expeditions."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-6 rounded-full bg-[#080908] border border-[#242923] hover:border-[#D6A85C] text-[#F2F0E8] font-sans text-xs uppercase tracking-wider font-semibold transition-all"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
