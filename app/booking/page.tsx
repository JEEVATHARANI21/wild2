"use client";

import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#080909] text-[#F2F0E8]">
      <Navbar />
      <div className="pt-24">
        <BookingForm />
      </div>
      <Footer />
    </main>
  );
}
