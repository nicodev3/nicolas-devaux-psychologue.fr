# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Suivi Umami

Le script de suivi n'est chargé qu'en production, et seulement si
`PUBLIC_UMAMI_WEBSITE_ID` et `PUBLIC_UMAMI_URL` sont définies.

Événements de conversion (`src/components/BaseHead.astro`) :
`Doctolib Click`, `Consulter Click`, `Phone Click`, `Email Click`,
`Maps Click`, `Contact Form Submit` — chacun avec la propriété `location`
(chemin de la page, ou `data-track-location` si présent).

Événements des outils (`src/components/ToolAnalytics.astro`) :

| Événement | Propriétés | Déclencheur |
| --- | --- | --- |
| `Outil démarré` | `outil`, `reprise` | première réponse cochée |
| `Outil terminé` | `outil`, `reprise`, `duree` | formulaire validé (masquage de `#form-container`) |
| `Outil abandonné` | `outil`, `progression` | départ de la page sans validation |
| `Outil ouvert` | `depuis`, `vers` | clic sur un lien `data-tool-link` |
| `Outil suite` | `outil`, `vers` | clic sur la page de fond proposée en fin de test |

La page de fond proposée en fin de test est déclarée par outil dans
`src/data/tools.ts` (`nextStep`) et rendue par `ToolNextStep.astro`.
Un outil sans `nextStep` n'affiche rien : aucune page ne traite encore
le sujet qu'il mesure.

`reprise` vaut `oui` lorsque des réponses ont été restaurées depuis
`localStorage` au chargement. `duree` et `progression` sont des paliers
(`<1min`, `1-3min`… / `1-25%`, `26-50%`…).

Aucune réponse ni aucun score n'est transmis : la mention « vos réponses ne
sont transmises à personne » affichée sur les pages reste exacte.

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
