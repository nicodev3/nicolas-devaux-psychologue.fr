/**
 * Rasterise favicon.svg → apple-touch-icon.png (180×180) + previews QA.
 * Usage: node scripts/render-favicon.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public", "favicon.svg"), "utf8");

const spiralPath =
  "M16.2 5.8c6.8 0 12.2 5.4 12.2 12.2 0 5.6-3.8 10.4-9.2 11.8-4.6 1.2-9.6.1-12.8-3.2-3-3.2-3.8-8-1.8-12 2-4 6.4-6.2 10.8-5.4 3.8.6 6.6 4 6.4 8-.2 3.6-3.2 6.4-6.8 6.6-2.8.2-5.4-1.8-5.8-4.6";

/** Fond plein + spirale à ~82 % (marge iOS). */
const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#974631"/>
  <g transform="translate(90 90) scale(4.6) translate(-16 -16)">
    <path
      d="${spiralPath}"
      fill="none"
      stroke="#fcfaf4"
      stroke-width="2.65"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>
</svg>`;

function render(svgSource, size, outPath) {
  const resvg = new Resvg(svgSource, {
    fitTo: { mode: "width", value: size },
    background: "transparent",
  });
  writeFileSync(outPath, resvg.render().asPng());
  console.log("wrote", outPath, `(${size}×${size})`);
}

const tmp = join(root, ".tmp-favicon");
mkdirSync(tmp, { recursive: true });

render(svg, 16, join(tmp, "favicon-16.png"));
render(svg, 32, join(tmp, "favicon-32.png"));
render(appleSvg, 180, join(root, "public", "apple-touch-icon.png"));
