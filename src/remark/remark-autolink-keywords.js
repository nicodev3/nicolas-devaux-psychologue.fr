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

    return function transformer(tree) {
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