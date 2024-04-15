import type {Story} from '@storybook/react';

export {META as default} from './meta';

import {BarChart, BarChartProps} from '../../../components';
import {PolarisVizProvider} from '../../PolarisVizProvider';

import {DEFAULT_DATA} from './data';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

const WithoutRoundedCornersTemplate: Story<BarChartProps> = (
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

export const WithoutRoundedCorners: Story<BarChartProps> =
  WithoutRoundedCornersTemplate.bind({});

WithoutRoundedCorners.args = {
  data: DEFAULT_DATA,
};
