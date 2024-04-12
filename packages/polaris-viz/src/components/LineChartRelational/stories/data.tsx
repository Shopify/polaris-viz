import type {Story} from '@storybook/react';
import type {RenderTooltipContentData} from 'types';
import type {DataSeries} from '@shopify/polaris-viz-core';
import {LIGHT_THEME} from '@shopify/polaris-viz-core';
import type {LineChartProps} from 'components/LineChart/LineChart';

import {LineChartRelational} from '../LineChartRelational';
import {
  formatLinearXAxisLabel,
  formatLinearYAxisLabel,
} from '../../../storybook/utilities';
import {renderLinearTooltipContent} from '../../../utilities';

export const TOOLTIP_CONTENT = {
  empty: undefined,
  Custom: ({data}: RenderTooltipContentData) => {
    return (
      <div
        style={{
          background: 'black',
          color: 'white',
          padding: '10px',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 12,
        }}
      >
        {data[0].data.map(({key, value}) => (
          // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
          <div key={key}>{`${key}: ${formatLinearYAxisLabel(
            Number(value!),
          )}`}</div>
        ))}
      </div>
    );
  },
};

export const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChartRelational {...args} />;
};

export const DEFAULT_PROPS: Partial<LineChartProps> = {
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
  },
  yAxisOptions: {labelFormatter: formatLinearYAxisLabel},
  tooltipOptions: {
    titleFormatter: (value) => new Date(value!).toLocaleDateString(),
    valueFormatter: formatLinearYAxisLabel,
    renderTooltipContent: (tooltipData) => {
      return renderLinearTooltipContent(tooltipData, {
        title: tooltipData.title,
        groups: [
          {title: 'Your store', indexes: [0]},
          {title: 'Similar stores', indexes: [1, 2, 3]},
        ],
      });
    },
  },
  showLegend: false,
};

export const DEFAULT_DATA: DataSeries[] = [
  {
    name: 'Average',
    data: [
      {value: 333, key: '2020-03-01T12:00:00'},
      {value: 797, key: '2020-03-02T12:00:00'},
      {value: 234, key: '2020-03-03T12:00:00'},
      {value: 534, key: '2020-03-04T12:00:00'},
      {value: 132, key: '2020-03-05T12:00:00'},
      {value: 159, key: '2020-03-06T12:00:00'},
      {value: 239, key: '2020-03-07T12:00:00'},
      {value: 708, key: '2020-03-08T12:00:00'},
      {value: 234, key: '2020-03-09T12:00:00'},
      {value: 645, key: '2020-03-10T12:00:00'},
      {value: 543, key: '2020-03-11T12:00:00'},
      {value: 89, key: '2020-03-12T12:00:00'},
      {value: 849, key: '2020-03-13T12:00:00'},
      {value: 129, key: '2020-03-14T12:00:00'},
    ],
    color: LIGHT_THEME.seriesColors.upToEight[0],
  },
  {
    name: '75th Percentile',
    data: [
      {value: 388, key: '2020-03-01T12:00:00'},
      {value: 859, key: '2020-03-02T12:00:00'},
      {value: 340, key: '2020-03-03T12:00:00'},
      {value: 240, key: '2020-03-04T12:00:00'},
      {value: 387, key: '2020-03-05T12:00:00'},
      {value: 122, key: '2020-03-06T12:00:00'},
      {value: 760, key: '2020-03-07T12:00:00'},
      {value: 162, key: '2020-03-08T12:00:00'},
      {value: 540, key: '2020-03-09T12:00:00'},
      {value: 193, key: '2020-03-10T12:00:00'},
      {value: 860, key: '2020-03-11T12:00:00'},
      {value: 941, key: '2020-03-12T12:00:00'},
      {value: 773, key: '2020-03-13T12:00:00'},
      {value: 171, key: '2020-03-14T12:00:00'},
    ],
    color: 'rgba(218, 182, 242, 1)',
    metadata: {
      relatedIndex: 2,
      areaColor: 'rgba(218, 182, 242, 0.2)',
      legendLabel: '75th - 25th percentile',
    },
    styleOverride: {
      tooltip: {
        shape: 'Bar',
      },
    },
  },
  {
    name: 'Median',
    data: [
      {value: 238, key: '2020-03-01T12:00:00'},
      {value: 759, key: '2020-03-02T12:00:00'},
      {value: 190, key: '2020-03-03T12:00:00'},
      {value: 90, key: '2020-03-04T12:00:00'},
      {value: 237, key: '2020-03-05T12:00:00'},
      {value: 172, key: '2020-03-06T12:00:00'},
      {value: 580, key: '2020-03-07T12:00:00'},
      {value: 12, key: '2020-03-08T12:00:00'},
      {value: 390, key: '2020-03-09T12:00:00'},
      {value: 43, key: '2020-03-10T12:00:00'},
      {value: 710, key: '2020-03-11T12:00:00'},
      {value: 791, key: '2020-03-12T12:00:00'},
      {value: 623, key: '2020-03-13T12:00:00'},
      {value: 21, key: '2020-03-14T12:00:00'},
    ],
    color: LIGHT_THEME.seriesColors.upToEight[5],
    styleOverride: {
      line: {
        hasArea: false,
        strokeDasharray: '3 6',
      },
    },
  },
  {
    name: '25th percentile',
    data: [
      {value: 88, key: '2020-03-01T12:00:00'},
      {value: 559, key: '2020-03-02T12:00:00'},
      {value: 40, key: '2020-03-03T12:00:00'},
      {value: 0, key: '2020-03-04T12:00:00'},
      {value: 87, key: '2020-03-05T12:00:00'},
      {value: 22, key: '2020-03-06T12:00:00'},
      {value: 430, key: '2020-03-07T12:00:00'},
      {value: 0, key: '2020-03-08T12:00:00'},
      {value: 240, key: '2020-03-09T12:00:00'},
      {value: 0, key: '2020-03-10T12:00:00'},
      {value: 540, key: '2020-03-11T12:00:00'},
      {value: 641, key: '2020-03-12T12:00:00'},
      {value: 473, key: '2020-03-13T12:00:00'},
      {value: 0, key: '2020-03-14T12:00:00'},
    ],
    color: 'rgba(218, 182, 242, 1)',
    metadata: {
      relatedIndex: 2,
      areaColor: 'rgba(218, 182, 242, 0.2)',
      legendLabel: '75th - 25th percentile',
    },
    styleOverride: {
      tooltip: {
        shape: 'Bar',
      },
    },
  },
];
