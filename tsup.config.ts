import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'packages/components/assets/icons/index.ts',
    linear: 'packages/components/assets/icons/linear/index.ts',
    bold: 'packages/components/assets/icons/bold/index.ts',
    outline: 'packages/components/assets/icons/outline/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: false,
  clean: true,
  external: ['react', 'react/jsx-runtime'],
  treeshake: true,
})
