/**
 * Intégration locale : génère llms.txt / llms-full.txt / .md après le build.
 * Ne pas appeler llms() du paquet : sous Windows son glob dist\**\*.html
 * ne trouve aucun HTML et produit des fichiers vides.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  fileToUrlPath,
  generateLlmsFullTxtContent,
  generateLlmsTxtContent,
  generateMarkdownFile,
  processHtmlFile,
} from 'astro-llms-md';

/** Nom / description déjà déclarés (WebSite JSON-LD dans BaseHead). */
export const SITE_LLMS_NAME = 'Nicolas Devaux — Psychologue clinicien';
export const SITE_LLMS_DESCRIPTION =
  'Site officiel de Nicolas Devaux, psychologue clinicien (TCC, ACT, MOSAIC, pleine conscience).';

/**
 * @param {string} dir
 * @param {string[]} acc
 */
function walkHtmlFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '_astro' || entry.name === 'node_modules') continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(fullPath, acc);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    if (entry.name === '404.html') continue;
    acc.push(fullPath);
  }

  return acc;
}

/** @param {string} html */
function hasNoindex(html) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
  return metaTags.some((tag) => {
    if (!/\bname\s*=\s*["']robots["']/i.test(tag)) return false;
    const content = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i);
    return Boolean(content && /\bnoindex\b/i.test(content[1]));
  });
}

/**
 * @param {string} urlPath path sans trailing slash (sauf `/`)
 */
function isExcludedPath(urlPath) {
  if (urlPath === '/404') return true;
  if (urlPath.startsWith('/merci')) return true;
  if (urlPath.startsWith('/confirmation')) return true;
  if (urlPath === '/dev' || urlPath.startsWith('/dev/')) return true;
  if (urlPath.startsWith('/blog/tag/')) return true;
  if (urlPath.includes('/draft') || urlPath.includes('/brouillon')) return true;
  return false;
}

/**
 * @param {string} clientDir
 * @param {string} siteUrl
 * @returns {Set<string>} chemins sans trailing slash (sauf `/`)
 */
function loadSitemapPaths(clientDir, siteUrl) {
  const allowed = new Set();
  if (!fs.existsSync(clientDir)) return allowed;

  const origin = siteUrl.replace(/\/$/, '');
  for (const name of fs.readdirSync(clientDir)) {
    // Ignorer sitemap-index.xml (pointe vers d'autres XML, pas des pages).
    if (!/^sitemap-\d+\.xml$/i.test(name)) continue;
    const xml = fs.readFileSync(path.join(clientDir, name), 'utf8');
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
      try {
        const loc = match[1].trim();
        if (!loc.startsWith(origin)) continue;
        const url = new URL(loc);
        let pathname = url.pathname || '/';
        if (pathname.endsWith('.xml')) continue;
        if (pathname.length > 1 && pathname.endsWith('/')) {
          pathname = pathname.slice(0, -1);
        }
        allowed.add(pathname || '/');
      } catch {
        // loc invalide
      }
    }
  }

  return allowed;
}

/** @param {string} urlPath */
function toCanonicalUrlPath(urlPath) {
  if (!urlPath || urlPath === '/') return '/';
  return urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
}

/**
 * Les helpers du paquet retirent le slash final des URL de page ;
 * ce site publie des URL avec trailing slash (sitemap + _redirects).
 * @param {string} markdown
 * @param {string} siteUrl
 * @param {string} urlPath
 */
function withTrailingSlashPageUrl(markdown, siteUrl, urlPath) {
  const canonical = `${siteUrl.replace(/\/$/, '')}${toCanonicalUrlPath(urlPath)}`;
  return markdown.replace(/^url: ".*"$/m, `url: "${canonical}"`);
}

/**
 * @param {string} fullTxt
 * @param {string} siteUrl
 * @param {Array<{ urlPath: string }>} pages
 */
