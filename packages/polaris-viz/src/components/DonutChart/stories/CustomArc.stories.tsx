import type {StoryFn} from '@storybook/react';

import {META} from './meta';

import {PolarisVizProvider} from '../../PolarisVizProvider';
import {DonutChart} from '../DonutChart';
import type {DonutChartProps} from '../DonutChart';

import {DEFAULT_DATA, DEFAULT_PROPS} from './data';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';
import { title } from 'process';

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

export const CustomArc: StoryFn<DonutChartProps> = CustomArcTemplate.bind({});

CustomArc.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA,
};

export default {...META, title: 'Polaris Viz/Charts/DonutChart/CustomArc'} as any;