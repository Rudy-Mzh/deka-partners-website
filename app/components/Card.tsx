interface CardProps {
  icon?: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

export default function Card({ icon, title, description, highlighted = false }: CardProps) {
  return (
    <div
      className={`p-8 rounded-lg transition-all duration-300 hover:shadow-xl ${
        highlighted
          ? 'bg-[#d4af37] text-gray-900 transform hover:scale-105'
          : 'bg-gray-50 text-gray-900 border border-gray-100 hover:border-[#d4af37]'
      }`}
    >
      {icon && (
        <div className={`text-4xl mb-4 ${highlighted ? 'text-gray-900' : 'text-[#d4af37]'}`}>
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className={`leading-relaxed ${highlighted ? 'text-gray-800' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );
}
