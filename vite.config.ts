import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    }
  },
  build: {
    target: 'es2015',
    polyfillDynamicImport: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    babel: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['last 2 versions', 'ie >= 11']
          }
        }]
      ]
    }
  }

})
