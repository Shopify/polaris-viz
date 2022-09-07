const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

const init = () => {
  console.log(
    chalk.magenta(
      figlet.textSync('Polaris Viz', {
        font: 'roman',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    ),
  );
};

const askQuestions = () => {
  const questions = [
    {
      name: 'componentName',
      type: 'input',
      default: 'BarChart',
      message: 'What is the name of your component? (PascalCase, please)',
      validate: (componentName) => {
        const componentExists = fs.existsSync(getComponentPath(componentName));

        return !componentExists ? `${componentName} does not exist.` : true;
      },
    },
    {
      name: 'storyName',
      type: 'input',
      default: 'Default',
      message: 'What is the name of your story? (PascalCase, please)',
      validate: (storyName, {componentName}) => {
        const storyExists = fs.existsSync(
          `${getComponentPath(componentName)}/stories/${storyName}.stories.tsx`,
        );
        return storyExists
          ? `${storyName} story already exists. Please choose a different name.`
          : true;
      },
    },
  ];
  return inquirer.prompt(questions);
};

function getComponentPath(componentName) {
  return path.resolve(
    __dirname,
    `../packages/polaris-viz/src/components/${componentName}`,
  );
}

const success = (filepath) => {
  console.log(chalk.white.bgGreen.bold(`Done! File created at ${filepath}`));
};

const TEMPLATE_NAME = 'Template.stories.tsx';

const templateBase = path.resolve(__dirname, './boilerplate/');

const run = async () => {
  init();

  const answers = await askQuestions();
  const {componentName, storyName} = answers;

  const componentPath = getComponentPath(componentName);
  const hasStories = fs.existsSync(`${componentPath}/stories`);

  if (hasStories) {
    console.log(
      chalk.gray.bold(
        `Stories already set up for ${componentName}, creating ${storyName} story.`,
      ),
    );

    addSingleStory(componentName, storyName);
  } else {
    console.log(
      chalk.gray.bold(
        `No stories for ${componentName} exist, creating default stories.`,
      ),
    );

    createStoriesFolder(componentName, storyName);
  }
};

run();

function addSingleStory(componentName, storyName) {
  const componentPath = getComponentPath(componentName);

  shell.cp(
    `${templateBase}/${TEMPLATE_NAME}`,
    `${componentPath}/stories/${storyName}.stories.tsx`,
  );

  replaceStoryData(
    `${componentPath}/stories/${storyName}.stories.tsx`,
    componentName,
    storyName,
  );

  console.log(
    chalk.green.bold(`${storyName} story created for ${componentName}`),
  );
}

function createStoriesFolder(componentName, storyName) {
  const componentPath = getComponentPath(componentName);

  shell.cp('-r', `${templateBase}`, `${componentPath}/stories`);

  shell.mv(
    `${componentPath}/stories/${TEMPLATE_NAME}`,
    `${componentPath}/stories/${storyName}.stories.tsx`,
  );

  [
    `${componentPath}/stories/${storyName}.stories.tsx`,
    `${componentPath}/stories/data.tsx`,
    `${componentPath}/stories/meta.tsx`,
  ].forEach((path) => {
    replaceStoryData(path, componentName, storyName);
  });

  console.log(chalk.green.bold(`Stories setup for ${componentName}`));
}

const replaceStoryData = (path, componentName, storyName) => {
  const data = fs.readFileSync(path, 'utf8');
  let result = data.replace(/ComponentName/g, componentName).trim();
  result = result.replace(/Default/g, storyName).trim();

  fs.writeFileSync(path, result, 'utf8');
};
