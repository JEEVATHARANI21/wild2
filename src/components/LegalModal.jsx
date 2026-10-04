import { useState, useEffect } from 'react'

export default function LegalModal({ isOpen, onClose, initialTab = 'terms' }) {
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab)
    }
  }, [isOpen, initialTab])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#080908]/90 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[88vh] flex flex-col rounded-3xl bg-[#151815] border border-[#242923] shadow-2xl overflow-hidden z-10 text-[#F2F0E8]"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 40px rgba(214, 168, 92, 0.15)',
        }}
      >
        {/* Modal Header */}
        <div className="shrink-0 relative z-20 flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#242923] bg-[#080908]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#151815] border border-[#D6A85C]/40 flex items-center justify-center text-sm font-serif font-bold text-[#D6A85C]">
              VM
            </div>
            <div>
              <span className="font-sans text-xs tracking-[0.25em] uppercase font-bold text-[#F2F0E8] block">
                VM <span className="text-[#D6A85C] font-normal">WILD EXPEDITIONS</span>
              </span>
              <span className="block font-sans text-[8px] tracking-[0.2em] uppercase text-[#A7A59B] font-semibold mt-0.5">
                Beyond the Map. Into the wild
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#242923] flex items-center justify-center text-[#F2F0E8]/70 hover:text-[#F2F0E8] hover:border-[#D6A85C] hover:bg-[#242923] transition-all text-sm cursor-pointer"
            title="Close modal (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="shrink-0 relative z-20 flex border-b border-[#242923] bg-[#111511] px-6 md:px-8 gap-3 sm:gap-6 overflow-x-auto shadow-md">
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3.5 font-sans text-xs tracking-[0.15em] uppercase transition-all relative cursor-pointer whitespace-nowrap ${
              activeTab === 'terms'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#A7A59B] hover:text-[#F2F0E8]'
            }`}
          >
            📜 Terms & Conditions
            {activeTab === 'terms' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('payment')}
            className={`py-3.5 font-sans text-xs tracking-[0.15em] uppercase transition-all relative cursor-pointer whitespace-nowrap ${
              activeTab === 'payment'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#A7A59B] hover:text-[#F2F0E8]'
            }`}
          >
            💳 Payment & Cancellation
            {activeTab === 'payment' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3.5 font-sans text-xs tracking-[0.15em] uppercase transition-all relative cursor-pointer whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'text-[#D6A85C] font-semibold'
                : 'text-[#A7A59B] hover:text-[#F2F0E8]'
            }`}
          >
            🔒 Privacy Policy (DPDP 2025)
            {activeTab === 'privacy' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D6A85C]" />
            )}
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-6 text-sm font-sans font-light leading-relaxed text-[#A7A59B] modal-scroll overscroll-contain relative z-0 bg-[#151815]"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* TAB 1: Terms & Conditions */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#F2F0E8] mb-1 font-normal">
                  Terms & Conditions
                </h3>
                <p className="text-xs text-[#D6A85C] tracking-wider uppercase font-semibold">
                  Last Updated: September 2026 · VM Wild Expeditions Photography Studio
                </p>
                <p className="mt-3 leading-relaxed">
                  Welcome to <strong>VM Wild Expeditions</strong> (“VM Wild Expeditions”, “we”, “us”, or “our”). These Terms & Conditions govern your use of our website and your participation in our wildlife photography tours, birding tours, expeditions and related services. By accessing our website, submitting an enquiry, making a booking or participating in an expedition, you acknowledge that you have read and agreed to these Terms & Conditions.
                </p>
              </div>

              <div className="space-y-5 text-xs text-[#A7A59B]">
                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    1. Our Services
                  </h4>
                  <p className="leading-relaxed">
                    VM Wild Expeditions organizes and facilitates wildlife photography expeditions, bird photography tours, safaris, accommodation, transportation, guiding and related travel experiences. Tour inclusions, exclusions, itineraries, destinations, dates and services may vary between individual expeditions. Please refer to the specific expedition details provided at the time of booking.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    2. Booking Confirmation
                  </h4>
                  <p className="leading-relaxed">
                    A booking is considered confirmed only after the required advance payment has been received and VM Wild Expeditions has confirmed the booking in writing. A submitted enquiry or provisional reservation does not constitute a confirmed booking.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    3. Payment Terms
                  </h4>
                  <p className="leading-relaxed">
                    Unless otherwise stated for a specific expedition, a 50% advance payment is required to confirm the booking. The remaining 50% balance must be paid at least 30 days before the tour commencement date. Failure to pay the balance within the specified period may result in cancellation of the booking. Any payment gateway charges or bank transfer fees may be borne by the customer.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    4. Cancellation and Refunds
                  </h4>
                  <p className="leading-relaxed">
                    Cancellation and refund terms are governed by our separate <strong>Payment & Cancellation Policy</strong>. Please review that policy carefully before making a booking.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923]">
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    5. Wildlife Sightings Disclaimer
                  </h4>
                  <p className="leading-relaxed mb-2">
                    Wildlife photography involves naturally unpredictable wilderness conditions. VM Wild Expeditions does not guarantee sightings of any particular animal, bird or species, including tiger, leopard, Asian elephant or any specific wildlife.
                  </p>
                  <p className="text-[11px] text-[#A7A59B]/80 italic">
                    Sightings depend on weather, animal behaviour, habitat conditions, seasonal factors, forest department regulations, safari routes, and natural movement of wildlife. Our expedition leaders make every reasonable effort to provide the best photography experience within forest guidelines.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    6. Changes to Itinerary
                  </h4>
                  <p className="leading-relaxed">
                    Wildlife national parks are governed by government authorities and forest departments. Safari routes, timings, entry permits, accommodation or vehicle arrangements may change due to forest department regulations, weather, natural events, or operational circumstances. Where reasonably possible, we will inform participants of significant changes.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    7. Safari Permits & Third-Party Services
                  </h4>
                  <p className="leading-relaxed">
                    Certain components of an expedition are provided by third-party suppliers, including forest departments, safari vehicle operators, lodge providers, and local guides. Third-party services are subject to their own terms, availability, and sanctuary regulations.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    8. Accommodation & Transportation
                  </h4>
                  <p className="leading-relaxed">
                    Accommodation and 4x4 Gypsy transportation are provided according to the selected expedition package. If a specified lodge or vehicle becomes unavailable due to unforeseen circumstances, we will arrange a comparable alternative where possible.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    9. Participant Responsibilities & Conduct
                  </h4>
                  <p className="leading-relaxed">
                    Participants must follow instructions from expedition leaders and forest naturalists, maintain safe non-invasive distances from animals, avoid feeding or baiting wildlife, adhere to vehicle photography guidelines, and carry valid government ID cards. Failure to comply with safety or forest rules may result in removal from an activity without refund.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    10. Responsible Photography Code
                  </h4>
                  <p className="leading-relaxed">
                    Wildlife photography must always prioritize animal welfare. Participants must not harass animals for photos, use sound playback devices, leave designated vehicles in unauthorized zones, or manipulate wildlife behavior.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    11. Health, Fitness & Insurance
                  </h4>
                  <p className="leading-relaxed">
                    Expeditions involve early morning drives, uneven terrain, outdoor weather, and remote locations. Participants are responsible for assessing their own fitness. We strongly recommend comprehensive travel and medical insurance covering outdoor activities.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    12. Personal Belongings & Equipment
                  </h4>
                  <p className="leading-relaxed">
                    Participants remain solely responsible for their camera gear, telephoto lenses, laptops, and personal valuables throughout the tour.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    13. Force Majeure
                  </h4>
                  <p className="leading-relaxed">
                    We shall not be held liable for delays or cancellations caused by acts of God, extreme weather, government park closures, civil disruptions, or public health emergencies.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    14. Intellectual Property
                  </h4>
                  <p className="leading-relaxed">
                    All website content, logos, editorial text, and photographs are the intellectual property of VM Wild Expeditions protected under the Indian Copyright Act, 1957.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    15. Governing Law & Jurisdiction
                  </h4>
                  <p className="leading-relaxed">
                    These Terms & Conditions shall be governed by the laws of India, with exclusive jurisdiction resting in the competent courts of Chennai, Tamil Nadu, India.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Payment & Cancellation Policy */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#F2F0E8] mb-1 font-normal">
                  Payment & Cancellation Policy
                </h3>
                <p className="text-xs text-[#D6A85C] tracking-wider uppercase font-semibold">
                  Last Updated: September 2026 · Standalone Booking & Refund Charter
                </p>
              </div>

              {/* Section 1: Booking & Payment */}
              <div className="space-y-3.5">
                <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-[#D6A85C] flex items-center gap-2">
                  <span>💳</span>
                  <span>1. Booking & Payment Schedule</span>
                </h4>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5">
                    <span className="text-emerald-400 text-lg shrink-0 font-bold mt-0.5">✅</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        50% Advance Confirmation Deposit
                      </span>
                      <p className="text-xs text-[#A7A59B] leading-relaxed">
                        A 50% advance payment is required to reserve your seat and initiate forest department permit ticketing.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5">
                    <span className="text-emerald-400 text-lg shrink-0 font-bold mt-0.5">✅</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        Remaining 50% Balance (30 Days Prior)
                      </span>
                      <p className="text-xs text-[#A7A59B] leading-relaxed">
                        The remaining 50% balance must be paid at least 30 days before the expedition commencement date.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5">
                    <span className="text-emerald-400 text-lg shrink-0 font-bold mt-0.5">✅</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        Official Booking Receipt
                      </span>
                      <p className="text-xs text-[#A7A59B] leading-relaxed">
                        Bookings are officially confirmed once payment is received and an official confirmation voucher is issued by VM Wild Expeditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Cancellation & Refund Schedule */}
              <div className="space-y-3.5 pt-2 border-t border-[#242923]">
                <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-[#D6A85C] flex items-center gap-2">
                  <span>🔄</span>
                  <span>2. Explicit Cancellation & Refund Terms</span>
                </h4>

                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5">
                    <span className="text-[#D6A85C] font-bold text-sm shrink-0">30+ Days</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        30 or More Days Before Departure
                      </span>
                      <p className="text-[#A7A59B] text-xs leading-relaxed">
                        50% of the total tour amount will be refunded.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5">
                    <span className="text-[#D6A85C] font-bold text-sm shrink-0">15–29 Days</span>
                    <div>
                      <span className="font-semibold text-[#F2F0E8] text-sm block mb-1">
                        15 to 29 Days Before Departure
                      </span>
                      <p className="text-[#A7A59B] text-xs leading-relaxed">
                        25% of the total tour amount will be refunded.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5">
                    <span className="text-red-400 font-bold text-sm shrink-0">&lt; 15 Days</span>
                    <div>
                      <span className="font-semibold text-red-400 text-sm block mb-1">
                        Less than 15 Days Before Departure
                      </span>
                      <p className="text-[#A7A59B] text-xs leading-relaxed">
                        Non-refundable (0% refund) due to non-refundable forest permits and lodge locks.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] flex items-start gap-3.5">
                    <span className="text-red-400 font-bold text-sm shrink-0">No-Show</span>
                    <div>
                      <span className="font-semibold text-red-400 text-sm block mb-1">
                        After Tour Begins / No-Show
                      </span>
                      <p className="text-[#A7A59B] text-xs leading-relaxed">
                        No refund will be provided if a participant fails to arrive or leaves after tour commencement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Non-Refundable Components */}
              <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] space-y-2 text-xs">
                <h5 className="font-semibold text-[#D6A85C] uppercase tracking-wider text-[11px]">
                  3. Supplier & Forest Permit Terms
                </h5>
                <p className="text-[#A7A59B] leading-relaxed">
                  Safari permits, government entry fees, eco-lodge deposits, and transport arrangements are subject to supplier cancellation policies. Non-recoverable supplier portions cannot be refunded.
                </p>
              </div>

              {/* Concierge Helper */}
              <div className="p-4 rounded-2xl bg-[#111611] border border-[#D6A85C]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[#D6A85C] font-bold block mb-0.5">Direct Payment & Bank Transfer Details</span>
                  <span className="text-[#A7A59B] text-[11px]">Connect directly with Vijay Mathiew on WhatsApp for bank wire / UPI details.</span>
                </div>
                <a
                  href="https://wa.me/919087394546?text=Hello%20Vijay,%20I'm%20contacting%20you%20regarding%20payment%20details%20for%20a%20VM%20Wild%20Expedition."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#080908] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                >
                  💬 WhatsApp Concierge
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: Privacy Policy (DPDP Act 2023 & DPDP Rules 2025 Framework) */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-[#F2F0E8] mb-1 font-normal">
                  Privacy Policy & Personal Data Governance
                </h3>
                <p className="text-xs text-[#D6A85C] tracking-wider uppercase font-semibold">
                  Digital Personal Data Protection Act, 2023 & DPDP Rules 2025 (MeitY Framework)
                </p>
                <p className="mt-3 leading-relaxed text-xs">
                  VM Wild Expeditions (“we”, “us”, “our”) respects your privacy and is committed to protecting the personal information you provide when using our website and services. This Privacy Policy explains what information we collect, why we collect it, how we use it, and the choices available to you under India’s legal data protection framework.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#D6A85C]/30 space-y-2 text-xs">
                <span className="text-[#D6A85C] font-bold block uppercase tracking-wider text-[11px]">
                  🏛️ Digital Personal Data Protection (DPDP) Compliance Notice
                </span>
                <p className="text-[#A7A59B] leading-relaxed text-[11px]">
                  Our data processing practices adhere to the Digital Personal Data Protection Act, 2023 and the DPDP Rules, 2025 published by the Ministry of Electronics and Information Technology (MeitY), following the phased commencement schedule prescribed by the Government of India.
                </p>
              </div>

              <div className="space-y-5 text-xs text-[#A7A59B]">
                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    1. Information We Collect
                  </h4>
                  <p className="mb-2">Depending on how you interact with our website, we may collect:</p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#F2F0E8]/90 pl-1">
                    <li><strong>Contact Information:</strong> Name, Email address, Phone number, WhatsApp number.</li>
                    <li><strong>Tour Information:</strong> Preferred expedition, travel dates, number of participants.</li>
                    <li><strong>Booking & Permit Data:</strong> Government ID details required for forest department permit ticketing.</li>
                    <li><strong>Communication Records:</strong> Enquiries sent via email, WhatsApp, telephone or forms.</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, and basic operational cookies.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    2. How We Use Your Information
                  </h4>
                  <p className="leading-relaxed">
                    We process personal data strictly to respond to enquiries, process tour bookings, coordinate forest permits, facilitate accommodation/transportation, and provide 1-on-1 customer support.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923]">
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    3. Zero Commercial Data Selling
                  </h4>
                  <p className="leading-relaxed text-[11px]">
                    VM Wild Expeditions <strong>does not sell, rent, lease, or commercialize</strong> client personal data to third-party marketing brokers or ad networks under any circumstances.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    4. Third-Party Service Sharing
                  </h4>
                  <p className="leading-relaxed">
                    We share relevant personal data exclusively with necessary service providers required for tour execution: Forest Sanctuary Permit Offices, Eco-Lodges, Transport Operators, and PCI-DSS Compliant Payment Processors.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C] mb-1.5">
                    5. Your Rights Under DPDP Act 2023 & Rules 2025
                  </h4>
                  <p className="mb-2">Subject to applicable law, you have the right to:</p>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-[#F2F0E8]/90 pl-1">
                    <li>Obtain summary information about your processed personal data.</li>
                    <li>Request correction or updating of inaccurate data.</li>
                    <li>Request erasure of personal data where no longer required.</li>
                    <li>Withdraw consent at any time without affecting prior lawful processing.</li>
                    <li>Nominate individuals and raise privacy-related grievances.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#0d100d] border border-[#242923] space-y-2">
                  <h4 className="font-sans text-xs tracking-[0.18em] uppercase font-bold text-[#D6A85C]">
                    6. Privacy Contact & Grievance Redressal
                  </h4>
                  <p className="text-[11px] leading-relaxed">
                    To exercise your data protection rights or register a grievance:
                  </p>
                  <div className="text-[11px] font-mono text-[#D6A85C] space-y-0.5 pt-1">
                    <p>Grievance Officer: Vijay Mathiew</p>
                    <p>Email: admissions@vmwild.com</p>
                    <p>WhatsApp / Desk: +91 9087394546</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="shrink-0 relative z-20 flex justify-between items-center px-6 md:px-8 py-4 border-t border-[#242923] bg-[#080908]">
          <span className="font-sans text-[10px] text-[#A7A59B] uppercase tracking-widest">
            © {new Date().getFullYear()} VM WILD EXPEDITIONS
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#D6A85C] hover:bg-[#b58b45] text-[#080908] font-bold font-sans text-xs tracking-wider uppercase cursor-pointer shadow-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
