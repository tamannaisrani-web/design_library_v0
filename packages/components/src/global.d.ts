/**
 * Ambient declarations.
 *
 * `process.env.NODE_ENV` is referenced in components for dev-time warnings
 * (icon-only buttons missing ariaLabel). Bundlers (Vite, Webpack, esbuild)
 * inline this constant at build time; this declaration just satisfies tsc.
 */
declare const process: {
  env: {
    NODE_ENV?: 'development' | 'production' | 'test';
    [key: string]: string | undefined;
  };
};
