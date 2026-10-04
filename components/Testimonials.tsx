"use client";

import { TESTIMONIALS_DATA } from "@/data/testimonialsData";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="w-full py-28 md:py-36 px-6 md:px-12 bg-[#111312] border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C2A676] font-medium">
            09 / FIELD RECOLLECTIONS
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F2F0E8] tracking-tight">
            WORDS FROM THE FIELD
          </h2>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-[24px] bg-[#080909] border border-white/10 flex flex-col justify-between space-y-8 hover:border-[#C2A676]/30 transition-all duration-300"
            >
              <div className="space-y-6">
                <Quote className="w-8 h-8 text-[#C2A676]/40" />
                <p className="font-serif text-base text-[#F2F0E8] leading-relaxed font-light italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-2">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#C2A676]">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-[#9A988E] font-mono">
                    {t.handle} • {t.location}
                  </div>
                </div>

                <div className="text-[10px] text-[#F2F0E8]/70 font-mono bg-white/5 px-2.5 py-1 rounded-md border border-white/5 inline-block">
                  {t.gear}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
