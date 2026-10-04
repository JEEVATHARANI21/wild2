"use client";

import React from "react";
import { BookOpen, Shield, HeartHandshake } from "lucide-react";

export default function Conservation() {
  const pillars = [
    {
      title: "LEARN",
      icon: BookOpen,
      text: "Understanding animal behavior, habitat ecology, and seasonal corridors is essential before pressing the shutter button.",
    },
    {
      title: "RESPECT",
      icon: Shield,
      text: "We adhere strictly to non-intrusive wildlife tracking distances, prioritizing the well-being and safety of every animal encounter.",
    },
    {
      title: "PROTECT",
      icon: HeartHandshake,
      text: "Responsible wildlife tourism provides direct economic value to community conservancies, guarding habitats against encroachment.",
    },
  ];

  return (
    <section className="relative w-full py-32 md:py-44 px-6 md:px-12 bg-[#080909] overflow-hidden border-t border-white/10">
      
      {/* Large Background Imagery with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-25"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1920&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-[#080909]/80 to-[#080909]" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-16 text-center">
        
        {/* Header */}
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] text-[#C2A676] font-medium">
            08 / ETHOS
          </span>
          
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-[#F2F0E8] tracking-tight leading-tight">
            THE WILD IS WORTH PROTECTING.
          </h2>

          <p className="text-base md:text-xl text-[#9A988E] font-light max-w-2xl mx-auto leading-relaxed font-sans">
            Responsible wildlife tourism creates a sustainable shield for wild spaces.
            By traveling with intention, patience, and deep respect, every expedition reinforces local conservation ecosystems.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-6">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-8 rounded-[24px] bg-[#111312]/80 backdrop-blur-md border border-white/10 space-y-4 hover:border-[#C2A676]/40 transition-colors"
              >
                <div className="flex items-center gap-3 text-[#C2A676]">
                  <Icon className="w-5 h-5" />
                  <span className="font-serif text-xl uppercase tracking-widest text-[#F2F0E8]">
                    {item.title}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-[#9A988E] font-light leading-relaxed font-sans">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
