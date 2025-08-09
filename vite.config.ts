import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base configuration
const baseConfig = {
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "client/public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    fs: {
      strict: false,
      allow: ['..']
    },
    hmr: {
      host: 'localhost',
      port: 3001
    }
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'client/index.html')
    }
  }
};

export default defineConfig(({ mode }) => {
  // Development-specific configuration
  if (mode === 'development') {
    return {
      ...baseConfig,
      plugins: [react()],
      define: {
        'process.env.NODE_ENV': '"development"',
      },
    };
  }

  // Production configuration
  return {
    ...baseConfig,
    plugins: [react()],
    base: '/',
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  };
});
