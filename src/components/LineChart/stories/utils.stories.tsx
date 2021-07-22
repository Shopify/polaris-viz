import React from 'react';

import {TooltipContent} from '../components/TooltipContent/TooltipContent';
import {LineChartProps} from '../LineChart';
import {
  DEFAULT_CROSSHAIR_COLOR,
  CROSSHAIR_WIDTH,
  DEFAULT_GREY_LABEL,
  colorWhite,
  colorSky,
  colorSkyDark,
} from '../../../constants';

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const gradient = [
  {
    offset: 0,
    color: '#08CA9B',
  },
  {
    offset: 85,
    color: 'rgba(92,105,208,0.8)',
  },
  {
    offset: 100,
    color: 'rgba(92,105,208,0.8)',
  },
];

export const series = [
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: randomNumber(20, 50), label: '2020-03-02T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-01T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-03T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-04T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-05T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-07T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-06T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-08T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-09T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-10T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-11T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-12T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-13T12:00:00'},
      {rawValue: randomNumber(20, 50), label: '2020-03-14T12:00:00'},
    ],
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: randomNumber(40, 50), label: '2020-03-02T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-01T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-03T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-04T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-05T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-07T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-06T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-08T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-09T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-10T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-11T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-12T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-13T12:00:00'},
      {rawValue: randomNumber(40, 50), label: '2020-03-14T12:00:00'},
    ],
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: randomNumber(30, 45), label: '2020-03-02T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-01T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-03T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-04T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-05T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-07T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-06T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-08T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-09T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-10T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-11T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-12T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-13T12:00:00'},
      {rawValue: randomNumber(30, 45), label: '2020-03-14T12:00:00'},
    ],
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: randomNumber(20, 60), label: '2020-03-02T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-01T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-03T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-04T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-05T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-07T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-06T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-08T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-09T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-10T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-11T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-12T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-13T12:00:00'},
      {rawValue: randomNumber(20, 60), label: '2020-03-14T12:00:00'},
    ],
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: randomNumber(30, 50), label: '2020-03-02T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-01T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-03T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-04T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-05T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-07T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-06T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-08T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-09T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-10T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-11T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-12T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-13T12:00:00'},
      {rawValue: randomNumber(30, 50), label: '2020-03-14T12:00:00'},
    ],
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: randomNumber(20, 30), label: '2020-03-02T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-01T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-03T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-04T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-05T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-07T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-06T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-08T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-09T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-10T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-11T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-12T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-13T12:00:00'},
      {rawValue: randomNumber(20, 30), label: '2020-03-14T12:00:00'},
    ],
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: randomNumber(0, 50), label: '2020-03-02T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-01T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-03T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-04T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-05T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-07T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-06T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-08T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-09T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-10T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-11T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-12T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-13T12:00:00'},
      {rawValue: randomNumber(0, 50), label: '2020-03-14T12:00:00'},
    ],
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: randomNumber(0, 10), label: '2020-03-02T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-01T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-03T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-04T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-05T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-07T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-06T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-08T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-09T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-10T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-11T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-12T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-13T12:00:00'},
      {rawValue: randomNumber(0, 10), label: '2020-03-14T12:00:00'},
    ],
  },
];

export const xAxisLabels = series[0].data.map(({label}) => label);

export function formatXAxisLabel(value: string) {
  return new Date(value).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'numeric',
  });
}

export function formatYAxisLabel(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'CAD',
    currencyDisplay: 'symbol',
  }).format(value);
}

export const renderTooltipContent: LineChartProps['renderTooltipContent'] = ({
  data,
}) => {
  function formatTooltipValue(value: number) {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'CAD',
    }).format(value);
  }

  function formatTooltipLabel(value: string) {
    return new Date(value).toLocaleDateString('en-CA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  const formattedData = data.map(
    ({name, point: {label, value}, color, lineStyle}) => ({
      name,
      color,
      lineStyle,
      point: {
        value: formatTooltipValue(value),
        label: formatTooltipLabel(label),
      },
    }),
  );

  return <TooltipContent data={formattedData} />;
};

export const defaultProps = {
  series,
  isAnimated: true,
  renderTooltipContent,
  crossHairOptions: {
    width: CROSSHAIR_WIDTH,
    color: DEFAULT_CROSSHAIR_COLOR,
    opacity: 1,
  },
  gridOptions: {
    showVerticalLines: true,
    showHorizontalLines: true,
    color: colorSky,
    horizontalOverflow: false,
    horizontalMargin: 0,
  },
  lineOptions: {hasSpline: false, width: 2, pointStroke: colorWhite},
  xAxisOptions: {
    xAxisLabels,
    hideXAxisLabels: false,
    showTicks: true,
    useMinimalLabels: false,
    labelFormatter: (value: string) => formatXAxisLabel(value),
  },
  yAxisOptions: {
    labelFormatter: (value: number) => value.toString(),
    integersOnly: false,
  },
};
