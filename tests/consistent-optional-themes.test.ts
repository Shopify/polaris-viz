import {join, resolve} from 'path';
import {readFileSync} from 'fs';

import glob from 'glob';

const ROOT_PATH = resolve(__dirname, '..');

const getNameFromPath = (path) => {
  const folderNameRegex = /([^/]*)\/*$/gms;
  return folderNameRegex.exec(path)[1];
};

const regex =
  /(?<componentNames>(?<=export {())(?:\[??[^}]*?)(?<folderName>\} from '.\/components))/s;

function readFiles() {
  const packagesPath = join(ROOT_PATH, 'packages');

  return glob
    .sync(join(packagesPath, '*/'))
    .filter(hasPackageJSON)
    .map((packageDir) => {
      const indexSrcPath = join(packageDir, 'src/index.ts');
      const indexSrc = readFileSync(indexSrcPath, 'utf8');

      return {
        packageDir,
        indexSrcPath,
        indexSrc,
      };
    });
}

const componentsPerPackage = readFiles().map(({indexSrc, packageDir}) => {
  const {
    groups: {folderName, componentNames},
  } = regex.exec(indexSrc);

  const components = componentNames.replace(/\s/g, '').split(',').slice(0, -1);

  const componentsFilePaths = components.map(
    (name) => `${packageDir}src/components/${name}/${name}.tsx`,
  );

  return {
    components,
    componentsFilePaths,
    packageDir,
    packageName: getNameFromPath(packageDir),
  };
});

componentsPerPackage.forEach(({componentsFilePaths, packageName}) => {
  if (
    packageName === 'polaris-viz-core' ||
    packageName === 'polaris-viz-native'
  )
    return true;

  describe(`${packageName}`, () => {
    componentsFilePaths.forEach((path) => {
      const fileName = getNameFromPath(path);

      if (fileName.includes('Chart') && !fileName.includes('Skeleton')) {
        describe('Chart components', () => {
          it(`${fileName} uses ChartProps type`, () => {
            const componentFile = readFileSync(path, 'utf8');
            expect(componentFile).toContain('& ChartProps');
          });

          it(`${fileName} uses DEFAULT_CHART_PROPS`, () => {
            const componentFile = readFileSync(path, 'utf8');
            expect(componentFile).toContain('DEFAULT_CHART_PROPS');
          });
        });
      } else {
        describe('Subcomponents exported to package consumers', () => {
          it(`${fileName} has an optional theme prop`, () => {
            const componentFile = readFileSync(path, 'utf8');
            expect(componentFile).toContain('theme?: string');
          });
        });
      }
    });
  });
});

function safeReadSync(path, options) {
  try {
    return readFileSync(path, options);
  } catch {
    return '';
  }
}

function hasPackageJSON(packageDir) {
  const packageJSONPath = join(packageDir, 'package.json');
  const packageJSON = safeReadSync(packageJSONPath, {
    encoding: 'utf8',
  });

  return packageJSON.length > 0;
}
