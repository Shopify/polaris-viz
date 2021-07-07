import React from 'react';
import {themes} from '@storybook/theming';

export const parameters = {
  docs: {
    theme: themes.dark,
  },

  options: {
    storySort: {
      order: ['Docs', 'Charts', 'Subcomponents'],
    },
  },
};

export const decorators = [(Story) => <Story />];
