"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Send, Calendar, Users, Moon, Camera, MapPin, Mail, Phone, MessageSquare } from "lucide-react";

interface BookingFormProps {
  initialDestination?: string;
}

export default function BookingForm({ initialDestination = "" }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    destination: initialDestination || "Masai Mara, Kenya",
    preferredMonth: "September 2026",
    guests: "2 Guests",
    nights: "7 Nights",
    experience: "Intermediate Photographer",
    accommodation: "Luxury Tented Eco-Camp",
    email: "",
    phone: "",
    message: "",
  });

  const destinations = [
    "Masai Mara, Kenya",
    "Serengeti, Tanzania",
    "Amboseli, Kenya",
    "Kruger & Sabi Sabi, South Africa",
    "Okavango Delta, Botswana",
    "Custom Multi-Country Expedition",
  ];

  const months = [
    "June 2026",
    "July 2026",
    "August 2026",
    "September 2026",
    "October 2026",
    "November 2026",
    "December 2026",
    "January 2027",
    "February 2027",
  ];

  const experienceLevels = [
    "Beginner / Hobbyist",
    "Intermediate Photographer",
    "Advanced / Semi-Pro",
    "Professional Wildlife Photographer",
  ];

  const accommodationTypes = [
    "Luxury Tented Eco-Camp",
    "Exclusive Private Reserve Lodge",
    "Mobile Expedition Wilderness Camp",
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate frontend validation & backend lead submission trigger
    setSubmitted(true);
  };

  return (
    <section id="booking" className="w-full py-28 md:py-36 px-6 md:px-12 bg-[#111312] border-t border-white/10">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C2A676] font-medium">
            04 / RESERVATION
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#F2F0E8] tracking-tight">
            PLAN YOUR WILD
          </h2>
          <p className="text-sm md:text-base text-[#9A988E] font-light max-w-xl mx-auto">
            Submit your private expedition request below. Our photography lead and safari logistics team will craft your tailored itinerary.
          </p>
        </div>

        {/* Booking Container */}
        <div className="wild-container p-8 md:p-14 shadow-2xl relative">
          
          {submitted ? (
            /* Thank You State */
            <div className="py-16 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#C2A676]/10 border border-[#C2A676] flex items-center justify-center mx-auto text-[#C2A676]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <h3 className="font-serif text-3xl md:text-5xl font-normal text-[#F2F0E8] tracking-wide">
                THANK YOU.<br />YOUR JOURNEY STARTS HERE.
              </h3>
              
              <p className="text-sm text-[#9A988E] font-light max-w-md mx-auto">
                We have received your expedition request for <span className="text-[#C2A676] font-medium">{formData.destination}</span>. Our team will contact you at <span className="text-white">{formData.email}</span> within 24 hours.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F2F0E8] hover:border-[#C2A676] hover:text-[#C2A676] transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Grid 1: Destination & Month */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Destination Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C2A676] flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> Destination
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#080909] border border-white/10 text-sm text-[#F2F0E8] focus:border-[#C2A676] focus:outline-none transition-colors"
                    required
                  >
                    {destinations.map((d) => (
                      <option key={d} value={d} className="bg-[#080909] text-[#F2F0E8]">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Month */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C2A676] flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Preferred Month
                  </label>
                  <select
                    value={formData.preferredMonth}
                    onChange={(e) => setFormData({ ...formData, preferredMonth: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#080909] border border-white/10 text-sm text-[#F2F0E8] focus:border-[#C2A676] focus:outline-none transition-colors"
                  >
                    {months.map((m) => (
                      <option key={m} value={m} className="bg-[#080909] text-[#F2F0E8]">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Grid 2: Guests, Nights, Photography level */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Number of Guests */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C2A676] flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" /> Number of Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#080909] border border-white/10 text-sm text-[#F2F0E8] focus:border-[#C2A676] focus:outline-none transition-colors"
                  >
                    <option value="1 Solo Photographer">1 Solo Photographer</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3-4 Guests (Small Group)">3-4 Guests (Small Group)</option>
                    <option value="5-6 Guests (Private Vehicle)">5-6 Guests (Private Vehicle)</option>
                  </select>
                </div>

                {/* Number of Nights */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C2A676] flex items-center gap-2">
                    <Moon className="w-3.5 h-3.5" /> Number of Nights
                  </label>
                  <select
                    value={formData.nights}
                    onChange={(e) => setFormData({ ...formData, nights: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#080909] border border-white/10 text-sm text-[#F2F0E8] focus:border-[#C2A676] focus:outline-none transition-colors"
                  >
                    <option value="5 Nights">5 Nights</option>
                    <option value="7 Nights">7 Nights</option>
                    <option value="10 Nights">10 Nights</option>
                    <option value="14+ Nights Extended">14+ Nights Extended</option>
                  </select>
                </div>

                {/* Photography Experience */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C2A676] flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5" /> Photography Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#080909] border border-white/10 text-sm text-[#F2F0E8] focus:border-[#C2A676] focus:outline-none transition-colors"
                  >
                    {experienceLevels.map((lvl) => (
                      <option key={lvl} value={lvl} className="bg-[#080909] text-[#F2F0E8]">
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Accommodation Preference */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-[#C2A676]">
                  Accommodation Preference
                </label>
                <select
                  value={formData.accommodation}
                  onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-[#080909] border border-white/10 text-sm text-[#F2F0E8] focus:border-[#C2A676] focus:outline-none transition-colors"
                >
                  {accommodationTypes.map((acc) => (
                    <option key={acc} value={acc} className="bg-[#080909] text-[#F2F0E8]">
                      {acc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C2A676] flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="photographer@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#080909] border border-white/10 text-sm text-[#F2F0E8] placeholder-[#9A988E]/40 focus:border-[#C2A676] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[#C2A676] flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-3.5 rounded-xl bg-[#080909] border border-white/10 text-sm text-[#F2F0E8] placeholder-[#9A988E]/40 focus:border-[#C2A676] focus:outline-none transition-colors"
                  />
                </div>

              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] text-[#C2A676] flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" /> Special Camera Gear or Travel Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about target species, lens focal lengths, private vehicle needs, or custom dates..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-[#080909] border border-white/10 text-sm text-[#F2F0E8] placeholder-[#9A988E]/40 focus:border-[#C2A676] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 rounded-full bg-[#C2A676] text-[#080909] text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#d6bc8c] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-[#C2A676]/20 cursor-pointer"
                >
                  <span>REQUEST SAFARI</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
