const execSync = require('child_process').execSync;

const fs = require('fs-extra');
const glob = require('glob');

describe('build', () => {
  beforeAll(() => {
    // Running clean shall remove the entire build directory. Including
    // `build/cache/jest` which is Jest's cache location. Removing Jest's cache
    // in the middle of it running understandably has undesirable effects -
    // it crashes jest.
    // The clean:build script (ran as part of the prebuild step) removes the
    // build directory with the exception of the build/cache folder so that
    // Jest can keep its cache and keep running.
    execSync('yarn run build');
  });

  it('generates lib files in ./', () => {
    expect(fs.existsSync('./index.js')).toBe(true);
    expect(fs.existsSync('./index.es.js')).toBe(true);
    expect(fs.existsSync('./styles.css')).toBe(true);
    expect(fs.existsSync('./styles.min.css')).toBe(true);
  });

  it('generates a ./styles/foundation dir with spacing.scss', () => {
    expect(fs.existsSync('./styles/foundation/_spacing.scss')).toBe(true);
  });

  it('generates sass entries files in ./styles dir', () => {
    expect(fs.existsSync('./styles/global.scss')).toBe(true);
    expect(fs.existsSync('./styles/foundation.scss')).toBe(true);
    expect(fs.existsSync('./styles/shared.scss')).toBe(true);
    expect(fs.existsSync('./styles/components.scss')).toBe(true);
  });

  it('generates a ./styles.scss sass entry point in root', () => {
    expect(fs.existsSync('./styles.scss')).toBe(true);
  });

  it('generates fully namespaced CSS for root components', () => {
    expect(fs.readFileSync('./styles/components.scss', 'utf8')).toMatch(
      '.Polaris-Button{',
    );
  });

  it('generates fully namespaced CSS for nested components', () => {
    expect(fs.readFileSync('./styles/components.scss', 'utf8')).toMatch(
      '.Polaris-ResourceList-BulkActions__BulkActionButton{',
    );
  });

  it('generates the typescript definition files', () => {
    expect(fs.existsSync('./types/index.d.ts')).toBe(true);
  });

  it('replaces occurrences of POLARIS_VERSION', () => {
    const files = glob.sync('./build/**/*.{js,scss,css}', {
      ignore: './build/cache/**',
    });

    const total = files.reduce((acc, file) => {
      const contents = fs.readFileSync(file, 'utf-8');
      return acc + Number(contents.includes('POLARIS_VERSION'));
    }, 0);
    expect(total).toBe(0);
  });

  describe('esnext', () => {
    it('facilitates production builds without typescript', () => {
      expect(fs.existsSync('esnext/index.js')).toBe(true);
    });

    it('preserves classes to facilitate class-level tree shaking', () => {
      expect(
        fs.readFileSync('esnext/components/Collapsible/Collapsible.js', 'utf8'),
      ).toMatch('class Collapsible');
    });

    it('preserves jsx to give consumers control over Babel transforms', () => {
      expect(
        fs.readFileSync(
          'esnext/components/NormalizedStackedBar/NormalizedStackedBar.js',
          'utf8',
        ),
      ).toMatch(/return <div .+?<\/div>/);
    });

    it('preserves ES script imports', () => {
      const contents = fs.readFileSync(
        'esnext/components/NormalizedStackedBar/index.js',
        'utf8',
      );
      expect(contents).toMatch(
        "export { NormalizedStackedBar } from './NormalizedStackedBar'",
      );
    });

    it('gives consumers control over global.scss', () => {
      const indexContents = fs.readFileSync('esnext/index.js', 'utf8');
      expect(indexContents).not.toMatch(/import '.+\.scss'/);
    });
  });
});
