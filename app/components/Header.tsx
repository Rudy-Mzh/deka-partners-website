'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-[#0A0E27]/80 backdrop-blur-xl z-50 border-b border-[#7B2FFF]/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo - Neon Glow */}
        <Link
          href="/"
          className="text-3xl font-display font-bold neon-glow-purple hover:neon-glow-cyan transition duration-300"
        >
          DEKA
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <Link href="/" className="text-white/80 hover:text-[#00F0FF] font-medium transition duration-300">
            Accueil
          </Link>
          <Link href="/services" className="text-white/80 hover:text-[#00F0FF] font-medium transition duration-300">
            Services
          </Link>
          <Link href="/about" className="text-white/80 hover:text-[#00F0FF] font-medium transition duration-300">
            À propos
          </Link>
          <button className="px-8 py-3 bg-[#7B2FFF] text-white font-bold rounded-lg btn-neon-purple hover:scale-105">
            <Link href="/contact">Contact</Link>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-white hover:text-[#00F0FF] transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0E27] border-t border-[#7B2FFF]/20 animate-slide-down">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" className="block text-white/80 hover:text-[#00F0FF] transition py-3 border-b border-[#7B2FFF]/10">
              Accueil
            </Link>
            <Link href="/services" className="block text-white/80 hover:text-[#00F0FF] transition py-3 border-b border-[#7B2FFF]/10">
              Services
            </Link>
            <Link href="/about" className="block text-white/80 hover:text-[#00F0FF] transition py-3 border-b border-[#7B2FFF]/10">
              À propos
            </Link>
            <Link
              href="/contact"
              className="block w-full text-center px-6 py-3 bg-[#7B2FFF] text-white font-bold rounded-lg btn-neon-purple"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
