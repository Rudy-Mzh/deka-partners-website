'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo - Elegant */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition">
          <div className="w-10 h-10 bg-[#d4af37] rounded-sm flex items-center justify-center">
            <span className="text-gray-900 font-serif font-bold text-lg">D</span>
          </div>
          <span className="text-2xl font-serif font-bold text-gray-900 hidden sm:inline">DEKA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <Link href="/" className="text-gray-700 hover:text-[#d4af37] font-medium transition">
            Accueil
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-[#d4af37] font-medium transition">
            Services
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[#d4af37] font-medium transition">
            À propos
          </Link>
          <Link href="/contact" className="px-6 py-2 bg-[#d4af37] text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-[#d4af37] transition">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-[#d4af37] transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-down">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-[#d4af37] font-medium py-3 border-b border-gray-100">
              Accueil
            </Link>
            <Link href="/services" className="block text-gray-700 hover:text-[#d4af37] font-medium py-3 border-b border-gray-100">
              Services
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-[#d4af37] font-medium py-3 border-b border-gray-100">
              À propos
            </Link>
            <Link href="/contact" className="block w-full text-center px-6 py-3 bg-[#d4af37] text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-[#d4af37] transition">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
