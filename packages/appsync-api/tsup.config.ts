import { tsupConfig } from '@ttoss/config';

export const tsup = tsupConfig({
  entryPoints: ['src/index.ts', 'src/cli.ts', 'src/server.ts'],
  noExternal: ['carlin'],
});
