// eslint-disable-next-line node/no-unsupported-features/node-builtins
const assert = require('assert').strict;
const fs = require('fs');
var readline = require('readline');

const glob = require('glob');

const packages = ['polaris-viz', 'polaris-viz-core', 'polaris-viz-native'];
const packagesEsnext = ['polaris-viz', 'polaris-viz-core'];
const workspacePackageJSON = require('../package.json');

// Validation to assert the output of the build.
for (const package of packages) {
  process.stdout.write(
    `⚙️ Validating standard and typescript build for '${package}'`,
  );
  validateStandardBuild(package);
  validateAncillaryOutput(package);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `✅ Validating standard and typescript build for '${package}'\n`,
  );
}
for (const package of packagesEsnext) {
  process.stdout.write(`⚙️ Validating esnext build for '${package}'`);
  validateEsNextBuild(package);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(`✅ Validating esnext build for '${package}'\n`);
}

function validateStandardBuild(package) {
  assert.ok(fs.existsSync(`./packages/${package}/build/cjs/index.js`));

  // Assert it uses named exports rather than properties from the React default
  // export to help tree-shaking.
  // React.createElement and React.Fragment are the allowed exceptions
  const files = glob.sync(`./packages/${package}/build/cjs/**/*.js`);
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

function validateEsNextBuild(package) {
  assert.ok(fs.existsSync(`./packages/${package}/build/esnext/index.esnext`));

  switch (package) {
    case 'polaris-viz':
      assert.ok(
        fs.existsSync(
          `./packages/${package}/build/esnext/components/ChartContainer/ChartContainer.esnext`,
        ),
      );

      assert.ok(
        fs.existsSync(
          `./packages/${package}/build/esnext/components/ChartContainer/ChartContainer.css`,
        ),
      );

      // ESnext build css contains namespaced classes, and
      const cssContentPV = fs.readFileSync(
        `./packages/${package}/build/esnext/components/ChartContainer/ChartContainer.css`,
        'utf-8',
      );

      const jsContentPV = fs.readFileSync(
        `./packages/${package}/build/esnext/components/ChartContainer/ChartContainer.scss.esnext`,
        'utf-8',
      );

      assert.ok(jsContentPV.includes("import './ChartContainer.css';"));
      break;
    default:
    case 'polaris-viz-core':
      assert.ok(
        fs.existsSync(
          `./packages/${package}/build/esnext/components/LineSeries/LineSeries.esnext`,
        ),
      );

      assert.ok(
        fs.existsSync(
          `./packages/${package}/build/esnext/styles/shared/_variables.css`,
        ),
      );

      // ESnext build css contains namespaced classes, and
      const cssContentPVC = fs.readFileSync(
        `./packages/${package}/build/esnext/styles/shared/_variables.css`,
        'utf-8',
      );

      const jsContentPVC = fs.readFileSync(
        `./packages/${package}/build/esnext/styles/shared/_variables.scss.esnext`,
        'utf-8',
      );

      assert.ok(jsContentPVC.includes("import './_variables.css';"));
      break;
  }
}

function validateAncillaryOutput(package) {
  assert.ok(fs.existsSync(`./packages/${package}/build/ts/index.d.ts`));
}
