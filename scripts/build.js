/* eslint-disable no-console */

const {resolve, join} = require('path');
const {writeFileSync} = require('fs-extra');

console.log('✍️ > writing esnext file...');

writeFileSync(
  join(resolve(__dirname, '../build'), 'index.esnext'),
  'export * from "./index.modern.js";',
);
