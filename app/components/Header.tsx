'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif font-bold text-gray-900 hover:text-[#d4af37] transition">
          DEKA
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-[#d4af37] transition">
            Accueil
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-[#d4af37] transition">
            Services
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[#d4af37] transition">
            À propos
          </Link>
          <Link href="/contact" className="px-6 py-2 bg-[#d4af37] text-gray-900 font-semibold hover:bg-gray-900 hover:text-[#d4af37] transition">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block text-gray-700 hover:text-[#d4af37] transition py-2">
              Accueil
            </Link>
            <Link href="/services" className="block text-gray-700 hover:text-[#d4af37] transition py-2">
              Services
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-[#d4af37] transition py-2">
              À propos
            </Link>
            <Link href="/contact" className="block w-full text-center px-6 py-2 bg-[#d4af37] text-gray-900 font-semibold hover:bg-gray-900 hover:text-[#d4af37] transition">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
