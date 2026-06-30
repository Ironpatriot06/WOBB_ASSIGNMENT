import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const repoName = "WOBB_ASSIGNMENT";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages project sites: https://<user>.github.io/<repo>/
  base: mode === "gh-pages" ? `/${repoName}/` : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
}));
