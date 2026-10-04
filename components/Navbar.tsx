"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onBookClick?: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Journeys", href: "#journeys" },
    { label: "Safaris", href: "#safaris" },
    { label: "Photography", href: "#photography" },
    { label: "Founders", href: "#founders" },
  ];

  const rightLinks = [
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#booking" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080909]/92 backdrop-blur-md py-3 border-b border-white/10 shadow-2xl"
          : "bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Official VM Wild Expeditions Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <img
            src="/logo-clean.png"
            alt="VM Wild Expeditions Logo"
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback if image load fails
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="flex flex-col">
            <span className="text-white tracking-[0.2em] uppercase font-serif text-base md:text-lg font-medium leading-none">
              VM WILD
            </span>
            <span className="text-[#C2A676] font-light text-[10px] tracking-[0.3em] font-sans pt-0.5">
              EXPEDITIONS
            </span>
          </div>
        </Link>

        {/* Center / Main Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#F2F0E8]/85">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-[#C2A676] transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C2A676] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Navigation & CTA */}
        <div className="hidden lg:flex items-center gap-8">
          {rightLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-medium text-[#F2F0E8]/85 hover:text-[#C2A676] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          <a
            href="#booking"
            onClick={(e) => {
              if (onBookClick) {
                e.preventDefault();
                onBookClick();
              }
            }}
            className="px-5 py-2.5 rounded-full border border-[#C2A676]/60 bg-[#C2A676]/10 text-[#F2F0E8] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C2A676] hover:text-[#080909] transition-all duration-300 shadow-sm hover:shadow-[#C2A676]/20"
          >
            Book Expedition
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#F2F0E8] hover:text-[#C2A676] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-[#080909]/98 backdrop-blur-xl z-40 flex flex-col px-8 py-10 border-t border-white/10 animate-fadeIn">
          <div className="flex flex-col gap-6 text-sm uppercase tracking-[0.25em] font-medium">
            {[...navLinks, ...rightLinks].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#F2F0E8]/90 hover:text-[#C2A676] py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#booking"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onBookClick) onBookClick();
              }}
              className="mt-6 w-full text-center py-4 rounded-full border border-[#C2A676] bg-[#C2A676] text-[#080909] font-medium uppercase tracking-[0.2em] text-xs"
            >
              Book Expedition
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
