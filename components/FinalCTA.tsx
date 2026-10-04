"use client";

import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onBookClick?: () => void;
}

export default function FinalCTA({ onBookClick }: FinalCTAProps) {
  return (
    <section className="relative w-full py-36 md:py-48 px-6 md:px-12 bg-[#080909] overflow-hidden border-t border-white/10">
      
      {/* Cinematic Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=85')",
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-black/50 to-[#080909]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 md:space-y-10">
        
        <span className="inline-block text-xs uppercase tracking-[0.35em] text-[#C2A676] font-medium py-1 px-4 rounded-full border border-[#C2A676]/30 bg-black/60 backdrop-blur-md">
          10 / EXPEDITION AWAITS
        </span>

        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-[#F2F0E8] tracking-tight leading-tight">
          YOUR NEXT STORY<br />IS OUT THERE.
        </h2>

        <p className="text-base md:text-xl text-[#9A988E] font-light max-w-xl mx-auto leading-relaxed font-sans">
          Join us for a wildlife journey built around extraordinary places,
          unforgettable encounters and photographs worth remembering.
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-5">
          <a
            href="#booking"
            onClick={(e) => {
              if (onBookClick) {
                e.preventDefault();
                onBookClick();
              }
            }}
            className="px-8 py-4 rounded-full bg-[#C2A676] text-[#080909] text-xs uppercase tracking-[0.25em] font-semibold hover:bg-[#d6bc8c] transition-all duration-300 shadow-xl flex items-center gap-3 group"
          >
            <span>BOOK A SAFARI</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#journeys"
            className="px-8 py-4 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-[#F2F0E8] text-xs uppercase tracking-[0.25em] font-medium hover:border-[#C2A676] hover:text-[#C2A676] transition-all duration-300"
          >
            EXPLORE JOURNEYS
          </a>
        </div>

      </div>
    </section>
  );
}
