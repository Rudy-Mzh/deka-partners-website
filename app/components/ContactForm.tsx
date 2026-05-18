'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulated form submission
      // In production, you would send to an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 animate-slide-up">
      {/* Success Message */}
      {submitted && (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg border border-green-300">
          ✓ Merci ! Nous vous répondrons au plus vite.
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
          Nom Complet
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition"
          placeholder="Votre nom"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition"
          placeholder="votre.email@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition"
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
          Sujet
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="acquisition">Acquisition immobilière</option>
          <option value="valorisation">Valorisation immobilière</option>
          <option value="cession">Cession immobilière</option>
          <option value="conseil">Conseil patrimonial</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition resize-none"
          placeholder="Décrivez votre projet ou vos questions..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-[#d4af37] text-gray-900 font-semibold text-lg hover:bg-gray-900 hover:text-[#d4af37] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>

      {/* Contact Info */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center mb-4">
          Ou contactez-nous directement :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div>
            <p className="font-semibold text-gray-900">Rudy Mezoughi</p>
            <a href="tel:+33630135189" className="text-[#d4af37] hover:text-gray-900 transition">
              +33 6 30 13 51 89
            </a>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Alexandre Dupuy</p>
            <a href="tel:+33661415139" className="text-[#d4af37] hover:text-gray-900 transition">
              +33 6 61 41 51 39
            </a>
          </div>
        </div>
        <div className="mt-4 text-center">
          <a href="mailto:contact@deka-partners.com" className="text-[#d4af37] hover:text-gray-900 transition">
            contact@deka-partners.com
          </a>
        </div>
      </div>
    </form>
  );
}
