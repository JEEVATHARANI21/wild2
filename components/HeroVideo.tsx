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

  const [hasError, setHasError] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0); // 0.0 to 1.0
  const [videoCompleted, setVideoCompleted] = useState(false);
  const videoCompletedRef = useRef(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  // Keep ref synced with state
  useEffect(() => {
    videoCompletedRef.current = videoCompleted;
  }, [videoCompleted]);

  // Prime video on load so initial frame is visible
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

  // Scroll Sync & Fixed Pinning Handler
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      setVideoCompleted(true);
      videoCompletedRef.current = true;
      return;
    }

    const video = videoRef.current;
    const track = scrollTrackRef.current;
    if (!video || !track) return;

    const handleScroll = () => {
      if (!track || !video) return;

      const rect = track.getBoundingClientRect();
      const trackHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const maxScrollableDistance = trackHeight - viewportHeight;

      if (maxScrollableDistance <= 0) return;

      const scrolledDistance = -rect.top;
      const rawProgress = Math.min(
        Math.max(scrolledDistance / maxScrollableDistance, 0),
        1
      );

      setVideoProgress(rawProgress);

      // 1. Sync video currentTime directly with scroll progress
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        const targetTime = Math.min(
          Math.max(rawProgress * video.duration, 0.01),
          video.duration - 0.05
        );

        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = requestAnimationFrame(() => {
          if (video && Math.abs(video.currentTime - targetTime) > 0.02) {
            video.currentTime = targetTime;
          }
        });
      } else {
        if (video.paused && !videoCompletedRef.current) {
          video.muted = true;
          video.playsInline = true;
          video.play().catch(() => {});
        }
      }

      // Mark hero completed ONLY when scroll reaches 98%+ OR video ends
      const isFinished =
        rawProgress >= 0.98 ||
        video.ended ||
        (video.duration > 0 && video.currentTime >= video.duration - 0.15);

      if (isFinished && !videoCompletedRef.current) {
        setVideoCompleted(true);
        videoCompletedRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [src]);

  const handleVideoEnded = () => {
    if (videoRef.current) videoRef.current.pause();
    setVideoCompleted(true);
    videoCompletedRef.current = true;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (video.currentTime >= video.duration - 0.15) {
      video.pause();
      setVideoCompleted(true);
      videoCompletedRef.current = true;
    }
  };

  const handleVideoError = () => {
    setHasError(true);
    setVideoCompleted(true);
    videoCompletedRef.current = true;
  };

  const isFixed = !videoCompleted && !isReducedMotion;

  return (
    <section
      ref={scrollTrackRef}
      className="hero-scroll-container relative w-full bg-[#080909]"
      style={{ height: isReducedMotion ? "auto" : "320vh" }}
    >
      {/* HERO CONTAINER CARD (Fixed overlay while video plays, switches to sticky once complete) */}
      <div
        className={`${
          isFixed
            ? "fixed top-0 left-0 w-full h-screen z-30"
            : "sticky top-0 w-full h-screen z-10"
        } flex flex-col items-center justify-center p-4 pt-20 md:p-8 md:pt-24 lg:p-12 lg:pt-24 transition-all duration-300`}
      >
        <div className="relative w-full max-w-[1500px] h-[78vh] md:h-[82vh] rounded-2xl md:rounded-[28px] overflow-hidden border border-white/15 bg-[#0e110e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            playsInline
            preload="metadata"
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            onError={handleVideoError}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              hasError ? "opacity-0" : "opacity-100"
            }`}
          />

          {(hasError || !src) && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${poster})` }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#080909] via-black/40 to-black/50 pointer-events-none" />

          <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-12 lg:p-16 pointer-events-none">
            <div className="pointer-events-auto flex items-center justify-between">
              <span className="inline-block text-[10.5px] md:text-xs uppercase tracking-[0.3em] text-[#D6A85C] font-semibold py-1.5 px-3.5 rounded-full border border-[#D6A85C]/35 bg-black/60 backdrop-blur-md shadow-md">
                {eyebrow}
              </span>

              <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-[#F2F0E8] shadow-md">
                {videoCompleted ? (
                  <>
                    <Unlock className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">HERO UNLOCKED • CONTINUE SCROLLING</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#D6A85C]" />
                    <span>SCROLL TO PLAY VIDEO ({Math.round(videoProgress * 100)}%)</span>
                  </>
                )}
              </div>
            </div>

            <div className="max-w-3xl space-y-5 md:space-y-6 pointer-events-auto">
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#F2F0E8] whitespace-pre-line drop-shadow-xl">
                {title}
              </h1>

              <p className="text-xs sm:text-base md:text-lg text-[#F2F0E8]/90 font-light max-w-xl leading-relaxed font-sans drop-shadow-md">
                {description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 md:gap-6">
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

            <div
              className={`flex items-center justify-between text-xs tracking-[0.25em] text-[#F2F0E8]/70 uppercase pt-2 pointer-events-auto transition-opacity duration-500 ${
                videoProgress >= 0.98 && videoCompleted ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="hidden md:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D6A85C] animate-pulse" />
                <span className="font-semibold text-[11px] tracking-[0.25em] text-[#D6A85C]">
                  {videoCompleted ? "VIDEO COMPLETE" : "SCROLL TO PLAY VIDEO"}
                </span>
              </div>

              <a
                href="#founders"
                className="flex items-center gap-2 text-xs hover:text-[#D6A85C] transition-colors group/scroll"
              >
                <span className="tracking-[0.2em]">
                  {videoCompleted ? "SCROLL TO EXPEDITION LEADERS ↓" : "SCROLLING PLAYS VIDEO"}
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
