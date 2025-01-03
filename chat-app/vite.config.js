import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext' // Ensures compatibility with modern JavaScript
  },
  server: {
    // Ensures proper MIME type serving during development
    mimeTypes: {
      '.js': 'application/javascript'
    }
  }
});
