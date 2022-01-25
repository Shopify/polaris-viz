import {buildLibrary} from '@shopify/loom-plugin-build-library';
import {buildLibraryExtended} from '@shopify/loom-plugin-build-library-extended';
import {createPackage} from '@shopify/loom';

// eslint-disable-next-line import/no-default-export
export default createPackage((pkg) => {
  pkg.entry({root: './src/index.ts'});
  pkg.use(
    buildLibrary({
      targets: 'extends @shopify/browserslist-config, node 12.22.0',
      commonjs: true,
      esmodules: true,
      esnext: true,
      rootEntrypoints: false,
    }),
    buildLibraryExtended({graphql: false}),
  );
});
