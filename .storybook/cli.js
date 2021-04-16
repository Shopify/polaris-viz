const fs = require('fs');

const colors = {
  textRed: '\x1b[31m',
  textYellow: '\x1b[33m',
  textGreen: '\x1b[32m',
  reset: '\x1b[0m',
};

const params = JSON.parse(process.env.npm_config_argv);
let [command, componentName] = params.original;

const componentPath = `./src/components/${componentName}`;
const storyPath = `${componentPath}/stories/${componentName}.stories.tsx`;

const replaceComponentName = (path) => {
  const data = fs.readFileSync(path, 'utf8');
  const result = data.replace(/ComponentName/g, componentName);
  fs.writeFileSync(path, result, 'utf8');
};

const createStoryFiles = () => {
  fs.mkdirSync(`${componentPath}/stories`);
  fs.copyFileSync('./.storybook/boilerplate/Template.stories.tsx', storyPath);
  replaceComponentName(storyPath);
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
  createStoryFiles();
  console.log(
    colors.reset,
    `\n🎉 Success! Now open`,
    colors.textGreen,
    storyPath,
    colors.reset,
    `and configure Default.args \n\nMore information in: https://storybook.js.org/docs/react/api/argtypes\n\n`,
  );
}
