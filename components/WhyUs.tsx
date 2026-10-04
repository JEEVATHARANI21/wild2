"use client";

import React from "react";

export default function WhyUs() {
  const features = [
    {
      num: "01",
      title: "SMALL GROUPS",
      subtitle: "More time. More flexibility. Better encounters.",
      detail:
        "Every vehicle seat guarantees a full window or open side shooting position. Small group dynamics allow unhurried stays at active wildlife sightings.",
    },
    {
      num: "02",
      title: "PHOTOGRAPHY-FIRST ITINERARIES",
      subtitle: "We plan around light, wildlife behavior and photography opportunities.",
      detail:
        "Departure times follow golden hour mist, afternoon rim-lighting, and twilight predator hunts rather than fixed lodge meal schedules.",
    },
    {
      num: "03",
      title: "LOCAL KNOWLEDGE",
      subtitle: "Experienced guides and deep knowledge of the landscape.",
      detail:
        "Our naturalists have spent decades tracking animal territories, anticipating behavior seconds before action happens, ensuring safety and respect.",
    },
    {
      num: "04",
      title: "RESPONSIBLE TRAVEL",
      subtitle: "Respect wildlife. Protect habitats. Support local communities.",
      detail:
        "Ethical distance practices, zero single-use plastics in the field, and direct financial contributions to local community conservancies.",
    },
  ];

  return (
    <section id="why-us" className="w-full py-28 md:py-36 px-6 md:px-12 bg-[#080909]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C2A676] font-medium">
              07 / DIFFERENCE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F2F0E8] tracking-tight">
              WHY TRAVEL WITH US
            </h2>
          </div>
          <p className="text-sm text-[#9A988E] font-light max-w-md">
            Designed from the ground up for wildlife photographers, naturalists, and deep wilderness explorers.
          </p>
        </div>

        {/* Editorial Typography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {features.map((item) => (
            <div key={item.num} className="space-y-4 p-8 rounded-[24px] bg-[#111312] border border-white/10 hover:border-[#C2A676]/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.3em] text-[#C2A676] font-mono">
                  {item.num} / FEATURE
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-[#F2F0E8] font-normal tracking-wide">
                {item.title}
              </h3>

              <div className="text-base font-serif italic text-[#C2A676]/90">
                {item.subtitle}
              </div>

              <p className="text-xs md:text-sm text-[#9A988E] font-light leading-relaxed font-sans pt-2">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
