import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { OG_TITLES, STATIC_OG_SLUGS } from "../../data/og-meta";
import { renderOpenGraphPng } from "../../utils/og/render-opengraph-png";

export async function getStaticPaths() {
  const blog = await getCollection("blog");
  const staticPaths = STATIC_OG_SLUGS.map((slug) => ({
    params: { slug },
    props: { ogTitle: OG_TITLES[slug] },
  }));
  const blogPaths = blog.map((post) => ({
    params: { slug: `blog-${post.id}` },
    props: { ogTitle: post.data.title },
  }));
  return [...staticPaths, ...blogPaths];
}

type Props = { ogTitle: string };

export const GET: APIRoute<Props> = async ({ props }) => {
  const png = await renderOpenGraphPng(props.ogTitle);
  return new Response(Buffer.from(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
