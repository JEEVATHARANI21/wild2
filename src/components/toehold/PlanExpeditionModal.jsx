import { useState, useEffect } from 'react'

export default function PlanExpeditionModal({ isOpen, onClose, openLegal }) {
  const [interest, setInterest] = useState('Wildlife Photography (Big Cats)')
  const [season, setSeason] = useState('Nov – Dec 2026')
  const [partySize, setPartySize] = useState('1 Photographer (Solo)')
  const [skillLevel, setSkillLevel] = useState('Enthusiast')
  const [targetSpecies, setTargetSpecies] = useState('')
  const [guestName, setGuestName] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    const lines = [
      `*New Expedition Inquiry — VM Wild Expeditions*`,
      `----------------------------------------`,
      `*Name:* ${guestName.trim() || 'Photographer'}`,
      phone.trim() ? `*Contact:* ${phone.trim()}` : null,
      `*Primary Interest:* ${interest}`,
      `*Preferred Travel Window:* ${season}`,
      `*Party Size:* ${partySize}`,
      `*Experience Level:* ${skillLevel}`,
      targetSpecies.trim() ? `*Target Species / Parks:* ${targetSpecies.trim()}` : null,
      `----------------------------------------`,
      `Hi Vijay, I'd like to plan my photography expedition. Please share upcoming availability, itineraries, and next steps!`,
    ].filter(Boolean)

    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/919087394546?text=${text}`, '_blank')
    onClose()
  }

  return (
    <div
      data-lenis-prevent="true"
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#080908]/92 backdrop-blur-xl animate-fadeIn overflow-y-auto overscroll-contain"
      onClick={onClose}
    >
      <div
        data-lenis-prevent="true"
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl bg-[#0f110f] border border-[#242923] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden my-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#242923] bg-[#151815]/95 shrink-0 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-6 h-[1.5px] bg-[#B87333]" />
              <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-[#D6A85C] font-semibold">
                TAILORED EXPEDITION PLANNING
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#F2F0E8] font-light">
              Plan Your <span className="italic text-[#D6A85C] font-normal">Expedition</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A7A59B] mt-1 font-light">
              Tell us your target subject and timing. Expedition Leader Vijay Mathiew will curate the ideal dates and itinerary.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#080908] border border-[#242923] text-[#F2F0E8] hover:text-[#D6A85C] hover:border-[#D6A85C] flex items-center justify-center text-lg transition-all cursor-pointer shadow-lg flex-shrink-0"
            aria-label="Close Plan Expedition Modal"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          data-lenis-prevent="true"
          onSubmit={handleSubmit}
          className="flex-1 min-h-0 overflow-y-auto p-6 sm:p-8 space-y-6 modal-scroll overscroll-contain"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* 1. Primary Interest */}
          <div className="space-y-2">
            <label className="text-[11px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block">
              1. What are you most interested in?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                'Wild Photography',
                'Birds Photography',
                'Western Ghats Rainforest Trek',
                'Custom Private Gypsy Charter',
              ].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setInterest(opt)}
                  className={`px-4 py-2.5 rounded-xl text-left text-xs font-sans transition-all cursor-pointer border ${
                    interest === opt
                      ? 'bg-[#D6A85C]/15 border-[#D6A85C] text-[#F2F0E8] font-medium shadow-[0_0_15px_rgba(214,168,92,0.15)]'
                      : 'bg-[#151815] border-[#242923] text-[#A7A59B] hover:text-[#F2F0E8] hover:border-[#242923]/80'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Travel Window & Party Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block">
                2. Preferred Travel Season
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-[#151815] border border-[#242923] rounded-xl px-3.5 py-2.5 text-xs text-[#F2F0E8] focus:border-[#D6A85C] focus:outline-none cursor-pointer"
              >
                <option value="Nov – Dec 2026">November – December 2026 (Peak Tracking)</option>
                <option value="Jan – Feb 2027">January – February 2027 (Winter Migrants)</option>
                <option value="Mar – Apr 2027">March – April 2027 (Waterhole Sightings)</option>
                <option value="Custom Dates">Custom Dates / Flexible</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block">
                3. Party Size
              </label>
              <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                className="w-full bg-[#151815] border border-[#242923] rounded-xl px-3.5 py-2.5 text-xs text-[#F2F0E8] focus:border-[#D6A85C] focus:outline-none cursor-pointer"
              >
                <option value="1 Photographer (Solo)">Solo Photographer (1)</option>
                <option value="2 Photographers (Couple / Friends)">2 Photographers (Shared Room)</option>
                <option value="3-4 Photographers (Full Gypsy)">Small Group / Full Gypsy (3–4)</option>
                <option value="Private Family / Custom Group">Private Family / Bespoke Group (5+)</option>
              </select>
            </div>
          </div>

          {/* 3. Skill Level */}
          <div className="space-y-2">
            <label className="text-[11px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block">
              4. Your Photography Experience Level
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: 'Beginner', desc: 'Learning basics & light' },
                { label: 'Enthusiast', desc: 'Good gear, keen eye' },
                { label: 'Professional', desc: 'High-burst portfolio' },
              ].map((lvl) => (
                <button
                  key={lvl.label}
                  type="button"
                  onClick={() => setSkillLevel(lvl.label)}
                  className={`p-3 rounded-xl text-center transition-all cursor-pointer border ${
                    skillLevel === lvl.label
                      ? 'bg-[#D6A85C]/15 border-[#D6A85C] text-[#F2F0E8] shadow-[0_0_15px_rgba(214,168,92,0.15)]'
                      : 'bg-[#151815] border-[#242923] text-[#A7A59B] hover:text-[#F2F0E8]'
                  }`}
                >
                  <div className="text-xs font-semibold">{lvl.label}</div>
                  <div className="text-[10px] text-[#A7A59B] mt-0.5">{lvl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Target Species & Notes */}
          <div className="space-y-2">
            <label className="text-[11px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block">
              5. Dream Species or Target Sanctuaries (Optional)
            </label>
            <input
              type="text"
              value={targetSpecies}
              onChange={(e) => setTargetSpecies(e.target.value)}
              placeholder="e.g. Black Panther in Kabini, Great Hornbill in Valparai, Tigers in Tadoba..."
              className="w-full bg-[#151815] border border-[#242923] rounded-xl px-4 py-2.5 text-xs text-[#F2F0E8] placeholder-[#A7A59B]/50 focus:border-[#D6A85C] focus:outline-none"
            />
          </div>

          {/* 5. Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <label className="text-[11px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block">
                Your Name
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Rohan Sharma"
                className="w-full bg-[#151815] border border-[#242923] rounded-xl px-4 py-2.5 text-xs text-[#F2F0E8] placeholder-[#A7A59B]/50 focus:border-[#D6A85C] focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-sans uppercase tracking-widest text-[#D6A85C] font-semibold block">
                WhatsApp Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full bg-[#151815] border border-[#242923] rounded-xl px-4 py-2.5 text-xs text-[#F2F0E8] placeholder-[#A7A59B]/50 focus:border-[#D6A85C] focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-[#242923] space-y-3">
            {/* Form Policy Acknowledgement Checkbox */}
            <div className="flex items-start gap-2 text-[11px] text-[#A7A59B]">
              <input
                type="checkbox"
                id="plan-modal-agree"
                defaultChecked={true}
                required
                className="mt-0.5 rounded accent-[#D6A85C] cursor-pointer"
              />
              <label htmlFor="plan-modal-agree" className="cursor-pointer leading-snug">
                I have read and agree to the{' '}
                <button type="button" onClick={() => openLegal && openLegal('terms')} className="text-[#D6A85C] underline hover:text-[#F2F0E8]">Terms & Conditions</button>,{' '}
                <button type="button" onClick={() => openLegal && openLegal('privacy')} className="text-[#D6A85C] underline hover:text-[#F2F0E8]">Privacy Policy</button>, and{' '}
                <button type="button" onClick={() => openLegal && openLegal('payment')} className="text-[#D6A85C] underline hover:text-[#F2F0E8]">Payment & Cancellation Policy</button>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-sans text-xs uppercase tracking-widest font-bold hover:shadow-[0_6px_25px_rgba(37,211,102,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>💬 Send Expedition Plan to Vijay Mathiew via WhatsApp</span>
              <span>→</span>
            </button>
            <p className="text-[11px] text-center text-[#A7A59B] font-light">
              ⚡ Direct 1-on-1 response within hours. No spam, no automated bots.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
