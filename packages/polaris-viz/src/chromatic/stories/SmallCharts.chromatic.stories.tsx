import {storiesOf} from '@storybook/react';
import {BarChart} from '../../components/BarChart/BarChart';
import {StackedAreaChart} from '../../components/StackedAreaChart/StackedAreaChart';
import {LineChart} from '../../components/LineChart/LineChart';
import {LineChartPredictive} from '../../components/LineChartPredictive/LineChartPredictive';
import {LineChartRelational} from '../../components/LineChartRelational/LineChartRelational';
import {PolarisVizProvider} from '../../components/PolarisVizProvider/PolarisVizProvider';
import type {LineChartProps} from '../../components/LineChart/LineChart';

const CHARTS = {
  StackedAreaChart: StackedAreaChart,
  LineChart: LineChart,
  LineChartPredictive: LineChartPredictive,
  LineChartRelational: LineChartRelational,
  BarChart: BarChart,
};

export function formatHourlyLabel(value: string) {
  const formatter = new Intl.DateTimeFormat('en', {
    timeStyle: 'short',
  });

  return formatter
    .format(new Date(value))
    .toLocaleLowerCase()
    .replace('am', 'a.m.')
    .replace('pm', 'p.m.');
}

export function formatLinearXAxisLabel(value: string) {
  return new Date(value).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatLinearYAxisLabel(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'CAD',
    currencyDisplay: 'symbol',
  }).format(value);
}

export function formatPercentageYAxisLabel(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(value);
}

export const DEFAULT_PROPS: Partial<LineChartProps> = {
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatLinearYAxisLabel},
  tooltipOptions: {
    titleFormatter: (value) => new Date(value!).toLocaleDateString(),
    valueFormatter: formatLinearYAxisLabel,
  },
};

export const DEFAULT_DATA = [
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
  },
  {
    name: 'Previous month',
    data: [
      {value: 709, key: '2020-03-02T12:00:00'},
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
    color: 'red',
    isComparison: true,
  },
];

const stories = storiesOf(`Chromatic/Small charts`, module).addParameters({
  chromatic: {disableSnapshot: false},
});

stories.add('Default', () => {
  return (
    <div style={{display: 'grid', gap: '20px'}}>
      <PolarisVizProvider themes={{Name: {chartContainer: {minHeight: 0}}}}>
        {Object.keys(CHARTS).map((key) => {
          const Chart = CHARTS[key];

          return (
            <div style={{width: 200, height: 100}}>
              <Chart theme="Name" data={DEFAULT_DATA} {...DEFAULT_PROPS} />
            </div>
          );
        })}
      </PolarisVizProvider>
    </div>
  );
});
