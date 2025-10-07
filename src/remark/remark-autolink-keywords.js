import { visit } from 'unist-util-visit';

/**
 * Remark plugin: auto-link specified keywords to internal URLs.
 * - Ignore inside existing links/code/inlineCode.
 * - Limit number of auto-links per page.
 * - Avoid overlapping and already-linked occurrences.
 *
 * @param {Object} options
 * @param {Record<string, string>} options.keywordMap - map of keyword -> url
 * @param {number} [options.perPageLimit=5] - maximum links to insert per document
 */
export default function remarkAutolinkKeywords(options = {}) {
    const { keywordMap = {}, perPageLimit = 5 } = options;
    const keywords = Object.keys(keywordMap)
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);

    if (keywords.length === 0) return () => {};

    const patterns = keywords.map((kw) => ({
        keyword: kw,
        url: keywordMap[kw],
        // Simple word boundary for robustness; accents are preserved in source
        regexp: new RegExp(`(\\b)(${escapeRegex(kw)})(\\b)`, 'i'),
    }));

    return function transformer(tree, file) {
        const currentPath = normalizePath(
            (file && file.data && file.data.astro && (
                (file.data.astro.url && file.data.astro.url.pathname) ||
                (file.data.astro.canonicalURL && file.data.astro.canonicalURL.pathname) ||
                (file.data.astro.fileUrl && file.data.astro.fileUrl.pathname) ||
                (function() {
                    try {
                        const site = file.data.astro && file.data.astro.site;
                        const reqUrl = file.data.astro && file.data.astro.request && file.data.astro.request.url;
                        if (reqUrl) return new URL(reqUrl, site || 'http://localhost').pathname;
                    } catch {}
                    return null;
                })()
            )) || null
        );
        let inserted = 0;
        visit(tree, 'text', (node, index, parent) => {
            if (inserted >= perPageLimit) return;
            if (!parent) return;
            const parentType = parent.type;
            if (parentType === 'link' || parentType === 'inlineCode' || parentType === 'code') {
                return;
            }

            let remainingText = String(node.value);
            if (!remainingText.trim()) return;

            const newChildren = [];

            for (const { keyword, url, regexp }
                of patterns) {
                if (inserted >= perPageLimit) break;
                const match = regexp.exec(remainingText);
                if (!match) continue;

                const start = match.index + match[1].length;
                const end = start + match[2].length;

                const before = remainingText.slice(0, start);
                const middle = remainingText.slice(start, end);
                const after = remainingText.slice(end);

                // Éviter de créer un lien vers la page courante
                const targetPath = normalizePath(url);
                if (currentPath && targetPath && currentPath === targetPath) {
                    if (before) newChildren.push({ type: 'text', value: before });
                    newChildren.push({ type: 'text', value: middle });
                    remainingText = after;
                    continue;
                }

                if (before) newChildren.push({ type: 'text', value: before });
                newChildren.push({
                    type: 'link',
                    url,
                    title: keyword,
                    children: [{ type: 'text', value: middle }],
                });
                inserted += 1;
                remainingText = after;
            }

            if (newChildren.length > 0) {
                if (remainingText) newChildren.push({ type: 'text', value: remainingText });
                parent.children.splice(index, 1, ...newChildren);
                return index + newChildren.length;
            }
        });
    };
}

function escapeRegex(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizePath(url) {
    if (!url) return null;
    try {
        // If it's an absolute URL, parse and return pathname
        if (String(url).startsWith('http://') || String(url).startsWith('https://')) {
            return new URL(String(url)).pathname.replace(/\/*$/, '/');
        }
        // Ensure leading slash, collapse multiple slashes, ensure trailing slash for directories
        const withLeading = ('/' + String(url)).replace(/\/+/g, '/');
        const pathname = withLeading.endsWith('/') ? withLeading : withLeading + '/';
        return pathname;
    } catch {
        return String(url);
    }
}