import path from 'path';

import {buildLibrary} from '@shopify/loom-plugin-build-library';
import {createPackage, createProjectPlugin} from '@shopify/loom';

// Needed so TS realises what configuration hooks are provided by Jest (in `jestAdjustments` below)
import type {} from '@shopify/loom-plugin-jest';

// eslint-disable-next-line import/no-default-export
export default createPackage((pkg) => {
  pkg.entry({root: './src/index.ts'});
  pkg.use(
    buildLibrary({
      targets: 'node 12.22.0',
      commonjs: true,
      esmodules: false,
      esnext: false,
      rootEntrypoints: false,
      jestTestEnvironment: 'jsdom',
    }),
    jestAdjustments(),
  );
});

function jestAdjustments() {
  return createProjectPlugin('PolarisVizNative', ({tasks: {test}}) => {
    test.hook(({hooks}) => {
      hooks.configure.hook((configure) => {
        configure.jestConfig?.hook((config) => {
          return {
            ...config,
            preset: 'react-native',
            moduleNameMapper: {
              ...config.moduleNameMapper,
              '^@quilted/react-testing/matchers$':
                '@quilted/react-testing/build/cjs/matchers/index.cjs',
              '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
              '^d3-(.*)$': path.resolve(
                __dirname,
                '../../node_modules/d3-$1/dist/d3-$1',
              ),
            },
          };
        });
      });
    });
  });
}
