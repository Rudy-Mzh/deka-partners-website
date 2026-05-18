import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle?: string;
  cta?: {
    text: string;
    href: string;
  };
  image?: string;
}

export default function Hero({ title, subtitle, cta, image }: HeroProps) {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        {/* Accent */}
        <div className="mb-8 inline-block">
          <div className="px-4 py-2 border border-[#d4af37] text-[#d4af37] text-sm font-semibold rounded-full">
            Investissement Immobilier & Conseil
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight text-gray-900">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* CTA Buttons */}
        {cta && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href={cta.href}
              className="px-8 py-4 bg-[#d4af37] text-gray-900 font-semibold text-lg rounded-lg hover:bg-gray-900 hover:text-[#d4af37] transition shadow-lg hover:shadow-xl"
            >
              {cta.text}
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold text-lg rounded-lg hover:bg-gray-900 hover:text-white transition"
            >
              En savoir plus
            </Link>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
