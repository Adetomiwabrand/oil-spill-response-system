import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Changing this to a clean function signature to make TypeScript happy
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('@tanstack')) return 'query-vendor';
            if (id.includes('lucide-react')) return 'lucide-vendor';
            if (id.includes('supabase')) return 'supabase-vendor';
          }
        },
      },
    },
  },
});