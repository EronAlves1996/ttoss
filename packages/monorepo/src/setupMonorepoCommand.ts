import * as eslintTool from './tools/eslint';
import * as fs from 'fs';
import * as gitTool from './tools/git';
import * as githubTool from './tools/github';
import * as huskyTool from './tools/husky';
import * as lernaTool from './tools/lerna';
import * as path from 'path';
import * as turboTool from './tools/turbo';
import { CommandModule } from 'yargs';
import { spawn } from './spawn';
import log from 'npmlog';

const logPrefix = '@ttoss/monorepo';

const tools: {
  installPackages?: string[];
  executeCommands?: () => void;
  scripts?: Record<string, string>;
}[] = [eslintTool, gitTool, githubTool, huskyTool, lernaTool, turboTool];

const installPackages = () => {
  spawn('yarn', [
    'add',
    '-DW',
    ...tools
      .map((tool) => {
        return tool?.installPackages || [];
      })
      .flat(),
  ]);
};

const executeCommands = () => {
  tools.forEach((tool) => {
    return tool.executeCommands?.();
  });
};

const configurePackagesJson = () => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  const packagesJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  delete packagesJson.dependencies;
  delete packagesJson.devDependencies;
  delete packagesJson.peerDependencies;

  /**
   * To avoid error Workspaces can only be enabled in private projects.
   */
  packagesJson.private = true;

  if (!packagesJson.workspaces) {
    packagesJson.workspaces = ['docs/**/*', 'packages/**/*'];
  }

  packagesJson.scripts = {
    ...tools.reduce((acc, tool) => {
      return { ...acc, ...tool.scripts };
    }, {}),
    ...packagesJson.scripts,
  };

  fs.writeFileSync(packageJsonPath, JSON.stringify(packagesJson, null, 2));
};

export const setupMonorepoCommand: CommandModule = {
  command: ['setup', '$0'],
  describe: 'Setup monorepo',
  builder: {},
  handler: async (argv) => {
    if (argv._.length === 0) {
      log.info(logPrefix, 'Setup monorepo');

      configurePackagesJson();
      installPackages();
      executeCommands();
    }
  },
};
