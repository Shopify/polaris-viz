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
      {key: 'One', value: 0},
      {key: 'Two', value: 0},
      {key: 'Three', value: -22.1},
      {key: 'Four', value: 0},
      {key: 'Five', value: -17.5},
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
      {key: 'One', value: 0},
      {key: 'Two', value: 0},
      {key: 'Three', value: 0},
      {key: 'Four', value: 0},
      {key: 'Five', value: 0},
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
        <SimpleBarChart data={DATA} showLegend={false} />
      </PolarisVizProvider>
    </div>
  );
};

export const AllNegative = Template.bind({});
