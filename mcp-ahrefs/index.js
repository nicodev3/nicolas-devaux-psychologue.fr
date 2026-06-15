#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const AHREFS_API_KEY = process.env.AHREFS_API_KEY;
const AHREFS_API_BASE = "https://api.ahrefs.com/v3";

if (!AHREFS_API_KEY) {
  console.error("Error: AHREFS_API_KEY environment variable is required");
  process.exit(1);
}

/**
 * Fait une requête à l'API Ahrefs
 */
async function ahrefsRequest(endpoint, params = {}) {
  const queryParams = new URLSearchParams({
    ...params,
    token: AHREFS_API_KEY,
  });

  const url = `${AHREFS_API_BASE}${endpoint}?${queryParams}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ahrefs API error (${response.status}): ${errorText}`);
  }

  return await response.json();
}

const server = new Server(
  {
    name: "ahrefs-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Liste des outils disponibles
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "ahrefs_domain_rating",
        description: "Obtient les métriques d'un domaine (Domain Rating, backlinks, referring domains, organic traffic)",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Le domaine à analyser (ex: example.com)",
            },
          },
          required: ["target"],
        },
      },
      {
        name: "ahrefs_url_rating",
        description: "Obtient les métriques d'une URL spécifique (URL Rating, backlinks, referring domains)",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "L'URL complète à analyser (ex: https://example.com/page)",
            },
          },
          required: ["url"],
        },
      },
      {
        name: "ahrefs_backlinks",
        description: "Liste les backlinks d'un domaine ou d'une URL (limité à 1000 résultats par requête)",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Le domaine ou l'URL à analyser",
            },
            mode: {
              type: "string",
              enum: ["domain", "exact", "prefix", "subdomains"],
              description: "Mode d'analyse (domain=tout le domaine, exact=URL exacte, prefix=URLs commençant par, subdomains=inclut sous-domaines)",
              default: "domain",
            },
            limit: {
              type: "number",
              description: "Nombre de résultats (max 1000)",
              default: 100,
            },
            order_by: {
              type: "string",
              enum: ["first_seen:desc", "first_seen:asc", "domain_rating:desc", "domain_rating:asc", "url_rating:desc", "url_rating:asc"],
              description: "Ordre de tri des résultats",
              default: "first_seen:desc",
            },
          },
          required: ["target"],
        },
      },
      {
        name: "ahrefs_organic_keywords",
        description: "Liste les mots-clés organiques pour lesquels un domaine ou une URL se positionne",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Le domaine ou l'URL à analyser",
            },
            country: {
              type: "string",
              description: "Code pays (ex: fr, us, gb)",
              default: "fr",
            },
            mode: {
              type: "string",
              enum: ["domain", "exact", "prefix", "subdomains"],
              description: "Mode d'analyse",
              default: "domain",
            },
            limit: {
              type: "number",
              description: "Nombre de résultats (max 1000)",
              default: 100,
            },
            order_by: {
              type: "string",
              enum: ["position:asc", "position:desc", "traffic:desc", "volume:desc"],
              description: "Ordre de tri",
              default: "traffic:desc",
            },
          },
          required: ["target"],
        },
      },
      {
        name: "ahrefs_top_pages",
        description: "Liste les pages les plus performantes d'un domaine en termes de trafic organique",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Le domaine à analyser",
            },
            country: {
              type: "string",
              description: "Code pays (ex: fr, us, gb)",
              default: "fr",
            },
            limit: {
              type: "number",
              description: "Nombre de résultats (max 1000)",
              default: 50,
            },
          },
          required: ["target"],
        },
      },
      {
        name: "ahrefs_competing_domains",
        description: "Trouve les domaines concurrents qui se positionnent sur les mêmes mots-clés",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Le domaine à analyser",
            },
            country: {
              type: "string",
              description: "Code pays (ex: fr, us, gb)",
              default: "fr",
            },
            limit: {
              type: "number",
              description: "Nombre de résultats",
              default: 50,
            },
          },
          required: ["target"],
        },
      },
      {
        name: "ahrefs_keywords_explorer",
        description: "Recherche et analyse des mots-clés (volume, difficulté, CPC, etc.)",
        inputSchema: {
          type: "object",
          properties: {
            keyword: {
              type: "string",
              description: "Le mot-clé à analyser",
            },
            country: {
              type: "string",
              description: "Code pays (ex: fr, us, gb)",
              default: "fr",
            },
          },
          required: ["keyword"],
        },
      },
      {
        name: "ahrefs_referring_domains",
        description: "Liste les domaines référents (qui font des liens vers votre site)",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Le domaine à analyser",
            },
            mode: {
              type: "string",
              enum: ["domain", "exact", "prefix", "subdomains"],
              description: "Mode d'analyse",
              default: "domain",
            },
            limit: {
              type: "number",
              description: "Nombre de résultats (max 1000)",
              default: 100,
            },
            order_by: {
              type: "string",
              enum: ["domain_rating:desc", "domain_rating:asc", "first_seen:desc", "first_seen:asc"],
              description: "Ordre de tri",
              default: "domain_rating:desc",
            },
          },
          required: ["target"],
        },
      },
      {
        name: "ahrefs_anchors",
        description: "Analyse les textes d'ancrage (anchor texts) des backlinks",
        inputSchema: {
          type: "object",
          properties: {
            target: {
              type: "string",
              description: "Le domaine ou URL à analyser",
            },
            mode: {
              type: "string",
              enum: ["domain", "exact", "prefix", "subdomains"],
              description: "Mode d'analyse",
              default: "domain",
            },
            limit: {
              type: "number",
              description: "Nombre de résultats",
              default: 100,
            },
          },
          required: ["target"],
        },
      },
    ],
  };
});

/**
 * Gestionnaire des appels d'outils
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "ahrefs_domain_rating": {
        const data = await ahrefsRequest("/site-explorer/metrics", {
          target: args.target,
          mode: "domain",
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "ahrefs_url_rating": {
        const data = await ahrefsRequest("/site-explorer/metrics", {
          target: args.url,
          mode: "exact",
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "ahrefs_backlinks": {
        const data = await ahrefsRequest("/site-explorer/backlinks", {
          target: args.target,
          mode: args.mode || "domain",
          limit: args.limit || 100,
          order_by: args.order_by || "first_seen:desc",
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "ahrefs_organic_keywords": {
        const data = await ahrefsRequest("/site-explorer/organic-keywords", {
          target: args.target,
          country: args.country || "fr",
          mode: args.mode || "domain",
          limit: args.limit || 100,
          order_by: args.order_by || "traffic:desc",
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "ahrefs_top_pages": {
        const data = await ahrefsRequest("/site-explorer/top-pages", {
          target: args.target,
          country: args.country || "fr",
          limit: args.limit || 50,
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "ahrefs_competing_domains": {
        const data = await ahrefsRequest("/site-explorer/competing-domains", {
          target: args.target,
          country: args.country || "fr",
          limit: args.limit || 50,
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "ahrefs_keywords_explorer": {
        const data = await ahrefsRequest("/keywords-explorer/overview", {
          keyword: args.keyword,
          country: args.country || "fr",
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "ahrefs_referring_domains": {
        const data = await ahrefsRequest("/site-explorer/referring-domains", {
          target: args.target,
          mode: args.mode || "domain",
          limit: args.limit || 100,
          order_by: args.order_by || "domain_rating:desc",
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "ahrefs_anchors": {
        const data = await ahrefsRequest("/site-explorer/anchors", {
          target: args.target,
          mode: args.mode || "domain",
          limit: args.limit || 100,
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

/**
 * Démarrage du serveur
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Ahrefs MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
