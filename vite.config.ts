import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),

    // ✅ Gzip + Brotli compression for production
    mode === "production" &&
    viteCompression({
      algorithm: "brotliCompress", // or "gzip"
      ext: ".br",
      threshold: 10240, // Only compress files > 10KB
      deleteOriginFile: false, // Keep original files
    }),

    // ✅ Bundle visualizer (optional but useful)
    mode === "analyze" &&
    visualizer({
      filename: "bundle-report.html",
      open: true,
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // ✅ Improve caching with versioned assets
    assetsDir: "assets",
    sourcemap: false,
    cssCodeSplit: true,
    minify: "esbuild",
    target: "es2017",
    modulePreload: true,
    manifest: true,

    // ✅ Manual chunking: separate vendor and app code
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
}));
