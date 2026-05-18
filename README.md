# DEKA Partners - Site Web

🏆 **Investissement Immobilier & Conseil Patrimonial**

Site web moderne, fluide et élégant pour DEKA Partners. Spécialistes en acquisition, valorisation et cession immobilière à La Rochelle et Littoral Atlantique.

---

## 🎯 À Propos

DEKA Partners est un site web professionnel construit avec :
- **Next.js 15** - React framework moderne
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Styling moderne
- **Design System DEKA** - Charte graphique luxe (Or/Noir/Blanc)

---

## ✨ Caractéristiques

✅ **Fluide & Souple**
- Animations smooth et transitions élégantes
- Scroll behavior fluide
- Interactions agréables

✅ **Mobile-First**
- Responsive design parfait (mobile, tablet, desktop)
- Navigation mobile avec menu burger
- Formulaire de contact optimisé

✅ **Moderne & Raffiné**
- Design minimaliste luxe
- Typographie élégante (Playfair Display + Inter)
- Espace blanc généreux

✅ **Inspire Confiance**
- Design professionnel et épuré
- Informations de contact claires
- CTA (Appels à l'action) visibles et discrets

---

## 🚀 Quick Start

### Installation

```bash
# Clone le repository
git clone https://github.com/Rudy-Mzh/deka-partners-website.git
cd deka-partners-website

# Installe les dépendances
npm install
```

### Développement Local

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Structure du Projet

```
app/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # Navigation
│   ├── Footer.tsx      # Pied de page
│   ├── Hero.tsx        # Section héros
│   ├── Card.tsx        # Cartes de services
│   ├── Section.tsx     # Sections génériques
│   └── ContactForm.tsx # Formulaire de contact
├── page.tsx            # Page Accueil
├── services/           # Page Services
├── about/              # Page À propos
├── contact/            # Page Contact
├── layout.tsx          # Layout global
└── globals.css         # Styles globaux
```

---

## 🎨 Charte Graphique

**Couleurs Principales** :
- 🟡 Or/Gold : `#d4af37`
- ⚫ Noir/Dark : `#1a1a1a`
- ⚪ Blanc : `#ffffff`
- 🩶 Gris : `#f5f5f5`, `#e8e8e8`, `#4a4a4a`

**Typographie** :
- Titres : Playfair Display (serif)
- Corps : Inter (sans-serif)

---

## 📝 Pages

### 🏠 Accueil (`app/page.tsx`)
- Hero section avec CTA
- Services overview
- Call-to-action

### 💼 Services (`app/services/page.tsx`)
- Liste complète des services
- Domaines d'expertise
- Processus en 4 étapes

### 👥 À Propos (`app/about/page.tsx`)
- Présentation DEKA
- Bios des associés (Rudy & Alexandre)
- Valeurs de l'entreprise

### 📧 Contact (`app/contact/page.tsx`)
- Formulaire de contact
- Coordonnées directes
- Zones géographiques

---

## 🔧 Modification du Contenu

### Textes
Éditez les fichiers `.tsx` des pages

### Couleurs
Modifiez `app/globals.css` (variables CSS)

### Images
1. Placez dans `public/images/`
2. Importez avec `next/image`

### Mots-clés Footer
Éditez `app/components/Footer.tsx`

---

## 📞 Contact & Infos

**Email Générique** : contact@deka-partners.com

**Rudy Mezoughi**
- rudy.m@deka-partners.com
- +33 6 30 13 51 89

**Alexandre Dupuy**
- alexandre.d@deka-partners.com
- +33 6 61 41 51 39

---

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connectez votre compte GitHub à Vercel
2. Importez le repository
3. Déploiement automatique à chaque push

### Hostinger
Consultez `DEPLOYMENT.md` pour les instructions

---

## 📚 Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guide de déploiement complet
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 💡 Tips & Tricks

- Modifiez en local avec `npm run dev`
- Testez la build avec `npm run build`
- Committez et pushez pour déployer automatiquement
- Utilisez les composants réutilisables (Card, Section, etc.)

---

## 📄 License

© 2026 DEKA Partners. Tous droits réservés.

---

**Besoin d'aide ?** Consultez `DEPLOYMENT.md` ou contactez contact@deka-partners.com
