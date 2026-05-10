/// <reference path="../.astro/types.d.ts" />

import type { Alpine } from "alpinejs";

declare global {
  interface Window {
    Alpine: Alpine;
  }
}

export {};
