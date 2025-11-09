// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/OptimizeList-AI/", // must match your GitHub repo & server static path
  plugins: [react()],
  build: {
    outDir: "dist", // default, ensures production files go here
    rollupOptions: {
      output: {
        // Ensure correct paths for CSS/JS assets
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:9003", // local API proxy for dev
    },
  },
});
