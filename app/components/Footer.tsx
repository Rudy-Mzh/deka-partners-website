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
    <footer className="relative bg-[#050810] border-t border-[#7B2FFF]/20">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7B2FFF]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="col-span-1">
              <h3 className="text-3xl font-display font-black text-[#7B2FFF] neon-glow-purple mb-4">
                DEKA
              </h3>
              <p className="text-gray-400 mb-4">
                Spécialistes en investissement immobilier et conseil patrimonial.
              </p>
              <p className="text-gray-500 text-sm">
                La Rochelle & Littoral Atlantique
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Navigation</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-[#00F0FF] transition">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-[#00F0FF] transition">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#00F0FF] transition">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#00F0FF] transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="mailto:contact@deka-partners.com" className="hover:text-[#00F0FF] transition">
                    contact@deka-partners.com
                  </a>
                </li>
                <li className="text-sm">
                  <span className="font-semibold text-gray-300">Rudy</span>
                  <br />
                  <a href="tel:+33630135189" className="hover:text-[#00F0FF] transition">
                    +33 6 30 13 51 89
                  </a>
                </li>
                <li className="text-sm">
                  <span className="font-semibold text-gray-300">Alexandre</span>
                  <br />
                  <a href="tel:+33661415139" className="hover:text-[#00F0FF] transition">
                    +33 6 61 41 51 39
                  </a>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Zones</h4>
              <ul className="space-y-2 text-gray-400">
                <li>La Rochelle</li>
                <li>Littoral Atlantique</li>
                <li>Charente-Maritime</li>
                <li>Et alentours</li>
              </ul>
            </div>
          </div>

          {/* Keywords Section */}
          <div className="border-t border-[#7B2FFF]/20 pt-12">
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-widest">
              Expertise
            </h4>
            <div className="flex flex-wrap gap-3">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="text-xs bg-[#7B2FFF]/10 text-[#00F0FF] px-4 py-2 rounded-full border border-[#7B2FFF]/30 hover:bg-[#7B2FFF]/20 hover:border-[#7B2FFF]/50 transition cursor-default"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#7B2FFF]/20 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} DEKA Partners. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-[#00F0FF] transition text-sm">
                LinkedIn
              </a>
              <a href="mailto:contact@deka-partners.com" className="text-gray-500 hover:text-[#00F0FF] transition text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
