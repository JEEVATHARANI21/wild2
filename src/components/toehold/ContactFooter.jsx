import { useState } from 'react'
import { useSiteContent } from '../../context/SiteContentContext'

export default function ContactFooter({ openLegal, onPlanTrip }) {
  const { content } = useSiteContent()
  const brand = content?.brand || {
    siteName: 'VM Wild Expeditions',
    tagline: 'Beyond the Map. Into the wild',
    logoUrl: '/logo-clean.png',
  }
  const social = content?.social || {
    instagramUrl: 'https://www.instagram.com/vm_wild_expeditions?stkn=OTU3MGI0bHR6OWZz',
    instagramHandle: '@vm_wild_expeditions',
    whatsappNumber: '919087394546',
    contactEmail: 'admissions@vmwild.com',
  }

  const [form, setForm] = useState({ name: '', phone: '', email: '', category: 'animal', message: '', agreed: true })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    const encodedText = encodeURIComponent(
      `Hello ${brand.siteName},\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nInterested Track: ${form.category === 'animal' ? 'Wild Photography' : form.category === 'bird' ? 'Birds Photography' : 'Custom Expedition'}\nMessage: ${form.message}`
    )
    window.open(`https://wa.me/${social.whatsappNumber}?text=${encodedText}`, '_blank')
  }

  return (
    <footer id="contact" className="relative bg-[#050605] text-[#A7A59B] pt-20 pb-12 px-5 sm:px-8 md:px-16 border-t border-[#242923] select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Grid: Brand Story + 4 Column Links & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-[#242923]">
          
          {/* Left 6 Columns: Brand & Navigation Directory */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-1.5 sm:p-2 rounded-2xl bg-[#080908] border border-[#242923] shadow-lg overflow-hidden">
                <img src={brand.logoUrl || '/logo-clean.png'} alt={brand.siteName} className="h-12 sm:h-14 w-auto object-contain" />
              </div>
              <div className="flex flex-col border-l border-[#242923] pl-3.5">
                <span className="font-serif text-lg sm:text-xl tracking-[0.16em] uppercase text-[#F2F0E8] font-bold leading-tight">
                  {brand.siteName}
                </span>
                <span className="font-sans text-[8.5px] sm:text-[9.5px] tracking-[0.22em] uppercase text-[#D6A85C] font-semibold mt-0.5">
                  {brand.tagline}
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#A7A59B] max-w-lg leading-relaxed font-light">
              VM Wild Expeditions is a bespoke wildlife photography travel studio operating across India’s wildest national parks with uncompromised field ethics, intimate vehicular limits (max 4 per Gypsy), and 1-on-1 expert mentorship.
            </p>

            {/* 3 Column Directory Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-2 text-xs font-sans">
              {/* Col 1: EXPLORE */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D6A85C] block">
                  EXPLORE
                </span>
                <ul className="space-y-2 text-[#A7A59B]">
                  <li>
                    <a href="#tours" className="hover:text-[#F2F0E8] transition-colors">Wild Expeditions</a>
                  </li>
                  <li>
                    <a href="#tours" className="hover:text-[#F2F0E8] transition-colors">Birds Expeditions</a>
                  </li>
                  <li>
                    <a href="#founders" className="hover:text-[#F2F0E8] transition-colors">Expedition Leaders</a>
                  </li>
                  <li>
                    <a href="#gallery-preview" className="hover:text-[#F2F0E8] transition-colors">3D Coverflow Gallery</a>
                  </li>
                </ul>
              </div>

              {/* Col 2: INFORMATION (Legal Policies) */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D6A85C] block">
                  INFORMATION
                </span>
                <ul className="space-y-2 text-[#A7A59B]">
                  <li>
                    <button onClick={() => openLegal && openLegal('terms')} className="hover:text-[#F2F0E8] transition-colors cursor-pointer text-left">
                      Terms & Conditions
                    </button>
                  </li>
                  <li>
                    <button onClick={() => openLegal && openLegal('privacy')} className="hover:text-[#F2F0E8] transition-colors cursor-pointer text-left">
                      Privacy Policy (DPDP 2025)
                    </button>
                  </li>
                  <li>
                    <button onClick={() => openLegal && openLegal('payment')} className="hover:text-[#D6A85C] transition-colors cursor-pointer text-left font-medium text-[#D6A85C]">
                      Payment & Cancellation
                    </button>
                  </li>
                </ul>
              </div>

              {/* Col 3: DIRECT CONTACT */}
              <div className="space-y-3 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D6A85C] block">
                  CONTACT
                </span>
                <ul className="space-y-2 text-[#A7A59B]">
                  <li>
                    <a href="tel:+919087394546" className="hover:text-[#F2F0E8] transition-colors flex items-center gap-1.5">
                      <span>📞</span>
                      <span>+91 9087394546</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/${social.whatsappNumber}?text=Hi%20Vijay,%20I'm%20reaching%20out%20from%20${encodeURIComponent(brand.siteName)}%20website.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                    >
                      <span>💬</span>
                      <span>WhatsApp Concierge</span>
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${social.contactEmail || 'admissions@vmwild.com'}`} className="hover:text-[#F2F0E8] transition-colors text-[11px] truncate block">
                      {social.contactEmail || 'admissions@vmwild.com'}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Expedition Inquiry Form */}
          <div className="lg:col-span-6 bg-[#151815] p-6 sm:p-8 rounded-3xl border border-[#242923] shadow-2xl">
            <h3 className="font-serif text-2xl text-[#F2F0E8] mb-1 font-light">
              Plan Your Expedition
            </h3>
            <p className="font-sans text-xs text-[#A7A59B] mb-6 font-light">
              Connect with founder Vijay Mathiew for customized departures, private charters, or seat reservations.
            </p>

            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Arjun Swaminathan"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans focus:outline-none focus:border-[#D6A85C]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-medium">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Your Phone / WhatsApp Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans focus:outline-none focus:border-[#D6A85C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="hello@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans focus:outline-none focus:border-[#D6A85C]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-medium">
                      Interested Track
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans focus:outline-none focus:border-[#D6A85C]"
                    >
                      <option value="animal" className="bg-[#151815]">Wild Photography</option>
                      <option value="bird" className="bg-[#151815]">Birds Photography</option>
                      <option value="both" className="bg-[#151815]">Both / Custom Expedition</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-sans uppercase tracking-widest text-[#A7A59B] block mb-1 font-medium">
                    Your Requirements / Preferred Travel Dates
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your target species or preferred travel dates..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#080908] border border-[#242923] text-xs text-[#F2F0E8] font-sans focus:outline-none focus:border-[#D6A85C]"
                  />
                </div>

                {/* Form Policy Acknowledgement Checkbox */}
                <div className="flex items-start gap-2 pt-1 text-[11px] text-[#A7A59B]">
                  <input
                    type="checkbox"
                    id="footer-agree-check"
                    checked={form.agreed}
                    onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                    required
                    className="mt-0.5 rounded accent-[#D6A85C] cursor-pointer"
                  />
                  <label htmlFor="footer-agree-check" className="cursor-pointer leading-snug">
                    By submitting, I agree to the{' '}
                    <button type="button" onClick={() => openLegal && openLegal('terms')} className="text-[#D6A85C] underline hover:text-[#F2F0E8]">Terms & Conditions</button>,{' '}
                    <button type="button" onClick={() => openLegal && openLegal('privacy')} className="text-[#D6A85C] underline hover:text-[#F2F0E8]">Privacy Policy</button>, and{' '}
                    <button type="button" onClick={() => openLegal && openLegal('payment')} className="text-[#D6A85C] underline hover:text-[#F2F0E8]">Payment & Cancellation Policy</button>.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] font-sans text-xs uppercase tracking-widest font-bold cursor-pointer shadow-[0_4px_20px_rgba(214,168,92,0.35)] text-center transition-all hover:scale-[1.01]"
                >
                  Send Inquiry via WhatsApp →
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <span className="text-3xl text-[#D6A85C]">✓</span>
                <h4 className="font-serif text-xl text-[#F2F0E8]">Inquiry Dispatched!</h4>
                <p className="font-sans text-xs text-[#A7A59B]">
                  WhatsApp has opened with your details. Our expedition desk will respond promptly.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#A7A59B]/70">
          <p>© {new Date().getFullYear()} {brand.siteName}. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => openLegal && openLegal('terms')}
              className="hover:text-[#D6A85C] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => openLegal && openLegal('privacy')}
              className="hover:text-[#D6A85C] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => openLegal && openLegal('payment')}
              className="hover:text-[#D6A85C] transition-colors cursor-pointer text-[#D6A85C] font-semibold"
            >
              Payment & Cancellation
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
