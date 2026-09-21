import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repository under /wol-lab/; local preview and a
  // future custom domain continue to use the root path.
  base: process.env.GITHUB_ACTIONS ? '/wol-lab/' : '/',
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          icons: ['lucide-react', 'qrcode.react'],
        },
      },
    },
  },
});
