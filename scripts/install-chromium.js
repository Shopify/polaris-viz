const {execSync} = require('child_process');

execSync('yarn add puppeteer-core');

execSync('node ./node_modules/puppeteer-core/install.js');

console.log('added puppeteer')
