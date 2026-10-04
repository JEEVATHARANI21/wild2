"use client";

import React from "react";
import { Compass, Camera, Sparkles } from "lucide-react";

export default function SafariExperience() {
  const pillars = [
    {
      num: "01",
      title: "THE WILD",
      icon: Compass,
      description:
        "Immersive journeys into extraordinary landscapes and pristine wildlife habitats, selected for animal density and quiet conservancy access.",
    },
    {
      num: "02",
      title: "THE PHOTOGRAPHY",
      icon: Camera,
      description:
        "Thoughtfully designed game drives and field experiences tailored for photographers of every level, with optimal vehicle angles and lighting windows.",
    },
    {
      num: "03",
      title: "THE MOMENTS",
      icon: Sparkles,
      description:
        "Unhurried encounters designed around light, animal behavior, and unforgettable stories—where patience yields lifetime portfolio shots.",
    },
  ];

  return (
    <section id="safaris" className="w-full py-24 md:py-36 px-6 md:px-12 bg-[#111312] border-y border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C2A676] font-medium">
              02 / EXPERIENCE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F2F0E8] tracking-tight">
              THE SAFARI EXPERIENCE
            </h2>
          </div>

          <div className="text-lg md:text-xl font-serif italic text-[#9A988E]">
            &ldquo;Slow down. Watch longer. Photograph better.&rdquo;
          </div>
        </div>

        {/* 3 Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group relative p-8 md:p-10 rounded-[24px] border border-white/10 bg-[#080909]/60 hover:bg-[#080909] hover:border-[#C2A676]/40 transition-all duration-500 flex flex-col justify-between space-y-8"
              >
                <div className="space-y-6">
                  {/* Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl text-[#C2A676]/80 font-light">
                      {pillar.num}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C2A676] group-hover:text-[#C2A676] transition-colors duration-300">
                      <Icon className="w-4 h-4 text-[#9A988E] group-hover:text-[#C2A676]" />
                    </div>
                  </div>

                  <h3 className="text-xl tracking-[0.2em] uppercase font-serif text-[#F2F0E8] pt-2">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#9A988E] leading-relaxed font-sans font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="w-full h-[1px] bg-white/5 group-hover:bg-[#C2A676]/30 transition-colors duration-500" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
