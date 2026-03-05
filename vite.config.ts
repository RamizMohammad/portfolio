import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      // In dev, proxy these to the Express server running on :3001
      // so http://localhost:8080/sitemap.xml works during development
      "/sitemap.xml":              { target: "http://localhost:3001", changeOrigin: true },
      "/robots.txt":               { target: "http://localhost:3001", changeOrigin: true },
      "/.well-known/security.txt": { target: "http://localhost:3001", changeOrigin: true },
      "/send":                     { target: "http://localhost:3001", changeOrigin: true },
      "/health":                   { target: "http://localhost:3001", changeOrigin: true },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split big vendor chunks for better long-term caching
        manualChunks: {
          vendor:  ["react", "react-dom"],
          router:  ["react-router-dom"],
          motion:  ["framer-motion"],
          ui:      ["lucide-react"],
          radix:   [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
          ],
        },
      },
    },
  },
}));