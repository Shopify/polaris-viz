// eslint-disable-next-line node/no-unsupported-features/node-builtins
const assert = require('assert').strict;
const fs = require('fs');

const glob = require('glob');

const packageJSON = require('../package.json');

// Validation to assert the output of the build.

validateStandardBuild();
validateEsNextBuild();
validateAncillaryOutput();

function validateStandardBuild() {
  // Standard build
  assert.ok(fs.existsSync('./packages/polaris-viz/build/cjs/index.js'));
  assert.ok(fs.existsSync('./packages/polaris-viz/build/esm/index.js'));
  assert.ok(fs.existsSync('./packages/polaris-viz/build/esm/styles.css'));

  // Assert it uses named exports rather than properties from the React default
  // export to help tree-shaking.
  // React.createElement and React.Fragment are the allowed exceptions
  const files = glob.sync('./packages/polaris-viz/build/cjs/**/*.js');
  assert.notStrictEqual(files.length, 0);
  const filesContainingUnwantedReactUsage = [];
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');

    const unwantedReactUsageMatches =
      content.match(
        /React__default\['default'\]\.(?!createElement|Fragment)[A-Za-z0-9]+/g,
      ) || [];

    if (unwantedReactUsageMatches.length) {
      filesContainingUnwantedReactUsage.push(file);
    }
  });

  assert.deepStrictEqual(filesContainingUnwantedReactUsage, []);
}

function validateEsNextBuild() {
  // ESnext build
  assert.ok(fs.existsSync('./packages/polaris-viz/build/esnext/index.esnext'));
  assert.ok(
    fs.existsSync(
      './packages/polaris-viz/build/esnext/components/LineChart/LineChart.esnext',
    ),
  );
  assert.ok(
    fs.existsSync(
      './packages/polaris-viz/build/esnext/components/LineChart/Chart.css',
    ),
  );

  // ESnext build css contains namespaced classes, and
  const cssContent = fs.readFileSync(
    './packages/polaris-viz/build/esnext/components/LineChart/Chart.css',
    'utf-8',
  );

  const jsContent = fs.readFileSync(
    './packages/polaris-viz/build/esnext/components/LineChart/Chart.scss.esnext',
    'utf-8',
  );

  assert.ok(jsContent.includes("import './Chart.css';"));
}

function validateAncillaryOutput() {
  assert.ok(fs.existsSync('./packages/polaris-viz/build/ts/index.d.ts'));
}
