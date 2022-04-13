const getStories = (environment) => {
  const glob = require('glob');
  const path = require('path');

  const appDirectory = path.resolve(__dirname, '../storybook/');

  return glob.sync(`${appDirectory}/**/*.stories.@(mdx|tsx)`, {
    ignore:
      environment === 'development'
        ? ''
        : `${appDirectory}/**/Playground.stories.@(mdx|tsx)`,
  });
};

module.exports = getStories;
