**Pokedex App**

Application mobile multiplateforme (Expo) — exemple d'un Pokedex avec navigation par fichiers et affichage des fiches Pokémon.

**Description :** Ce projet utilise `expo` + `expo-router` et `@tanstack/react-query` pour afficher une liste et les détails de Pokémon. Il sert de base pour apprendre Expo, la navigation par fichiers et l'architecture d'une petite appli React Native/Expo.

**Technologies :**

- **Framework :** Expo
- **Routing :** expo-router (file-based routing)
- **Data fetching :** @tanstack/react-query
- **Langage :** TypeScript

## Installation

Prérequis : Node.js et npm installés, environnements Android/iOS ou Expo Go pour tester.

1. Installer les dépendances :

```bash
npm install
```

2. Lancer le serveur de développement :

```bash
npm start
```

3. Commandes utiles :

```bash
npm run android   # ouvre sur un émulateur Android ou appareil connecté
npm run ios       # ouvre sur simulateur iOS (macOS)
npm run web       # lance la version web
npm run lint      # lance ESLint
npm run reset-project # remet le projet d'exemple dans app-example
```

## Structure du projet (extrait)

- [app](app) — dossier principal des routes et écrans.
- [app/pokemon/[id].tsx](app/pokemon/[id].tsx) — écran détail d'un Pokémon.
- [components](components) — composants UI réutilisables.
- [functions/pokemon.ts](functions/pokemon.ts) — fonctions utilitaires pour l'API ou les données Pokémon.
- [hooks/useFetchQuery.ts](hooks/useFetchQuery.ts) — hook personnalisé pour la récupération des données.
- [package.json](package.json) — scripts et dépendances.

## Développement

- Le routage est basé sur le dossier `app/` (file-based routing d'Expo Router). Ajoutez de nouvelles routes en créant des fichiers sous `app/`.
- Utilisez `@tanstack/react-query` pour la mise en cache et la gestion des requêtes réseau (voir `hooks/useFetchQuery.ts`).
- Les composants réutilisables se trouvent dans `components/` et `components/pokemon/` pour les éléments spécifiques aux Pokémon.

## Dépendances principales

- expo, expo-router, react-native
- @tanstack/react-query
- react-navigation (packages auxiliaires pour les onglets et éléments de navigation)

Consultez le fichier [package.json](package.json) pour la liste complète des dépendances et des scripts.

## Tests & Qualité

- Le projet contient une configuration TypeScript et ESLint. Lancez `npm run lint` pour vérifier le lint.

## Contribution

- Ouvrez une issue pour discuter des changements ou soumettez une pull request.
- Indiquez clairement le but du changement et joignez des captures d'écran si nécessaire.

## Licence

Aucune licence n'est fournie dans le dépôt. Si vous publiez ce projet, ajoutez un fichier `LICENSE` avec la licence souhaitée.

## Contact

Créez une issue ou soumettez une pull request sur GitHub pour toute question ou contribution.

---

_Généré automatiquement — adaptez ce README selon vos besoins (captures d'écran, badge CI, licence)._
