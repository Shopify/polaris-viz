import {join, resolve} from 'path';

import {readFileSync} from 'fs-extra';
import glob from 'glob';

import {hasPackageJSON, safeReadSync} from './utilities';

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

const ignoredFiles = [
  'SquareColorPreview',
  'LinePreview',
  'SimpleNormalizedChart',
];

const componentsPerPackage = readFiles().map(({indexSrc, packageDir}) => {
  const {
    groups: {folderName, componentNames},
  } = regex.exec(indexSrc);

  const components = componentNames
    .replace(/\s/g, '')
    .split(',')
    .slice(0, -1)
    .filter((item) => !ignoredFiles.includes(item));

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
  if (packageName === 'polaris-viz-core') return true;

  describe(`${packageName}`, () => {
    componentsFilePaths.forEach((path) => {
      const fileName = getNameFromPath(path);
      const componentFile = safeReadSync(path, 'utf8');

      if (fileName.includes('PolarisVizProvider')) {
        describe('PolarisVizProvider', () => {
          it(`accepts an optional array of partial themes`, () => {
            expect(componentFile).toContain(
              'themes?: {[key: string]: PartialTheme};',
            );
          });
        });
      } else if (fileName.includes('Chart') && !fileName.includes('Skeleton')) {
        describe('Chart components', () => {
          it(`${fileName} uses ChartProps type`, () => {
            expect(componentFile).toContain('& ChartProps');
          });

          it(`${fileName} uses DEFAULT_CHART_PROPS`, () => {
            expect(componentFile).toContain('DEFAULT_CHART_PROPS');
          });
        });
      } else {
        describe('Subcomponents exported to package consumers', () => {
          it(`${fileName} has an optional theme prop`, () => {
            expect(componentFile).toContain('theme?: string');
          });
        });
      }
    });
  });
});
