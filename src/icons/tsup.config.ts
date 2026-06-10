import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index:   'src/index.ts',
    linear:  'src/linear/index.ts',
    bold:    'src/bold/index.ts',
    outline: 'src/outline/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: false,
  clean: true,
  external: ['react', 'react/jsx-runtime'],
  treeshake: true,
})
