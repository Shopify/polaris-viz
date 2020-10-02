/* eslint-disable no-console */

const {resolve} = require('path');
const {cp, mkdir, rm} = require('shelljs');
const fs = require('fs');

const packageJSON = require('../package.json');

const root = resolve(__dirname, '..');
const projectDir = process.argv[2];

if (!projectDir) {
  console.log(
    'A target project directory is required. `yarn build-consumer PROJECT_DIRECTORY`',
  );
  process.exit(1);
}

const projectPolarisDir = resolve(
  root,
  `../${projectDir}/node_modules/@shopify/polaris-viz`,
);

console.log('Cleaning up old build...');
rm('-rf', projectPolarisDir);

const rootDir = resolve(__dirname, '..');

console.log('Copying build to new directory');

fs.rename(`${rootDir}/build`, projectPolarisDir, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully copied to consumer.');
  }
});
