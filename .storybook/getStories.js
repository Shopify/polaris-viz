const getStories = () => {
  const glob = require('glob');
  const path = require('path');

  const appDirectory = path.resolve(__dirname, '../packages');

  const SRC_PATH = `${appDirectory}/**/src/**/`;

  const ALL_STORIES = `${SRC_PATH}/*.stories.@(mdx|tsx)`;
  const PLAYGROUND_STORIES = `${SRC_PATH}/Playground.stories.@(mdx|tsx)`;
  const CHROMATIC_STORIES = `${SRC_PATH}/*.chromatic.stories.@(mdx|tsx)`;

  switch (process.env.STORYBOOK_SHOW) {
    case 'dev':
      return glob.sync(ALL_STORIES, {ignore: CHROMATIC_STORIES});
    case 'consumer':
      return glob.sync(ALL_STORIES, {
        ignore: [CHROMATIC_STORIES, PLAYGROUND_STORIES],
      });
    case 'all':
      return glob.sync(ALL_STORIES);
  }
};

module.exports = getStories;
