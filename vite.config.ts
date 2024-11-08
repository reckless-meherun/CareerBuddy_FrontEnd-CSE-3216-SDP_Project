import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Enables polling mode, useful for WSL or network drives
    },
    hmr: true, // Ensures hot module replacement is enabled
  },
})
