// eslint-disable-next-line node/no-unsupported-features/node-builtins
const assert = require('assert').strict;
const fs = require('fs');

const glob = require('glob');

const packageJSON = require('../package.json');

// Validation to assert the output of the build.

validateStandardBuild();
validateEsNextBuild();
validateAncillaryOutput();
validateVersionReplacement();

function validateStandardBuild() {
  // Standard build
  assert.ok(fs.existsSync('./build/cjs/index.js'));
  assert.ok(fs.existsSync('./build/esm/index.js'));
  assert.ok(fs.existsSync('./build/esm/styles.css'));

  // Assert it uses named exports rather than properties from the React default
  // export to help tree-shaking.
  // React.createElement and React.Fragment are the allowed exceptions
  const files = glob.sync('./build/cjs/**/*.js');
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

  // Standard build css contains namespaced classes
  const cssContent = fs.readFileSync('./build/esm/styles.css', 'utf-8');
  assert.ok(cssContent.includes('.PolarisViz-Chart{'));
  assert.ok(cssContent.includes('.PolarisViz-Chart__Svg{'));
}

function validateEsNextBuild() {
  // ESnext build
  assert.ok(fs.existsSync('./build/esnext/index.esnext'));
  assert.ok(
    fs.existsSync('./build/esnext/components/BarChart/BarChart.esnext'),
  );
  assert.ok(fs.existsSync('./build/esnext/components/BarChart/Chart.css'));

  // ESnext build css contains namespaced classes, and
  const cssContent = fs.readFileSync(
    './build/esnext/components/BarChart/Chart.css',
    'utf-8',
  );
  assert.ok(cssContent.includes('.PolarisViz-Chart__ChartContainer_x34bv'));

  const jsContent = fs.readFileSync(
    './build/esnext/components/BarChart/Chart.scss.esnext',
    'utf-8',
  );

  assert.ok(jsContent.includes("import './Chart.css';"));
  assert.ok(
    jsContent.includes(
      '"ChartContainer": "PolarisViz-Chart__ChartContainer_x34bv"',
    ),
  );
  assert.ok(jsContent.includes('"Svg": "PolarisViz-Chart__Svg_375hu"'));
}

function validateAncillaryOutput() {
  assert.ok(fs.existsSync('./build/ts/src/index.d.ts'));
}

function validateVersionReplacement() {
  const files = glob.sync('./build/**/*.{js,mjs,esnext,css,scss}');

  assert.notStrictEqual(files.length, 0);

  const fileBuckets = {
    includesTemplateString: [],
    includesVersion: [],
  };

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');

    if (content.includes('POLARIS_VIZ_VERSION')) {
      fileBuckets.includesTemplateString.push(file);
    }

    if (content.includes(packageJSON.version)) {
      fileBuckets.includesVersion.push(file);
    }
  });

  assert.strictEqual(fileBuckets.includesTemplateString.length, 0);

  assert.deepStrictEqual(fileBuckets.includesVersion, [
    './build/cjs/configure.js',
    './build/cjs/styles.css',
    './build/esm/configure.js',
    './build/esm/styles.css',
    './build/esnext/components/PolarisVizProvider/PolarisVizProvider.css',
    './build/esnext/configure.esnext',
  ]);
}
