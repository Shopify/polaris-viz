import type {Story, StoryFn} from '@storybook/react';

export {META as default} from './meta';

import {PolarisVizProvider} from '../../PolarisVizProvider';
import {DonutChart} from '../DonutChart';
import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_DATA, DEFAULT_PROPS} from './data';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

const CustomArcTemplate: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return (
    <div style={{width: 550, height: 400}}>
      <PolarisVizProvider
        themes={{
          [DEFAULT_THEME_NAME]: {
            arc: {
              cornerRadius: 5,
              thickness: 18,
            },
          },
        }}
      >
        <DonutChart {...args} />
      </PolarisVizProvider>
    </div>
  );
};

export const CustomArc: Story<DonutChartProps> = CustomArcTemplate.bind({});

CustomArc.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};
