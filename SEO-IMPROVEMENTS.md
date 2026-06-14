# Améliorations SEO - Page d'accueil

## Date : 14 juin 2026

### ✅ Corrections effectuées

#### 1. **Title Tag optimisé**
**Fichier :** `src/consts.ts`

**Avant :**
```
Nicolas Devaux | Psychologue clinicien à Sceaux
```

**Après :**
```
Nicolas Devaux | Psychologue TCC, EMDR-MOSAIC et Thérapie de couple à Sceaux
```

**Impact :** Meilleure visibilité sur les mots-clés "TCC", "EMDR-MOSAIC" et "Thérapie de couple" dans les résultats de recherche.

---

#### 2. **Meta Description améliorée**
**Fichier :** `src/consts.ts`

**Avant :**
```
Psychologue clinicien à Sceaux, Nicolas Devaux accompagne adultes, adolescents et couples en cabinet ou en ligne : thérapie individuelle, EMDR-MOSAIC, thérapie de couple et groupes.
```

**Après :**
```
Psychologue clinicien à Sceaux spécialisé en TCC, EMDR-MOSAIC et thérapie de couple. Consultations pour adultes et adolescents au cabinet ou en ligne. Prise de RDV sur Doctolib.
```

**Impact :** 
- Plus concise (moins de 160 caractères)
- Appel à l'action clair ("Prise de RDV sur Doctolib")
- Mots-clés mieux positionnés

---

#### 3. **Contenu textuel enrichi**
**Fichier :** `src/components/HeroSection.astro`

**Ajouts :**
- Mention explicite des **TCC (Thérapies Cognitives et Comportementales)**
- **EMDR-MOSAIC pour les traumatismes** 
- **Thérapie de couple**
- Mise en gras des spécialités principales

**Impact :** Contenu plus riche en mots-clés au-dessus de la ligne de flottaison, améliore la pertinence pour les moteurs de recherche.

---

#### 4. **Textes d'ancre optimisés**
**Fichiers :** 
- `src/components/HeroSection.astro`
- `src/components/ApprochesSection.astro`

**Changements :**
- "Cabinet à Sceaux →" → "**Psychologue au cabinet de Sceaux** →"
- "Thérapie EMDR-MOSAIC →" → "**Thérapie EMDR-MOSAIC pour les traumatismes** →"
- "Consultations en ligne →" → "**Consultations en ligne par visio** →"
- "Groupes de pleine conscience →" → "**Groupes de méditation pleine conscience** →"
- "Découvrir →" → "**En savoir plus** →" (avec aria-label descriptif)

**Impact :** Meilleur maillage interne avec des ancres descriptives, aide Google à comprendre le contenu des pages cibles.

---

#### 5. **Attributs ALT des images optimisés**
**Fichiers :** 
- `src/components/AuthorCard.astro`
- `src/components/ConsultationRoomGallery.astro`

**Exemples :**
- Photo profil : "Nicolas Devaux - **Psychologue clinicien à Sceaux spécialisé en TCC et EMDR-MOSAIC**"
- Cabinet 1 : "**Cabinet de psychologie Nicolas Devaux à Sceaux** - Vue du bureau de consultation pour thérapie individuelle et de couple"
- Cabinet 2 : "Salle d'attente du **cabinet de psychologie à Sceaux** - Espace d'accueil calme et confidentiel"

**Impact :** 
- Meilleur référencement des images
- Accessibilité améliorée
- Mots-clés locaux renforcés

---

#### 6. **SEO Local renforcé**
**Fichier :** `src/components/ConsultationRoomGallery.astro`

**Ajouts :**
- Mention explicite de l'adresse : "**63 rue Houdan à Sceaux (92330)**"
- Villes voisines mentionnées : Antony, Bourg-la-Reine, Châtenay-Malabry, Fontenay-aux-Roses
- Titre de section : "Le cabinet" → "**Le cabinet à Sceaux**"

**Impact :** Améliore le référencement local pour les recherches géographiques.

---

#### 7. **Correction Schema.org**
**Fichier :** `src/components/BaseHead.astro`

**Changement :**
- Logo : `logo.png` (fichier manquant) → `logo-300.jpg` (fichier existant)

**Impact :** Évite une erreur 404 dans les données structurées, améliore la validation schema.org.

---

### 📊 Points forts conservés

✅ **Structure H1/H2/H3 sémantique** déjà correcte  
✅ **Schema.org LocalBusiness** très complet  
✅ **Schema.org FAQPage** bien implémenté  
✅ **URL canonique** présente  
✅ **Open Graph** et Twitter Cards configurés  
✅ **Robots.txt** et sitemap corrects  
✅ **HTTPS** activé  

---

### 🎯 Recommandations futures (non implémentées)

1. **Ajouter des avis clients** dans le schema.org (AggregateRating) si disponibles
2. **Créer un BreadcrumbList** schema.org pour les pages internes
3. **Optimiser les Core Web Vitals** (vitesse de chargement)
4. **Ajouter plus de contenu long-form** sur la page d'accueil (800-1000 mots minimum)
5. **Créer des FAQ supplémentaires** pour cibler plus de requêtes longue traîne

---

### 📈 KPIs à suivre

- Position sur "psychologue Sceaux" (page dédiée)
- Position sur "TCC Sceaux"
- Position sur "EMDR Sceaux" / "MOSAIC Sceaux"
- Position sur "thérapie de couple Sceaux"
- Taux de clic (CTR) depuis Google Search Console
- Temps de session et taux de rebond (Analytics)

---

### 🔧 Outils de validation recommandés

1. **Google Search Console** - Vérifier l'indexation et les performances
2. **Schema.org Validator** - https://validator.schema.org/
3. **Google Rich Results Test** - https://search.google.com/test/rich-results
4. **Lighthouse** (Chrome DevTools) - Audit SEO et performance
5. **Ahrefs Site Audit** - Déjà installé sur le site

---

## Notes stratégiques

Le H1 "Nicolas Devaux" a été **volontairement conservé** car :
- La page `/psychologue-sceaux/` est optimisée pour le mot-clé "psychologue sceaux"
- La page d'accueil se concentre sur la marque personnelle
- Cette stratégie permet de ranker sur différents types de requêtes (marque vs intention)

Les améliorations SEO se concentrent sur :
- **L'enrichissement sémantique** du contenu existant
- **Le SEO local** avec des mentions géographiques précises
- **Le maillage interne** avec des ancres descriptives
- **Les données structurées** pour les rich snippets

