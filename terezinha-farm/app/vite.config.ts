// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { babelConfig } from '@ttoss/config';
import { config } from '@terezinha-farm/config';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';

/**
 * Create an object with the same values as the config object, but with the
 * keys prefixed with `VITE_`.
 */
const configVite = Object.entries(config).reduce((acc, [key, value]) => {
  acc[`VITE_${key}`] = value;
  return acc;
}, {});

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    define: {
      'process.env': {
        ...configVite,
      },
    },
    plugins: [
      react({
        babel: {
          plugins: babelConfig().plugins,
        },
      }),
      visualizer({
        filename: 'stats/index.html',
      }),
    ],
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
      },
    },
  };
});
