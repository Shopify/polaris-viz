const util = require('util');
const path = require('path');
const postcss = require('postcss');
const {ensureDir, outputFile, readFileSync, writeFile} = require('fs-extra');
const glob = require('glob');
const nodeSass = require('node-sass');
const {createFilter} = require('rollup-pluginutils');
const cssnano = require('cssnano');

const cssModulesExtractImports = require('postcss-modules-extract-imports');
const cssModulesLocalByDefault = require('postcss-modules-local-by-default');
const cssModulesScope = require('postcss-modules-scope');
const cssModulesValues = require('postcss-modules-values');
const Parser = require('postcss-modules-parser');
const postcssShopify = require('postcss-shopify');

const generateScopedName = require('../namespaced-classname');

const renderSass = util.promisify(nodeSass.render);

module.exports = function styles(options = {}) {
  const filter = createFilter(
    options.include || ['**/*.css', '**/*.scss'],
    options.exclude,
  );

  const {output} = options;
  const cssByFile = {};

  let inputRoot;

  const processor = postcss([
    cssModulesValues,
    cssModulesLocalByDefault,
    cssModulesExtractImports,
    cssModulesScope({generateScopedName}),
    new Parser({
      fetch(to, from) {
        const fromDirectoryPath = path.dirname(from);
        const toPath = path.resolve(fromDirectoryPath, to);
        const source = readFileSync(toPath, 'utf8');
        return getPostCSSOutput(processor, source, toPath);
      },
    }),
    postcssShopify(),
  ]);

  return {
    name: 'shopify-styles',

    options({input}) {
      inputRoot = path.dirname(input);
    },

    async transform(source, id) {
      if (!filter(id)) {
        return null;
      }

      const autoIncludeGlobalStyles = (globalStylePath, data) => {
        const regex = /(@import ['|"])(~)/gm;

        const globalStyles = readFileSync(globalStylePath, 'utf8');
        return `${globalStyles.replace(regex, `$1node_modules/`)} ${data}`;
      };

      const sassOutput = await renderSass({
        data: autoIncludeGlobalStyles(options.autoInclude || '', source),
        includePaths: [path.dirname(id)],
      }).then((result) => result.css.toString());

      const postCssOutput = await getPostCSSOutput(processor, sassOutput, id);

      cssByFile[id] = postCssOutput.css;

      const properties = JSON.stringify(postCssOutput.tokens, null, 2);
      return `export default ${properties};`;
    },

    async generateBundle(generateOptions, bundles) {
      // generateBundle gets called once per call to bundle.write(). We call
      // that twice - one for the cjs build (polaris.js), one for the esm build
      // (polaris.es.js). We only want to do perform this logic once though
      if (generateOptions.file.endsWith('/polaris.js')) {
        return;
      }

      if (typeof output !== 'string') {
        return;
      }

      // Items are added to cssAndTokensByFile in an unspecified order as
      // whatever transform gets resolved first appears first. The contents of
      // the css file should use the order in which scss files were referenced
      // in the compiled javascript file.
      const styleIds = Object.keys(cssByFile);
      const includedStyleIds = Array.from(
        Object.values(bundles).reduce((memo, bundle) => {
          Object.keys(bundle.modules).forEach((moduleName) => {
            if (styleIds.includes(moduleName)) {
              memo.add(moduleName);
            }
          });
          return memo;
        }, new Set()),
      );

      const orderedCssByFile = includedStyleIds.reduce((memo, id) => {
        return memo.set(id, cssByFile[id]);
      }, new Map());

      const css = Array.from(orderedCssByFile.values()).join('\n\n');

      await ensureDir(path.dirname(output));
      await Promise.all([
        writeFile(output, css),
        generateMinifiedCss(output, css),
      ]);
    },
  };
};

function getPostCSSOutput(processor, source, fromPath) {
  return processor
    .process(source, {from: fromPath})
    .then(({css, root: {tokens}}) => ({css, tokens}));
}

/**
 * Generate a minified css file next to the input file
 */
function generateMinifiedCss(sourceFilePath, css) {
  const outputPath = `${sourceFilePath.slice(0, -4)}.min.css`;

  return cssnano
    .process(css, {from: sourceFilePath, to: outputPath})
    .then((result) => writeFile(outputPath, result.css));
}
