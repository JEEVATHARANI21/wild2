"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import dynamic from "next/dynamic";

import ToeholdNavbar from "@/src/components/toehold/ToeholdNavbar";
import HeroVideo from "@/components/HeroVideo";
import TourCatalog from "@/src/components/toehold/TourCatalog";
import FoundersSection from "@/src/components/toehold/FoundersSection";
import Testimonials from "@/src/components/toehold/Testimonials";
import ContactFooter from "@/src/components/toehold/ContactFooter";
import HomeGalleryPreview from "@/src/components/toehold/HomeGalleryPreview";

import CustomCursor from "@/src/components/CustomCursor";
import WhatsAppButton from "@/src/components/WhatsAppButton";

// Code-split heavy modals and non-home views to ensure lightning-fast initial page load
const SeasonCalendarModal = dynamic(
  () => import("@/src/components/toehold/SeasonCalendarModal"),
  { ssr: false }
);
const PlanExpeditionModal = dynamic(
  () => import("@/src/components/toehold/PlanExpeditionModal"),
  { ssr: false }
);
const LegalModal = dynamic(() => import("@/src/components/LegalModal"), {
  ssr: false,
});

const FullGalleryView = dynamic(
  () => import("@/src/components/views/FullGalleryView"),
  { ssr: false }
);
const ItineraryView = dynamic(
  () => import("@/src/components/views/ItineraryView"),
  { ssr: false }
);
const AboutView = dynamic(() => import("@/src/components/views/AboutView"), {
  ssr: false,
});
const FAQView = dynamic(() => import("@/src/components/views/FAQView"), {
  ssr: false,
});

