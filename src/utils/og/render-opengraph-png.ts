import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import React from "react";
import satori from "satori";
import { OpenGraphImage } from "../../components/opengraph/opengraph-image";

const OG_W = 1200;
const OG_H = 630;

/** Satori attend du WOFF/TTF (pas WOFF2). Fichiers : package @fontsource/source-serif-4. */
function loadSerifFonts() {
  const dir = path.join(process.cwd(), "node_modules/@fontsource/source-serif-4/files");
  const w400 = fs.readFileSync(path.join(dir, "source-serif-4-latin-400-normal.woff"));
  const w600 = fs.readFileSync(path.join(dir, "source-serif-4-latin-600-normal.woff"));
  return [
    { name: "Source Serif 4", data: w400, style: "normal", weight: 400 },
    { name: "Source Serif 4", data: w600, style: "normal", weight: 600 },
  ];
}

export function truncateOgTitle(title: string, max = 190): string {
  const t = title.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

export async function renderOpenGraphPng(title: string): Promise<Uint8Array> {
  const fonts = loadSerifFonts();
  const safeTitle = truncateOgTitle(title);

  const svg = await satori(React.createElement(OpenGraphImage, { title: safeTitle }), {
    width: OG_W,
    height: OG_H,
    // Précision du union Weight dans les typings Satori / Buffer vs ArrayBuffer.
    fonts: fonts as Parameters<typeof satori>[1] extends { fonts?: infer F } ? F : never,
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_W },
  });
  return resvg.render().asPng();
}
