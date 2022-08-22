import {resolve} from 'path';
import internal from 'stream';

import glob from 'glob';
import {readJSONSync} from 'fs-extra';

import {EXCLUDED_PACKAGES} from './utilities';

const ROOT = resolve(__dirname, '..');
const basePackagePath = resolve(ROOT, 'packages');
const projectReferencesConfig = resolve(ROOT, 'tsconfig.json');

describe('typescript project references', () => {
  const referencesConfig = readJSONSync(projectReferencesConfig);
  const references = referencesConfig.references.map(({path}) =>
    path.replace('./packages/', ''),
  );
  const pvReferences = references.map(prefixPackageName);
  const packages = glob
    .sync(resolve(basePackagePath, '*/package.json'))
    .map((packageJsonPath) => {
      return /packages\/(?<packageName>[\w._-]+)\/package\.json$/i.exec(
        packageJsonPath,
      ).groups.packageName;
    })
    .filter((packageName) => !EXCLUDED_PACKAGES.includes(packageName));

  it('root includes all the packages', () => {
    expect(references.sort()).toStrictEqual(
      expect.arrayContaining(packages.sort()),
    );
  });

  it('includes reference to root tests folder', () => {
    expect(references.sort()).toStrictEqual(
      expect.arrayContaining(['./tests']),
    );
  });

  packages.map((packageName) => {
    const displayedName = prefixPackageName(packageName);

    describe(`${displayedName}`, () => {
      it(`includes internal packages used as references`, () => {
        const packageJson = resolvePackageJSONFile(packageName, 'package.json');
        const tsconfigJson = resolvePackageJSONFile(
          packageName,
          'tsconfig.json',
        );
        const internalReferences = tsconfigJson.references || [];

        const internalPackages = internalReferences
          .filter((reference) => {
            return !reference.path.includes('tests');
          })
          .map((internalReference) =>
            extractPackagesFromInternalReference(internalReference),
          )
          .sort();

        const dependencies = Object.keys({
          ...packageJson.dependencies,
          ...packageJson.devDependencies,
          ...packageJson.peerDependencies,
        });

        const pvPackage = dependencies
          .filter((lib) => pvReferences.includes(lib))
          .sort();

        expect(internalPackages).toStrictEqual(pvPackage);
      });
    });
  });
});

function prefixPackageName(packageName: string) {
  return `@shopify/${packageName}`;
}

function resolvePackageJSONFile(packageName: string, file: string) {
  const path = glob.sync(resolve(basePackagePath, packageName, file))[0];
  return readJSONSync(path);
}

const internalReferenceRegex = /\.\.\/(?<packageName>[\w._-]+)/i;
function extractPackagesFromInternalReference(internalReference: {
  path: string;
}) {
  return prefixPackageName(
    internalReferenceRegex.exec(internalReference.path).groups.packageName,
  );
}
