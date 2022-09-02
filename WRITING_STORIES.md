# Writing stories

All our stories are written in Storybook.

Each story is contained in a single file. This helps to keep our stories small and easy to parse.

## How it's setup

Component's stories are defined in the `/stories` folder that lives inside the component. Each `/stories` folder contains 2 files - `data.tsx` and `meta.tsx`.

`meta.tsx` describes and configures the component and its stories, it contains all the meta data that Storybook has. This includes name, controls settings, etc. Most of the shared controls contain constants so that each control shares the same information between charts.

```
export const META: Meta = {
  title: 'polaris-viz/Charts/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'Description of what the component is used for.',
      },
    },
  },
  argTypes: {
    exampleProp: {
      description: 'This describes what the exampleProp prop does.',
    },
  },
};
```

Visit the Storybook docs for more information on [how default exports provide additional data](https://storybook.js.org/docs/react/writing-stories/introduction#default-export) to your stories.


`data.tsx` contains the `Template` used to render the chart as well as any default data that can be shared across multiple stories.

## Story guidelines

- Stories should use data that is as close to real-world data as possible.
- Stories should only include examples that are useful to consumers. If you have a story that handles a certain edge-case, or it would be useful to developers, each chart has a `Playground` folder that is not included in the [consumer facing docs site](https://polaris-viz.shopify.com/), where you can test your story.

## Chromatic stories

We use [Chromatic](https://www.chromatic.com/builds?appId=6062ad4a2d14cd0021539c1b) to run visual tests against all our stories.

There are situations where our consumer facing stories don't cover all our edge-cases, so we have special `*.chromatic.stories.tsx` that are only run in Chromatic.

To run these files you have to start Storybook by running `yarn storybook:all` command. These files will be included under the `Chromatic` tab in the sidebar.

### Testing prop combinations

If you want to test multiple combinations of a component based on its props, we have some helper methods that will generate stories for every permutation of props provided.

```
addWithPropsCombinations<ComponentProps>(Component, {
  name: ['Matt', 'Rita', 'Logan'],
  color: ['red', 'blue', 'green'],
})
```

The following snippet would generate 18 stories with each combination of `name` and `color` provided. This is extremely useful when you want to ensure a component with many different options has a visual test.

[Full Example](https://github.com/Shopify/polaris-viz/blob/main/packages/polaris-viz/src/components/Legend/stories/Legend.chromatic.stories.tsx)

## Adding new stories

When adding new stories run the `yarn add:story` command. This launches an interactive CLI that walks you through adding a story, or starting a new `/stories` folder for a chart or a component.
