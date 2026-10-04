"use client";

import { useState } from "react";
import { JOURNEYS_DATA, Journey } from "@/data/journeysData";
import JourneyModal from "./JourneyModal";
import { ArrowUpRight } from "lucide-react";

interface FeaturedJourneysProps {
  onSelectJourneyBooking: (destinationTitle: string) => void;
}

export default function FeaturedJourneys({
  onSelectJourneyBooking,
}: FeaturedJourneysProps) {
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

  return (
    <section id="journeys" className="w-full py-28 md:py-36 px-6 md:px-12 bg-[#080909]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C2A676] font-medium">
              03 / DESTINATIONS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F2F0E8] tracking-tight">
              CHOOSE YOUR JOURNEY
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#9A988E] max-w-md font-light leading-relaxed">
            Each photographic safari is limited to small intimate groups to preserve vehicle space, optimal shooting positions, and quiet habitat access.
          </p>
        </div>

        {/* Safari Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {JOURNEYS_DATA.map((journey) => (
            <div
              key={journey.id}
              onClick={() => setSelectedJourney(journey)}
              className="group cursor-pointer rounded-[24px] overflow-hidden border border-white/10 bg-[#111312] hover:border-[#C2A676]/50 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Image Header with Aspect Ratio */}
              <div className="relative w-full h-72 overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ backgroundImage: `url(${journey.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111312] via-transparent to-black/30" />
                
                {/* Location Badge */}
                <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-[0.25em] text-[#C2A676]">
                  {journey.country}
                </div>

                {/* Arrow Action Icon */}
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:border-[#C2A676] group-hover:bg-[#C2A676] group-hover:text-[#080909] transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#9A988E]">
                    {journey.duration}
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#F2F0E8] group-hover:text-[#C2A676] transition-colors">
                    {journey.title}
                  </h3>

                  <p className="text-xs text-[#9A988E] line-clamp-2 leading-relaxed font-light">
                    {journey.description}
                  </p>

                  {/* Focus Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {journey.focus.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-[#F2F0E8]/80 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Price & Button */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#9A988E] block">
                      Starting From
                    </span>
                    <span className="font-serif text-lg text-[#C2A676]">
                      {journey.price}
                    </span>
                  </div>

                  <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#F2F0E8] group-hover:text-[#C2A676] transition-colors flex items-center gap-1">
                    View Journey &rarr;
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Popup */}
      <JourneyModal
        journey={selectedJourney}
        onClose={() => setSelectedJourney(null)}
        onSelectBooking={(title) => {
          onSelectJourneyBooking(title);
        }}
      />
    </section>
  );
}
