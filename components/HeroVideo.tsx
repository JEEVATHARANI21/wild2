"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, ChevronDown, Volume2, VolumeX, Play, Pause, RotateCcw } from "lucide-react";

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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Split title lines
  const titleLines = title.split("\n");
  const line1 = titleLines[0] || title;
  const line2 = titleLines[1] || "";

  // 1. Autoplay video smoothly at 1x natural speed on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
    }

    const onTimeUpdate = () => {
      if (!video || !video.duration || isNaN(video.duration)) return;
      // If user is standing at top without scrolling, update progress from playback
      if (window.scrollY < 20) {
        const p = Math.min(video.currentTime / video.duration, 1);
        setProgress(p);
        if (p >= 0.95) {
          setIsCompleted(true);
        }
      }
    };

    const onEnded = () => {
      setIsCompleted(true);
      // Seamlessly loop video if user stays on hero
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  // 2. Master Sticky Scroll Engine:
  // - Outer track has height: 200vh.
  // - Inner container has sticky top-0 h-screen.
  // - As user scrolls, the hero STAYS 100% STICKY on screen without cutting off.
  // - Scroll progress directly drives the video from 0% to 100% completion smoothly.
  // - ONLY AFTER the video reaches 100% completion (end of track), continuing to scroll
  //   naturally and smoothly scrolls down into the 2nd page (#founders).
  useEffect(() => {
    const video = videoRef.current;
    const track = trackRef.current;
    if (!video || !track) return;

    let rafId: number | null = null;
    let targetProgress = 0;
    let currentProgress = 0;
    let isTicking = false;

    const handleScroll = () => {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;

      const scrolled = -rect.top;
      // 0 to 1 as user scrolls through the 200vh track
      targetProgress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(updateTimeline);
      }
    };

    const updateTimeline = () => {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) < 0.001) {
        currentProgress = targetProgress;
      } else {
        currentProgress += diff * 0.35; // Snappy, responsive damping
      }

      const dur = video.duration && !isNaN(video.duration) && video.duration > 0 ? video.duration : 6.77;

      // When user is scrolling through the track, sync video time smoothly
      if (currentProgress > 0.01) {
        const targetTime = Math.min(Math.max(currentProgress * dur, 0.01), dur - 0.05);
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.04) {
          video.currentTime = targetTime;
        }
      }

      setProgress(currentProgress);
      setIsCompleted(currentProgress >= 0.94);

      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        rafId = requestAnimationFrame(updateTimeline);
      } else {
        isTicking = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Controls
  const togglePlay = useCallback(() => {
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
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const replayVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
    video.currentTime = 0;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsCompleted(false);
        setProgress(0);
      })
      .catch(() => {});
  }, []);

  const progressPercent = Math.round(progress * 100);

  return (
    <section
      ref={trackRef}
      className="hero-scroll-track relative w-full bg-[#060806]"
      style={{ height: "200vh" }}
    >
      {/* 
        STICKY HERO VIEWPORT:
        Pins the hero video at the top of the screen while user scrolls through the 200vh track.
        The video plays until 100% complete.
        Once the video completes (end of track), scrolling naturally continues into the 2nd page (#founders).
      */}
      <div className="sticky top-0 w-full h-screen overflow-hidden select-none bg-[#060806] flex items-center">
        {/* FULLSCREEN ROYAL BENGAL TIGER VIDEO BACKGROUND */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            muted={isMuted}
            playsInline
            autoPlay
            preload="auto"
            poster={poster}
            className="w-full h-full object-cover object-[center_35%] md:object-[62%_35%] brightness-[0.96] contrast-[1.04]"
          >
            <source src="/videos/home-hero.mp4" type="video/mp4" />
            <source src="/videos/IMG_8206.MOV" type="video/quicktime" />
            <img
              src={poster}
              alt="Wild Bengal Tiger — VM Wild Expeditions"
              className="w-full h-full object-cover object-[center_35%] md:object-[62%_35%]"
            />
          </video>

          {/* CINEMATIC CONTRAST GRADIENTS: Left vignette ensures crisp text legibility while keeping the tiger completely bright */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060806]/90 via-[#060806]/55 via-35% md:via-[#060806]/40 to-transparent pointer-events-none" />

          {/* Top & Bottom blends for seamless navbar and section integration */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#060806]/85 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#060806] to-transparent pointer-events-none" />
        </div>

        {/* TOP-RIGHT CONTROLS: Play/Pause, Sound Toggle & Video Replay */}
        <div className="absolute top-20 sm:top-24 right-5 sm:right-10 md:right-14 z-20 flex items-center gap-2 pointer-events-auto">
          {/* Play / Pause Toggle */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause Video" : "Play Video"}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#D6A85C] border border-white/20 hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#D6A85C] border border-white/20 hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Replay Button */}
          <button
            type="button"
            onClick={replayVideo}
            aria-label="Replay Video"
            className="w-9 h-9 rounded-full bg-black/60 hover:bg-[#D6A85C] border border-white/20 hover:border-[#D6A85C] text-[#F2F0E8] hover:text-[#080908] flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-lg"
            title="Replay Video from Start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* HERO CONTENT: Left-Aligned Column That Doesn't Obscure the Tiger */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-24 pb-14 flex flex-col justify-center pointer-events-none">
          <div className="max-w-xl text-left pointer-events-auto">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#D6A85C] font-semibold py-1.5 px-3.5 rounded-full border border-[#D6A85C]/40 bg-[#080a08]/85 backdrop-blur-md shadow-md mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6A85C] animate-pulse" />
              <span>{eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-light leading-[1.06] tracking-tight text-[#F2F0E8] drop-shadow-2xl mb-3 sm:mb-5">
              <span className="block">{line1}</span>
              {line2 && (
                <span className="block text-[#D6A85C] font-normal italic mt-1">
                  {line2}
                </span>
              )}
            </h1>

            {/* Supporting Description */}
            <p className="text-xs sm:text-sm md:text-base text-[#F2F0E8]/90 font-light leading-relaxed max-w-lg font-sans drop-shadow-md mb-6 sm:mb-8">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={onPrimaryCtaClick}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-xs uppercase tracking-[0.18em] font-bold hover:brightness-110 hover:shadow-[0_6px_25px_rgba(214,168,92,0.4)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg whitespace-nowrap"
              >
                <span>{primaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#destinations"
                className="px-7 py-3.5 rounded-full border border-white/25 hover:border-[#D6A85C] bg-black/40 hover:bg-[#D6A85C]/15 backdrop-blur-md text-[#F2F0E8] hover:text-[#D6A85C] text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 text-center cursor-pointer whitespace-nowrap"
              >
                {secondaryCtaText}
              </a>
            </div>

            {/* Core Trust Pillars */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-[10px] sm:text-xs font-sans tracking-[0.14em] uppercase text-[#F2F0E8]/80 font-medium pt-3.5 border-t border-white/10 max-w-lg">
              <div className="flex items-center gap-1.5">
                <span className="text-[#D6A85C]">📍</span>
                <span>India's Premier Wilds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D6A85C]">📷</span>
                <span>Field Masterclasses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D6A85C]">👥</span>
                <span>Max 4 / Gypsy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#D6A85C]">🌿</span>
                <span>Ethical Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STATUS BAR: Live Progress + Scroll to 2nd Section (#founders) */}
        <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 md:left-16 md:right-16 z-20 flex items-center justify-between text-xs uppercase tracking-[0.2em] pointer-events-auto">
          {/* Live Video Habitat Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#D6A85C] animate-pulse" />
            <span className="text-[10px] text-[#D6A85C] font-semibold tracking-[0.2em]">
              {isCompleted ? "ROYAL BENGAL TIGER • 100% COMPLETE" : `SCROLL TO PLAY VIDEO • ${progressPercent}%`}
            </span>
          </div>

          {/* Scroll Prompt to 2nd Section (#founders) */}
          <a
            href="#founders"
            className="inline-flex items-center gap-2 text-[10.5px] sm:text-xs text-[#D6A85C] hover:text-[#F2F0E8] transition-colors ml-auto group/scroll bg-black/60 border border-white/15 hover:border-[#D6A85C] backdrop-blur-md px-4 py-2 rounded-full shadow-lg"
          >
            <span className="tracking-[0.18em]">
              {isCompleted ? "SCROLL FOR 2ND SECTION (FOUNDERS) ↓" : "SCROLL TO PLAY VIDEO ↓"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#D6A85C] animate-bounce" />
          </a>
        </div>

        {/* THIN GOLD PROGRESS TIMELINE AT VERY BOTTOM */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
          <div
            className="h-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
