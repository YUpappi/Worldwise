import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          maps: ["leaflet", "react-leaflet"],
          supabase: ["@supabase/supabase-js"],
          query: ["@tanstack/react-query"],
          forms: ["react-hook-form", "react-datepicker"],
          toast: ["react-hot-toast"],
        },
      },
    },
  },
});
