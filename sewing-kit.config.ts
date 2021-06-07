import {join} from 'path';

import {ConfigurationCallback, Env, Plugins} from '@shopify/sewing-kit';

// eslint-disable-next-line import/no-default-export
export default function sewingKitConfig(
  plugins: Plugins,
): ReturnType<ConfigurationCallback> {
  return {
    name: 'polaris-viz',
    library: true,
    plugins: [
      plugins.jest((config) => {
        config.roots = [join(__dirname, 'src'), join(__dirname, 'tests')];

        // Code coverage
        config.collectCoverageFrom = [
          'src/**/*.{ts,tsx}',
          '!src/test-utilities/**/*.*',
          '!src/**/index.{ts,tsx}',
          '!src/**/*.d.ts',
          '!src/**/*.test.{ts,tsx}',
          '!src/**/*.stories.{ts,tsx}',
        ];

        return config;
      }),
    ],
  };
}
