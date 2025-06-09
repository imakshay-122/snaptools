import { defineConfig, ConfigEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import markdown from './vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => ({
  optimizeDeps: {
    exclude: ['scrypt-js', 'argon2-browser'],
    esbuildOptions: {
      target: 'esnext',
      supported: {
        'top-level-await': true
      },
      define: {
        'process.env.NODE_DEBUG': 'false',
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      external: ['@vercel/analytics'],
      output: {
        format: 'es',
        inlineDynamicImports: false,
        assetFileNames: 'assets/[name][extname]'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  server: {
    host: "localhost",
    port: 8080,
  },
  plugins: [
    wasm(),
    topLevelAwait(),
    react(),
    mode === 'development' &&
    componentTagger(),
    markdown()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));