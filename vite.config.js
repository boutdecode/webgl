import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: './static/',
  plugins: [
    react(),
    glsl()
  ],
  resolve: {
    alias: {
      '@lib': fileURLToPath(new URL('./src', import.meta.url)),
      '@story': fileURLToPath(new URL('./.storybook', import.meta.url))
    }
  }
})
