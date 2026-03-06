import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import path from "path";
import { defineConfig, type Plugin } from "vite";

// ─── Preload hints plugin ─────────────────────────────────────────────────────
// Runs at build end — scans the generated bundle, finds the vendor/motion/main
// chunks and injects <link rel="modulepreload"> tags into index.html.
// This tells the browser to fetch these in parallel with index.html parsing
// instead of waiting for JS to request them — saves 1–2 waterfall round trips.
function preloadPlugin(): Plugin {
  return {
    name: "inject-preloads",
    apply: "build",
    enforce: "post",

    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        const preloadChunks: string[] = [];
        const prefetchChunks: string[] = [];

        for (const [, chunk] of Object.entries(ctx.bundle)) {
          if (chunk.type !== "chunk") continue;
          const file = `/assets/js/${chunk.fileName.split("/").pop()}`;

          // Preload: critical path — needed on first paint
          if (["vendor", "motion", "index"].includes(chunk.name ?? "")) {
            preloadChunks.push(file);
          }
          // Prefetch: used later — fetch during browser idle time
          if (["router", "ui", "radix", "query"].includes(chunk.name ?? "")) {
            prefetchChunks.push(file);
          }
        }

        const preloadTags = preloadChunks
          .map(f => `    <link rel="modulepreload" href="${f}" crossorigin />`)
          .join("\n");
        const prefetchTags = prefetchChunks
          .map(f => `    <link rel="prefetch" href="${f}" as="script" crossorigin />`)
          .join("\n");

        const injection = [
          preloadTags  && `\n    <!-- Critical chunk preloads -->\n${preloadTags}`,
          prefetchTags && `\n    <!-- Deferred chunk prefetches -->\n${prefetchTags}`,
        ].filter(Boolean).join("\n");

        return html.replace("</head>", `${injection}\n  </head>`);
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
    proxy: {
      "/send": { target: "http://localhost:3001", changeOrigin: true },
    },
  },

  plugins: [
    react(),
    preloadPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    assetsInlineLimit: 4096,   // inline tiny assets as base64 — fewer requests

    rollupOptions: {
      output: {
        // Function form gives finer control than object form
        // Keeps chunk identities stable across builds → same hash = browser reuses cache
        manualChunks(id) {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/"))
            return "vendor";
          if (id.includes("node_modules/react-router-dom/") || id.includes("node_modules/react-router/"))
            return "router";
          if (id.includes("node_modules/framer-motion/"))
            return "motion";
          if (id.includes("node_modules/lucide-react/"))
            return "ui";
          if (id.includes("node_modules/@radix-ui/"))
            return "radix";
          if (id.includes("node_modules/@tanstack/"))
            return "query";
        },

        // Subdirectory organisation + hashed names for all outputs
        chunkFileNames:  "assets/js/[name]-[hash].js",
        entryFileNames:  "assets/js/[name]-[hash].js",
        assetFileNames: (info) => {
          const ext = info.name?.split(".").pop() ?? "";
          if (["woff", "woff2", "ttf", "otf"].includes(ext))   return "assets/fonts/[name]-[hash][extname]";
          if (["png","jpg","jpeg","webp","avif","svg","gif","ico"].includes(ext)) return "assets/img/[name]-[hash][extname]";
          if (ext === "css")  return "assets/css/[name]-[hash][extname]";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
}));