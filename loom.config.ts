import {createWorkspace, createWorkspaceTestPlugin} from '@shopify/loom';
import {buildLibraryWorkspace} from '@shopify/loom-plugin-build-library';
import {eslint} from '@shopify/loom-plugin-eslint';
import {prettier} from '@shopify/loom-plugin-prettier';
import {stylelint} from '@shopify/loom-plugin-stylelint';

// Needed so TS realises what configuration hooks are provided by Jest (in `jestAdjustments` below)
import type {} from '@shopify/loom-plugin-jest';

// eslint-disable-next-line import/no-default-export
export default createWorkspace((workspace) => {
  workspace.use(
    buildLibraryWorkspace(),
    eslint(),
    prettier({files: '**/*.{json,md,yaml,yml}'}),
    stylelint({files: '**/*.scss'}),
    jestAdjustments(),
  );
});

// Add root tests folder to jest config
function jestAdjustments() {
  return createWorkspaceTestPlugin('WorkspaceTests', ({hooks}) => {
    hooks.configure.hook((hooks) => {
      hooks.jestConfig?.hook((config) => {
        if (Array.isArray(config.projects)) {
          config.projects.unshift({
            // generating root based on package with index 1 (polaris-viz-core)
            ...(config.projects[1] as any),
            displayName: 'root',
            rootDir: 'tests',
          });
        }
        return config;
      });
    });
  });
}
