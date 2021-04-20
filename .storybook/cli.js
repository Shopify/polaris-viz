const fs = require('fs');
const {exec} = require('child_process');

const colors = {
  textRed: '\x1b[31m',
  textYellow: '\x1b[33m',
  textGreen: '\x1b[32m',
  reset: '\x1b[0m',
};

const params = JSON.parse(process.env.npm_config_argv);

const [command, componentName] = params.original;
const shouldRemoveComments = params.original.includes('--no-comments');

const componentPath = `./src/components/${componentName}`;
const storyPath = `${componentPath}/stories/${componentName}.stories.tsx`;

const replaceComponentName = (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const result = data.replace(/ComponentName/g, componentName).trim();
  fs.writeFileSync(path, result, 'utf8');
};

const removeComments = (path) => {
  const commentRegex = new RegExp(/[\s\n]*\/\//gm);
  const data = fs.readFileSync(path, 'utf8');

  const result = data
    .split('\n')
    .filter((line) => !line.match(commentRegex))
    .join('\n');

  fs.writeFileSync(path, result, 'utf8');
};

const createStoryFiles = (shouldRemoveComments) => {
  fs.mkdirSync(`${componentPath}/stories`);
  fs.copyFileSync('./.storybook/boilerplate/Template.stories.tsx', storyPath);
  replaceComponentName(storyPath);

  if (shouldRemoveComments) {
    removeComments(storyPath);
  }
};

if (!fs.existsSync(`${componentPath}`)) {
  console.error(
    colors.textYellow,
    `⚠️ Could not find a component in '${componentPath}'`,
    colors.textRed,
  );

  throw `Component with this name does not exist`;
} else if (fs.existsSync(`${componentPath}/stories`)) {
  console.error(
    colors.textYellow,
    `⚠️ Story already exists in '${componentPath}'`,
    colors.textRed,
  );
  throw `Story with this name is already exists`;
} else if (fs.existsSync(`${componentPath}`)) {
  console.log(
    colors.textGreen,
    `📝 Writing story for ${componentName} in '${componentPath}'`,
  );
  createStoryFiles(shouldRemoveComments);
  console.log(
    colors.reset,
    `\n🎉 Success! Now open`,
    colors.textGreen,
    storyPath,
    colors.reset,
    `and configure Default.args \n\nMore information in: https://storybook.js.org/docs/react/api/argtypes\n\n`,
  );
}
