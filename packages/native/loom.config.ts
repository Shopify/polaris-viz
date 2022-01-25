import {buildLibrary} from '@shopify/loom-plugin-build-library';
import {createPackage} from '@shopify/loom';

// eslint-disable-next-line import/no-default-export
export default createPackage((pkg) => {
  pkg.entry({root: 'App.tsx'});
  pkg.use(
    buildLibrary({
      targets: 'node 12.22.0',
      commonjs: true,
      esmodules: true,
      esnext: true,
      rootEntrypoints: true,
    }),
  );
});
