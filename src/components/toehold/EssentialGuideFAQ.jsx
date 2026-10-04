import { useState } from 'react'

export default function EssentialGuideFAQ({ onPlanTrip }) {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      q: 'What do you do?',
      a: 'Wildlife & Bird Photography Expeditions — not generic tourist safaris, but dedicated small-group experiences focused on wildlife, photography, and learning in the field.',
      icon: '📷',
    },
    {
      q: 'Where do you go?',
      a: 'We explore some of India’s finest wildlife destinations, from tiger landscapes and leopard territories to birding hotspots and unique wilderness habitats across Kabini, Tadoba, Western Ghats (Valparai & Thattekad), Bharatpur, and Jawai.',
      icon: '📍',
    },
    {
      q: 'Why choose you?',
      a: 'Small groups (max 4 per Gypsy), experienced field guidance, photography-focused itineraries, core forest permits, and a genuine passion for wildlife. Every expedition is designed to give you more than just a safari — it’s an experience to remember.',
      icon: '🌿',
    },
    {
      q: 'What will I see?',
      a: 'Tigers, leopards, black panthers, elephants, wild dogs, sloth bears, crocodiles, raptors, owls, endemic birds, and much more — depending on the destination and season.',
      icon: '🐅',
    },
    {
      q: 'What does it cost?',
      a: 'Expeditions start from ₹XX,XXX per photographer on twin sharing. Final pricing varies by destination, seasonality, and vehicle charter. For customized quotes, private Gypsy rates, and complete inclusions, contact our expedition concierge.',
      icon: '💰',
      hasCta: true,
    },
    {
      q: 'When can I go?',
      a: 'Expeditions are scheduled throughout the year across our 2026–2027 calendar, with the best time depending on the destination and the wildlife you want to experience.',
      icon: '🗓',
    },
    {
      q: 'How do I book?',
      a: 'Choose your expedition, contact our team, and we’ll share the itinerary, availability, pricing, and booking details. You can use our frictionless 1-Tap WhatsApp Concierge to pre-fill your preferred dates, group size, and dream species directly to Expedition Leader Vijay Mathiew via WhatsApp.',
      icon: '💬',
      hasWhatsApp: true,
    },
  ]

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-24 sm:py-28 bg-[#0a0c0a] border-b border-[#242923] select-none relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-[#D6A85C]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2.5 mb-3.5">
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
            <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#D6A85C] font-semibold">
              ESSENTIAL EXPEDITION GUIDE
            </span>
            <span className="w-7 h-[1.5px] bg-[#B87333]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F2F0E8] font-light leading-tight mb-4">
            Everything You Need <span className="italic text-[#D6A85C] font-normal">to Know</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A7A59B] font-light leading-relaxed">
            Direct answers to the most important questions about our expeditions, field skippering, pricing, and booking process.
          </p>
        </div>

        {/* 7 Accordion Questions */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
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
                          href="https://wa.me/919087394546?text=Hi%20Vijay,%20I'm%20ready%20to%20inquire%20about%20booking%20a%20VM%20Wild%20Expeditions%20photo%20tour."
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
      </div>
    </section>
  )
}
