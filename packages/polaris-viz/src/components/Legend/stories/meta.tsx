import type {Meta} from '@storybook/react';

import {THEME_CONTROL_ARGS} from '../../../storybook/constants';
import {Legend} from '../Legend';

export const META: Meta = {
  title: 'polaris-viz/Subcomponents/Legend',
  component: Legend,
  parameters: {
    docs: {
      description: {
        component:
          'Used to indicate which color is associated with which series. The color preview will appear as a square unless a `shape` is passed to `LegendData`. <br /> <br /> All charts except spark charts and `SimpleNormalizedChart` include a `Legend` by default.',
      },
    },
    controls: {
      sort: 'requiredFirst',
      expanded: true,
    },
  },
  argTypes: {
    data: {
      description:
        '`name` and `color` props should be passed to each legend to display a title and a color icon. `isComparison`, `shape` and `value` props are optional.',
    },
    colorVisionType: {
      table: {
        disable: true,
      },
    },
    theme: THEME_CONTROL_ARGS,
  },
};
