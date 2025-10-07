import { visit } from 'unist-util-visit';

export default function rehypeExternalLinks() {
    return function transformer(tree, file) {
        const astroData = file && file.data && file.data.astro;
        let siteOrigin = null;
        try {
            if (astroData && astroData.site) {
                siteOrigin = new URL(String(astroData.site)).origin;
            }
        } catch {}

        visit(tree, 'element', (node) => {
            if (node.tagName !== 'a') return;
            const href = node.properties && node.properties.href;
            if (!href || typeof href !== 'string') return;

            // Ignore same-page anchors
            if (href.startsWith('#')) return;

            // Determine if external: absolute http(s) and not same origin (when site known)
            const isHttp = href.startsWith('http://') || href.startsWith('https://');
            if (!isHttp) return;

            let isExternal = true;
            if (siteOrigin) {
                try {
                    const linkOrigin = new URL(href).origin;
                    isExternal = linkOrigin !== siteOrigin;
                } catch {}
            }

            if (!isExternal) return;

            node.properties = node.properties || {};
            node.properties.target = '_blank';
            // preserve existing rel, but ensure nofollow noopener noreferrer at minimum
            const existingRel = new Set(
                String(node.properties.rel || '')
                .split(/\s+/)
                .filter(Boolean)
            );
            existingRel.add('noopener');
            existingRel.add('noreferrer');
            node.properties.rel = Array.from(existingRel).join(' ');
        });
    };
}