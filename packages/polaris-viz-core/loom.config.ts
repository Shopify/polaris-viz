import {buildLibraryExtended} from '@shopify/loom-plugin-build-library-extended';
import {buildLibrary} from '@shopify/loom-plugin-build-library';
import {
  createPackage,
  createProjectBuildPlugin,
  createProjectPlugin,
} from '@shopify/loom';

// eslint-disable-next-line import/no-default-export
export default createPackage((pkg) => {
  pkg.entry({root: './src/index.ts'});
  pkg.use(
    buildLibrary({
      jestTestEnvironment: 'jsdom',
      targets: 'extends @shopify/browserslist-config, node 12.22.0',
      commonjs: true,
      esmodules: true,
      esnext: true,
      rootEntrypoints: false,
    }),
    jestAdjustments(),
    buildLibraryExtended(),
    rollupAdjustOutputPlugin(),
  );
});

// Shamelessly copied from
// https://github.com/Shopify/polaris-react/blob/21385f59a89a9d9f920f2ffa9e9d80930c7d176b/loom.config.ts#L186-L225
function rollupAdjustOutputPlugin() {
  return createProjectBuildPlugin('PolarisVizRollupOutputPlugin', ({hooks}) => {
    hooks.target.hook(({hooks, target}) => {
      const isDefaultBuild = Object.keys(target.options).length === 0;
      if (!isDefaultBuild) {
        return;
      }

      hooks.configure.hook(async (configuration) => {
        configuration.rollupOutputs?.hook((outputs) => {
          for (const output of outputs) {
            if (typeof output.entryFileNames === 'string') {
              output.entryFileNames = output.entryFileNames.replace(
                /\.mjs$/,
                '.js',
              );
            }
          }

          return outputs;
        });
      });
    });
  });
}

function jestAdjustments() {
  return createProjectPlugin('PolarisVizCore', ({tasks: {test}}) => {
    test.hook(({hooks}) => {
      hooks.configure.hook((configure) => {
        configure.jestConfig?.hook((config) => {
          return {
            ...config,
            transformIgnorePatterns: ['<rootDir>/node_modules/(?!d3)'],
          };
        });
      });
    });
  });
}
