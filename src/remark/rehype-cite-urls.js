import { visit } from 'unist-util-visit';

const URL_RE = /https?:\/\/[^\s<]+/g;

function linkifyText(value) {
	const nodes = [];
	let lastIndex = 0;
	let match;

	URL_RE.lastIndex = 0;
	while ((match = URL_RE.exec(value)) !== null) {
		if (match.index > lastIndex) {
			nodes.push({ type: 'text', value: value.slice(lastIndex, match.index) });
		}
		nodes.push({
			type: 'element',
			tagName: 'a',
			properties: { href: match[0] },
			children: [{ type: 'text', value: match[0] }],
		});
		lastIndex = match.index + match[0].length;
	}

	if (nodes.length === 0) {
		return [{ type: 'text', value }];
	}

	if (lastIndex < value.length) {
		nodes.push({ type: 'text', value: value.slice(lastIndex) });
	}

	return nodes;
}

export default function rehypeCiteUrls() {
	return function transformer(tree) {
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'cite' || !Array.isArray(node.children)) return;

			node.children = node.children.flatMap((child) => {
				if (child.type !== 'text') return [child];
				return linkifyText(child.value);
			});
		});
	};
}
