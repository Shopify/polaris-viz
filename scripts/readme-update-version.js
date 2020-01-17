/* eslint-disable no-console */

const {resolve} = require('path');
const {execSync} = require('child_process');
const {writeFileSync, readFileSync, existsSync} = require('fs-extra');
const {version: newVersion} = require('../package.json');
const {semverRegExp, readmes} = require('./utilities');

const root = resolve(__dirname, '..');

const readmeFiles = readmes.filter((file) => existsSync(file));
console.log(`🆕 Updating version in ${readmeFiles.join(', ')}...`);
readmeFiles
  .map((readme) => resolve(root, readme))
  .forEach((file) => {
    writeFileSync(
      file,
      readFileSync(file, 'utf8').replace(semverRegExp, newVersion),
    );
  });

console.log(`🏃‍♂️ Running \`git add -A ${readmeFiles.join(' ')}\`...`);
const execOpts = {stdio: 'inherit'};
execSync(`git add -A ${readmeFiles.join(' ')}`, execOpts);
