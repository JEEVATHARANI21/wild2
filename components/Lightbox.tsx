"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Camera, Sliders, MapPin } from "lucide-react";
import { GalleryItem } from "@/data/galleryData";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, items, onClose, onNavigate]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const current = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8 animate-fadeIn select-none"
    >
      {/* Top Bar: Title & Controls */}
      <div className="flex items-center justify-between text-white z-20" onClick={(e) => e.stopPropagation()}>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C2A676]">
            {current.category} • {currentIndex + 1} of {items.length}
          </span>
          <h3 className="font-serif text-lg md:text-2xl text-[#F2F0E8]">{current.title}</h3>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-[#C2A676] hover:text-[#080909] transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Display Area */}
      <div className="relative flex-1 flex items-center justify-center py-4" onClick={(e) => e.stopPropagation()}>
        
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-6 z-20 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:border-[#C2A676] hover:text-[#C2A676] transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image */}
        <div className="relative max-w-5xl max-h-[72vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
          <img
            src={current.src}
            alt={current.title}
            className="w-full h-full object-contain max-h-[72vh] transition-all duration-300"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-6 z-20 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:border-[#C2A676] hover:text-[#C2A676] transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Bar */}
      <div
        className="max-w-4xl mx-auto w-full p-4 md:p-6 rounded-2xl bg-[#111312] border border-white/10 text-xs text-[#F2F0E8] z-20 flex items-center justify-between gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 text-[#C2A676]">
          <MapPin className="w-4 h-4" />
          <span className="uppercase tracking-wider font-medium">{current.location}</span>
        </div>
      </div>

    </div>
  );
}
