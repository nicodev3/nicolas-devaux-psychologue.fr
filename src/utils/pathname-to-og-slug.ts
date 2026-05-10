import { STATIC_OG_SLUG_SET } from "../data/og-meta";

/**
 * Convertit le chemin de page en slug de fichier `/og/{slug}.png`.
 */
export function pathnameToOgSlug(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  const path = trimmed === "" ? "/" : trimmed;
  if (path === "/") return "index";
  const parts = path.slice(1).split("/").filter(Boolean);
  const slug = parts.join("-");
  if (STATIC_OG_SLUG_SET.has(slug)) return slug;
  if (slug.startsWith("blog-")) return slug;
  return "index";
}
