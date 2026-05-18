import { Hero, Section, Card } from './components';
import Link from 'next/link';

export default function Home() {
  const services = [
    {
      icon: '🏠',
      title: 'Acquisition Immobilière',
      description: 'Accompagnement complet pour l\'acquisition de biens immobiliers. Conseil, négociation et suivi du projet.',
    },
    {
      icon: '💰',
      title: 'Valorisation & Revente',
      description: 'Maximisez la valeur de vos biens avec nos stratégies éprouvées de rénovation et de mise en marché.',
    },
    {
      icon: '📋',
      title: 'Cession Immobilière',
      description: 'Vente sécurisée et transparente de votre patrimoine. Négociation au meilleur prix.',
    },
    {
      icon: '🎯',
      title: 'Conseil Patrimonial',
      description: 'Stratégie personnalisée pour optimiser votre portefeuille immobilier et votre patrimoine.',
      highlighted: true,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Investissement Immobilier"
        subtitle="Spécialistes en acquisition, valorisation et cession. Nous accompagnons votre succès immobilier à La Rochelle et Littoral Atlantique."
        cta={{ text: 'Découvrir nos services', href: '/services' }}
      />

      {/* Services Section */}
      <Section
        title="Nos Services"
        subtitle="Une expertise complète pour tous vos projets immobiliers"
        background="white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              highlighted={service.highlighted}
            />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section
        title="Prêt à collaborer ?"
        subtitle="Parlons de votre projet immobilier. Notre équipe est à votre écoute pour créer une stratégie adaptée à vos objectifs."
        background="gray"
        centered
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#d4af37] text-gray-900 font-semibold text-lg hover:bg-white hover:text-gray-900 transition duration-300 text-center"
          >
            Demander une consultation
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 border-2 border-[#d4af37] text-[#d4af37] font-semibold text-lg hover:bg-[#d4af37] hover:text-gray-900 transition duration-300 text-center"
          >
            En savoir plus sur nous
          </Link>
        </div>
      </Section>
    </>
  );
}
