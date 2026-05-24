import { visit } from 'unist-util-visit';
import { applyFrenchTypography } from '../utils/frenchTypography.js';

const SKIP_PARENTS = new Set(['code', 'inlineCode', 'html', 'yaml', 'toml']);

export default function remarkFrenchPunctuationSpacing() {
  return (tree) => {
    visit(tree, 'text', (node, _index, parent) => {
      if (!parent || !node.value || SKIP_PARENTS.has(parent.type)) return;
      node.value = applyFrenchTypography(node.value);
    });
  };
}
