import { Hero, Section } from '../components';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title="À Propos"
        subtitle="Rencontrez les experts en investissement immobilier qui pilotent votre succès"
      />

      {/* About DEKA */}
      <Section
        title="DEKA Partners"
        subtitle="Spécialistes en Investissement Immobilier & Conseil Patrimonial"
        background="dark"
        centered
      >
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          DEKA Partners est une société spécialisée dans l'investissement immobilier, l'acquisition, la valorisation et la cession de biens. Fondée par deux passionnés de l'immobilier, nous mettons notre expertise au service de vos projets.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Notre approche est simple : transparence, professionnalisme et résultats. Nous accompagnons nos clients à chaque étape de leur projet immobilier, de l'étude de faisabilité à la finalisation.
        </p>
      </Section>

      {/* Team */}
      <Section
        title="L'Équipe"
        subtitle="Des experts passionnés par l'immobilier"
        background="gradient"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Rudy */}
          <div className="text-center animate-slide-up">
            <div className="mb-6 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Photo - Rudy Mezoughi</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
              Rudy Mezoughi
            </h3>
            <p className="text-[#d4af37] font-semibold mb-4">Associé Fondateur</p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Expert en acquisition et valorisation immobilière, Rudy apporte une vision stratégique et une approche pragmatique à chaque projet. Passionné par l'immobilier, il accompagne ses clients dans la construction de leur patrimoine.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:rudy.m@deka-partners.com" className="text-[#d4af37] hover:underline">
                  rudy.m@deka-partners.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Tel:</span>{' '}
                <a href="tel:+33630135189" className="text-[#d4af37] hover:underline">
                  +33 6 30 13 51 89
                </a>
              </p>
            </div>
          </div>

          {/* Alexandre */}
          <div className="text-center animate-slide-up">
            <div className="mb-6 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-lg">Photo - Alexandre Dupuy</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
              Alexandre Dupuy
            </h3>
            <p className="text-[#d4af37] font-semibold mb-4">Associé Fondateur</p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Spécialiste en montage financier et arbitrage patrimonial, Alexandre combine rigueur financière et vision immobilière pour optimiser chaque projet. Son expertise en structuration garantit les meilleures stratégies d'investissement.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:alexandre.d@deka-partners.com" className="text-[#d4af37] hover:underline">
                  alexandre.d@deka-partners.com
                </a>
              </p>
              <p>
                <span className="font-semibold">Tel:</span>{' '}
                <a href="tel:+33661415139" className="text-[#d4af37] hover:underline">
                  +33 6 61 41 51 39
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section
        title="Nos Valeurs"
        subtitle="Ce qui nous guide au quotidien"
        background="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Transparence',
              description: 'Honnêteté totale dans toutes nos communications et transactions. Vous savez toujours où vous en êtes.',
            },
            {
              title: 'Excellence',
              description: 'Nous visons la perfection dans chaque détail. Votre succès est notre réussite.',
            },
            {
              title: 'Engagement',
              description: 'Nous nous investissons pleinement dans chaque projet comme s\'il était le nôtre.',
            },
          ].map((value, index) => (
            <div key={index} className="p-8 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#d4af37] transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section
        title="Parlons de Votre Projet"
        subtitle="Contactez-nous pour une consultation gratuite"
        background="dark"
        centered
      >
        <div className="mt-8">
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-[#d4af37] text-gray-900 font-semibold text-lg hover:bg-white hover:text-gray-900 transition duration-300"
          >
            Nous Contacter
          </a>
        </div>
      </Section>
    </>
  );
}
