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
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden mt-20">
      {/* Background */}
      {image ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        {/* Logo / Accent */}
        <div className="mb-8">
          <span className="inline-block w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center">
            <span className="text-3xl font-serif font-bold text-gray-900">D</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* CTA Button */}
        {cta && (
          <Link
            href={cta.href}
            className="inline-block px-8 py-4 bg-[#d4af37] text-gray-900 font-semibold text-lg hover:bg-gray-900 hover:text-[#d4af37] transition duration-300 transform hover:scale-105"
          >
            {cta.text}
          </Link>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-600"
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
