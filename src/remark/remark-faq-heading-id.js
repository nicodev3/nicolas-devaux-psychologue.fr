import { toString } from "mdast-util-to-string";
import { visit } from "unist-util-visit";

export default function remarkFaqHeadingId() {
  return (tree) => {
    visit(tree, "heading", (node) => {
      if (node.depth !== 2) return;

      const headingText = toString(node).trim().toLowerCase();
      if (!headingText.startsWith("questions fréquentes")) return;

      node.data ??= {};
      node.data.hProperties ??= {};
      node.data.hProperties.id = "faq";
    });
  };
}
