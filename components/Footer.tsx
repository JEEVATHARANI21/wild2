"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#080909] text-[#9A988E] pt-20 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Grid: Logo, Nav, Contact, Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Logo & Mission */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img
                src="/logo-clean.png"
                alt="VM Wild Expeditions Logo"
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-white tracking-[0.2em] uppercase font-serif text-base font-medium leading-none">
                  VM WILD
                </span>
                <span className="text-[#C2A676] font-light text-[10px] tracking-[0.3em] font-sans pt-0.5">
                  EXPEDITIONS
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#9A988E] leading-relaxed font-light">
              Beyond the Map. Into the Wild. Bespoke wildlife photography expeditions and masterclass field mentorship across India and Africa.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.25em] text-[#F2F0E8] font-medium">
              Navigation
            </div>
            <ul className="space-y-2.5 text-xs tracking-wider">
              {["Journeys", "Safaris", "Photography", "Founders", "Why Us"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-[#C2A676] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="#booking" className="hover:text-[#C2A676] transition-colors font-medium">
                  Book Expedition
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.25em] text-[#F2F0E8] font-medium">
              Field Direct
            </div>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C2A676]" />
                <a href="mailto:admissions@vmwild.com" className="hover:text-white transition-colors">
                  admissions@vmwild.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C2A676]" />
                <a href="https://wa.me/919087394546" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +91 9087394546
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C2A676]" />
                <span>India & Africa Wildlife Corridors</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Links */}
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.25em] text-[#F2F0E8] font-medium">
              Follow The Journey
            </div>
            <p className="text-xs text-[#9A988E] font-light">
              Field journals, tiger sightings, and portfolio highlights.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/vm_wild_expeditions"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#111312] border border-white/10 flex items-center gap-2 text-xs text-[#F2F0E8] hover:border-[#C2A676] hover:text-[#C2A676] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>@vm_wild_expeditions</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Line & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#9A988E]/70 uppercase tracking-widest">
          <div>© 2026 VM WILD EXPEDITIONS. All Rights Reserved.</div>
          <div>Bespoke Wildlife Photography Expeditions & Field Masterclasses</div>
        </div>

      </div>
    </footer>
  );
}
