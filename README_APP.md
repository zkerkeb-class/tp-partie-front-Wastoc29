# 🎨 Pokédex Front-End Application

Application front-end complète développée avec **React + Vite** pour gérer une base de données de Pokémons.

## ✨ Fonctionnalités

### Fonctionnalités principales
- ✅ **Liste des Pokémons avec pagination** (20 par page)
- ✅ **Recherche par nom** (temps réel avec debounce)
- ✅ **Page détails** (affichage complet des informations)
- ✅ **Modification** (formulaire d'édition avec validation)
- ✅ **Suppression** (avec confirmation par modale)
- ✅ **Création** (formulaire complet avec validation)

### Fonctionnalités bonus
- ❤️ **Système de favoris** (localStorage, page dédiée)
- ⚖️ **Comparateur** (jusqu'à 3 Pokémons, tableaux et graphiques)

## 🛠️ Stack Technique

- **React 19** - Bibliothèque UI
- **Vite** - Build tool ultra-rapide
- **React Router 6** - Navigation
- **Axios** - Requêtes HTTP
- **CSS pur** - Pas de bibliothèque externe
- **Context API** - Gestion d'état globale

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── PokemonCard/    # Carte Pokemon
│   ├── SearchBar/      # Barre de recherche
│   ├── Pagination/     # Navigation pagination
│   ├── Modal/          # Modale de confirmation
│   └── Navbar/         # Navigation principale
├── pages/              # Pages de l'application
│   ├── Home.jsx        # Liste + recherche
│   ├── Details.jsx     # Détails + édition
│   ├── Create.jsx      # Création
│   ├── Favorites.jsx   # Page favoris
│   ├── Compare.jsx     # Comparateur
│   └── NotFound.jsx    # Page 404
├── context/            # Contextes React
│   ├── FavoritesContext.jsx
│   └── CompareContext.jsx
├── hooks/              # Hooks personnalisés
│   ├── usePokemon.js
│   └── usePagination.js
├── services/           # Services API
│   └── api.js
├── utils/              # Utilitaires
│   ├── constants.js
│   └── helpers.js
├── App.jsx             # Composant principal
└── main.jsx            # Point d'entrée
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 16+
- npm ou yarn
- Backend Pokémon en cours d'exécution sur `http://localhost:3000`

### Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur **http://localhost:5173**

### Autres commandes

```bash
# Build pour la production
npm run build

# Preview du build
npm run preview

# Linter
npm run lint
```

## 🔌 Configuration de l'API

Par défaut, l'API backend est configurée sur `http://localhost:3000/api`

Pour modifier cette URL, éditez le fichier `src/services/api.js` :

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## 📝 Utilisation

### Navigation

- **🏠 Accueil** : Liste de tous les Pokémons avec pagination et recherche
- **➕ Créer** : Formulaire de création d'un nouveau Pokémon
- **❤️ Favoris** : Liste de vos Pokémons favoris
- **⚖️ Comparer** : Comparaison de 2-3 Pokémons

### Fonctionnalités détaillées

#### Liste et Recherche
- 20 Pokémons par page
- Navigation avec pagination complète (précédent, suivant, numéros de page)
- Barre de recherche avec debounce (300ms)
- Icônes cœur pour ajouter/retirer des favoris
- Icônes + pour ajouter/retirer de la comparaison

#### Page Détails
- Affichage complet des informations
- Image du Pokémon
- Types avec couleurs
- Statistiques avec barres de progression
- Noms internationaux
- Boutons : Modifier, Supprimer, Favoris
- Mode édition : formulaire in-place avec validation

#### Création
- Formulaire complet avec validation
- Champs : noms, types, statistiques, image
- Sliders + inputs numériques pour les stats
- Preview de l'image
- Messages d'erreur détaillés

#### Favoris
- Sauvegarde dans localStorage
- Affichage en grille comme la page d'accueil
- Bouton pour tout supprimer
- Compteur de favoris

#### Comparateur
- Sélection de 2-3 Pokémons maximum
- Cartes récapitulatives
- Tableau comparatif avec surlignage des meilleures stats (👑)
- Total avec icône trophée (🏆)
- Graphiques visuels par Pokémon
- Sauvegarde dans localStorage

## 🎨 Personnalisation

### Couleurs

Les couleurs des types Pokémon sont définies dans `src/utils/constants.js` :

```javascript
export const TYPE_COLORS = {
  Fire: '#EE8130',
  Water: '#6390F0',
  // ...
}
```

### Nombre d'éléments par page

Modifiable dans `src/utils/constants.js` :

```javascript
export const ITEMS_PER_PAGE = 20;
```

## 🐛 Gestion des erreurs

- **404** : Page non trouvée avec lien retour
- **Network errors** : Messages d'erreur avec bouton retry
- **Validation** : Messages d'erreur détaillés sur les formulaires
- **API errors** : Affichage des messages d'erreur du backend

## 📱 Responsive Design

L'application est entièrement responsive :

- **Desktop** : Grilles multi-colonnes, tous les éléments visibles
- **Tablet** : Adaptation des grilles, menu hamburger
- **Mobile** : Grille simple colonne, navigation optimisée

Breakpoints :
- Mobile : < 768px
- Tablet : 768px - 968px
- Desktop : > 968px

## 🔒 Validation

### Création/Modification d'un Pokémon

- **Nom français** : requis
- **Types** : au moins 1 requis
- **Statistiques** : nombres positifs (0-255)
- **Image** : URL optionnelle

La validation est effectuée côté client avec la fonction `validatePokemonData()` dans `src/utils/helpers.js`

## 💾 LocalStorage

L'application utilise localStorage pour :

- **Favoris** : `pokemon_favorites`
- **Comparaison** : `pokemon_compare_list`

Les données sont automatiquement synchronisées et persistent entre les sessions.

## 🎯 Optimisations

- **Debounce** sur la recherche (300ms)
- **Images** : fallback automatique en cas d'erreur
- **Lazy loading** : pagination pour ne charger que 20 Pokémons
- **Context API** : évite les prop drilling
- **Hooks personnalisés** : logique réutilisable
- **CSS modulaire** : un fichier CSS par composant

## 🤝 Contribution

Pour contribuer au projet :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est un travail pratique éducatif.

## 👨‍💻 Auteur

Développé avec ❤️ pour le cours de développement web

---

**Bon développement ! 🎉**
