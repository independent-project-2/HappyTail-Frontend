import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://happytail-backend-btdnewfhhvajeybe.southeastasia-01.azurewebsites.net',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
