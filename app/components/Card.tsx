interface CardProps {
  icon?: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

export default function Card({ icon, title, description, highlighted = false }: CardProps) {
  return (
    <div
      className={`group p-8 rounded-xl transition-all duration-300 card-hover ${
        highlighted
          ? 'bg-[#d4af37] text-gray-900 shadow-lg'
          : 'bg-gray-50 text-gray-900 border border-gray-100 hover:bg-white'
      }`}
    >
      {/* Icon */}
      {icon && (
        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className={`text-xl font-serif font-bold mb-4 ${
        highlighted ? 'text-gray-900' : 'text-gray-900'
      }`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`leading-relaxed text-base ${
        highlighted ? 'text-gray-800' : 'text-gray-600'
      }`}>
        {description}
      </p>

      {/* Bottom Accent */}
      {!highlighted && (
        <div className="mt-6 h-0.5 w-0 bg-[#d4af37] group-hover:w-12 transition-all duration-300"></div>
      )}
    </div>
  );
}
