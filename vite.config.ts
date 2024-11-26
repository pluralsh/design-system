import { resolve } from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: { index: resolve(__dirname, 'src/index.ts') },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'styled-components',
        '@emotion/react',
        '@emotion/styled',
        'honorable',
        'honorable-theme-default',
        'react-transition-group',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ['styled-components'],
        babelrc: false,
        configFile: false,
      },
    }),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      format: 'esm',
    },
  },
})
