"use client";

import { FOUNDERS_DATA } from "@/data/foundersData";
import { MessageSquare, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function FounderSection() {
  return (
    <section id="founders" className="w-full py-28 md:py-36 px-6 md:px-12 bg-[#080909]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C2A676] font-medium">
            05 / LEADERSHIP & MENTORSHIP
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F2F0E8] tracking-tight">
            MEET OUR EXPEDITION LEADERS
          </h2>
          <p className="text-sm text-[#9A988E] font-light">
            Bespoke wildlife expeditions led by Vijay Mathiew and Jayavignesh Hariharan—combining masterclass tracking, light sculpting, and non-invasive field ethics.
          </p>
        </div>

        {/* Two-Person Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {FOUNDERS_DATA.map((founder, idx) => (
            <div
              key={founder.id}
              className="group rounded-[28px] overflow-hidden border border-white/10 bg-[#111312] p-8 md:p-10 space-y-8 hover:border-[#C2A676]/40 transition-all duration-500 flex flex-col justify-between"
            >
              <div className="space-y-8">
                {/* Large Editorial Portrait Container */}
                <div className="relative w-full h-96 md:h-[420px] rounded-2xl overflow-hidden bg-[#080909]">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111312] via-transparent to-transparent opacity-80" />
                  
                  {/* Founder Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-[0.25em] text-[#C2A676]">
                    FOUNDER 0{idx + 1}
                  </div>

                  {/* Instagram Handle Badge */}
                  <a
                    href={founder.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-4 right-4 md:right-auto px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs text-[#F2F0E8] hover:border-[#C2A676] hover:text-[#C2A676] transition-colors flex items-center justify-between gap-3 pointer-events-auto"
                  >
                    <span className="font-mono text-[11px]">{founder.instagramHandle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Info & Copy */}
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#C2A676] font-medium">
                    {founder.role}
                  </div>

                  <h3 className="font-serif text-3xl font-normal text-[#F2F0E8]">
                    {founder.name}
                  </h3>

                  <p className="text-sm text-[#9A988E] font-light leading-relaxed font-sans">
                    {founder.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {founder.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#F2F0E8] font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action & WhatsApp Direct Connect */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  {founder.credentials.slice(0, 2).map((cred, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 text-[11px] text-[#9A988E]">
                      <ShieldCheck className="w-3 h-3 text-[#C2A676] shrink-0" />
                      <span className="line-clamp-1">{cred}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/919087394546?text=Hi%20${encodeURIComponent(founder.name)},%20I'm%20reaching%20out%20to%20connect%20from%20the%20website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all text-xs uppercase tracking-wider font-medium flex items-center gap-2 shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
