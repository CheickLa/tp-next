# 🐾 API Pokémon

Une API RESTful moderne pour la gestion de Pokémon avec authentification JWT et vérification par email.

## 🚀 Fonctionnalités

- **🔐 Authentification JWT** avec vérification email obligatoire
- **👤 Gestion des utilisateurs** avec système de rôles (USER/ADMIN)
- **⚡ CRUD Pokémon** avec permissions par utilisateur
- **📧 Vérification email** automatique lors de l'inscription
- **🛡️ Système de permissions** : chaque utilisateur ne voit que ses Pokémon (sauf admin)
- **📚 Documentation Swagger** complète

## 🛠️ Installation

1. **Cloner le projet**
```bash
git clone <repo-url>
cd cheick-lanikpekoun-tp-next
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'environnement**
Créer un fichier `.env` :
```env
DATABASE_URL="postgresql://username:password@localhost:5432/pokemon_db"
JWT_SECRET="votre-secret-jwt"
```

4. **Démarrer les services**
```bash
docker-compose up -d
```

5. **Appliquer les migrations**
```bash
npx prisma migrate deploy
npx prisma generate
```

6. **Peupler la base (optionnel)**
```bash
npm run seed
npm run create-test-users
```

7. **Démarrer l'application**
```bash
npm run start:dev
```

## 📖 Documentation API

### 🌐 Accès
- **API** : http://localhost:3000
- **Documentation Swagger** : http://localhost:3000/api
- **Interface email (MailDev)** : http://localhost:1080

### 🔑 Authentification

#### Inscription
```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}
```

#### Vérification email
Après inscription, vérifiez votre email sur http://localhost:1080 et cliquez sur le lien de vérification.

#### Connexion
```http
POST /auth/login
Content-Type: application/json

{
  "email": "jean.dupont@example.com",
  "password": "motdepasse123"
}
```

### 📝 Endpoints Pokémon

Tous les endpoints nécessitent une authentification Bearer Token.

#### Créer un Pokémon
```http
POST /pokemon
Authorization: Bearer <votre-token>
Content-Type: application/json

{
  "name": "Dracaufeu",
  "type1": "Feu",
  "type2": "Vol",
  "hp": 78,
  "attack": 84,
  "defense": 78,
  "speed": 100,
  "description": "Pokémon Flamme très puissant",
  "imageUrl": "https://example.com/charizard.png"
}
```

#### Lister ses Pokémon
```http
GET /pokemon
Authorization: Bearer <votre-token>
```

#### Admin : Voir tous les Pokémon
```http
GET /pokemon/admin/all
Authorization: Bearer <admin-token>
```

## 👥 Comptes de test

### Utilisateurs normaux (déjà vérifiés)
```json
{
  "email": "user@pokemon.com",
  "password": "user123"
}
```

```json
{
  "email": "user2@pokemon.com",
  "password": "user2123"
}
```

### 🛡️ Créer un administrateur
1. Créez un compte normal via `/auth/register`
2. Vérifiez l'email
3. Modifiez le rôle en base de données :
   - Ouvrez Prisma Studio : `npx prisma studio`
   - Trouvez votre utilisateur
   - Changez `role` de `USER` à `ADMIN`

## 🧪 Tests avec Swagger

1. Allez sur http://localhost:3000/api
2. Testez l'inscription avec un nouvel email
3. Vérifiez l'email sur http://localhost:1080
4. Connectez-vous pour obtenir un token
5. Cliquez sur **🔒 Authorize** dans Swagger
6. Collez votre token
7. Testez tous les endpoints !

## 📊 Structure du projet

```
src/
├── auth/           # Authentification et vérification email
├── email/          # Service d'envoi d'emails
├── pokemon/        # CRUD Pokémon avec permissions
├── users/          # Gestion des utilisateurs
└── prisma.service.ts
```

## 🛡️ Sécurité

- **JWT** pour l'authentification
- **Vérification email** obligatoire
- **Permissions par utilisateur** : isolation des données
- **Rôles admin** pour la gestion globale
- **Validation** des données d'entrée

## 🔧 Scripts disponibles

```bash
npm run start:dev      # Démarrage en mode développement
npm run build          # Build de production
npm run seed           # Peupler la base avec des Pokémon
npm run create-test-users  # Créer les comptes de test
npx prisma studio      # Interface graphique de la base
npx prisma migrate dev # Créer une nouvelle migration
```

## 📱 Technologies utilisées

- **NestJS** - Framework Node.js
- **Prisma** - ORM et gestion de base de données
- **PostgreSQL** - Base de données
- **JWT** - Authentification
- **Nodemailer** - Envoi d'emails
- **Swagger** - Documentation API
- **Docker** - Conteneurisation des services

---

**🎯 L'API est prête pour la production avec une documentation complète !**
