interface CardProps {
  icon?: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

export default function Card({ icon, title, description, highlighted = false }: CardProps) {
  return (
    <div
      className={`group relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
        highlighted
          ? 'bg-gradient-to-br from-[#7B2FFF]/30 to-[#00F0FF]/10 border-2 border-[#7B2FFF] shadow-xl'
          : 'bg-[#1a1f3a]/50 border border-[#7B2FFF]/20 hover:border-[#7B2FFF]/50 backdrop-blur-sm'
      }`}
    >
      {/* Neon Glow Background */}
      {highlighted && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B2FFF]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}

      <div className="relative z-10">
        {/* Icon */}
        {icon && (
          <div className={`text-5xl mb-6 transition-transform duration-300 group-hover:scale-125 ${
            highlighted ? 'neon-glow-purple' : 'group-hover:neon-glow-cyan'
          }`}>
            {icon}
          </div>
        )}

        {/* Title */}
        <h3 className={`text-2xl font-bold mb-4 ${
          highlighted ? 'text-white' : 'text-white group-hover:text-[#00F0FF] transition-colors'
        }`}>
          {title}
        </h3>

        {/* Description */}
        <p className={`leading-relaxed text-base ${
          highlighted ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300 transition-colors'
        }`}>
          {description}
        </p>

        {/* Bottom Accent Line */}
        <div className={`mt-6 h-1 w-0 ${
          highlighted ? 'bg-[#00F0FF]' : 'bg-[#7B2FFF]'
        } group-hover:w-12 transition-all duration-300`}></div>
      </div>

      {/* Corner Accent */}
      {highlighted && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B2FFF]/5 rounded-full blur-3xl group-hover:bg-[#7B2FFF]/10 transition-all duration-300"></div>
      )}
    </div>
  );
}
