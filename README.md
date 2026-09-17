# PortfolioHub — Ouassima Bnyaiche

PortfolioHub est une application web dynamique permettant à Ouassima Bnyaiche de présenter ses compétences, ses projets et ses informations professionnelles.

L’architecture est également préparée pour permettre ultérieurement à plusieurs utilisateurs de créer et gérer leurs propres portfolios.

## Objectifs

- Présenter un portfolio professionnel moderne et responsive
- Gérer dynamiquement les projets depuis une API REST
- Ajouter, modifier, consulter et supprimer des projets
- Séparer le frontend, le backend et le service IA
- Automatiser les contrôles avec GitHub Actions
- Préparer le déploiement continu après la finalisation du projet

## Technologies utilisées

### Frontend

- React
- TypeScript
- Vite
- CSS
- Axios
- Animations web
- Mode clair et sombre

### Backend

- Laravel
- PHP
- API REST
- Validation des données

### Base de données

- PostgreSQL

### Service IA

- Python
- FastAPI
- Conteneur indépendant préparé pour une intégration future

### DevOps

- Git et GitHub
- Docker
- Docker Compose
- GitHub Actions
- Intégration continue pendant le développement
- Déploiement continu prévu après la finalisation

## Architecture du projet

```text
Portfolio-OuassimaBnyaiche/
├── .github/
│   └── workflows/
│       └── ci.yml
├── ai-service/
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── backend/
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── tests/
├── docker/
│   ├── backend/
│   │   └── Dockerfile
│   └── frontend/
│       └── Dockerfile
├── frontend/
│   ├── public/
│   └── src/
├── docker-compose.yml
├── README.md
└── ROADMAP.md
```

## Services Docker

| Service | Technologie | Adresse |
|---|---|---|
| Frontend | React + Vite | http://localhost:5175 |
| Backend | Laravel | http://localhost:8080 |
| Service IA | FastAPI | http://localhost:8001 |
| Santé du service IA | FastAPI | http://localhost:8001/health |
| Base de données | PostgreSQL | localhost:5432 |

## Installation du projet

### Prérequis

Avant de lancer le projet, il faut installer :

- Git
- Docker Desktop
- Docker Compose

### Cloner le dépôt

```bash
git clone https://github.com/waseemaBNYAICHE/Portfolio-OuassimaBnyaiche.git
cd Portfolio-OuassimaBnyaiche
```

### Démarrer l’application

```bash
docker compose up -d --build
docker compose ps
```

### Vérifier les services

```bash
curl http://localhost:8080
curl http://localhost:8001/health
```

### Arrêter l’application

```bash
docker compose down
```

## Gestion des projets

L’application utilise principalement la table `projects`.

Fonctionnalités prévues :

- Affichage des projets
- Ajout d’un projet
- Modification d’un projet
- Suppression d’un projet
- Recherche et filtrage
- Gestion des technologies et des liens
- Ajout d’images
- Publication ou masquage d’un projet

## Workflow Git

```text
main
└── develop
    ├── feature/projects-crud
    ├── feature/frontend-portfolio
    ├── feature/admin-dashboard
    └── feature/ai-integration
```

- `main` : version stable du projet
- `develop` : intégration des fonctionnalités
- `feature/*` : développement de chaque fonctionnalité
- Les Pull Requests sont dirigées vers `develop`
- La fusion vers `main` sera effectuée après la validation finale

## Intégration continue

GitHub Actions vérifie automatiquement :

- L’installation des dépendances frontend
- Le lint et le build du frontend
- La sécurité des dépendances frontend
- L’installation des dépendances Laravel
- Les tests du backend
- La sécurité des dépendances PHP
- La validation de Docker Compose
- La construction des images Docker

## Roadmap

Consulter le fichier [`ROADMAP.md`](./ROADMAP.md) pour suivre les différentes étapes du projet.

## État d’avancement

- [x] Initialisation de React et Laravel
- [x] Configuration de Docker
- [x] Ajout de PostgreSQL
- [x] Préparation du service FastAPI
- [x] Mise en place de l’intégration continue
- [ ] Développement du CRUD des projets
- [ ] Création de l’interface du portfolio
- [ ] Création du tableau de bord
- [ ] Réalisation des tests complets
- [ ] Mise en place du déploiement continu

## Auteure

**Ouassima Bnyaiche**

Développement full-stack et multimédia