/* eslint-disable no-console */

const {execSync} = require('child_process');
const {
  join,
  resolve: resolvePath,
  basename,
  extname,
  dirname,
  relative,
} = require('path');
const glob = require('glob');

const {
  ensureDirSync,
  writeFileSync,
  readFileSync,
  renameSync,
} = require('fs-extra');
const {rollup} = require('rollup');
const {cp, mv, rm} = require('shelljs');
const copyfiles = require('copyfiles');
const fs = require('fs');

const createRollupConfig = require('../config/rollup');
const {dependencies, peerDependencies} = require('../package.json');

const root = resolvePath(__dirname, '..');
const build = resolvePath(root, 'build');
const finalEsnext = resolvePath(root, 'esnext');

const docs = resolvePath(root, './docs');
const intermediateBuild = resolvePath(root, './build-intermediate');
const mainEntry = resolvePath(intermediateBuild, './index.js');

const scripts = resolvePath(root, 'scripts');
const types = resolvePath(root, 'types');
const tsBuild = resolvePath(scripts, 'tsconfig.json');

const externalPackages = [
  ...Object.keys(dependencies),
  ...Object.keys(peerDependencies),
  '@shopify/react-testing',
  'tslib',
];

execSync(
  `${resolvePath(
    root,
    './node_modules/.bin/tsc',
  )} --outDir ${intermediateBuild} --project ${tsBuild}`,
  {
    stdio: 'inherit',
  },
);

mv(resolvePath(root, 'types/src/*'), types);
rm('-rf', resolvePath(root, 'types/src'));

writeFileSync(
  join(root, 'index.esnext'),
  'export * from "./esnext/index.esnext";',
);

mv(resolvePath(intermediateBuild, 'src/*'), intermediateBuild);

copy(['./src/**/*.md', docs], {up: 1}).catch((error) => {
  console.error(error);
  process.exit(1);
});

copy(['./src/**/*.{scss,svg,png,jpg,jpeg,json}', intermediateBuild], {up: 1})
  // Custom build consumed by Sewing Kit: it preserves all ESNext features
  // including imports/ exports for better tree shaking.
  .then(() => ensureDirSync(finalEsnext))
  .then(() => cp('-R', `${intermediateBuild}/*`, finalEsnext))
  .then(() => {
    const indexPath = join(finalEsnext, 'index.js');
    const esnextIndex = readFileSync(indexPath, 'utf8');
  })
  .then(() => {
    glob(`${finalEsnext}/**/*.js`, (err, files) => {
      for (const file of files) {
        const newFileName = join(
          dirname(file),
          `${basename(file, '.js')}.esnext`,
        );
        renameSync(file, newFileName);

        fs.readFile(newFileName, 'utf8', function(err, fileData) {
          if (err) return console.log(err);

          const imports = fileData
            .split('\n')
            .filter((line) => line.startsWith('import'))
            .map((importLine) =>
              importLine
                .split('from')
                .pop()
                .trim()
                .replace("'", '')
                .replace("'", '')
                .replace(/\\/g, '')
                .replace(';', ''),
            );

          const filteredImports = imports.filter(
            (importLine) =>
              !importLine.startsWith('/') &&
              !importLine.startsWith('.') &&
              !externalPackages.includes(importLine) &&
              !importLine.includes('tslib') &&
              !importLine.includes('@shopify/react-testing'),
          );

          let modifiedFile = fileData;

          filteredImports.map((filteredImport) => {
            const currentDir = dirname(dirname(newFileName));
            const relativePath = relative(currentDir, filteredImport);

            modifiedFile = modifiedFile.replace(
              `'${filteredImport}'`,
              `'${relativePath}'`,
            );

            fs.writeFile(newFileName, modifiedFile, 'utf8', function(err) {
              if (err) return console.log(err);
            });
          });
        });
      }
    });
  })
  // Main CJS and ES modules bundles: supports all our supported browsers and
  // uses the full class names for any Sass imports
  .then(() => runRollup())
  .then(() =>
    Promise.all([
      cp('build/polaris-viz.js', './index.js'),
      cp('build/polaris-viz.es.js', './index.es.js'),
      cp('build/polaris-viz.css', './styles.css'),
      cp('build/polaris-viz.min.css', './styles.min.css'),
      cp('build/styles.scss', './styles.scss'),
      cp('-r', 'build/styles', './styles'),
    ]),
  )
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function runRollup() {
  const config = createRollupConfig({
    entry: mainEntry,
    cssPath: resolvePath(build, 'polaris-viz.css'),
  });

  return rollup(config).then((bundle) =>
    Promise.all([
      bundle.write({
        format: 'cjs',
        file: resolvePath(build, 'polaris-viz.js'),
      }),
      bundle.write({
        format: 'esm',
        file: resolvePath(build, 'polaris-viz.es.js'),
      }),
    ]),
  );
}

function copy(paths, config) {
  return new Promise((resolve, reject) => {
    copyfiles(paths, config, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
