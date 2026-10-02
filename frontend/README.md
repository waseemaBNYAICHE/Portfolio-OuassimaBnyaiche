# PortfolioHub — Frontend moderne

Interface React + TypeScript connectée à l’API Laravel de PortfolioHub.

## Inclus

- Portfolio public responsive avec animations Framer Motion
- Ordinateur 3D interactif en CSS dans le hero
- Profil, compétences, services, projets, expériences et réseaux chargés depuis l’API
- Formulaire de contact relié à `POST /api/contact`
- Login animé et authentification Bearer Sanctum
- Dashboard et gestion du profil, des projets, compétences, expériences, formations, services et messages
- CRUD complet des projets

## Installation

```bash
cp .env.example .env
npm install
npm run dev
```

Configurer l’API dans `.env` :

```env
VITE_API_URL=https://votre-backend.run.app/api
```

## Vérification

```bash
npm run build
npm run lint
```

Le build de production a été validé avec Vite. Les données de démonstration des projets, services et parcours ne s’affichent que lorsque l’API ne contient encore aucune donnée.
