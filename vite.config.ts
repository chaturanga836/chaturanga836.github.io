import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const sourceIndex = path.resolve(__dirname, "index.source.html");

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@content": path.resolve(__dirname, "content"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: sourceIndex,
      },
    },
  },
});
