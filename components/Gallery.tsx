"use client";

import { useState } from "react";
import { GALLERY_DATA, GalleryItem } from "@/data/galleryData";
import Lightbox from "./Lightbox";
import { Maximize2 } from "lucide-react";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Wildlife",
    "Big Cats",
    "Landscapes",
    "Birds",
    "Conservation",
    "People & Culture",
  ];

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="photography" className="w-full py-28 md:py-36 px-6 md:px-12 bg-[#111312] border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-[#C2A676] font-medium">
              06 / PORTFOLIO
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#F2F0E8] tracking-tight">
              FROM THE FIELD
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#C2A676] text-[#080909] font-medium shadow-md"
                    : "bg-[#080909]/60 text-[#9A988E] border border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Editorial Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-[22px] border border-white/10 bg-[#080909] break-inside-avoid shadow-lg transition-transform duration-500 hover:-translate-y-1"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#C2A676]">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C2A676]">
                    {item.location}
                  </span>
                  <h4 className="font-serif text-lg text-white font-normal">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Component */}
      <Lightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
}
