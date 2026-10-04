import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA WILDLIFE | Intimate Wildlife Photography & Safari Journeys",
  description:
    "Luxury wildlife photography safaris across Africa. Travel deeper into the wild, photograph extraordinary moments, and experience nature through the eyes of professional photographers.",
  keywords: [
    "wildlife photography",
    "luxury safari",
    "photo safaris",
    "Masai Mara safari",
    "Serengeti expedition",
    "Africa photography tour",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth h-full antialiased selection:bg-[#C2A676] selection:text-[#080909]`}
    >
      <body className="min-h-full flex flex-col bg-[#080909] text-[#F2F0E8] font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
