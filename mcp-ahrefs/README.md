# Serveur MCP Ahrefs

Serveur MCP (Model Context Protocol) pour l'intégration de l'API Ahrefs dans Zed.

## Fonctionnalités

Ce serveur MCP donne accès aux outils Ahrefs suivants :

### 📊 Métriques de domaine et URL
- **ahrefs_domain_rating** : Domain Rating, backlinks, domaines référents, trafic organique
- **ahrefs_url_rating** : URL Rating, backlinks pour une URL spécifique

### 🔗 Analyse des backlinks
- **ahrefs_backlinks** : Liste des backlinks (jusqu'à 1000 par requête)
- **ahrefs_referring_domains** : Domaines qui font des liens vers votre site
- **ahrefs_anchors** : Analyse des textes d'ancrage

### 🔍 Recherche et mots-clés
- **ahrefs_keywords_explorer** : Recherche de mots-clés (volume, difficulté, CPC)
- **ahrefs_organic_keywords** : Mots-clés pour lesquels vous êtes positionné

### 📈 Performance et concurrence
- **ahrefs_top_pages** : Pages les plus performantes en trafic organique
- **ahrefs_competing_domains** : Domaines concurrents sur vos mots-clés

## Installation

### 1. Installer les dépendances

```bash
cd mcp-ahrefs
npm install
```

### 2. Configurer la clé API

**IMPORTANT** : Ne jamais commiter votre clé API !

Ajoutez votre clé API Ahrefs comme variable d'environnement :

```bash
export AHREFS_API_KEY="votre_clé_api_ici"
```

Pour que ce soit permanent, ajoutez cette ligne à votre `~/.zshrc` ou `~/.bashrc`.

### 3. Configurer Zed

Ajoutez la configuration suivante dans votre fichier `~/.config/zed/settings.json` :

```json
{
  "context_servers": {
    "ahrefs": {
      "command": "node",
      "args": ["/Users/nicolasdevaux/dev/sites_github/nicolas-devaux-psychologue.fr/mcp-ahrefs/index.js"],
      "env": {
        "AHREFS_API_KEY": "VOTRE_CLE_API_ICI"
      }
    }
  }
}
```

**Alternative plus sécurisée** (recommandé) :

Si vous avez déjà défini `AHREFS_API_KEY` dans votre shell, utilisez cette configuration qui récupère la variable d'environnement :

```json
{
  "context_servers": {
    "ahrefs": {
      "command": "sh",
      "args": ["-c", "node /Users/nicolasdevaux/dev/sites_github/nicolas-devaux-psychologue.fr/mcp-ahrefs/index.js"],
      "env": {}
    }
  }
}
```

### 4. Redémarrer Zed

Redémarrez Zed pour que le serveur MCP soit chargé.

## Utilisation

Une fois configuré, vous pouvez utiliser les outils Ahrefs directement dans vos conversations avec l'agent Zed :

### Exemples de requêtes :

- "Analyse le Domain Rating de nicolas-devaux-psychologue.fr"
- "Trouve les backlinks de mon site"
- "Quelles sont mes top pages en termes de trafic organique ?"
- "Recherche le mot-clé 'psychologue Paris'"
- "Qui sont mes concurrents sur les mêmes mots-clés ?"
- "Liste les domaines qui font des liens vers mon site"
- "Analyse les positions organiques de mon domaine"

## Limites du plan Standard

Le plan Standard Ahrefs inclut :
- Jusqu'à 500 lignes par requête pour les backlinks
- Accès aux données historiques limitées
- Nombre de requêtes API limité (vérifiez votre quota)

## Dépannage

### Le serveur ne démarre pas
- Vérifiez que Node.js est installé : `node --version`
- Vérifiez que les dépendances sont installées : `npm install`

### Erreur d'authentification
- Vérifiez que la clé API est correcte
- Vérifiez que la variable d'environnement est bien définie

### Tester manuellement
```bash
export AHREFS_API_KEY="votre_clé"
node index.js
```

## Documentation API Ahrefs

Pour plus d'informations sur l'API Ahrefs :
- https://ahrefs.com/api/documentation

## Licence

MIT
