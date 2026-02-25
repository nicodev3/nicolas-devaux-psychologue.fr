import { visit } from "unist-util-visit";

export default function remarkFrenchPunctuationSpacing() {
  return (tree) => {
    visit(tree, "text", (node, _index, parent) => {
      if (!parent || !node.value) return;

      // Keep punctuation glued to previous word in French typography.
      node.value = node.value.replace(/\s+([:;!?])/g, "\u00A0$1");
    });
  };
}
