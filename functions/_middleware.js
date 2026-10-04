/**
 * Négociation Markdown pour les agents IA (Cloudflare Pages).
 * Si Accept contient text/markdown, sert le .md statique généré au build.
 */

const NON_PAGE_EXT =
  /\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|mjs|map|woff2?|ttf|eot|xml|txt|json|pdf|zip|mp[34]|webm|md)$/i;

/**
 * @param {string} pathname
 * @returns {string | null} chemin du .md à servir, ou null si hors périmètre
 */
function pathnameToMarkdownAsset(pathname) {
  let p = pathname || '/';

  if (p.includes('\0') || p.split('/').some((segment) => segment === '..')) {
    return null;
  }

  try {
    p = decodeURIComponent(p);
  } catch {
    return null;
  }

  if (p.includes('\0') || p.split('/').some((segment) => segment === '..')) {
    return null;
  }

  if (p.startsWith('/api/') || p === '/api') return null;

  // Assets et non-pages : laisser le pipeline statique / Functions métier.
  if (p !== '/' && NON_PAGE_EXT.test(p) && !p.endsWith('.html')) {
    return null;
  }

  if (p.endsWith('.html')) {
    p = p.slice(0, -'.html'.length);
    if (p.endsWith('/index')) {
      p = p.slice(0, -'/index'.length) || '/';
    } else if (p === '/index' || p === 'index') {
      p = '/';
    }
  }

  if (p.length > 1 && p.endsWith('/')) {
    p = p.slice(0, -1);
  }

  if (p === '/index') p = '/';

  if (p === '/' || p === '') return '/home.md';

  return `${p}.md`;
}

/** @param {import('@cloudflare/workers-types').EventContext} context */
export async function onRequest(context) {
  const { request, next, env } = context;
  const accept = request.headers.get('Accept') || '';

  if (!accept.includes('text/markdown')) {
    return next();
  }

  const url = new URL(request.url);
  const mdPath = pathnameToMarkdownAsset(url.pathname);
  if (!mdPath) {
    return next();
  }

  const assetUrl = new URL(mdPath, url.origin);
  const assetResponse = await env.ASSETS.fetch(new Request(assetUrl, { method: 'GET' }));

  if (!assetResponse.ok) {
    return next();
  }

  const headers = new Headers(assetResponse.headers);
  headers.set('Content-Type', 'text/markdown; charset=utf-8');
  headers.set('Vary', 'Accept');

  return new Response(assetResponse.body, {
    status: 200,
    headers,
  });
}
