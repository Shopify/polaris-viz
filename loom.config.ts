import {join} from 'path';

import {
  createPackage,
  createProjectBuildPlugin,
  createProjectPlugin,
  createWorkspaceTestPlugin,
  Runtime,
} from '@shopify/loom';
import replace from '@rollup/plugin-replace';
import {eslint} from '@shopify/loom-plugin-eslint';
import {prettier} from '@shopify/loom-plugin-prettier';
import {stylelint} from '@shopify/loom-plugin-stylelint';
import {
  buildLibrary,
  buildLibraryWorkspace,
} from '@shopify/loom-plugin-build-library';

import packageJSON from './package.json';

// eslint-disable-next-line import/no-default-export
export default createPackage((pkg) => {
  pkg.runtimes(Runtime.Node, Runtime.Browser);
  pkg.entry({root: './src/index'});

  pkg.use(
    buildLibrary({
      jestEnvironment: 'jsdom',
      browserTargets: 'extends @shopify/browserslist-config',
      nodeTargets: 'node 12.20.0',
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
    runWorkspaceTests(),
    rollupAdjustOutputPlugin(),
    rollupAdjustPluginPlugin(),
  );
});

function runWorkspaceTests() {
  return createWorkspaceTestPlugin('PolarisViz.WorkspaceTests', ({hooks}) => {
    hooks.configure.hook((hooks: any) => {
      hooks.jestConfig?.hook((config: any) => {
        if (Array.isArray(config.projects)) {
          config.projects.forEach((project: any) => {
            project.roots = [join(__dirname, 'src')];
            project.modulePaths = ['<rootDir>/src'];
          });
        }
        return config;
      });
    });
  });
}

export function rollupAdjustPluginPlugin() {
  return createProjectBuildPlugin('PolarisVizRollupBuildPlugin', ({hooks}) => {
    hooks.target.hook(({hooks, target}) => {
      hooks.configure.hook((configuration) => {
        configuration.rollupPlugins?.hook((rollupPlugins) => {
          return [
            replace({
              '{{POLARIS_VIZ_VERSION}}': packageJSON.version,
              delimiters: ['', ''],
              preventAssignment: true,
            }),
            ...rollupPlugins,
          ];
        });
      });
    });
  });
}

// Shamelessly copied from
// https://github.com/Shopify/polaris-react/blob/21385f59a89a9d9f920f2ffa9e9d80930c7d176b/loom.config.ts#L186-L225
function rollupAdjustOutputPlugin() {
  return createProjectPlugin(
    'PolarisVizRollupOutputPlugin',
    ({tasks: {build}}: {tasks: any}) => {
      build.hook(({hooks}: {hooks: any}) => {
        hooks.target.hook(({hooks, target}: {hooks: any; target: any}) => {
          const isDefaultBuild = Object.keys(target.options).length === 0;
          if (!isDefaultBuild) {
            return;
          }

          hooks.configure.hook(async (configuration: any) => {
            configuration.rollupOutputs?.hook((outputs: any) => {
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
    },
  );
}
