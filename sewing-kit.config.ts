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
      plugins.dupeCheck((defaults) => ({
        ...defaults,
        // @size-limit/time depends on react@17.0.2
        // which is only used in a GitHub action, so we don't care that it's duplicated
        allowlist: new Map([['react', ['16.12.0', '17.0.2']]]),
      })),
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
