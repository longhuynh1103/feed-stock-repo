import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(), // Bắt buộc đặt TRƯỚC react() để sinh route tự động
    react(),
    tsconfigPaths(),
    tailwindcss(), // Tích hợp Tailwind v4 làm Vite plugin
  ],
})
