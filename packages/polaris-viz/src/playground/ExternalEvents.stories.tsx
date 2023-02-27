import React from 'react';
import type {Story} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {LineChartRelational} from '../components/LineChartRelational';
import {PolarisVizProvider} from '../components/PolarisVizProvider';
import {setSingleSeriesActive} from '../utilities';
import {useWatchActiveSeries} from '../hooks';

export default {
  title: 'polaris-viz/Playground/ExternalEvents',
  parameters: {},
  decorators: [(Story) => <div>{Story()}</div>],
  argTypes: {},
};

const DEFAULT_DATA: DataSeries[] = [
  {
    name: 'Breakfast',
    data: [
      {key: 'Monday', value: 3},
      {key: 'Tuesday', value: -7},
      {key: 'Wednesday', value: -7},
      {key: 'Thursday', value: -8},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 0},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Lunch',
    data: [
      {key: 'Monday', value: 4},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -10},
      {key: 'Thursday', value: 15},
      {key: 'Friday', value: 8},
      {key: 'Saturday', value: 50},
      {key: 'Sunday', value: 0.1},
    ],
  },
  {
    name: 'Dinner',
    data: [
      {key: 'Monday', value: 7},
      {key: 'Tuesday', value: 0},
      {key: 'Wednesday', value: -15},
      {key: 'Thursday', value: -12},
      {key: 'Friday', value: 50},
      {key: 'Saturday', value: 5},
      {key: 'Sunday', value: 0.1},
    ],
  },
];

const CHART_ID = 'chart_01';

const Template: Story = () => {
  const [activeName, setActiveName] = React.useState('none');

  useWatchActiveSeries(CHART_ID, ({detail: {index}}) => {
    if (index === -1) {
      setActiveName('none');
    } else {
      setActiveName(DEFAULT_DATA[index].name ?? 'none');
    }
  });

  return (
    <>
      <div style={{marginBottom: 40}}>
        <p>This button interacts with the chart in one-direction.</p>
        <button
          onMouseOver={() => {
            setSingleSeriesActive(CHART_ID, 2);
          }}
          onMouseLeave={() => {
            setSingleSeriesActive(CHART_ID, -1);
          }}
          onClick={() => {
            setSingleSeriesActive(CHART_ID, 1);
          }}
        >
          Hover: Dinner, Click: Lunch
        </button>

        <p>
          This only responds to events from the chart. Active series:{' '}
          <strong>{activeName}</strong>.
        </p>
      </div>
      <PolarisVizProvider
        themes={{
          Default: {
            chartContainer: {
              padding: '20px',
            },
          },
        }}
      >
        <LineChartRelational id={CHART_ID} data={DEFAULT_DATA} />
      </PolarisVizProvider>
    </>
  );
};

export const Default: Story = Template.bind({});
