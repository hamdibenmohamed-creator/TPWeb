# 📒 Application de Gestion de Notes

## 📌 Description
Cette application permet aux utilisateurs de s’inscrire, se connecter et gérer leurs notes personnelles de manière simple et sécurisée. Chaque utilisateur possède ses propres notes.

---

## 🚀 Fonctionnalités

- Inscription (Register)
- Connexion (Login)
- Création de notes
- Modification de notes
- Suppression de notes
- Affichage des notes de l’utilisateur connecté

---

## 🔐 Authentification

### 📝 Inscription
Pour créer un compte :
1. Accéder à la page **Register**
2. Entrer :
   - Nom
   - Email
   - Mot de passe
3. Cliquer sur **S’inscrire**
4. Vous serez automatiquement redirigé ou invité à vous connecter

---

### 🔑 Connexion
Pour se connecter :
1. Aller sur la page **Login**
2. Entrer :
   - Email
   - Mot de passe
3. Cliquer sur **Se connecter**
4. Accès au tableau de bord des notes

---

## 🗒️ Gestion des notes

### ➕ Créer une note
1. Se connecter
2. Aller sur la page des notes
3. Cliquer sur **Ajouter une note**
4. Remplir :
   - Titre
   - Contenu
5. Cliquer sur **Enregistrer**

---

### ✏️ Modifier une note
1. Aller sur la liste des notes
2. Cliquer sur le bouton **Modifier**
3. Changer le titre ou le contenu
4. Cliquer sur **Mettre à jour**

---

### 🗑️ Supprimer une note
1. Aller sur la liste des notes
2. Cliquer sur le bouton **Supprimer**
3. Confirmer la suppression

---

## 👤 Sécurité
- Chaque utilisateur ne peut voir que ses propres notes
- Authentification basée sur tokens (Laravel Sanctum)

---

## 🛠️ Technologies utilisées
- Backend : Laravel
- Frontend : React
- Authentification : Laravel Sanctum
- API : Axios
- Style : Tailwind CSS / Bootstrap

---

## 📌 Auteur
Projet réalisé dans le cadre d’un apprentissage full-stack (Laravel + React)
