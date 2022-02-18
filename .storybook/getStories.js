const getStories = (environment) => {
  const glob = require('glob');
  const path = require('path');

  const appDirectory = path.resolve(__dirname, '../packages');

  const filteredFilePaths = [];

  return glob.sync(`${appDirectory}/**/src/**/*.stories.@(mdx|tsx)`, {
    ignore:
      environment === 'development'
        ? ''
        : `${appDirectory}/**/src/**//Playground.stories.mdx`,
  });
};

module.exports = getStories;
