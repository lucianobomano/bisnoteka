// @ts-ignore
import { visualEditPlugin } from 'befree-visual-edit/vite';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    visualEditPlugin(),react()],
})
