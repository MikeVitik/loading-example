import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  webpackFinal: async (webpackConfig) => {
    webpackConfig.module = webpackConfig.module || {};
    webpackConfig.module.rules = webpackConfig.module.rules || [];

    webpackConfig.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
            compilerOptions: {
              jsx: 'react-jsx',
            },
          },
        },
      ],
    });

    webpackConfig.resolve = webpackConfig.resolve || {};
    webpackConfig.resolve.extensions = webpackConfig.resolve.extensions || [
      '.mjs',
      '.js',
      '.jsx',
      '.json',
    ];

    if (!webpackConfig.resolve.extensions.includes('.ts')) {
      webpackConfig.resolve.extensions.push('.ts');
    }
    if (!webpackConfig.resolve.extensions.includes('.tsx')) {
      webpackConfig.resolve.extensions.push('.tsx');
    }

    return webpackConfig;
  },
};

export default config;

