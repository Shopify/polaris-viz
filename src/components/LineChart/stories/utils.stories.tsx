import type {TooltipData} from 'components/LineChart/types';
import React from 'react';

import {TooltipContent} from '../components/TooltipContent/TooltipContent';

export const series = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {rawValue: 333, label: '2020-04-01T12:00:00'},
      {rawValue: 797, label: '2020-04-02T12:00:00'},
      {rawValue: 234, label: '2020-04-03T12:00:00'},
      {rawValue: 534, label: '2020-04-04T12:00:00'},
      {rawValue: 132, label: '2020-04-05T12:00:00'},
      {rawValue: 159, label: '2020-04-06T12:00:00'},
      {rawValue: 239, label: '2020-04-07T12:00:00'},
      {rawValue: 708, label: '2020-04-08T12:00:00'},
      {rawValue: 234, label: '2020-04-09T12:00:00'},
      {rawValue: 645, label: '2020-04-10T12:00:00'},
      {rawValue: 543, label: '2020-04-11T12:00:00'},
      {rawValue: 89, label: '2020-04-12T12:00:00'},
      {rawValue: 849, label: '2020-04-13T12:00:00'},
      {rawValue: 129, label: '2020-04-14T12:00:00'},
    ],
    areaColor: 'rgba(92,105,208,0.5)',
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 709, label: '2020-03-02T12:00:00'},
      {rawValue: 238, label: '2020-03-01T12:00:00'},
      {rawValue: 190, label: '2020-03-03T12:00:00'},
      {rawValue: 90, label: '2020-03-04T12:00:00'},
      {rawValue: 237, label: '2020-03-05T12:00:00'},
      {rawValue: 580, label: '2020-03-07T12:00:00'},
      {rawValue: 172, label: '2020-03-06T12:00:00'},
      {rawValue: 12, label: '2020-03-08T12:00:00'},
      {rawValue: 390, label: '2020-03-09T12:00:00'},
      {rawValue: 43, label: '2020-03-10T12:00:00'},
      {rawValue: 710, label: '2020-03-11T12:00:00'},
      {rawValue: 791, label: '2020-03-12T12:00:00'},
      {rawValue: 623, label: '2020-03-13T12:00:00'},
      {rawValue: 21, label: '2020-03-14T12:00:00'},
    ],
    color: 'red',
    lineStyle: 'dotted' as 'dotted',
  },
];

export const seriesUsingSeriesColors = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {
        rawValue: 32 * 7,
        label: '2/1/2021',
      },
      {
        rawValue: 51 * 7,
        label: '1/13/2021',
      },
      {
        rawValue: 29 * 7,
        label: '2/27/2021',
      },
      {
        rawValue: 46 * 7,
        label: '1/14/2021',
      },
      {
        rawValue: 43 * 7,
        label: '12/6/2020',
      },
      {
        rawValue: 88 * 7,
        label: '3/21/2021',
      },
      {
        rawValue: 19 * 7,
        label: '9/12/2020',
      },
      {
        rawValue: 85 * 7,
        label: '9/15/2020',
      },
      {
        rawValue: 35 * 7,
        label: '6/23/2021',
      },
      {
        rawValue: 22 * 7,
        label: '3/12/2021',
      },
      {
        rawValue: 64 * 7,
        label: '3/1/2021',
      },
      {
        rawValue: 27 * 7,
        label: '10/31/2020',
      },
    ],
    lineStyle: 'solid' as 'solid',
  },
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {
        rawValue: 22 * 7,
        label: '3/25/2021',
      },
      {
        rawValue: 50 * 7,
        label: '10/30/2020',
      },
      {
        rawValue: 20 * 7,
        label: '12/15/2020',
      },
      {
        rawValue: 8 * 7,
        label: '4/17/2021',
      },
      {
        rawValue: 8 * 7,
        label: '6/21/2021',
      },
      {
        rawValue: 88 * 7,
        label: '12/21/2020',
      },
      {
        rawValue: 69 * 7,
        label: '5/13/2021',
      },
      {
        rawValue: 25 * 7,
        label: '3/11/2021',
      },
      {
        rawValue: 29 * 7,
        label: '11/19/2020',
      },
      {
        rawValue: 22 * 7,
        label: '12/26/2020',
      },
      {
        rawValue: 78 * 7,
        label: '12/29/2020',
      },
      {
        rawValue: 17 * 7,
        label: '1/5/2021',
      },
    ],
    lineStyle: 'solid' as 'solid',
  },
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {
        rawValue: 58 * 7,
        label: '5/20/2021',
      },
      {
        rawValue: 42 * 7,
        label: '7/25/2021',
      },
      {
        rawValue: 68 * 7,
        label: '7/23/2021',
      },
      {
        rawValue: 96 * 7,
        label: '8/16/2021',
      },
      {
        rawValue: 70 * 7,
        label: '5/8/2021',
      },
      {
        rawValue: 15 * 7,
        label: '11/10/2020',
      },
      {
        rawValue: 72 * 7,
        label: '5/23/2021',
      },
      {
        rawValue: 99 * 7,
        label: '7/5/2021',
      },
      {
        rawValue: 70 * 7,
        label: '4/7/2021',
      },
      {
        rawValue: 9 * 7,
        label: '5/8/2021',
      },
      {
        rawValue: 22 * 7,
        label: '10/31/2020',
      },
      {
        rawValue: 41 * 7,
        label: '5/16/2021',
      },
    ],
    lineStyle: 'solid' as 'solid',
  },
  {
    name: 'Mar 01–Mar 14, 2020',
    data: [
      {rawValue: 709, label: '2020-03-02T12:00:00'},
      {rawValue: 238, label: '2020-03-01T12:00:00'},
      {rawValue: 190, label: '2020-03-03T12:00:00'},
      {rawValue: 90, label: '2020-03-04T12:00:00'},
      {rawValue: 237, label: '2020-03-05T12:00:00'},
      {rawValue: 580, label: '2020-03-07T12:00:00'},
      {rawValue: 172, label: '2020-03-06T12:00:00'},
      {rawValue: 12, label: '2020-03-08T12:00:00'},
      {rawValue: 390, label: '2020-03-09T12:00:00'},
      {rawValue: 43, label: '2020-03-10T12:00:00'},
      {rawValue: 710, label: '2020-03-11T12:00:00'},
      {rawValue: 791, label: '2020-03-12T12:00:00'},
    ],
    lineStyle: 'dotted' as 'dotted',
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

export const renderTooltipContent: any = ({data}: {data: TooltipData[]}) => {
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
