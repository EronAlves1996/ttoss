import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  /**
   * TODO: automatic title generation
   * https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   */
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-locale',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
