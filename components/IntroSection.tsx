"use client";

import React from "react";

export default function IntroSection() {
  return (
    <section id="intro" className="w-full py-28 md:py-40 px-6 md:px-12 bg-[#080909]">
      <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
        {/* Eyebrow Label */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-[#C2A676]/40" />
          <span className="text-xs uppercase tracking-[0.35em] text-[#C2A676] font-medium">
            01 / PHILOSOPHY
          </span>
          <div className="h-[1px] w-12 bg-[#C2A676]/40" />
        </div>

        {/* Large Editorial Headline */}
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.15] text-[#F2F0E8] tracking-tight max-w-4xl mx-auto">
          THE WILD, THROUGH A<br className="hidden md:block" /> PHOTOGRAPHER&apos;S EYE.
        </h2>

        {/* Minimal Supporting Copy */}
        <p className="text-base md:text-xl text-[#9A988E] font-light leading-relaxed max-w-2xl mx-auto font-sans">
          We create intimate wildlife journeys for people who want more than a safari.
          Our expeditions are designed around patience, light, storytelling and
          unforgettable encounters with the natural world.
        </p>

        {/* Subtle Decorative Line */}
        <div className="pt-8 flex justify-center">
          <div className="w-16 h-[1px] bg-white/10" />
        </div>
      </div>
    </section>
  );
}
