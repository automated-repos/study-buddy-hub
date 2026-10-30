// Static (SPA) build for GitHub Pages. Used only by .github/workflows/deploy-pages.yml.
// Lovable keeps using vite.config.ts, so its preview and publish are unaffected.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub project pages live under /<repo-name>/
const base = process.env.PAGES_BASE ?? "/study-buddy-hub/";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    spa: { enabled: true },
    router: { basepath: base.replace(/\/$/, "") },
  },
  vite: { base },
});
