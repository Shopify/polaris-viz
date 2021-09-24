import React from 'react';
import {Story, Meta} from '@storybook/react';

import {ComponentName, ComponentNameProps} from '../../../components';

// Learn how to write stories:
//  https://master--6054e7fc826ed700218e4b3b.chromatic.com/?path=/story/documentation-how-to-write-stories--page
export default {
  title: 'ComponentName',
  component: ComponentName,
  parameters: {
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
    docs: {
      description: {
        component: 'Add a description of your component here.',
      },
    },
    // Embedding Figma designs
    // The embed appears in the "Design" tab of the story
    // Learn more: https://pocka.github.io/storybook-addon-designs/?path=/docs/docs-figma-readme--page
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/...?node-id=...',
    },
  },
  // Storybook will automatically generate a Controls section under Addons for the component props
  // and infer each prop type. If you want to overwrite one of these controls, use argTypes
  // Learn more: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as Meta;

// 👇 We create a "template" of how args map to rendering
const Template: Story<ComponentNameProps> = (args: ComponentNameProps) => {
  return <ComponentName {...args} />;
};

// 👇 Each story then reuses that template
export const Basic = Template.bind({});

// Story args
// “Args” are Storybook’s mechanism for defining those arguments in a single
// JavaScript object. Args can be used to dynamically change props, slots,
// styles, inputs, etc.
// Learn more: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {};
