import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Усі запити, що починаються з /api, будуть перенаправлені на ваш сервер
      '/api': {
        target: 'http://localhost:5000', // Тут вкажіть адресу вашого майбутнього бекенда
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})