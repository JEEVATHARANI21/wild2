"use client";

import { useState, useRef, useEffect } from "react";
import { Maximize2, RotateCw, MapPin, Camera, Sliders, X, ChevronLeft, ChevronRight } from "lucide-react";

export interface DnaImageItem {
  id: string | number;
  title: string;
  category?: string;
  location?: string;
  src: string;
  exif?: {
    camera?: string;
    lens?: string;
    shutter?: string;
    aperture?: string;
    iso?: string;
  };
}

interface DnaCarouselProps {
  items: DnaImageItem[];
  onSelectImage?: (item: DnaImageItem) => void;
  badgeLabel?: string;
  title?: string;
  description?: string;
}

export default function DnaCarousel({
  items,
  onSelectImage,
  badgeLabel = "Personal & client use",
  title = "DNA Carousel",
  description = "Pictures wound onto two opposing strands of a helix, climbing and leaning against each other as they drift past, with the far ones blurred and colour-fringed like the edge of a lens.",
}: DnaCarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [selectedItem, setSelectedItem] = useState<DnaImageItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isDragging = useRef(false);
  const pointerStartPos = useRef({ x: 0, y: 0 });
  const startRotation = useRef(0);
  const hasDraggedFar = useRef(false);
  const autoSpinReq = useRef<number | null>(null);

  // Hydration safety flag
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-rotation loop (runs only after hydration mount)
  useEffect(() => {
    if (!isMounted || !isAutoSpin) return;

    let lastTime = performance.now();
    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      setRotation((prev) => prev + delta * 0.3); // Smooth rotation speed
      autoSpinReq.current = requestAnimationFrame(animate);
    };

    autoSpinReq.current = requestAnimationFrame(animate);

    return () => {
      if (autoSpinReq.current) cancelAnimationFrame(autoSpinReq.current);
    };
  }, [isMounted, isAutoSpin]);

  // Pointer drag to spin helix horizontally without hijacking normal page scrolling
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDraggedFar.current = false;
    pointerStartPos.current = { x: e.clientX, y: e.clientY };
    startRotation.current = rotation;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - pointerStartPos.current.x;
    const deltaY = e.clientY - pointerStartPos.current.y;
    if (Math.hypot(deltaX, deltaY) > 5) {
      hasDraggedFar.current = true;
      setIsAutoSpin(false);
      setRotation(startRotation.current + deltaX * 0.005);
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleStepLeft = () => {
    setIsAutoSpin(false);
    setRotation((prev) => prev - 0.45);
  };

  const handleStepRight = () => {
    setIsAutoSpin(false);
    setRotation((prev) => prev + 0.45);
  };

  // Split items into Strand A and Strand B
  const total = items.length;
  const strandA: { item: DnaImageItem; index: number }[] = [];
  const strandB: { item: DnaImageItem; index: number }[] = [];

  items.forEach((item, idx) => {
    if (idx % 2 === 0) {
      strandA.push({ item, index: idx });
    } else {
      strandB.push({ item, index: idx });
    }
  });

  // Calculate 3D transformation for horizontal climbing & leaning double helix ribbon
  const renderCardNode = (
    item: DnaImageItem,
    globalIdx: number,
    isStrandB: boolean
  ) => {
    // Math angle offset: Strand B is 180° (PI) opposite Strand A
    const angleStep = (2 * Math.PI) / Math.max(total, 6);
    const baseAngle = globalIdx * angleStep + (isStrandB ? Math.PI : 0);
    const angle = baseAngle + (isMounted ? rotation : 0);

    // Horizontal spread across width
    const xRadius = 380; // horizontal wave width radius
    const yRadius = 65;  // vertical climbing amplitude
    const zRadius = 260; // 3D depth amplitude (-260 back to +260 front)

    const x = Math.sin(angle) * xRadius;
    const y = Math.cos(angle * 0.8) * yRadius + (isStrandB ? 25 : -25);
    const z = Math.cos(angle) * zRadius;

    // Leaning Z and Y rotation angles ("climbing and leaning against each other")
    const rotateY = Math.sin(angle) * -22; // -22deg to +22deg face rotation
    const rotateZ = (isStrandB ? -1 : 1) * (10 + Math.sin(angle) * 8); // signature 3D leaning angle

    // Depth factor normalized (0.0 = far back, 1.0 = front)
    const depth = (z + zRadius) / (2 * zRadius);

    // Lens optical blur & chromatic aberration calculation
    const blurAmount = Math.max((1 - depth) * 7, 0); // Far ones blurred
    const opacity = 0.35 + depth * 0.65;
    const scale = 0.68 + depth * 0.38;
    const zIndex = Math.round(depth * 100);

    // Clean, deterministic formatting to prevent SSR/hydration float mismatches
    const xFixed = x.toFixed(2);
    const yFixed = y.toFixed(2);
    const zFixed = z.toFixed(2);
    const rotateYFixed = rotateY.toFixed(2);
    const rotateZFixed = rotateZ.toFixed(2);
    const scaleFixed = scale.toFixed(3);
    const opacityFixed = Number(opacity.toFixed(3));

    // Chromatic fringe CSS filter for far background cards
    const isFar = depth < 0.5;
    const fringeFilter = isFar
      ? `blur(${blurAmount.toFixed(1)}px) drop-shadow(-4px 0px 3px rgba(255, 0, 80, 0.45)) drop-shadow(4px 0px 3px rgba(0, 240, 255, 0.45))`
      : `blur(${blurAmount.toFixed(1)}px)`;

    return (
      <div
        key={`${item.id}-${isStrandB ? "B" : "A"}`}
        onClick={(e) => {
          if (hasDraggedFar.current) return;
          e.stopPropagation();
          setLightboxIndex(globalIdx);
          setSelectedItem(item);
          if (onSelectImage) onSelectImage(item);
        }}
        suppressHydrationWarning
        className="absolute top-1/2 left-1/2 cursor-pointer transition-transform duration-150 ease-out group pointer-events-auto"
        style={{
          transform: `translate3d(calc(-50% + ${xFixed}px), calc(-50% + ${yFixed}px), ${zFixed}px) rotateY(${rotateYFixed}deg) rotateZ(${rotateZFixed}deg) scale(${scaleFixed})`,
          zIndex,
          opacity: opacityFixed,
          filter: fringeFilter,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Tall Portrait Card (Matching Reference Image) */}
        <div
          className={`relative w-44 h-60 md:w-56 md:h-76 rounded-2xl overflow-hidden bg-[#111411] border transition-all duration-300 shadow-2xl ${
            depth > 0.8
              ? "border-[#D6A85C] shadow-[0_10px_30px_rgba(214,168,92,0.4)]"
              : "border-white/15 group-hover:border-[#D6A85C]"
          }`}
        >
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Vignette & Card Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3.5 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-start pointer-events-auto">
              <span className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/15 text-[9px] uppercase tracking-wider text-[#D6A85C] font-semibold backdrop-blur-md">
                {item.category || "Wild"}
              </span>

              <div className="w-7 h-7 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                <Maximize2 className="w-3.5 h-3.5 text-[#D6A85C]" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-sm md:text-base text-white font-normal truncate">
                {item.title}
              </h4>
              {item.location && (
                <div className="text-[10.5px] text-[#A7A59B] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#D6A85C]" />
                  <span className="truncate">{item.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#080908] border border-[#20251f] overflow-hidden select-none p-4 md:p-8 shadow-2xl">
      {/* Top Bar with 3D Pill Badge & Left/Right Navigation Controls */}
      <div className="flex items-center justify-between z-20 relative mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/20 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#D6A85C] animate-pulse" />
          <span className="text-xs font-bold font-sans text-white uppercase tracking-widest">
            3D
          </span>
        </div>

        {/* Controls: Prev Step, Play/Pause, Next Step */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStepLeft}
            aria-label="Rotate Helix Left"
            className="w-8 h-8 rounded-full bg-black/50 border border-white/20 hover:border-[#D6A85C] hover:text-[#D6A85C] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className={`px-3.5 py-1.5 rounded-full border text-xs font-sans flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md ${
              isAutoSpin
                ? "bg-[#D6A85C] text-[#080908] border-[#D6A85C] font-bold shadow-md"
                : "bg-black/50 text-[#A7A59B] border-white/20 hover:text-white"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isAutoSpin ? "animate-spin" : ""}`} />
            <span>{isAutoSpin ? "AUTO-SPINNING" : "PAUSED (DRAG OR CLICK)"}</span>
          </button>

          <button
            onClick={handleStepRight}
            aria-label="Rotate Helix Right"
            className="w-8 h-8 rounded-full bg-black/50 border border-white/20 hover:border-[#D6A85C] hover:text-[#D6A85C] text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Double Helix Canvas Stage (Allows smooth webpage scrolling while supporting drag move) */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-[480px] md:h-[580px] cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        {/* Warm Backdrop Glow */}
        <div className="absolute w-96 h-96 rounded-full bg-[#B87333]/10 blur-[120px] pointer-events-none" />

        {/* 3D Helix Parent Container */}
        <div
          className="relative w-full h-full transform-gpu flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Render Strand A */}
          {strandA.map(({ item, index }) => renderCardNode(item, index, false))}

          {/* Render Strand B */}
          {strandB.map(({ item, index }) => renderCardNode(item, index, true))}
        </div>
      </div>

      {/* Lightbox Modal for DNA Helix Card Clicks */}
      {lightboxIndex !== null && items[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[99999] bg-[#040504]/96 backdrop-blur-2xl flex flex-col justify-between p-4 pt-20 md:p-8 md:pt-24 animate-fadeIn select-none"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-white z-20 max-w-7xl mx-auto w-full gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3.5">
              <button
                onClick={() => setLightboxIndex(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151815] border border-[#D6A85C]/60 text-[#D6A85C] hover:bg-[#D6A85C] hover:text-[#080908] text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer flex-shrink-0"
              >
                <span>←</span>
                <span>Back to Gallery</span>
              </button>

              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D6A85C] block">
                  DNA HELIX GALLERY • {lightboxIndex + 1} OF {items.length}
                </span>
                <h3 className="font-serif text-xl md:text-3xl text-[#F2F0E8] leading-tight">{items[lightboxIndex].title}</h3>
              </div>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-3 rounded-full bg-white/10 hover:bg-[#D6A85C] hover:text-[#080908] transition-colors cursor-pointer self-end sm:self-auto"
              title="Back to Gallery (Close)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image View */}
          <div className="relative flex-1 flex items-center justify-center py-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxIndex((lightboxIndex - 1 + items.length) % items.length)}
              className="absolute left-2 md:left-6 z-20 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:border-[#D6A85C] hover:text-[#D6A85C] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={items[lightboxIndex].src}
              alt={items[lightboxIndex].title}
              className="max-w-5xl max-h-[72vh] object-contain rounded-2xl border border-white/15 shadow-2xl"
            />

            <button
              onClick={() => setLightboxIndex((lightboxIndex + 1) % items.length)}
              className="absolute right-2 md:right-6 z-20 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:border-[#D6A85C] hover:text-[#D6A85C] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* EXIF Footer Details */}
          <div className="max-w-4xl mx-auto w-full p-4 rounded-2xl bg-[#111411] border border-white/10 text-xs text-[#F2F0E8] flex flex-wrap items-center justify-between gap-4 z-20" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 text-[#D6A85C]">
              <MapPin className="w-4 h-4" />
              <span>{items[lightboxIndex].location || "India Wilderness Corridor"}</span>
            </div>

            <div className="flex items-center gap-6 text-[#A7A59B]">
              <div className="flex items-center gap-2">
                <Camera className="w-3.5 h-3.5 text-[#D6A85C]" />
                <span>{items[lightboxIndex].exif?.camera || "Nikon Z9 / Sony A1"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#D6A85C]" />
                <span>{items[lightboxIndex].exif?.lens || "400mm f/2.8 Prime"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
