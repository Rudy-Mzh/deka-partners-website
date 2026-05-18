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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2FFF]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27]"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 z-0" style={{
        backgroundImage: 'linear-gradient(rgba(123, 47, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 47, 255, 0.5) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }}></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in py-20">
        {/* Logo Accent */}
        <div className="mb-12 inline-flex">
          <div className="px-6 py-3 bg-gradient-to-r from-[#7B2FFF]/20 to-[#00F0FF]/20 border border-[#7B2FFF]/50 rounded-full backdrop-blur-sm">
            <span className="text-sm font-bold neon-glow-cyan">DEKA Partners</span>
          </div>
        </div>

        {/* Title - Epic Gradient */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-black mb-8 leading-tight animate-slide-up">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {subtitle}
          </p>
        )}

        {/* CTA Buttons */}
        {cta && (
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href={cta.href}
              className="px-10 py-4 bg-[#7B2FFF] text-white font-bold text-lg rounded-lg btn-neon-purple btn-pulse hover:scale-105 transition-transform"
            >
              {cta.text}
            </Link>
            <Link
              href="/about"
              className="px-10 py-4 border-2 border-[#00F0FF] text-[#00F0FF] font-bold text-lg rounded-lg hover:bg-[#00F0FF]/10 transition-all"
            >
              En savoir plus
            </Link>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ animationDuration: '2.5s' }}>
          <svg
            className="w-8 h-8 text-[#00F0FF] animate-glow"
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
