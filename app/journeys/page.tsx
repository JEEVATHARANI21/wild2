"use client";

import Navbar from "@/components/Navbar";
import FeaturedJourneys from "@/components/FeaturedJourneys";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function JourneysPage() {
  const router = useRouter();

  const handleSelectJourney = (destinationTitle: string) => {
    router.push(`/#booking`);
  };

  return (
    <main className="min-h-screen bg-[#080909] text-[#F2F0E8]">
      <Navbar />
      <div className="pt-24">
        <FeaturedJourneys onSelectJourneyBooking={handleSelectJourney} />
      </div>
      <Footer />
    </main>
  );
}
