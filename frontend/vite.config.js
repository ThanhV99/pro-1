import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    root: '', // frontend's dir contain index.html
    base: process.env.npm_lifecycle_event === 'build' ? '/static/dist/' : '', // reference path to source in index.html
    build: {
      outDir: '../static/dist/', // export dir
      assetsDir: '',
      manifest: true,
      emptyOutDir: true,
    },
    plugins: [
      vue(),
      viteStaticCopy({
        targets: [
          {
            src: '../static/dist/index.html', // 1️⃣
            dest: '../../templates/', // 2️⃣
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      open: true,
      watch: {
        usePolling: true
      },
    },
  })
})
