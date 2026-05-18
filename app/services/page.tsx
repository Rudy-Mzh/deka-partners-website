import { Hero, Section, Card } from '../components';

export default function ServicesPage() {
  const mainServices = [
    {
      icon: '🔍',
      title: 'Acquisition Immobilière',
      description: 'Recherche stratégique, analyse financière, négociation et accompagnement complet dans l\'acquisition de biens immobiliers résidentiels et commerciaux.',
    },
    {
      icon: '🔧',
      title: 'Valorisation & Réorganisation',
      description: 'Optimisation des biens par rénovation, reconfiguration, subdivision ou découpe avec géomètre. Maximisez la valeur avant la revente.',
    },
    {
      icon: '💱',
      title: 'Achat-Revente Stratégique',
      description: 'Identification d\'opportunités, achat optimisé, valorisation et cession au meilleur prix. Accompagnement sur toute la chaîne.',
    },
    {
      icon: '📊',
      title: 'Montage Financier',
      description: 'Structuration financière, rendement de participation, arbitrage fiscal. Optimisez vos investissements.',
    },
    {
      icon: '🏦',
      title: 'Cession Immobilière',
      description: 'Vente sécurisée et transparente. Stratégie de mise en marché, négociation et finalisation.',
    },
    {
      icon: '💼',
      title: 'Conseil Patrimonial',
      description: 'Stratégie globale d\'investissement immobilier. Arbitrage patrimonial et gestion locative pour optimiser votre patrimoine.',
    },
  ];

  const expertise = [
    'Littoral Atlantique & La Rochelle',
    'Achat-Revente',
    'Gestion Administrative Complète',
    'Réorganisation de Biens',
    'Arbitrage Patrimonial',
    'Découpe avec Géomètre',
    'Montage Financier',
    'Rendement de Participation',
    'Acquisition',
    'Valorisation',
    'Cession',
  ];

  return (
    <>
      {/* Hero */}
      <Hero
        title="Nos Services"
        subtitle="Une gamme complète de services pour vos projets immobiliers, de l'acquisition à la cession."
      />

      {/* Services Grid */}
      <Section
        title="Services Détaillés"
        subtitle="Accompagnement professionnel et transparent"
        background="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainServices.map((service, index) => (
            <Card
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Section>

      {/* Expertise Areas */}
      <Section
        title="Nos Domaines d'Expertise"
        background="gradient"
        centered
      >
        <div className="flex flex-wrap justify-center gap-3">
          {expertise.map((area) => (
            <span
              key={area}
              className="px-6 py-3 bg-white border border-[#d4af37] text-gray-900 font-medium rounded-full hover:bg-[#d4af37] transition duration-300"
            >
              {area}
            </span>
          ))}
        </div>
      </Section>

      {/* Process Section */}
      <Section
        title="Notre Processus"
        subtitle="Transparent, professionnel, efficace"
        background="dark"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Audit', description: 'Analyse complète de votre projet et vos objectifs' },
            { step: '02', title: 'Stratégie', description: 'Plan d\'action personnalisé et adapté' },
            { step: '03', title: 'Mise en Œuvre', description: 'Accompagnement étape par étape' },
            { step: '04', title: 'Résultats', description: 'Succès et satisfaction garantie' },
          ].map((item, index) => (
            <div key={index} className="text-center p-6">
              <div className="text-5xl font-serif font-bold text-[#d4af37] mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section
        title="Vous avez un projet ?"
        subtitle="Contactez-nous pour une consultation gratuite et sans engagement."
        background="dark"
        centered
      >
        <div className="mt-8">
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-[#d4af37] text-gray-900 font-semibold text-lg hover:bg-white transition duration-300"
          >
            Nous Contacter
          </a>
        </div>
      </Section>
    </>
  );
}
