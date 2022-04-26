import React from 'react';

import {WebPolarisVizProvider as PolarisVizProvider} from '../../../../WebPolarisVizProvider';
import {
  BarChart,
  LineChart,
  StackedAreaChart,
  SimpleNormalizedChart,
  SparkLineChart,
  SparkBarChart,
  SimpleBarChart,
} from '../../../../';
import {ComponentContainer, Title} from '../';

export function WebComponents() {
  return (
    <div
      style={{
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(490px, 1fr))',
      }}
    >
      <PolarisVizProvider
        themes={{
          Default: {
            chartContainer: {
              padding: '20px',
            },
          },
        }}
      >
        <Title type="h3" style={{gridColumn: 'span 2'}}>
          Default Charts
        </Title>

        <ComponentContainer
          title="BarChart"
          description="Used to show a grouped comparison of different types, across categories or time. "
          chart={
            <BarChart
              isAnimated
              xAxisOptions={{}}
              data={[
                {
                  name: 'Breakfast',
                  data: [
                    {key: 'Monday', value: 3},
                    {key: 'Tuesday', value: 10},
                    {key: 'Wednesday', value: 4},
                  ],
                },
                {
                  name: 'Lunch',
                  data: [
                    {key: 'Monday', value: 4},
                    {key: 'Tuesday', value: 9},
                    {key: 'Wednesday', value: 5},
                  ],
                },
                {
                  name: 'Dinner',
                  data: [
                    {key: 'Monday', value: 7},
                    {key: 'Tuesday', value: 10},
                    {key: 'Wednesday', value: 6},
                  ],
                },
              ]}
            />
          }
        />

        <ComponentContainer
          title="LineChart"
          description="Used to show change over time. "
          chart={
            <LineChart
              isAnimated
              data={[
                {
                  name: 'Sales',
                  data: [
                    {value: 324.19, key: '2020-01-01'},
                    {value: 613.29, key: '2020-01-02'},
                    {value: -422.79, key: '2020-01-03'},
                    {value: 0, key: '2020-01-04'},
                    {value: 1, key: '2020-01-05'},
                  ],
                },
              ]}
            />
          }
        />

        <ComponentContainer
          title="StackedAreaChart"
          description="Used to compare multiple series of data and display the total value. "
          chart={
            <StackedAreaChart
              isAnimated
              data={[
                {
                  name: 'First-time',
                  data: [
                    {key: 'January', value: 4237},
                    {key: 'February', value: 5024},
                    {key: 'March', value: 5730},
                    {key: 'April', value: 5587},
                    {key: 'May', value: 5303},
                    {key: 'June', value: 5634},
                    {key: 'July', value: 3238},
                  ],
                },
                {
                  name: 'Returning',
                  data: [
                    {key: 'January', value: 5663},
                    {key: 'February', value: 7349},
                    {key: 'March', value: 9795},
                    {key: 'April', value: 7396},
                    {key: 'May', value: 7028},
                    {key: 'June', value: 12484},
                    {key: 'July', value: 4878},
                  ],
                },
              ]}
            />
          }
        />

        <Title type="h3" style={{gridColumn: 'span 2'}}>
          Spark Charts
        </Title>

        <ComponentContainer
          title="SparkBarChart"
          description="Used in small sizes to show how a metric has performed over time. "
          center
          chart={
            <div style={{width: '250px', height: '140px'}}>
              <SparkBarChart
                isAnimated
                data={[
                  {
                    data: [
                      {key: 0, value: 600},
                      {key: 1, value: 600},
                      {key: 2, value: 600},
                      {key: 3, value: 600},
                      {key: 4, value: 600},
                      {key: 5, value: 600},
                      {key: 6, value: 600},
                      {key: 7, value: 600},
                      {key: 8, value: 600},
                      {key: 9, value: 600},
                      {key: 10, value: 600},
                      {key: 11, value: 600},
                      {key: 12, value: 600},
                      {key: 13, value: 600},
                      {key: 14, value: 600},
                      {key: 15, value: 600},
                      {key: 16, value: 600},
                      {key: 17, value: 600},
                      {key: 18, value: 600},
                      {key: 19, value: 600},
                      {key: 20, value: 600},
                      {key: 21, value: 600},
                      {key: 22, value: 600},
                      {key: 23, value: 600},
                      {key: 24, value: 600},
                      {key: 25, value: 600},
                      {key: 26, value: 600},
                      {key: 27, value: 600},
                      {key: 28, value: 600},
                      {key: 29, value: 600},
                    ],
                    isComparison: true,
                  },
                  {
                    data: [
                      {key: 1, value: 100},
                      {key: 2, value: 200},
                      {key: 3, value: 300},
                      {key: 4, value: 400},
                      {key: 5, value: 400},
                      {key: 6, value: 100},
                      {key: 7, value: 2000},
                      {key: 8, value: 800},
                      {key: 9, value: 900},
                      {key: 10, value: 200},
                      {key: 11, value: 100},
                      {key: 12, value: 200},
                      {key: 13, value: 300},
                      {key: 14, value: 400},
                      {key: 15, value: 400},
                      {key: 16, value: 100},
                      {key: 17, value: 1000},
                      {key: 18, value: 800},
                      {key: 19, value: 900},
                      {key: 20, value: 200},
                      {key: 21, value: 100},
                      {key: 22, value: 200},
                      {key: 23, value: 300},
                      {key: 24, value: 400},
                      {key: 25, value: 400},
                      {key: 26, value: 100},
                      {key: 27, value: 800},
                      {key: 28, value: 800},
                      {key: 29, value: 900},
                    ],
                  },
                ]}
              />
            </div>
          }
        />

        <ComponentContainer
          title="SparkLineChart"
          description="Used in small sizes to show how a metric has performed over time. "
          center
          chart={
            <div style={{width: '250px', height: '140px'}}>
              <SparkLineChart
                isAnimated
                data={[
                  {
                    data: [
                      {key: 0, value: 100},
                      {key: 1, value: 200},
                      {key: 2, value: 300},
                      {key: 3, value: 400},
                      {key: 4, value: 400},
                      {key: 5, value: 1000},
                      {key: 6, value: 200},
                      {key: 7, value: 800},
                      {key: 8, value: 900},
                      {key: 9, value: 200},
                      {key: 10, value: 400},
                    ],
                  },
                  {
                    isComparison: true,
                    data: [
                      {key: 0, value: 200},
                      {key: 1, value: 200},
                      {key: 2, value: 200},
                      {key: 3, value: 200},
                      {key: 4, value: 200},
                      {key: 5, value: 200},
                      {key: 6, value: 200},
                      {key: 7, value: 200},
                      {key: 8, value: 200},
                      {key: 9, value: 200},
                      {key: 10, value: 200},
                    ],
                  },
                ]}
              />
            </div>
          }
        />

        <Title type="h3" style={{gridColumn: 'span 2'}}>
          Simple Charts
        </Title>

        <ComponentContainer
          title="SimpleBarChart"
          description="Used to show a grouped comparison of different types, across categories or time. "
          chart={
            <SimpleBarChart
              data={[
                {
                  name: 'BFCM 2020',
                  data: [
                    {value: 4, key: 'Shirt'},
                    {value: 7, key: 'Shoes'},
                  ],
                },
                {
                  name: 'BFCM 2021',
                  data: [
                    {value: 5, key: 'Shirt'},
                    {value: 6, key: 'Shoes'},
                  ],
                },
              ]}
            />
          }
        />

        <ComponentContainer
          title="SimpleNormalizedChart"
          description="Used for positive datasets with two to four items. "
          center
          chart={
            <div style={{width: 450}}>
              <SimpleNormalizedChart
                direction="horizontal"
                comparisonMetrics={[
                  {
                    dataIndex: 0,
                    metric: '5',
                    trend: 'positive',
                    accessibilityLabel: 'Increase of',
                  },
                  {
                    dataIndex: 1,
                    metric: '5',
                    trend: 'negative',
                    accessibilityLabel: 'Decrease of',
                  },
                ]}
                data={[
                  {
                    key: 'Direct',
                    value: 200,
                  },
                  {
                    key: 'Facebook',
                    value: 100,
                  },
                ]}
                labelFormatter={(value) => `$${value}`}
              />
            </div>
          }
        />
      </PolarisVizProvider>
    </div>
  );
}
