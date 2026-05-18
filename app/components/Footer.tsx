import Link from 'next/link';

export default function Footer() {
  const keywords = [
    'La Rochelle et alentours',
    'Littoral Atlantique',
    'Acquisition immobilière',
    'Revente & Achat-Revente',
    'Valorisation immobilière',
    'Cession immobilière',
    'Conseil immobilier',
    'Accompagnement investisseurs',
    'Arbitrage patrimonial',
    'Réorganisation de biens',
    'Découpe de parcelles',
    'Montage financier',
    'Investissement immobilier',
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-serif font-bold text-[#d4af37] mb-4">DEKA</h3>
            <p className="text-gray-400 mb-4">
              Spécialistes en investissement immobilier et conseil patrimonial.
            </p>
            <p className="text-gray-400 text-sm">
              La Rochelle & Littoral Atlantique
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-[#d4af37] transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#d4af37] transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#d4af37] transition">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#d4af37] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="mailto:contact@deka-partners.com" className="hover:text-[#d4af37] transition">
                  contact@deka-partners.com
                </a>
              </li>
              <li className="text-sm">
                <span className="font-semibold text-gray-300">Rudy Mezoughi</span>
                <br />
                <a href="tel:+33630135189" className="hover:text-[#d4af37] transition">
                  +33 6 30 13 51 89
                </a>
              </li>
              <li className="text-sm">
                <span className="font-semibold text-gray-300">Alexandre Dupuy</span>
                <br />
                <a href="tel:+33661415139" className="hover:text-[#d4af37] transition">
                  +33 6 61 41 51 39
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-semibold text-white mb-4">Zones</h4>
            <ul className="space-y-2 text-gray-400">
              <li>La Rochelle</li>
              <li>Littoral Atlantique</li>
              <li>Charente-Maritime</li>
              <li>Et alentours</li>
            </ul>
          </div>
        </div>

        {/* Keywords */}
        <div className="border-t border-gray-700 pt-8">
          <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
            Expertise
          </h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full hover:bg-[#d4af37] hover:text-gray-900 transition cursor-default"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DEKA Partners. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-[#d4af37] transition">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-[#d4af37] transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
