import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/git-repo-puller",
  //  base: import.meta.env.VITE_BASE_PATH || "/git-repo-puller",
  server: {
    port: 3002,
    open: true,
  },
})
