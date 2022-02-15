const {execSync} = require('child_process');

execSync('sudo yarn add puppeteer --unsafe-perm=true --allow-root');

execSync('node ./node_modules/puppeteer-core/install.js');

console.log('added puppeteer')
