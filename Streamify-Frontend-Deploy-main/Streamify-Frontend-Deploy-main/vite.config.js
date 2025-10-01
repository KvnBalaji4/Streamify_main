import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// 👇 Pick up environment variable VITE_BASE from Jenkins, fallback to '/frontapp1/'
const basePath = process.env.VITE_BASE || '/'

export default defineConfig({
  base: basePath,
  plugins: [react()]
})