import { TOURS_DATA } from "@/src/data/photoToursData";
import { useSiteContent, SiteContentProvider } from "@/src/context/SiteContentContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function MainApp() {
  const siteCtx: any = useSiteContent();
  const content: any = siteCtx?.content || {};
  const lenisRef = useRef<Lenis | null>(null);

  const [currentView, setCurrentView] = useState("home"); // 'home' | 'gallery' | 'about' | 'itinerary' | 'faq'
  const [activeCategory, setActiveCategory] = useState("animals"); // 'animals' | 'birds'
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [planTripModalOpen, setPlanTripModalOpen] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState("terms");

  const openLegal = (tab = "terms") => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  // Smooth scroll and view switching
  const navigateTo = (view: string, targetAnchor: string | null = null) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "instant" });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    if (targetAnchor) {
      setTimeout(() => {
        const id = targetAnchor === "destinations" ? "tours" : targetAnchor;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  const handleOpenItinerary = (tour: any) => {
    setSelectedTour(tour);
    setCurrentView("itinerary");
    window.scrollTo({ top: 0, behavior: "instant" });
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // On mobile touch devices, use native 60Hz/120Hz hardware scrolling for zero touch lag
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    if (isTouch) {
      const fallbackLenis = {
        stop: () => {},
        start: () => {},
        scrollTo: (target: any) => {
          if (typeof target === "number") {
            window.scrollTo({ top: target, behavior: "smooth" });
          } else if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        },
      };
      (window as any).__lenis = fallbackLenis;
      return () => {
        delete (window as any).__lenis;
      };
    }

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
    } as any);
    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
      delete (window as any).__lenis;
    };
  }, []);

  const isAnyModalOpen = Boolean(
    calendarOpen || planTripModalOpen || legalModalOpen
  );

  useEffect(() => {
    if (!lenisRef.current) return;

    if (isAnyModalOpen) {
      lenisRef.current.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenisRef.current.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
    }
  }, [isAnyModalOpen]);

  return (
    <div className="grain min-h-screen bg-[#080908] text-[#F2F0E8] font-sans antialiased">
      <CustomCursor />

      {/* 1. Navbar from D:\wildlife */}
      <ToeholdNavbar
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenEnquire={() => setPlanTripModalOpen(true)}
      />

      {/* VIEW ROUTING FROM D:\wildlife */}
      {currentView === "gallery" && (
        <FullGalleryView
          onBackToHome={() => navigateTo("home")}
          onPlanTrip={() => setPlanTripModalOpen(true)}
        />
      )}

      {currentView === "about" && (
        <AboutView
          onBackToHome={() => navigateTo("home")}
          onPlanTrip={() => setPlanTripModalOpen(true)}
        />
      )}

      {currentView === "faq" && (
        <FAQView
          onBackToHome={() => navigateTo("home")}
          onPlanTrip={() => setPlanTripModalOpen(true)}
        />
      )}

      {currentView === "itinerary" && selectedTour && (
        <ItineraryView
          tour={selectedTour}
          onBack={() => navigateTo("home")}
          onPlanTrip={() => setPlanTripModalOpen(true)}
          openLegal={openLegal}
        />
      )}

      {currentView === "home" && (
        <main>
          {/* 1. HEROIC SCROLL-LOCKED HERO VIDEO */}
          <HeroVideo
            src="/videos/home-hero.mp4"
            poster="/images/home-hero-poster.jpg"
            eyebrow="THE PINNACLE OF WILDLIFE PHOTOGRAPHY"
            title={"Bespoke Photographic\nExpeditions"}
            description="Masterclass field tracking, intimate vehicular limits (max 4 per Gypsy), and deep animal behavior anticipation with expedition mentors across India & Africa’s wildest national parks."
            primaryCtaText="TALK TO EXPERT"
            secondaryCtaText="EXPLORE TOURS"
            onPrimaryCtaClick={() => setPlanTripModalOpen(true)}
          />

          {/* 2. Founder Section */}
          <FoundersSection
            founders={content?.founders || TOURS_DATA.founders}
            onViewFullAbout={() => navigateTo("about")}
            onPlanTrip={() => setPlanTripModalOpen(true)}
            onExploreTrips={() => {
              const el = document.getElementById("packages");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />

          {/* 3. Gallery Preview from D:\wildlife */}
          <HomeGalleryPreview
            onViewFullGallery={() => navigateTo("gallery")}
            onNavigateToGallery={() => navigateTo("gallery")}
            onPlanTrip={() => setPlanTripModalOpen(true)}
          />

          {/* 4. Tracking Package Tour Itineraries Catalog from D:\wildlife */}
          <TourCatalog
            animalTours={content?.animalTours || TOURS_DATA.animalTours}
            birdTours={content?.birdTours || TOURS_DATA.birdTours}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onSelectTour={handleOpenItinerary}
            onOpenCalendar={() => setCalendarOpen(true)}
          />

          {/* 5. Customer Reviews / Testimonials from D:\wildlife */}
          <Testimonials testimonials={TOURS_DATA.testimonials as any} />

          {/* 6. Contact Footer & Legal Links from D:\wildlife */}
          <ContactFooter
            openLegal={openLegal}
            onPlanTrip={() => setPlanTripModalOpen(true)}
          />
        </main>
      )}

      {/* 2026-2027 Season Departure Calendar Modal */}
      <SeasonCalendarModal
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        onSelectTour={handleOpenItinerary}
        animalTours={content?.animalTours || TOURS_DATA.animalTours}
        birdTours={content?.birdTours || TOURS_DATA.birdTours}
      />

      {/* Plan Your Expedition Qualification Lead Funnel Modal (Enquire) */}
      <PlanExpeditionModal
        isOpen={planTripModalOpen}
        onClose={() => setPlanTripModalOpen(false)}
        openLegal={openLegal}
      />

      {/* Terms & Privacy Policy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />

      {/* Floating WhatsApp Quick Connect */}
      <WhatsAppButton />
    </div>
  );
}

export default function Home() {
  return (
    <SiteContentProvider>
      <MainApp />
    </SiteContentProvider>
  );
}
