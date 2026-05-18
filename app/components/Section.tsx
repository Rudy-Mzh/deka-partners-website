interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  background?: 'white' | 'gray';
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
  };

  return (
    <section id={id} className={`py-20 md:py-32 ${bgColor[background]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg md:text-xl text-gray-600 ${
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
