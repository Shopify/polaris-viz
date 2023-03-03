import React, {useState} from 'react';
import type {Story} from '@storybook/react';
import type {DataSeries} from '@shopify/polaris-viz-core';

import {LineChartRelational} from '../components/LineChartRelational';
import {PolarisVizProvider} from '../components/PolarisVizProvider';
import {setSingleSeriesActive} from '../utilities';
import {useWatchActiveSeries} from '../hooks';
import {setHiddenItems} from '../hooks/ExternalEvents';

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
      {key: 'Saturday', value: 100},
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
      {key: 'Friday', value: 10},
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

const style = {marginBottom: 10, gap: 10, display: 'flex'};

const RELATIONAL_DATA: DataSeries[] = [
  {
    name: 'Apr 1 – Apr 14, 2020',
    data: [
      {value: 333, key: '2020-04-01T12:00:00'},
      {value: 797, key: '2020-04-02T12:00:00'},
      {value: 234, key: '2020-04-03T12:00:00'},
      {value: 534, key: '2020-04-04T12:00:00'},
      {value: 132, key: '2020-04-05T12:00:00'},
      {value: 159, key: '2020-04-06T12:00:00'},
      {value: 239, key: '2020-04-07T12:00:00'},
      {value: 708, key: '2020-04-08T12:00:00'},
      {value: 234, key: '2020-04-09T12:00:00'},
      {value: 645, key: '2020-04-10T12:00:00'},
      {value: 543, key: '2020-04-11T12:00:00'},
      {value: 89, key: '2020-04-12T12:00:00'},
      {value: 849, key: '2020-04-13T12:00:00'},
      {value: 129, key: '2020-04-14T12:00:00'},
    ],
    color: [
      {offset: 0, color: '#986BFF'},
      {offset: 100, color: '#3AA4F6'},
    ],
    styleOverride: {
      line: {
        width: 3,
      },
    },
  },
  {
    name: '75th Percentile',
    data: [
      {value: 859, key: '2020-03-02T12:00:00'},
      {value: 388, key: '2020-03-01T12:00:00'},
      {value: 340, key: '2020-03-03T12:00:00'},
      {value: 240, key: '2020-03-04T12:00:00'},
      {value: 387, key: '2020-03-05T12:00:00'},
      {value: 760, key: '2020-03-07T12:00:00'},
      {value: 122, key: '2020-03-06T12:00:00'},
      {value: 162, key: '2020-03-08T12:00:00'},
      {value: 540, key: '2020-03-09T12:00:00'},
      {value: 193, key: '2020-03-10T12:00:00'},
      {value: 860, key: '2020-03-11T12:00:00'},
      {value: 941, key: '2020-03-12T12:00:00'},
      {value: 773, key: '2020-03-13T12:00:00'},
      {value: 171, key: '2020-03-14T12:00:00'},
    ],
    color: 'red',
    metadata: {
      relatedIndex: 2,
      areaColor: 'rgba(255,0,0,0.1)',
      shape: 'Bar',
    },
  },
  {
    name: 'Similar stores median',
    data: [
      {value: 759, key: '2020-03-02T12:00:00'},
      {value: 238, key: '2020-03-01T12:00:00'},
      {value: 190, key: '2020-03-03T12:00:00'},
      {value: 90, key: '2020-03-04T12:00:00'},
      {value: 237, key: '2020-03-05T12:00:00'},
      {value: 580, key: '2020-03-07T12:00:00'},
      {value: 172, key: '2020-03-06T12:00:00'},
      {value: 12, key: '2020-03-08T12:00:00'},
      {value: 390, key: '2020-03-09T12:00:00'},
      {value: 43, key: '2020-03-10T12:00:00'},
      {value: 710, key: '2020-03-11T12:00:00'},
      {value: 791, key: '2020-03-12T12:00:00'},
      {value: 623, key: '2020-03-13T12:00:00'},
      {value: 21, key: '2020-03-14T12:00:00'},
    ],
    color: '#286A7B',
    styleOverride: {
      line: {
        strokeDasharray: '3 6',
        width: 3,
      },
    },
  },
  {
    name: '25th percentile',
    data: [
      {value: 559, key: '2020-03-02T12:00:00'},
      {value: 88, key: '2020-03-01T12:00:00'},
      {value: 40, key: '2020-03-03T12:00:00'},
      {value: 0, key: '2020-03-04T12:00:00'},
      {value: 87, key: '2020-03-05T12:00:00'},
      {value: 430, key: '2020-03-07T12:00:00'},
      {value: 22, key: '2020-03-06T12:00:00'},
      {value: 0, key: '2020-03-08T12:00:00'},
      {value: 240, key: '2020-03-09T12:00:00'},
      {value: 0, key: '2020-03-10T12:00:00'},
      {value: 540, key: '2020-03-11T12:00:00'},
      {value: 641, key: '2020-03-12T12:00:00'},
      {value: 473, key: '2020-03-13T12:00:00'},
      {value: 0, key: '2020-03-14T12:00:00'},
    ],
    color: 'blue',
    metadata: {
      shape: 'Bar',
      relatedIndex: 2,
      areaColor: 'rgba(0,0,255,0.1)',
    },
  },
];

const HiddenTemplate: Story = () => {
  const [hiddenIndexes, setHiddenIndexes] = useState<number[]>([]);

  return (
    <>
      <div style={style}>
        {RELATIONAL_DATA.map((_, index) => {
          return (
            <button
              key={index}
              onMouseOver={() => {
                // Disable hover states when any item is selected.
                // Hover states are only available when no
                // all items are visible.
                if (hiddenIndexes.length > 0) {
                  return;
                }

                setSingleSeriesActive(CHART_ID, index);
              }}
              onMouseLeave={() => {
                setSingleSeriesActive(CHART_ID, -1);
              }}
              onClick={() => {
                let newIndexes = [...hiddenIndexes];

                // No items are hidden, hide all other lines
                if (newIndexes.length === 0) {
                  const indexes = RELATIONAL_DATA.map((_, index) => index);
                  indexes.splice(index, 1);

                  newIndexes = indexes;
                  // Clicked item is hidden, show it
                } else if (newIndexes.includes(index)) {
                  const indexToRemove = newIndexes.findIndex(
                    (check) => index === check,
                  );

                  newIndexes.splice(indexToRemove, 1);
                } else {
                  // Clicked item is the only visible item,
                  // show all items
                  if (newIndexes.length === RELATIONAL_DATA.length - 1) {
                    newIndexes = [];
                  } else {
                    newIndexes.push(index);
                  }
                }

                setHiddenIndexes(newIndexes);
                setHiddenItems(CHART_ID, newIndexes);
              }}
              style={{
                border:
                  hiddenIndexes.length === 0
                    ? '3px solid transparent'
                    : hiddenIndexes.includes(index)
                    ? '3px solid red'
                    : '3px solid green',
              }}
            >
              {RELATIONAL_DATA[index].name}
            </button>
          );
        })}
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
        <LineChartRelational
          data={RELATIONAL_DATA}
          id={CHART_ID}
          showLegend={false}
          theme="Light"
        />
      </PolarisVizProvider>
    </>
  );
};

export const HideLines: Story = HiddenTemplate.bind({});
