# 🚀 DEKA Partners - Guide de Déploiement

## 📋 Vue d'ensemble

Le site DEKA Partners est une application **Next.js 15** moderne et fluide, avec une charte graphique luxe (Or/Noir/Blanc), optimisée pour mobile.

**Repo GitHub** : https://github.com/Rudy-Mzh/deka-partners-website
**Domaine** : deka-partners.com (Hostinger)

---

## 🛠️ Structure du Projet

```
app/
├── components/        # Composants réutilisables
│   ├── Header.tsx     # Navigation principale
│   ├── Footer.tsx     # Pied de page avec keywords
│   ├── Hero.tsx       # Section héros
│   ├── Card.tsx       # Cartes de services
│   ├── Section.tsx    # Sections génériques
│   └── ContactForm.tsx # Formulaire de contact
├── page.tsx           # Accueil
├── services/page.tsx  # Services
├── about/page.tsx     # À propos & équipe
├── contact/page.tsx   # Contact
├── layout.tsx         # Layout global
├── globals.css        # Styles globaux + design system
└── favicon.ico
```

---

## 💡 Caractéristiques

✅ **Fluide & Souple**
- Animations smooth (fade-in, slide-up, slide-down)
- Transitions douces sur tous les éléments
- Scroll behavior smooth

✅ **Mobile-First**
- Responsive design parfait (mobile, tablet, desktop)
- Navigation mobile avec menu burger
- Formulaire de contact optimisé pour mobile

✅ **Moderne & Raffiné**
- Charte graphique DEKA (or #d4af37, noir, blanc)
- Typographie élégante (Playfair Display + Inter)
- Espaces généreux, minimalisme luxe

✅ **Inspire Confiance**
- Design professionnel et épuré
- Informations de contact claires et visibles
- Formulaire de contact simple et direct
- CTA (Appels à l'action) visibles mais discrets

---

## 🚀 Déploiement sur Hostinger

### Option 1 : Vercel (Recommandé - Gratuit)

**Avantages** :
- Déploiement automatique à chaque push GitHub
- Performance optimale pour Next.js
- SSL gratuit
- Connexion au domaine Hostinger simple

**Steps** :
1. Aller sur https://vercel.com
2. Connecter votre compte GitHub
3. Importer le repo `deka-partners-website`
4. Ajouter le domaine `deka-partners.com` dans les paramètres
5. Mettre à jour les DNS chez Hostinger vers Vercel (instructions fournies)

### Option 2 : Hostinger Directement

Si vous préférez rester sur Hostinger :

1. **SSH dans le serveur** (Hostinger fournit les credentials)
2. **Cloner le repo** :
   ```bash
   git clone https://github.com/Rudy-Mzh/deka-partners-website.git
   cd deka-partners-website
   ```
3. **Installer les dépendances** :
   ```bash
   npm install
   ```
4. **Builder pour production** :
   ```bash
   npm run build
   ```
5. **Lancer le serveur** (utiliser PM2 pour le garder actif) :
   ```bash
   npm install -g pm2
   pm2 start npm --name "deka" -- start
   pm2 save
   ```
6. **Configurer Nginx** pour pointer vers `localhost:3000`

---

## 📝 Modification & Maintenance

### Modifier le contenu

#### Textes
Éditez les fichiers `.tsx` des pages :
- `app/page.tsx` → Accueil
- `app/services/page.tsx` → Services
- `app/about/page.tsx` → À propos & bios
- `app/contact/page.tsx` → Contact

#### Couleurs & Design
Éditez `app/globals.css` :
```css
:root {
  --color-gold: #d4af37;      /* Couleur principale */
  --color-dark: #1a1a1a;      /* Textes */
  --color-white: #ffffff;     /* Fond */
}
```

#### Logo
Remplacez le "D" dans le Header par votre logo :
```tsx
// app/components/Header.tsx - ligne ~18
<Link href="/" className="text-2xl font-serif font-bold...">
  DEKA  {/* Remplacer par <img src="/logo.png" /> */}
</Link>
```

### Ajouter des photos

1. Placez les photos dans le dossier `public/images/`
2. Référencez-les dans les pages :
```tsx
import Image from 'next/image';

<Image src="/images/photo.jpg" alt="Description" width={600} height={400} />
```

### Mots-clés Footer

Éditez `app/components/Footer.tsx` (ligne ~10) :
```tsx
const keywords = [
  'La Rochelle et alentours',
  'Littoral Atlantique',
  'Acquisition immobilière',
  // ... ajouter/modifier ici
];
```

---

## 🔧 Développement Local

### Lancer le serveur de développement

```bash
cd deka-partners-website
npm run dev
```

Ouvrez **http://localhost:3000** dans le navigateur.

### Tester la build production

```bash
npm run build
npm start
```

### Vérifier les types TypeScript

```bash
npm run type-check
```

---

## 📞 Formulaire de Contact

### Configuration

Actuellement, le formulaire est **simulé** (pour la démo). Pour qu'il envoie vraiment des emails :

**Option 1 : SendGrid** (Recommandé)
1. Créer un compte SendGrid
2. Obtenir une clé API
3. Créer un endpoint API en `app/api/contact.ts` :

```typescript
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  const { name, email, phone, subject, message } = await req.json();

  await sendgrid.send({
    to: 'contact@deka-partners.com',
    from: 'noreply@deka-partners.com',
    subject: `Contact: ${subject}`,
    html: `<p>${message}</p><p>De: ${name} (${email}, ${phone})</p>`,
  });

  return Response.json({ success: true });
}
```

4. Ajouter dans `.env.local` :
```
SENDGRID_API_KEY=votre_clé
```

**Option 2 : Vercel avec contact form** (Plus simple)
- Utiliser Vercel Forms directement

---

## 📊 Analytics & SEO

### Ajouter Google Analytics

Ajouter dans `app/layout.tsx` :
```tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script dangerouslySetInnerHTML={{__html: `...`}} />
```

### Robots.txt & Sitemap

Créez `public/robots.txt` et `public/sitemap.xml` :

```txt
# public/robots.txt
User-agent: *
Allow: /
Sitemap: https://deka-partners.com/sitemap.xml
```

---

## 🚨 Points Importants

1. **Mise à jour du site** : Modifiez le code, committez et pushez. Vercel se met à jour automatiquement.
2. **Photos de l'équipe** : À ajouter dans `public/images/` et intégrer dans `app/about/page.tsx`
3. **Certificat SSL** : Gratuit avec Vercel et Hostinger
4. **Backups** : GitHub contient tout. Push régulièrement !
5. **Maintenance** : Mettre à jour les dépendances avec `npm update`

---

## 📧 Emails & Contact

Les coordonnées sont centralisées :
- **Global** : contact@deka-partners.com
- **Rudy** : rudy.m@deka-partners.com (06 30 13 51 89)
- **Alexandre** : alexandre.d@deka-partners.com (06 61 41 51 39)

Modifiables dans les composants Footer et ContactForm.

---

## ❓ Questions / Support

Pour tout changement :
1. Modifiez le code
2. Testez en local (`npm run dev`)
3. Committez et pushez
4. Déploiement automatique ✅

Bonne chance ! 🚀
