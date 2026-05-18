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
        <div className="p-4 bg-[#00F0FF]/20 border border-[#00F0FF] text-[#00F0FF] rounded-lg animate-fade-in">
          ✓ Merci ! Nous vous répondrons au plus vite.
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-bold text-white mb-3">
          Nom Complet
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 bg-[#1a1f3a]/50 border border-[#7B2FFF]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#7B2FFF] focus:ring-2 focus:ring-[#7B2FFF]/50 transition"
          placeholder="Votre nom"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-white mb-3">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 bg-[#1a1f3a]/50 border border-[#7B2FFF]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#7B2FFF] focus:ring-2 focus:ring-[#7B2FFF]/50 transition"
          placeholder="votre.email@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-bold text-white mb-3">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-5 py-3 bg-[#1a1f3a]/50 border border-[#7B2FFF]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#7B2FFF] focus:ring-2 focus:ring-[#7B2FFF]/50 transition"
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-white mb-3">
          Sujet
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 bg-[#1a1f3a]/50 border border-[#7B2FFF]/30 rounded-lg text-white focus:outline-none focus:border-[#7B2FFF] focus:ring-2 focus:ring-[#7B2FFF]/50 transition"
        >
          <option value="" className="bg-[#0A0E27]">Sélectionnez un sujet</option>
          <option value="acquisition" className="bg-[#0A0E27]">Acquisition immobilière</option>
          <option value="valorisation" className="bg-[#0A0E27]">Valorisation immobilière</option>
          <option value="cession" className="bg-[#0A0E27]">Cession immobilière</option>
          <option value="conseil" className="bg-[#0A0E27]">Conseil patrimonial</option>
          <option value="autre" className="bg-[#0A0E27]">Autre</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-white mb-3">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-5 py-3 bg-[#1a1f3a]/50 border border-[#7B2FFF]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#7B2FFF] focus:ring-2 focus:ring-[#7B2FFF]/50 transition resize-none"
          placeholder="Décrivez votre projet ou vos questions..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-[#7B2FFF] text-white font-bold text-lg btn-neon-purple hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>

      {/* Contact Info */}
      <div className="pt-8 border-t border-[#7B2FFF]/20">
        <p className="text-sm text-gray-400 text-center mb-6">
          Ou contactez-nous directement :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#1a1f3a]/30 border border-[#7B2FFF]/20 rounded-lg">
            <p className="font-bold text-white mb-2">Rudy Mezoughi</p>
            <a href="tel:+33630135189" className="text-[#00F0FF] hover:text-[#d4af37] transition">
              +33 6 30 13 51 89
            </a>
          </div>
          <div className="p-4 bg-[#1a1f3a]/30 border border-[#7B2FFF]/20 rounded-lg">
            <p className="font-bold text-white mb-2">Alexandre Dupuy</p>
            <a href="tel:+33661415139" className="text-[#00F0FF] hover:text-[#d4af37] transition">
              +33 6 61 41 51 39
            </a>
          </div>
        </div>
        <div className="mt-4 text-center">
          <a href="mailto:contact@deka-partners.com" className="text-[#00F0FF] hover:text-[#d4af37] transition font-medium">
            contact@deka-partners.com
          </a>
        </div>
      </div>
    </form>
  );
}
