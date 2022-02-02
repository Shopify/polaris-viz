import {
  createWorkspace,
  createWorkspaceTestPlugin,
  createWorkspacePlugin,
} from '@shopify/loom';
import {buildLibraryWorkspace} from '@shopify/loom-plugin-build-library';
import {eslint} from '@shopify/loom-plugin-eslint';
import {prettier} from '@shopify/loom-plugin-prettier';
import {stylelint} from '@shopify/loom-plugin-stylelint';

function demoPlugin() {
  return createWorkspacePlugin('Demo', ({tasks: {test}}) => {
    test.hook(({hooks}) => {
      hooks.configure.hook((configure) => {
        // Add ./path/to/my-custom-setup.ts to setupFiles
        configure.jestSetupFiles?.hook((files) => [
          ...files,
          './path/to/my-custom-setup.ts',
        ]);
        // Add ./path/to/my-custom-setup-after-env.ts to setupFiles
        configure.jestSetupFilesAfterEnv?.hook((files) => [
          ...files,
          './path/to/my-custom-setup-after-env.ts',
        ]);
      });
    });
  });
}

// eslint-disable-next-line import/no-default-export
export default createWorkspace((workspace) => {
  workspace.use(
    buildLibraryWorkspace(),
    eslint(),
    prettier({files: '**/*.{json,md,yaml,yml}'}),
    stylelint({files: '**/*.scss'}),
  );
});
