"use client";

import { X, Calendar, Users, Camera, ArrowRight, ShieldCheck } from "lucide-react";
import { Journey } from "@/data/journeysData";

interface JourneyModalProps {
  journey: Journey | null;
  onClose: () => void;
  onSelectBooking: (journeyTitle: string) => void;
}

export default function JourneyModal({
  journey,
  onClose,
  onSelectBooking,
}: JourneyModalProps) {
  if (!journey) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-fadeIn">
      {/* Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#111312] rounded-[28px] border border-white/15 shadow-2xl text-[#F2F0E8] no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-6 right-6 float-right z-20 p-2.5 rounded-full bg-black/60 border border-white/20 hover:border-[#C2A676] hover:text-[#C2A676] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header Image */}
        <div className="relative w-full h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: `url(${journey.image})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111312] via-[#111312]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 space-y-2">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#C2A676]">
              <span>{journey.country}</span>
              <span>•</span>
              <span>{journey.season}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F2F0E8]">
              {journey.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-10 space-y-10">
          
          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#080909] border border-white/10 text-xs tracking-wider">
            <div>
              <span className="text-[#9A988E] uppercase block pb-1">Duration</span>
              <span className="text-white font-medium">{journey.duration}</span>
            </div>
            <div>
              <span className="text-[#9A988E] uppercase block pb-1">Group Size</span>
              <span className="text-white font-medium">{journey.groupSize}</span>
            </div>
            <div>
              <span className="text-[#9A988E] uppercase block pb-1">Best Season</span>
              <span className="text-white font-medium">{journey.season}</span>
            </div>
            <div>
              <span className="text-[#9A988E] uppercase block pb-1">Investment</span>
              <span className="text-[#C2A676] font-semibold text-sm">From {journey.price}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.3em] text-[#C2A676]">Expedition Overview</h3>
            <p className="text-base text-[#9A988E] leading-relaxed font-light font-sans">
              {journey.description}
            </p>
          </div>

          {/* Photography Focus Tags */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.3em] text-[#C2A676]">Photographic Focus</h3>
            <div className="flex flex-wrap gap-2">
              {journey.focus.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-[#F2F0E8] uppercase tracking-wider"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Expedition Highlights */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.3em] text-[#C2A676]">Expedition Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journey.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#080909]/60 border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-[#C2A676] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#9A988E] leading-relaxed font-light">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary Schedule */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.3em] text-[#C2A676]">Sample Itinerary</h3>
            <div className="space-y-4 border-l border-white/10 pl-6">
              {journey.itinerary.map((item, idx) => (
                <div key={idx} className="relative space-y-1">
                  <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#C2A676] border-4 border-[#111312]" />
                  <div className="text-xs text-[#C2A676] uppercase tracking-widest">{item.day}</div>
                  <div className="text-sm font-serif font-medium text-white">{item.title}</div>
                  <p className="text-xs text-[#9A988E] font-light leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer inside Modal */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9A988E]">Pricing starting at</span>
              <div className="text-2xl font-serif text-[#C2A676] font-normal">{journey.price} <span className="text-xs text-[#9A988E] font-sans font-light">/ person</span></div>
            </div>

            <button
              onClick={() => {
                onSelectBooking(journey.title);
                onClose();
              }}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-[#C2A676] text-[#080909] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#d6bc8c] transition-all flex items-center justify-center gap-3"
            >
              <span>Request Booking for {journey.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
