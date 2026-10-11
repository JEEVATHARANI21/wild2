"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight, Play, Pause, ChevronDown } from "lucide-react";

interface HeroVideoProps {
  src?: string;
  poster?: string;
  title?: string;
  eyebrow?: string;
  description?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryCtaClick?: () => void;
}

export default function HeroVideo({
  src = "/videos/home-hero.mp4",
  poster = "/images/home-hero-poster.jpg",
  title = "Bespoke Photographic\nExpeditions",
  eyebrow = "THE PINNACLE OF WILDLIFE PHOTOGRAPHY",
  description = "Masterclass field tracking, intimate vehicular limits (max 4 per Gypsy), and deep animal behavior anticipation with expedition mentors across India & Africa’s wildest national parks.",
  primaryCtaText = "TALK TO EXPERT",
  secondaryCtaText = "EXPLORE TOURS",
  onPrimaryCtaClick,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Split title lines
  const titleLines = title.split("\n");
  const line1 = titleLines[0] || title;
  const line2 = titleLines[1] || "";

  // Autoplay video reliably on mount with fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy / low-power mode
          setIsPlaying(false);
        });
    }
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative w-full bg-[#080909] p-3 pt-20 sm:p-5 sm:pt-24 md:p-8 md:pt-28 select-none">
      {/* HERO CONTAINER CARD */}
      <div className="relative w-full max-w-[1520px] mx-auto min-h-[86vh] sm:min-h-[88vh] md:min-h-[90vh] rounded-2xl md:rounded-[32px] overflow-hidden border border-white/15 bg-[#0b0e0b] shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col justify-between">
        {/* Background Full HD Wildlife Video Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={poster}
            className="w-full h-full object-cover object-[center_35%] brightness-[0.88] contrast-[1.05] transition-opacity duration-700"
          >
            {/* 1. Universal H.264 MP4 format: works on 100% of browsers (Chrome, Edge, Firefox, iOS, Android) */}
            <source src="/videos/home-hero.mp4" type="video/mp4" />
            {/* 2. QuickTime MOV format: native to Apple Safari / macOS */}
            <source src="/videos/IMG_8206.MOV" type="video/quicktime" />

            {/* 3. Fallback High Resolution Poster Image */}
            <img
              src={poster}
              alt="Wild Bengal Tiger — VM Wild Expeditions"
              className="w-full h-full object-cover object-[center_35%]"
            />
          </video>

          {/* CINEMATIC CONTRAST GRADIENTS */}
          {/* Mobile top-to-bottom dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-[#080909]/85 to-[#080909]/50 sm:hidden pointer-events-none" />

          {/* Desktop left-to-right negative space gradient */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#080909]/95 via-[#080909]/75 md:via-[#080909]/50 to-transparent pointer-events-none" />

          {/* Subtle Top & Bottom Vignette */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080909]/90 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#080909] to-transparent pointer-events-none" />
        </div>

        {/* HERO CONTENT: Top Bar */}
        <div className="relative z-10 p-5 sm:p-8 md:p-12 flex items-center justify-between pointer-events-auto">
          {/* Eyebrow Pill */}
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.28em] text-[#D6A85C] font-semibold py-1.5 px-3.5 sm:px-4 rounded-full border border-[#D6A85C]/35 bg-black/60 backdrop-blur-md shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C]" />
            <span>{eyebrow}</span>
          </span>

          {/* Interactive Play / Pause Video Controller */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause Hero Video" : "Play Hero Video"}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/70 border border-white/20 hover:border-[#D6A85C] text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase text-[#F2F0E8] hover:text-[#D6A85C] backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Pause className="w-3 h-3 text-[#D6A85C]" />
                <span className="font-semibold hidden sm:inline">LIVE VIDEO</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#D6A85C]" />
                <Play className="w-3 h-3 text-[#D6A85C]" />
                <span className="font-semibold hidden sm:inline">PLAY VIDEO</span>
              </>
            )}
          </button>
        </div>

        {/* HERO CONTENT: Main Headline, Description & CTAs */}
        <div className="relative z-10 p-5 sm:p-8 md:p-12 max-w-3xl space-y-5 md:space-y-6 pointer-events-auto my-auto">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.06] tracking-tight text-[#F2F0E8] drop-shadow-2xl">
            <span className="block">{line1}</span>
            {line2 && (
              <span className="block text-[#D6A85C] font-normal italic mt-1">
                {line2}
              </span>
            )}
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-[#F2F0E8]/90 font-light max-w-xl leading-relaxed font-sans drop-shadow-md">
            {description}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onPrimaryCtaClick}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 hover:shadow-[0_6px_30px_rgba(214,168,92,0.45)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-xl whitespace-nowrap"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#destinations"
              className="px-8 py-4 rounded-full border border-white/30 hover:border-[#D6A85C] bg-black/50 hover:bg-[#D6A85C]/15 backdrop-blur-md text-[#F2F0E8] hover:text-[#D6A85C] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 text-center cursor-pointer whitespace-nowrap"
            >
              {secondaryCtaText}
            </a>
          </div>

          {/* Core Trust Pillars */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2.5 pt-4 text-[10px] sm:text-xs font-sans tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#F2F0E8]/80 font-medium border-t border-[#242923]/80">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm">📍</span>
              <span>India's Premier Wilds</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm">📷</span>
              <span>Field Masterclasses</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm">👥</span>
              <span>Max 4 / Gypsy</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm">🌿</span>
              <span>Ethical Tracking</span>
            </div>
          </div>
        </div>

        {/* HERO CONTENT: Bottom Bar with Scroll Indicator */}
        <div className="relative z-10 p-5 sm:p-8 md:p-10 flex items-center justify-between text-xs tracking-[0.25em] text-[#F2F0E8]/75 uppercase pointer-events-auto">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D6A85C] animate-pulse" />
            <span className="font-semibold text-[10.5px] text-[#D6A85C]">
              ROYAL BENGAL TIGER • LIVE HABITAT
            </span>
          </div>

          <a
            href="#founders"
            className="inline-flex items-center gap-2 text-[10.5px] sm:text-xs hover:text-[#D6A85C] transition-colors ml-auto group/scroll"
          >
            <span className="tracking-[0.2em]">EXPLORE EXPEDITIONS</span>
            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover/scroll:border-[#D6A85C]">
              <ChevronDown className="w-3.5 h-3.5 text-[#D6A85C] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
