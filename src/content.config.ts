import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { BLOG_TAGS } from "./consts";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      seoTitle: z.string().optional(),
      description: z.string(),
      // Transform string to Date object.
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      tags: z.array(z.enum(BLOG_TAGS)).optional().default([]),
    }),
});

export const collections = { blog };
