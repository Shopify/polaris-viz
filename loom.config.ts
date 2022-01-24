import {createWorkspace, createWorkspaceTestPlugin} from '@shopify/loom';
import {eslint} from '@shopify/loom-plugin-eslint';
import {prettier} from '@shopify/loom-plugin-prettier';
import {jest} from '@shopify/loom-plugin-jest';
import {typescript} from '@shopify/loom-plugin-typescript';

// eslint-disable-next-line import/no-default-export
export default createPackage((pkg) => {
  pkg.entry({root: './packages/web/src/index.ts'});
  pkg.use(
    buildLibrary({
      jestTestEnvironment: 'jsdom',
      targets: 'extends @shopify/browserslist-config, node 12.22.0',
      commonjs: true,
      esmodules: true,
      esnext: true,
      rootEntrypoints: false,
    }),
    buildLibraryExtended({graphql: false}),
    buildLibraryWorkspace(),
    buildLibraryExtendedWorkspace({graphql: false}),
    eslint(),
    prettier({files: '**/*.{json,md,yaml,yml}'}),
    jest(),
    typescript(),
    runWorkspaceTests(),
  );
});

function runWorkspaceTests() {
  return createWorkspaceTestPlugin('WorkspaceTests', ({hooks}) => {
    hooks.configure.hook((hooks) => {
      hooks.jestConfig?.hook((config) => {
        if (Array.isArray(config.projects)) {
          config.projects.unshift({
            ...(config.projects[0] as any),
            displayName: 'root',
            rootDir: 'tests',
          });
        }
        return config;
      });
    });
  });
}
