import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    linear: 'src/linear.ts',
    bold: 'src/bold.ts',
    outline: 'src/outline.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react/jsx-runtime'],
  treeshake: true,
})
