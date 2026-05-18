interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  background?: 'dark' | 'gradient' | 'card';
  centered?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  background = 'dark',
  centered = false,
}: SectionProps) {
  const bgColor = {
    dark: 'bg-[#0A0E27]',
    gradient: 'bg-gradient-to-b from-[#1a1f3a] via-[#0A0E27] to-[#050810]',
    card: 'bg-[#1a1f3a]/30 backdrop-blur-sm border-t border-[#7B2FFF]/10',
  };

  return (
    <section id={id} className={`relative py-24 md:py-32 ${bgColor[background]} overflow-hidden`}>
      {/* Animated Background Elements */}
      {background === 'gradient' && (
        <>
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#7B2FFF]/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl opacity-30"></div>
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-20 ${centered ? 'text-center' : ''}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg md:text-xl text-gray-300 ${
              centered ? 'max-w-3xl mx-auto' : ''
            }`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        {children}
      </div>
    </section>
  );
}
