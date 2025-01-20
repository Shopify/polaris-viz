import type {Story} from '@storybook/react';

import {SimpleBarChart, SimpleBarChartProps} from '../../../../components';
import {META} from '../meta';
import type {SimpleBarChartDataSeries} from '../../types';
import {
  DEFAULT_THEME_NAME,
  PolarisVizProvider,
} from '@shopify/polaris-viz-core';

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const DATA: SimpleBarChartDataSeries[] = [
  {
    name: '',
    data: [
      {key: 'One', value: 6000},
      {key: 'Two', value: 5300},
    ],
    metadata: {
      trends: {
        '0': {},
      },
    },
  },
  {
    name: '',
    data: [
      {key: 'One', value: 4500},
      {key: 'Two', value: 1500},
    ],
  },
];

const Template: Story<SimpleBarChartProps> = () => {
  const svgStyle = `
    svg {
      background: rgba(0, 255, 0, 0.1);
    }
  `;

  return (
    <div style={{height: 600, width: 800}}>
      <style>{svgStyle}</style>
      <PolarisVizProvider
        animated={{} as any}
        themes={{
          [DEFAULT_THEME_NAME]: {
            chartContainer: {
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              padding: '20px',
            },
          },
        }}
      >
        <SimpleBarChart data={DATA} />
      </PolarisVizProvider>
    </div>
  );
};

export const NoTrendTight = Template.bind({});
