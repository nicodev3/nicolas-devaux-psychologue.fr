# Indiquer que le cabinet est complet

Le message est préparé, sans être activé ni ajouté aux points de contact actuels.

Texte commun dans `src/data/consultation-availability.ts` :

> **Cabinet complet**
> Je ne prends actuellement pas de nouveaux patients.

Passer `isFull` à `true`, puis reconstruire et publier le site pour activer les emplacements qui utilisent les composants ci-dessous. Une modification locale ne modifie pas le site en ligne.

## Message seul

```astro
---
import ConsultationAvailability from "../components/ConsultationAvailability.astro";
---

<ConsultationAvailability />
```

`compact` réduit les marges et le corps de texte. `active` permet une prévisualisation locale indépendamment de la configuration générale.

## Message associé à un moyen de contact

```astro
---
import ContactAvailability from "../components/ContactAvailability.astro";
import DoctolibBookingLink from "../components/DoctolibBookingLink.astro";
---

<ContactAvailability>
  <DoctolibBookingLink location="Page Consulter">
    Prendre rendez-vous
  </DoctolibBookingLink>
</ContactAvailability>
```

Le même composant peut envelopper un lien `tel:`, le composant `ObfuscatedEmailLink` ou un formulaire de contact. Le message précède le contact, reste visible sur mobile et ne dépend ni d'un survol ni de JavaScript.

Les liens et formulaires restent accessibles lorsque le cabinet est complet. Les boutons Doctolib conservent leurs attributs de suivi et leur destination.

Le suivi Umami conserve l'événement `Doctolib Click` et sa propriété `location`. La propriété `availability` vaut `full` lorsque le message est activé globalement, ou `open` lorsqu'il est désactivé. Elle décrit le réglage global du cabinet, pas l'affichage forcé d'une prévisualisation. Ce suivi couvre aussi les liens Doctolib directs et ceux des articles. Le suivi nécessite toujours la configuration Umami existante (`PUBLIC_UMAMI_WEBSITE_ID` et `PUBLIC_UMAMI_URL`).

Quand le réglage est désactivé, seul le contenu d'origine est rendu, sans conteneur supplémentaire.

## Emplacements recensés pour une activation ultérieure

- `DoctolibBookingLink.astro` : boutons partagés, dont en-tête, accueil, pied de page, articles et réservation flottante.
- `psychologue-sceaux.astro` : deux liens Doctolib directs et le numéro de téléphone.
- `mentions-legales.astro` : téléphone et email révélés par clic.
- `meditation-pleine-conscience-sceaux/index.astro` : formulaire des ateliers. Déterminer séparément si les ateliers sont aussi complets avant de l'activer ici.

Ce message ne supprime pas les coordonnées des données structurées, de `knowledge-base.json` ou des fichiers destinés aux moteurs et assistants.
