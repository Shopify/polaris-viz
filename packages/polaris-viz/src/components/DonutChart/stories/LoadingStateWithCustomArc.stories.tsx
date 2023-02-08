import {ChartState} from '@shopify/polaris-viz-core';
import type {Story, StoryFn} from '@storybook/react';

export {META as default} from './meta';

import {PolarisVizProvider} from '../../PolarisVizProvider';
import type {DonutChartProps} from '../DonutChart';
import {DonutChart} from '../DonutChart';

import {DEFAULT_PROPS, DEFAULT_DATA} from './data';

const LoadingStateWithCustomArcTemplate: StoryFn<DonutChartProps> = (args: DonutChartProps) => {
  return (
    <div style={{width: 550, height: 400}}>
      <PolarisVizProvider
        themes={{
          Default: {
            arc: {
              cornerRadius: 5,
              thickness: 25,
            }
          },
        }}
      >
        <DonutChart {...args} />
      </PolarisVizProvider>
    </div>
  );
};

export const LoadingStateWithCustomArc: Story<DonutChartProps> = LoadingStateWithCustomArcTemplate.bind({});

LoadingStateWithCustomArc.args = {
  ...DEFAULT_PROPS,
  data: DEFAULT_DATA.map(({name}) => ({
    name,
    data: [],
  })),
  state: ChartState.Loading,
};
