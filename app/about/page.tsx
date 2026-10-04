"use client";

import Navbar from "@/components/Navbar";
import IntroSection from "@/components/IntroSection";
import FounderSection from "@/components/FounderSection";
import Conservation from "@/components/Conservation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080909] text-[#F2F0E8]">
      <Navbar />
      <div className="pt-24 space-y-12">
        <IntroSection />
        <FounderSection />
        <Conservation />
      </div>
      <Footer />
    </main>
  );
}
