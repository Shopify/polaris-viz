/* eslint-disable no-console */

const {resolve} = require('path');
const {exit} = require('process');

const {config, cp, mkdir, rm} = require('shelljs');

const root = resolve(__dirname, '..');
const packageName = process.argv[2];
const projectDir = process.argv[3];

config.fatal = true;

if (!packageName) {
  console.log(
    'Please define which package you want to copy to the consumer. `yarn build-consumer PACKAGE_NAME PROJECT_DIRECTORY`',
  );
  process.exit(1);
}

if (!projectDir) {
  console.log(
    'A target project directory is required. `yarn build-consumer PACKAGE_NAME PROJECT_DIRECTORY`',
  );
  process.exit(1);
}

const packageJSON = require(`../packages/${packageName}/package.json`);
const projectPolarisDir = resolve(
  root,
  `../${projectDir}/node_modules/@shopify/${packageName}`,
);
const files = [
  'package.json',
  'README.md',
  'CHANGELOG.md',
  ...packageJSON.files.filter((filename) => !filename.startsWith('!')),
];

const filesWithPath = files.map((file) =>
  resolve(root, `packages/${packageName}/${file}`),
);

console.log('Cleaning up old build...');
rm('-rf', projectPolarisDir);

console.log('Creating new build directory...');
mkdir(projectPolarisDir);

console.log('Copying build to node_modules...');
cp('-R', filesWithPath, projectPolarisDir);

console.log(
  'Build copied to consuming project. You can now run the consuming app and it will include your changes from Polaris Viz.',
);
