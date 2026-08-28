import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "./src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "ag-grid-community",
        "ag-grid-react",
      ],
    },
  },
});
