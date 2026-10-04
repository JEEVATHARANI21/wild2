"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ToeholdNavbar from "@/src/components/toehold/ToeholdNavbar";
import HeroVideo from "@/components/HeroVideo";
import TourCatalog from "@/src/components/toehold/TourCatalog";
import FoundersSection from "@/src/components/toehold/FoundersSection";
import Testimonials from "@/src/components/toehold/Testimonials";
import ContactFooter from "@/src/components/toehold/ContactFooter";
import SeasonCalendarModal from "@/src/components/toehold/SeasonCalendarModal";
import PlanExpeditionModal from "@/src/components/toehold/PlanExpeditionModal";
import HomeGalleryPreview from "@/src/components/toehold/HomeGalleryPreview";

import FullGalleryView from "@/src/components/views/FullGalleryView";
import ItineraryView from "@/src/components/views/ItineraryView";
import AboutView from "@/src/components/views/AboutView";
import FAQView from "@/src/components/views/FAQView";

import CustomCursor from "@/src/components/CustomCursor";
import LegalModal from "@/src/components/LegalModal";
import WhatsAppButton from "@/src/components/WhatsAppButton";

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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    } as any);
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
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
          {/* 1. HEROIC SCROLL-LOCKED HERO VIDEO WITH HORNBILL FLIGHT */}
          <HeroVideo
            src="/videos/hornbill.mp4"
            poster="https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?auto=format&fit=crop&w=1920&q=85"
            eyebrow="THE PINNACLE OF WILDLIFE PHOTOGRAPHY"
            title={"Bespoke Photographic\nExpeditions"}
            description="Masterclass field tracking, intimate vehicular limits (max 4 per Gypsy), and deep animal behavior anticipation with expedition mentors across India & Africa’s wildest national parks."
            primaryCtaText="TALK TO EXPERT"
            secondaryCtaText="EXPLORE TOURS"
            onPrimaryCtaClick={() => setPlanTripModalOpen(true)}
          />

          {/* 2. Founder Section from D:\wildlife */}
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
