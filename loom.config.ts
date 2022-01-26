import {createWorkspace} from '@shopify/loom';
import {buildLibraryWorkspace} from '@shopify/loom-plugin-build-library';
import {eslint} from '@shopify/loom-plugin-eslint';
import {prettier} from '@shopify/loom-plugin-prettier';
import {stylelint} from '@shopify/loom-plugin-stylelint';

// eslint-disable-next-line import/no-default-export
export default createWorkspace((workspace) => {
  workspace.use(
    buildLibraryWorkspace(),
    eslint(),
    prettier({files: '**/*.{json,md,yaml,yml}'}),
    stylelint({files: '**/*.scss'}),
  );
});
