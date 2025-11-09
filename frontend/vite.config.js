// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/OptimizeList-AI/", // match your repo name
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:9003",
    },
  },
});
