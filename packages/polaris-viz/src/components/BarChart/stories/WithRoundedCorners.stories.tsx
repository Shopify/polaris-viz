import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import {BarChart, BarChartProps} from '../../../components';
import {PolarisVizProvider} from '../../PolarisVizProvider';

import {DEFAULT_DATA} from './data';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

const WithoutRoundedCornersTemplate: StoryFn<BarChartProps> = (
  args: BarChartProps,
) => {
  return (
    <PolarisVizProvider
      themes={{
        [DEFAULT_THEME_NAME]: {
          bar: {
            borderRadius: 0,
          },
        },
      }}
    >
      <BarChart {...args} />
    </PolarisVizProvider>
  );
};

export const WithoutRoundedCorners: StoryFn<BarChartProps> =
  WithoutRoundedCornersTemplate.bind({});

WithoutRoundedCorners.args = {
  data: DEFAULT_DATA,
};

export default {...META, title: 'polaris-viz/Charts/BarChart/WithoutRoundedCorners'} as any;
