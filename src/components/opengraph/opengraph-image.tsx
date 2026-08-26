/**
 * Gabarit visuel des cartes Open Graph (équivalent « opengraph-image » App Router Next).
 * Rendu uniquement côté build via Satori — non hydraté dans le navigateur.
 */
import type { ReactNode } from "react";
import {
  OG_BRAND_LINE,
  OG_SITE_LABEL,
  OG_SURFACE,
  OG_TEXT_MUTED,
  OG_TEXT_PRIMARY,
} from "../../utils/og/theme";

export type OpenGraphImageProps = {
  title: string;
  photoDataUrl?: string;
};

function splitTitle(title: string): string[] {
  const normalized = title.replace(/\s+/g, " ").trim();
  const explicit = normalized
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (explicit.length > 1) return explicit.slice(0, 4);
  const words = normalized.split(" ");
  const lines: string[] = [];
  let current = "";
  const maxLen = 34;
  for (const w of words) {
    const next = current ? `${current} ${w}` : w;
    if (next.length <= maxLen) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = w;
    }
    if (lines.length >= 3) break;
  }
  if (current && lines.length < 4) lines.push(current);
  return lines.slice(0, 3);
}

export function OpenGraphImage({
  title,
  photoDataUrl,
}: OpenGraphImageProps): ReactNode {
  const lines = splitTitle(title);
  const primarySize = lines.length <= 2 ? 68 : 56;
  const secondarySize = lines.length <= 2 ? 52 : 44;

  if (photoDataUrl) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          backgroundColor: OG_SURFACE,
          fontFamily: '"Source Serif 4", ui-serif, Georgia, serif',
        }}
      >
        <img
          src={photoDataUrl}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(249,249,249,0.98) 0%, rgba(249,249,249,0.94) 38%, rgba(249,249,249,0.38) 66%, rgba(249,249,249,0.04) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            width: 720,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "66px 72px 58px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 21,
              fontWeight: 600,
              color: OG_TEXT_MUTED,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Outils psychologiques
          </div>
          <div
            style={{
              width: 80,
              height: 4,
              marginTop: 24,
              marginBottom: 34,
              borderRadius: 2,
              backgroundColor: OG_BRAND_LINE,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 66,
              fontWeight: 600,
              color: OG_TEXT_PRIMARY,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
            }}
          >
            {lines.map((line, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginBottom: index < lines.length - 1 ? 8 : 0,
                }}
              >
                {line}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "auto",
              fontSize: 23,
              color: OG_TEXT_MUTED,
              fontWeight: 500,
              letterSpacing: "0.015em",
            }}
          >
            {OG_SITE_LABEL}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px 80px",
        backgroundColor: OG_SURFACE,
        fontFamily: '"Source Serif 4", ui-serif, Georgia, serif',
      }}
    >
      <div
        style={{
          width: 96,
          height: 5,
          backgroundColor: OG_BRAND_LINE,
          marginBottom: 36,
          borderRadius: 2,
        }}
      />
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            fontSize: i === 0 ? primarySize : secondarySize,
            fontWeight: 600,
            color: OG_TEXT_PRIMARY,
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            marginBottom: i < lines.length - 1 ? 14 : 0,
          }}
        >
          {line}
        </div>
      ))}
      <div
        style={{
          marginTop: "auto",
          paddingTop: 48,
          fontSize: 26,
          color: OG_TEXT_MUTED,
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        {OG_SITE_LABEL}
      </div>
    </div>
  );
}
