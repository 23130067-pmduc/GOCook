import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/app/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8083',
        changeOrigin: true
      },
      '/swagger-ui': {
        target: 'http://localhost:8083',
        changeOrigin: true
      },
      '/v3': {
        target: 'http://localhost:8083',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../src/main/resources/static/app',
    emptyOutDir: true
  }
}));
