const {resolve} = require('path');
const {execSync} = require('child_process');
const {readFile} = require('fs-extra');
const {Logger, Build, ShrinkRayAPI, Check} = require('@shopify/shrink-ray');

process.on('unhandledRejection', (reason) => {
  throw reason;
});

startShrinkRayBuild({
  masterBranchName: 'master',
  repo: 'polaris-viz',
  sha: process.env.CIRCLE_SHA1,
  reportPath: resolve(
    __dirname,
    '..',
    'build/storybook/bundle-analysis/report.html',
  ),
  buildUrl: process.env.CIRCLE_BUILD_URL,
  skip: [Check.Entrypoints],
});

async function startShrinkRayBuild({
  masterBranchName,
  repo,
  sha,
  reportPath,
  buildUrl,
  skip,
}) {
  const logger = new Logger();

  if (sha) {
    logger.header('Running shrink-ray prebuild script...');

    // fetch latest in pipeline. Travis does a shallow clone by default,
    // --unshallow makes sure we can fetch the master commit in case it is not
    // included in the initial shallow clone
    execSync('git fetch --unshallow origin master:refs/remotes/origin/master');

    const masterSha = execSync(
      `git merge-base HEAD origin/${masterBranchName}`,
      {
        encoding: 'utf8',
      },
    ).trim();

    const shrinkRay = new ShrinkRayAPI();
    const build = new Build({
      repo,
      sha,
      masterSha,
    });

    try {
      logger.header('Validating...');
      build.validate();
      logger.for('validation').log('✅ sha validation successful!');

      logger.header('Initializing check(s) on GitHub');
      console.log('buildUrl', buildUrl);
      await shrinkRay.create({...build, buildUrl, skip});

      buildStorybookBuild();

      logger.header(`Uploading build report to Shrink-Ray`);
      await shrinkRay.report(build, await bundleAnalyzerReport(reportPath));
    } catch (error) {
      logger.header('shrink-ray build fail');
      logger.for('error').log(error);
      logger.for('error').log(`sending status to server for clean up `);
      await shrinkRay.error(build, error);
    }
  } else {
    buildStorybookBuild();
  }
}

function buildStorybookBuild() {
  const logger = new Logger();

  logger.header('Running storybook build...');
  execSync('yarn run storybook:build --quiet', {
    stdio: 'inherit',
  });
}

function bundleAnalyzerReport(reportPath) {
  try {
    return readFile(reportPath, 'utf-8');
  } catch (error) {
    throw new Error(
      `Could not read webpack-bundle-analyzer report: ${reportPath}`,
    );
  }
}
