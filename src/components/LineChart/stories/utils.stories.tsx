import type {TooltipData} from 'components/LineChart/types';
import React from 'react';

import {TooltipContent} from '../components/TooltipContent/TooltipContent';

export const data = [
  {
    name: 'Apr 01–Apr 14, 2020',
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
    name: 'Mar 01–Mar 14, 2020',
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

export const seriesUsingSeriesColors = [
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {
        value: 32 * 7,
        key: '2/1/2021',
      },
      {
        value: 51 * 7,
        key: '1/13/2021',
      },
      {
        value: 29 * 7,
        key: '2/27/2021',
      },
      {
        value: 46 * 7,
        key: '1/14/2021',
      },
      {
        value: 43 * 7,
        key: '12/6/2020',
      },
      {
        value: 88 * 7,
        key: '3/21/2021',
      },
      {
        value: 19 * 7,
        key: '9/12/2020',
      },
      {
        value: 85 * 7,
        key: '9/15/2020',
      },
      {
        value: 35 * 7,
        key: '6/23/2021',
      },
      {
        value: 22 * 7,
        key: '3/12/2021',
      },
      {
        value: 64 * 7,
        key: '3/1/2021',
      },
      {
        value: 27 * 7,
        key: '10/31/2020',
      },
    ],
  },
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {
        value: 22 * 7,
        key: '3/25/2021',
      },
      {
        value: 50 * 7,
        key: '10/30/2020',
      },
      {
        value: 20 * 7,
        key: '12/15/2020',
      },
      {
        value: 8 * 7,
        key: '4/17/2021',
      },
      {
        value: 8 * 7,
        key: '6/21/2021',
      },
      {
        value: 88 * 7,
        key: '12/21/2020',
      },
      {
        value: 69 * 7,
        key: '5/13/2021',
      },
      {
        value: 25 * 7,
        key: '3/11/2021',
      },
      {
        value: 29 * 7,
        key: '11/19/2020',
      },
      {
        value: 22 * 7,
        key: '12/26/2020',
      },
      {
        value: 78 * 7,
        key: '12/29/2020',
      },
      {
        value: 17 * 7,
        key: '1/5/2021',
      },
    ],
  },
  {
    name: 'Apr 01–Apr 14, 2020',
    data: [
      {
        value: 58 * 7,
        key: '5/20/2021',
      },
      {
        value: 42 * 7,
        key: '7/25/2021',
      },
      {
        value: 68 * 7,
        key: '7/23/2021',
      },
      {
        value: 96 * 7,
        key: '8/16/2021',
      },
      {
        value: 70 * 7,
        key: '5/8/2021',
      },
      {
        value: 15 * 7,
        key: '11/10/2020',
      },
      {
        value: 72 * 7,
        key: '5/23/2021',
      },
      {
        value: 99 * 7,
        key: '7/5/2021',
      },
      {
        value: 70 * 7,
        key: '4/7/2021',
      },
      {
        value: 9 * 7,
        key: '5/8/2021',
      },
      {
        value: 22 * 7,
        key: '10/31/2020',
      },
      {
        value: 41 * 7,
        key: '5/16/2021',
      },
    ],
  },
  {
    name: 'Mar 01–Mar 14, 2020',
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
    ],
    isComparison: true,
  },
];

export const xAxisLabels = data[0].data.map(({key}) => `${key}`);

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
