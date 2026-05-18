import { Hero, Section, ContactForm } from '../components';

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        title="Contactez-Nous"
        subtitle="Parlons de votre projet. Notre équipe est à votre disposition pour répondre à vos questions."
      />

      {/* Contact Section */}
      <Section
        title="Nous Écouter"
        subtitle="Remplissez le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais"
        background="gray"
      >
        <ContactForm />
      </Section>

      {/* Contact Info */}
      <Section
        title="Coordonnées"
        subtitle="Plusieurs façons de nous joindre"
        background="white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email */}
          <div className="text-center p-6">
            <div className="text-4xl mb-4">✉️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Email</h3>
            <a
              href="mailto:contact@deka-partners.com"
              className="text-[#d4af37] hover:text-gray-900 transition font-semibold"
            >
              contact@deka-partners.com
            </a>
            <p className="text-gray-600 text-sm mt-2">
              Pour toute demande générale
            </p>
          </div>

          {/* Rudy */}
          <div className="text-center p-6">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Rudy Mezoughi</h3>
            <a
              href="tel:+33630135189"
              className="text-[#d4af37] hover:text-gray-900 transition font-semibold block mb-2"
            >
              +33 6 30 13 51 89
            </a>
            <a
              href="mailto:rudy.m@deka-partners.com"
              className="text-[#d4af37] hover:text-gray-900 transition text-sm"
            >
              rudy.m@deka-partners.com
            </a>
          </div>

          {/* Alexandre */}
          <div className="text-center p-6">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Alexandre Dupuy</h3>
            <a
              href="tel:+33661415139"
              className="text-[#d4af37] hover:text-gray-900 transition font-semibold block mb-2"
            >
              +33 6 61 41 51 39
            </a>
            <a
              href="mailto:alexandre.d@deka-partners.com"
              className="text-[#d4af37] hover:text-gray-900 transition text-sm"
            >
              alexandre.d@deka-partners.com
            </a>
          </div>
        </div>
      </Section>

      {/* Zones Couvertes */}
      <Section
        title="Zones Couvertes"
        subtitle="Nous accompagnons les investisseurs sur le Littoral Atlantique"
        background="gray"
        centered
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            'La Rochelle',
            'Littoral Atlantique',
            'Charente-Maritime',
            'Îles d\'Aix',
            'Île de Ré',
            'Île d\'Oléron',
          ].map((zone) => (
            <div
              key={zone}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-center font-semibold text-gray-900"
            >
              {zone}
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-center mt-8">
          Et bien sûr, les terres adjacentes pour vos projets immobiliers
        </p>
      </Section>
    </>
  );
}
