import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress', // Use Brotli for better compression
      ext: '.br',
      threshold: 1024,
    }),
    viteCompression({
      algorithm: 'gzip', // Fallback to Gzip
      ext: '.gz',
      threshold: 1024,
    }),
    mode === 'analyze' && visualizer({
      open: true, // Automatically open the report
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['@reduxjs/toolkit', 'react-redux', 'axios', 'date-fns'],
          ui: ['framer-motion', 'lucide-react', 'sonner'],
        },
      },
    },
  },
}));