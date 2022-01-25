import {createComposedProjectPlugin} from '@shopify/loom';
import {buildLibrary, rollupPlugins} from '@shopify/loom-plugin-build-library';

export const createLoomPackagePlugin = () =>
  createComposedProjectPlugin('InternalPackage', [
    buildLibrary({
      targets: 'node 12.22.0',
      commonjs: true,
      esmodules: true,
      esnext: true,
    }),
  ]);
