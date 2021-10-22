import {createPackage, createProjectBuildPlugin, Runtime} from '@shopify/loom';
import {eslint} from '@shopify/loom-plugin-eslint';
import {prettier} from '@shopify/loom-plugin-prettier';
import {stylelint} from '@shopify/loom-plugin-stylelint';
import {
  buildLibrary,
  buildLibraryWorkspace,
} from '@shopify/loom-plugin-build-library';

// eslint-disable-next-line import/no-default-export
export default createPackage((pkg) => {
  pkg.runtimes(Runtime.Node, Runtime.Browser);
  pkg.entry({root: './src/index'});

  pkg.use(
    buildLibrary({
      jestEnvironment: 'jsdom',
      browserTargets: 'extends @shopify/browserslist-config',
      nodeTargets: 'node 12.22.0',
      packageBuildOptions: {
        commonjs: true,
        esmodules: true,
        esnext: true,
        rootEntrypoints: false,
      },
    }),
    buildLibraryWorkspace({graphql: false}),
    eslint(),
    stylelint({files: '**/*.scss'}),
    prettier({files: '**/*.{md,json,yaml,yml}'}),
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
