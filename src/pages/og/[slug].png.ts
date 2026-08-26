import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import path from "node:path";
import { OG_TITLES, STATIC_OG_SLUGS } from "../../data/og-meta";
import { renderOpenGraphPng } from "../../utils/og/render-opengraph-png";

export async function getStaticPaths() {
  const blog = await getCollection("blog");
  const staticPaths = STATIC_OG_SLUGS.map((slug) => ({
    params: { slug },
    props: { ogTitle: OG_TITLES[slug], ogSlug: slug },
  }));
  const blogPaths = blog.map((post) => ({
    params: { slug: `blog-${post.id}` },
    props: { ogTitle: post.data.title, ogSlug: `blog-${post.id}` },
  }));
  return [...staticPaths, ...blogPaths];
}

type Props = { ogTitle: string; ogSlug: string };

export const GET: APIRoute<Props> = async ({ props }) => {
  const photoPath =
    props.ogSlug === "outils"
      ? path.join(process.cwd(), "src/assets/outils-psychologiques-partage.jpg")
      : undefined;
  const png = await renderOpenGraphPng(props.ogTitle, { photoPath });
  return new Response(Buffer.from(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
