interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  background?: 'white' | 'gray' | 'dark';
  centered?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  background = 'white',
  centered = false,
}: SectionProps) {
  const bgColor = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
  };

  return (
    <section id={id} className={`py-20 md:py-32 ${bgColor[background]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
          <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-4 ${
            background === 'dark' ? 'text-[#d4af37]' : 'text-gray-900'
          }`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg md:text-xl ${
              background === 'dark' ? 'text-gray-300' : 'text-gray-600'
            } ${centered ? 'max-w-3xl mx-auto' : ''}`}>
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
