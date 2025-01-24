# Environnement de Développement Docker

Ce projet utilise Docker pour configurer l'environnement de développement pour les services backend et frontend, ainsi qu'une base de données PostgreSQL.

## Prérequis

- Docker
- Docker Compose

## Structure du Projet

Le projet se compose des services suivants :
- **Backend** : Application Node.js (API) utilisant Express
- **Frontend** : Application React utilisant Vite
- **Base de données** : PostgreSQL

### Docker Compose

L'orchestration principale est réalisée via `docker-compose.yml`, où nous définissons les services, réseaux et volumes pour le backend, le frontend et la base de données.

## Commandes Utiles

### Construire les conteneurs
Construire tous les services définis dans `docker-compose.yml` :
```bash
make build
```

### Démarrer les conteneurs
Démarrer tous les services (backend, frontend et base de données) en mode détaché :
```bash
make start
```

### Arrêter les conteneurs
Arrêter tous les services en cours d'exécution et les supprimer :
```bash
make stop
```

### Redémarrer les conteneurs
Arrêter tous les services puis les redémarrer :
```bash
make restart
```

### Voir les logs
Voir les logs de tous les services en temps réel :
```bash
make logs
```

### Accéder au shell d'un service
Entrer dans le shell d'un service spécifique :
```bash
make shell
```
Vous serez invité à choisir un service (frontend, backend, db).

### Accéder à la console du backend
Accéder à la console du service backend :
```bash
make backend-console
```

### Accéder à la console du frontend
Accéder à la console du service frontend :
```bash
make frontend-console
```

### Accéder à la console de la base de données
Accéder à la console de la base de données PostgreSQL :
```bash
make db-console
```

## Flux de Développement

Le service backend fonctionne sur le port 3000.
Le service frontend fonctionne sur le port 5173.
Le service de base de données fonctionne sur le port 5432.
Vous pouvez modifier les fichiers localement, et les changements seront reflétés dans les conteneurs grâce aux montages de volumes dans `docker-compose.yml`.

## Notes

Assurez-vous de configurer vos fichiers `.env` dans chaque service si nécessaire. Le backend utilise une base de données PostgreSQL, qui est configurée via des variables d'environnement comme `DATABASE_URL`.

### Explications :
- Le `Makefile` contient des commandes pratiques pour gérer les services Docker (comme démarrer, arrêter, afficher les logs, et accéder aux consoles des services).
- Le `README.md` documente les commandes disponibles et explique l'architecture du projet.

Vous pouvez ajuster ces fichiers selon vos besoins ou ajouter des options supplémentaires.

## Kanban

https://github.com/users/PierreSCHIAVON/projects/1/views/1

Sur ce lien vous trouverez le kanban qui a été utilisé lors du projet

## Git-flow

Lors de ce projet, nous avons utilisé la stratégie suivante :

develop est la copie de main, chaque branche feature doit être tirée de develop et mergée dans develop une fois terminée.

une branche feature se présente sous cette forme : feature/nomdelafeature