function withTrailingSlashFullTxt(fullTxt, siteUrl, pages) {
  const origin = siteUrl.replace(/\/$/, '');
  let out = fullTxt.replace(/^URL: .*$/m, `URL: ${origin}/`);
  for (const page of pages) {
    const stripped = `${origin}${page.urlPath === '/' ? '' : page.urlPath}`;
    const canonical = `${origin}${toCanonicalUrlPath(page.urlPath)}`;
    out = out.replaceAll(`URL: ${stripped}\n`, `URL: ${canonical}\n`);
    if (!stripped.endsWith('/')) {
      out = out.replaceAll(`URL: ${stripped}/\n`, `URL: ${canonical}\n`);
    }
  }
  return out;
}

/**
 * @param {{
 *   siteUrl?: string;
 *   name?: string;
 *   description?: string;
 * }} [options]
 */
export default function llmsMdIntegration(options = {}) {
  /** @type {string} */
  let siteUrl = options.siteUrl || '';
  const siteName = options.name || SITE_LLMS_NAME;
  const siteDescription = options.description || SITE_LLMS_DESCRIPTION;

  return {
    name: 'local-llms-md',
    hooks: {
      'astro:config:setup': ({ config }) => {
        if (!siteUrl && config.site) {
          siteUrl = String(config.site).replace(/\/$/, '');
        }
      },
      'astro:build:done': async ({ dir, logger }) => {
        const clientDir = fileURLToPath(dir);
        const resolvedSiteUrl = (siteUrl || 'https://nicolas-devaux-psychologue.fr').replace(
          /\/$/,
          '',
        );

        logger.info('Génération locale llms.txt / markdown (parcours fs)…');

        const htmlFiles = walkHtmlFiles(clientDir).sort();
        const sitemapPaths = loadSitemapPaths(clientDir, resolvedSiteUrl);
        const hasSitemapFilter = sitemapPaths.size > 0;

        /** @type {import('astro-llms-md').PageData[]} */
        const pages = [];

        for (const filePath of htmlFiles) {
          const urlPath = fileToUrlPath(filePath, clientDir);
          if (isExcludedPath(urlPath)) continue;
          if (hasSitemapFilter && !sitemapPaths.has(urlPath)) continue;

          const html = fs.readFileSync(filePath, 'utf8');
          if (hasNoindex(html)) continue;

          try {
            const pageData = await processHtmlFile(filePath);
            if (!pageData.title) {
              logger.warn(`llms-md: titre manquant, ignore ${urlPath}`);
              continue;
            }
            pages.push({
              urlPath,
              filePath,
              source: 'prerendered',
              ...pageData,
            });
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logger.warn(`llms-md: erreur sur ${urlPath}: ${message}`);
          }
        }

        pages.sort((a, b) => {
          if (a.urlPath === '/') return -1;
          if (b.urlPath === '/') return 1;
          return a.urlPath.localeCompare(b.urlPath);
        });

        for (const page of pages) {
          const mdRelative =
            page.urlPath === '/' ? 'home.md' : `${page.urlPath.replace(/^\//, '')}.md`;
          const mdPath = path.join(clientDir, mdRelative);
          fs.mkdirSync(path.dirname(mdPath), { recursive: true });
          const md = withTrailingSlashPageUrl(
            generateMarkdownFile(page, resolvedSiteUrl),
            resolvedSiteUrl,
            page.urlPath,
          );
          fs.writeFileSync(mdPath, md, 'utf8');
        }

        const llmsTxt = generateLlmsTxtContent(
          pages,
          resolvedSiteUrl,
          siteName,
          siteDescription,
          true,
        );
        fs.writeFileSync(path.join(clientDir, 'llms.txt'), llmsTxt, 'utf8');

        const llmsFull = withTrailingSlashFullTxt(
          generateLlmsFullTxtContent(pages, resolvedSiteUrl, siteName),
          resolvedSiteUrl,
          pages,
        );
        fs.writeFileSync(path.join(clientDir, 'llms-full.txt'), llmsFull, 'utf8');

        logger.info(
          `llms-md: ${pages.length} page(s), llms.txt, llms-full.txt, ${pages.length} fichier(s) .md`,
        );
      },
    },
  };
}
