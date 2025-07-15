# 📚 **DOCUMENTATION API POKÉMON - SWAGGER**

## 🌐 **Accès à la Documentation**

**Swagger UI** : http://localhost:3000/api

L'interface Swagger est maintenant complètement documentée avec :

### 🔧 **Fonctionnalités Documentées**

#### **🔐 Authentification**
- **POST** `/auth/register` - Inscription avec vérification email obligatoire
- **POST** `/auth/login` - Connexion (nécessite email vérifié)
- **GET** `/auth/verify-email` - Vérification via token email
- **POST** `/auth/resend-verification` - Renvoyer l'email de vérification

#### **⚡ Pokémon**
- **POST** `/pokemon` - Créer un nouveau Pokémon
- **GET** `/pokemon` - Liste des Pokémon de l'utilisateur
- **GET** `/pokemon/admin/all` - 🛡️ Admin uniquement - Tous les Pokémon
- **GET** `/pokemon/{id}` - Détails d'un Pokémon
- **PATCH** `/pokemon/{id}` - Modifier un Pokémon
- **DELETE** `/pokemon/{id}` - Supprimer un Pokémon
- **GET** `/pokemon/search/{name}` - Rechercher par nom

#### **👤 Utilisateurs**
- **GET** `/users` - Liste des utilisateurs
- **GET** `/users/{id}` - Détails d'un utilisateur
- **POST** `/users` - Créer un utilisateur
- **PUT** `/users/{id}` - Modifier un utilisateur
- **DELETE** `/users/{id}` - Supprimer un utilisateur

---

## 🎯 **Nouveautés Ajoutées**

### ✨ **Descriptions Complètes**
- Tous les endpoints ont des descriptions détaillées
- Exemples JSON pour tous les DTOs
- Codes de statut avec explications
- Messages d'erreur documentés

### 🔑 **Authentification Bearer**
- Configuration JWT complète dans Swagger
- Interface pour saisir le token d'authentification
- Tests directs depuis l'interface

### 📧 **Système Email Intégré**
- Documentation des nouveaux endpoints de vérification
- Exemples de flux complet d'inscription
- Intégration MailDev pour les tests

---

## 🧪 **Comment Tester**

### **1. Ouvrir Swagger**
Allez sur http://localhost:3000/api

### **2. Tester l'Inscription**
1. Utilisez **POST** `/auth/register` avec les exemples fournis
2. Allez sur http://localhost:1080 pour voir l'email de vérification
3. Copiez le token et utilisez **GET** `/auth/verify-email`

### **3. Se Connecter**
1. Utilisez **POST** `/auth/login` avec un compte vérifié
2. Copiez le `access_token` retourné
3. Cliquez sur **🔒 Authorize** en haut de Swagger
4. Collez le token dans le champ **Value**

### **4. Tester les Pokémon**
Tous les endpoints Pokémon sont maintenant accessibles avec votre token !

---

## 📋 **Comptes de Test Prêts**

```json
// User normal (déjà vérifié)
{
  "email": "user@pokemon.com", 
  "password": "user123"
}

// User 2 (déjà vérifié)
{
  "email": "user2@pokemon.com",
  "password": "user2123"
}
```

### 🛡️ **Pour obtenir un compte Admin**
Pour créer un admin, vous devez :
1. Créer un compte normal via `/auth/register`
2. Utiliser Prisma Studio ou modifier directement en base
3. Changer le champ `role` de `USER` à `ADMIN`

---

## 🎨 **Interface Swagger Améliorée**

- **🏷️ Tags organisés** : Authentification, Pokémon, Utilisateurs
- **📝 Descriptions riches** avec émojis et formatage
- **⚡ Exemples complets** pour tous les champs
- **🛡️ Permissions clairement indiquées**
- **📧 Flux email documenté**
- **🔧 Configuration Bearer Auth** intégrée

L'API est maintenant **prête pour la production** avec une documentation Swagger complète et professionnelle ! 🚀
