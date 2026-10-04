"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronDown, ArrowRight, Lock, Unlock } from "lucide-react";

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

// Math Helpers for Progress Interpolation
function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function mapRange(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  const cVal = clamp(val, inMin, inMax);
  if (inMax === inMin) return outMin;
  return outMin + ((cVal - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export default function HeroVideo({
  src = "/videos/hornbill-flight.mp4",
  poster = "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=85",
  title = "WILD PLACES.\nREAL MOMENTS.",
  eyebrow = "WILDLIFE PHOTOGRAPHY SAFARIS",
  description = "Immersive wildlife photography journeys designed around extraordinary encounters.",
  primaryCtaText = "BOOK A SAFARI",
  secondaryCtaText = "EXPLORE TOURS",
  onPrimaryCtaClick,
}: HeroVideoProps) {
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // DOM Refs for 60fps Reversible Text Timeline Animation
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const titleLine1Ref = useRef<HTMLSpanElement | null>(null);
  const titleLine2Ref = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const progressTextRef = useRef<HTMLSpanElement | null>(null);
  const lockIconRef = useRef<HTMLDivElement | null>(null);

  const [hasError, setHasError] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Split title lines if multiline text
  const titleLines = title.split("\n");
  const line1 = titleLines[0] || title;
  const line2 = titleLines[1] || "";

  // Prime video on load so first frame (0.01s) is primed and ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const primeVideo = () => {
      if (video.readyState >= 2 && video.currentTime === 0) {
        video.currentTime = 0.01;
      }
    };

    video.addEventListener("loadedmetadata", primeVideo);
    video.addEventListener("loadeddata", primeVideo);
    if (video.readyState >= 2) primeVideo();

    return () => {
      video.removeEventListener("loadedmetadata", primeVideo);
      video.removeEventListener("loadeddata", primeVideo);
    };
  }, [src]);

  // Master 60fps Reversible Scroll-Scrubbed Animation Engine
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setVideoCompleted(true);
      return;
    }

    const video = videoRef.current;
    const track = scrollTrackRef.current;
    if (!video || !track) return;

    let rafId: number | null = null;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const trackHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const maxScrollableDistance = trackHeight - viewportHeight;

      if (maxScrollableDistance <= 0) return;

      const scrolledDistance = -rect.top;
      targetProgress = clamp(scrolledDistance / maxScrollableDistance, 0, 1);
    };

    const updateTimeline = () => {
      // Smooth lerp toward target scroll progress
      currentProgress += (targetProgress - currentProgress) * 0.16;
      if (Math.abs(targetProgress - currentProgress) < 0.0003) {
        currentProgress = targetProgress;
      }

      // 1. REVERSIBLE VIDEO SCROLL-SCRUBBING (Hardware Throttled for Ultra Performance)
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        const targetTime = clamp(
          currentProgress * video.duration,
          0.01,
          video.duration - 0.02
        );
        if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.035) {
          video.currentTime = targetTime;
        }
      }

      // 2. REVERSIBLE CINEMATIC TEXT TIMELINE INTERPOLATION
      // Eyebrow Stage (0.05 -> 0.22)
      const eyebrowOpacity = mapRange(currentProgress, 0.05, 0.22, 0, 1);
      const eyebrowY = mapRange(currentProgress, 0.05, 0.22, 25, 0);

      // Title Line 1 Stage (0.18 -> 0.42)
      const title1Opacity = mapRange(currentProgress, 0.18, 0.42, 0, 1);
      const title1Y = mapRange(currentProgress, 0.18, 0.42, 35, 0);

      // Title Line 2 Stage (0.35 -> 0.60)
      const title2Opacity = mapRange(currentProgress, 0.35, 0.60, 0, 1);
      const title2Y = mapRange(currentProgress, 0.35, 0.60, 35, 0);

      // Description Stage (0.52 -> 0.78)
      const descOpacity = mapRange(currentProgress, 0.52, 0.78, 0, 1);
      const descY = mapRange(currentProgress, 0.52, 0.78, 25, 0);

      // CTAs Stage (0.72 -> 0.95)
      const ctaOpacity = mapRange(currentProgress, 0.72, 0.95, 0, 1);
      const ctaY = mapRange(currentProgress, 0.72, 0.95, 20, 0);
      const ctaScale = mapRange(currentProgress, 0.72, 0.95, 0.94, 1.0);

      // Apply 3D transforms & opacities directly to DOM elements
      if (eyebrowRef.current) {
        eyebrowRef.current.style.opacity = eyebrowOpacity.toFixed(3);
        eyebrowRef.current.style.transform = `translate3d(0, ${eyebrowY.toFixed(1)}px, 0)`;
      }

      if (titleLine1Ref.current) {
        titleLine1Ref.current.style.opacity = title1Opacity.toFixed(3);
        titleLine1Ref.current.style.transform = `translate3d(0, ${title1Y.toFixed(1)}px, 0)`;
      }

      if (titleLine2Ref.current) {
        titleLine2Ref.current.style.opacity = title2Opacity.toFixed(3);
        titleLine2Ref.current.style.transform = `translate3d(0, ${title2Y.toFixed(1)}px, 0)`;
      }

      if (descRef.current) {
        descRef.current.style.opacity = descOpacity.toFixed(3);
        descRef.current.style.transform = `translate3d(0, ${descY.toFixed(1)}px, 0)`;
      }

      if (ctaRef.current) {
        ctaRef.current.style.opacity = ctaOpacity.toFixed(3);
        ctaRef.current.style.transform = `translate3d(0, ${ctaY.toFixed(1)}px, 0) scale(${ctaScale.toFixed(3)})`;
      }

      if (progressTextRef.current) {
        const pct = Math.round(currentProgress * 100);
        if (currentProgress >= 0.94) {
          progressTextRef.current.textContent = "HERO UNLOCKED • SCROLL DOWN ↓";
          setVideoCompleted(true);
        } else {
          progressTextRef.current.textContent = `SCROLL TO PLAY VIDEO (${pct}%)`;
          setVideoCompleted(false);
        }
      }

      rafId = requestAnimationFrame(updateTimeline);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    rafId = requestAnimationFrame(updateTimeline);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [src]);

  const handleVideoError = () => {
    setHasError(true);
    setVideoCompleted(true);
  };

  return (
    <section
      ref={scrollTrackRef}
      className="hero-scroll-section relative w-full bg-[#080909]"
      style={{ height: isReducedMotion ? "auto" : "180vh" }}
    >
      {/* HERO STICKY INNER CONTAINER */}
      <div
        className={`${
          isReducedMotion
            ? "relative w-full h-[84vh]"
            : "sticky top-0 w-full h-screen overflow-hidden"
        } flex flex-col items-center justify-center p-4 pt-20 md:p-8 md:pt-24 lg:p-12 lg:pt-24 z-10 transform-gpu will-change-transform`}
        style={{ transform: "translateZ(0)" }}
      >
        {/* HERO CONTAINER CARD */}
        <div className="relative w-full max-w-[1500px] h-[78vh] md:h-[82vh] rounded-2xl md:rounded-[28px] overflow-hidden border border-white/15 bg-[#0e110e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
          {/* Scroll-Scrubbed Video Element (no autoplay, no loop) */}
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            playsInline
            preload="auto"
            onError={handleVideoError}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              hasError ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Fallback Image / Ambient Backdrop */}
          {(hasError || !src) && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${poster})` }}
            />
          )}

          {/* CINEMATIC GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-black/40 to-black/50 pointer-events-none" />

          {/* HERO REVERSIBLE ANIMATED TEXT CONTENT */}
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12 lg:p-16 pointer-events-none">
            {/* Top Bar: Eyebrow & Status */}
            <div className="pointer-events-auto flex items-center justify-between">
              <span
                ref={eyebrowRef}
                className="inline-block text-[10.5px] md:text-xs uppercase tracking-[0.3em] text-[#D6A85C] font-semibold py-1.5 px-3.5 rounded-full border border-[#D6A85C]/35 bg-black/60 backdrop-blur-md shadow-md will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 25px, 0)" }}
              >
                {eyebrow}
              </span>

              {/* Status Indicator */}
              <div
                ref={lockIconRef}
                className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-[#F2F0E8] shadow-md"
              >
                {videoCompleted ? (
                  <Unlock className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-[#D6A85C]" />
                )}
                <span ref={progressTextRef} className="font-semibold">
                  SCROLL TO PLAY VIDEO (0%)
                </span>
              </div>
            </div>

            {/* Main Headline & CTAs */}
            <div className="max-w-3xl space-y-5 md:space-y-6 pointer-events-auto">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#F2F0E8] drop-shadow-xl flex flex-col">
                <span
                  ref={titleLine1Ref}
                  className="inline-block will-change-transform"
                  style={{ opacity: 0, transform: "translate3d(0, 35px, 0)" }}
                >
                  {line1}
                </span>
                {line2 && (
                  <span
                    ref={titleLine2Ref}
                    className="inline-block will-change-transform text-[#D6A85C] font-normal italic"
                    style={{ opacity: 0, transform: "translate3d(0, 35px, 0)" }}
                  >
                    {line2}
                  </span>
                )}
              </h1>

              <p
                ref={descRef}
                className="text-xs sm:text-base md:text-lg text-[#F2F0E8]/90 font-light max-w-xl leading-relaxed font-sans drop-shadow-md will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 25px, 0)" }}
              >
                {description}
              </p>

              <div
                ref={ctaRef}
                className="pt-2 flex flex-wrap items-center gap-4 md:gap-6 will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 20px, 0) scale(0.94)" }}
              >
                <a
                  href="#booking"
                  onClick={(e) => {
                    if (onPrimaryCtaClick) {
                      e.preventDefault();
                      onPrimaryCtaClick();
                    }
                  }}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D6A85C] to-[#B87333] text-[#080908] text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 transition-all duration-300 shadow-[0_4px_25px_rgba(214,168,92,0.4)] flex items-center gap-3 group/btn cursor-pointer"
                >
                  <span>{primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#journeys"
                  className="px-7 py-3.5 rounded-full border border-white/30 bg-black/50 backdrop-blur-md text-[#F2F0E8] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#D6A85C] hover:text-[#D6A85C] transition-all duration-300 cursor-pointer"
                >
                  {secondaryCtaText}
                </a>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center justify-between text-xs tracking-[0.25em] text-[#F2F0E8]/70 uppercase pt-2 pointer-events-auto">
              <div className="hidden md:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D6A85C] animate-pulse" />
                <span className="font-semibold text-[11px] tracking-[0.25em] text-[#D6A85C]">
                  {videoCompleted ? "VIDEO COMPLETE" : "SCROLL TO SCRUB TIMELINE"}
                </span>
              </div>

              <a
                href="#founders"
                className="flex items-center gap-2 text-xs hover:text-[#D6A85C] transition-colors group/scroll"
              >
                <span className="tracking-[0.2em]">
                  {videoCompleted ? "SCROLL TO EXPEDITION LEADERS ↓" : "SCROLLING SCRUBS VIDEO & TEXT"}
                </span>
                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover/scroll:border-[#D6A85C]">
                  <ChevronDown className="w-3.5 h-3.5 text-[#D6A85C] animate-bounce" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
