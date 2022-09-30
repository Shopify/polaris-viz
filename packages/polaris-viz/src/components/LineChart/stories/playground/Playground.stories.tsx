import React from 'react';
import type {Story} from '@storybook/react';

import {LineChart, LineChartProps} from '../../LineChart';
import {randomNumber} from '../../../Docs/utilities';
import {formatLinearXAxisLabel} from '../../../../storybook/utilities';
import {META} from '../meta';
import type {DataSeries} from '@shopify/polaris-viz-core/src';

const REPORTIFY_RESPONSE_AVG = [
  {
    result: {
      columns: [
        {
          field: 'Average',
          raw: '"Average"',
          type: 'property',
          format: 'string',
        },
        {
          field: 'periods_since_first_purchase',
          raw: 'periods_since_first_purchase',
          type: 'property',
          format: 'number',
        },
        {
          field: 'average_customer_retention_rate',
          raw: 'round((sum(total_customers) / sum(total_customers_in_cohort_period)), 4)',
          type: 'measure',
          format: 'float',
        },
        {
          field: 'avg_total_customers',
          raw: 'avg(total_customers)',
          type: 'measure',
          format: 'float',
        },
      ],
      data: [
        ['Average', 0, 1, 9719],
        ['Average', 1, 0.1108, 1118.090909090909],
        ['Average', 2, 0.0809, 847.3],
        ['Average', 3, 0.0627, 681.8888888888889],
        ['Average', 4, 0.0543, 620.5],
        ['Average', 5, 0.0441, 528.7142857142857],
        ['Average', 6, 0.0363, 438.8333333333333],
        ['Average', 7, 0.0315, 359.8],
        ['Average', 8, 0.0313, 267.25],
        ['Average', 9, 0.032, 313],
        ['Average', 10, 0.0273, 295.5],
        ['Average', 11, 0.0227, 259],
      ],
    },
  },
];

const REPORTIFY_RESPONSE_COHORT = [
  {
    result: {
      columns: [
        {
          field: 'customer_cohort_period',
          raw: 'customer_cohort_period',
          type: 'property',
          format: 'timestamp',
          unit: 'second',
        },
        {
          field: 'periods_since_first_purchase',
          raw: 'periods_since_first_purchase',
          type: 'property',
          format: 'number',
        },
        {
          field: 'customer_retention_rate',
          raw: 'customer_retention_rate',
          type: 'measure',
          format: 'float',
        },
        {
          field: 'total_customers',
          raw: 'total_customers',
          type: 'measure',
          format: 'number',
        },
      ],
      data: [
        ['2021-09-01T00:00:00+02:00', 0, 1, 11395],
        ['2021-09-01T00:00:00+02:00', 1, 0.1111, 1266],
        ['2021-09-01T00:00:00+02:00', 2, 0.0756, 861],
        ['2021-09-01T00:00:00+02:00', 3, 0.0307, 350],
        ['2021-09-01T00:00:00+02:00', 4, 0.0729, 831],
        ['2021-09-01T00:00:00+02:00', 5, 0.0519, 591],
        ['2021-09-01T00:00:00+02:00', 6, 0.0461, 525],
        ['2021-09-01T00:00:00+02:00', 7, 0.0315, 359],
        ['2021-09-01T00:00:00+02:00', 8, 0.0291, 332],
        ['2021-09-01T00:00:00+02:00', 9, 0.0367, 418],
        ['2021-09-01T00:00:00+02:00', 10, 0.0249, 284],
        ['2021-09-01T00:00:00+02:00', 11, 0.0227, 259],
        ['2021-10-01T00:00:00+02:00', 0, 1, 10245],
        ['2021-10-01T00:00:00+02:00', 1, 0.1082, 1108],
        ['2021-10-01T00:00:00+02:00', 2, 0.0437, 448],
        ['2021-10-01T00:00:00+02:00', 3, 0.0868, 889],
        ['2021-10-01T00:00:00+02:00', 4, 0.0636, 652],
        ['2021-10-01T00:00:00+02:00', 5, 0.0554, 568],
        ['2021-10-01T00:00:00+02:00', 6, 0.0416, 426],
        ['2021-10-01T00:00:00+02:00', 7, 0.039, 400],
        ['2021-10-01T00:00:00+02:00', 8, 0.0391, 401],
        ['2021-10-01T00:00:00+02:00', 9, 0.0317, 325],
        ['2021-10-01T00:00:00+02:00', 10, 0.03, 307],
        ['2021-11-01T00:00:00+01:00', 0, 1, 7706],
        ['2021-11-01T00:00:00+01:00', 1, 0.0489, 377],
        ['2021-11-01T00:00:00+01:00', 2, 0.093, 717],
        ['2021-11-01T00:00:00+01:00', 3, 0.0658, 507],
        ['2021-11-01T00:00:00+01:00', 4, 0.0531, 409],
        ['2021-11-01T00:00:00+01:00', 5, 0.0414, 319],
        ['2021-11-01T00:00:00+01:00', 6, 0.0376, 290],
        ['2021-11-01T00:00:00+01:00', 7, 0.0384, 296],
        ['2021-11-01T00:00:00+01:00', 8, 0.0289, 223],
        ['2021-11-01T00:00:00+01:00', 9, 0.0254, 196],
        ['2021-12-01T00:00:00+01:00', 0, 1, 4804],
        ['2021-12-01T00:00:00+01:00', 1, 0.1301, 625],
        ['2021-12-01T00:00:00+01:00', 2, 0.0895, 430],
        ['2021-12-01T00:00:00+01:00', 3, 0.0724, 348],
        ['2021-12-01T00:00:00+01:00', 4, 0.0485, 233],
        ['2021-12-01T00:00:00+01:00', 5, 0.0466, 224],
        ['2021-12-01T00:00:00+01:00', 6, 0.0441, 212],
        ['2021-12-01T00:00:00+01:00', 7, 0.0327, 157],
        ['2021-12-01T00:00:00+01:00', 8, 0.0235, 113],
        ['2022-01-01T00:00:00+01:00', 0, 1, 22877],
        ['2022-01-01T00:00:00+01:00', 1, 0.1294, 2960],
        ['2022-01-01T00:00:00+01:00', 2, 0.0931, 2129],
        ['2022-01-01T00:00:00+01:00', 3, 0.0608, 1391],
        ['2022-01-01T00:00:00+01:00', 4, 0.0481, 1100],
        ['2022-01-01T00:00:00+01:00', 5, 0.0445, 1019],
        ['2022-01-01T00:00:00+01:00', 6, 0.0316, 723],
        ['2022-01-01T00:00:00+01:00', 7, 0.0257, 587],
        ['2022-02-01T00:00:00+01:00', 0, 1, 15413],
        ['2022-02-01T00:00:00+01:00', 1, 0.1257, 1937],
        ['2022-02-01T00:00:00+01:00', 2, 0.0777, 1198],
        ['2022-02-01T00:00:00+01:00', 3, 0.0636, 981],
        ['2022-02-01T00:00:00+01:00', 4, 0.0542, 836],
        ['2022-02-01T00:00:00+01:00', 5, 0.0376, 580],
        ['2022-02-01T00:00:00+01:00', 6, 0.0297, 457],
        ['2022-03-01T00:00:00+01:00', 0, 1, 11405],
        ['2022-03-01T00:00:00+01:00', 1, 0.1002, 1143],
        ['2022-03-01T00:00:00+01:00', 2, 0.0843, 961],
        ['2022-03-01T00:00:00+01:00', 3, 0.0723, 825],
        ['2022-03-01T00:00:00+01:00', 4, 0.0456, 520],
        ['2022-03-01T00:00:00+01:00', 5, 0.0351, 400],
        ['2022-04-01T00:00:00+02:00', 0, 1, 7590],
        ['2022-04-01T00:00:00+02:00', 1, 0.1128, 856],
        ['2022-04-01T00:00:00+02:00', 2, 0.1005, 763],
        ['2022-04-01T00:00:00+02:00', 3, 0.0677, 514],
        ['2022-04-01T00:00:00+02:00', 4, 0.0505, 383],
        ['2022-05-01T00:00:00+02:00', 0, 1, 6508],
        ['2022-05-01T00:00:00+02:00', 1, 0.1182, 769],
        ['2022-05-01T00:00:00+02:00', 2, 0.0742, 483],
        ['2022-05-01T00:00:00+02:00', 3, 0.051, 332],
        ['2022-06-01T00:00:00+02:00', 0, 1, 6735],
        ['2022-06-01T00:00:00+02:00', 1, 0.0983, 662],
        ['2022-06-01T00:00:00+02:00', 2, 0.0717, 483],
        ['2022-07-01T00:00:00+02:00', 0, 1, 6325],
        ['2022-07-01T00:00:00+02:00', 1, 0.0942, 596],
        ['2022-08-01T00:00:00+02:00', 0, 1, 5625],
      ],
    },
  },
];

export default {
  ...META,
  title: `${META.title}/Playground`,
};

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return <LineChart {...args} />;
};

const getName = (reportifyValue) => {
  const nameTest = Date.parse(reportifyValue);
  if (isNaN(nameTest)) {
    return reportifyValue;
  } else {
    const parsedDate = new Date(reportifyValue);
    return `${parsedDate.getFullYear()}-${String(
      parsedDate.getMonth() + 1,
    ).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`;
  }
};

const parseReportify = (reportifyDataObj) => {
  const parsedData: DataSeries[] = [];
  const oganizedData: DataSeries[] = [];
  const reportifyData = reportifyDataObj.result.data;
  for (let index = 0; index < reportifyData.length; index++) {
    const [date, key, percentValue] = reportifyData[index];
    const formattedValue = parseFloat((percentValue * 100).toFixed(3));
    if (date in oganizedData) {
      oganizedData[date].data.push({key: key, value: formattedValue});
    } else {
      const cleanName = getName(date);
      oganizedData[date] = {
        data: [{key: key, value: formattedValue}],
        name: cleanName,
      };
    }
  }
  for (const property in oganizedData) {
    parsedData.push(oganizedData[property]);
  }
  return parsedData;
};

const COHORT_DATA = parseReportify(REPORTIFY_RESPONSE_AVG[0]).concat(
  parseReportify(REPORTIFY_RESPONSE_COHORT[0]),
);

const HOURLY_DATA = [
  {
    name: 'Hourly Data',
    data: Array(743)
      .fill(null)
      .map((_, index) => {
        return {
          key: new Date(2021, 1, 1, index).toISOString(),
          value: randomNumber(0, 400),
        };
      }),
  },
];

export const LargeDataSet: Story<LineChartProps> = Template.bind({});

LargeDataSet.args = {
  data: HOURLY_DATA,
  xAxisOptions: {
    labelFormatter: formatLinearXAxisLabel,
  },
};

export const BadData: Story<LineChartProps> = (args: LineChartProps) => {
  return (
    <div style={{width: 600, height: 400}}>
      <LineChart {...args} />
    </div>
  );
};

BadData.args = {
  data: [{name: 'Empty', data: []}],
};

export const CohortDataSet: Story<LineChartProps> = Template.bind({});

CohortDataSet.args = {
  data: COHORT_DATA,
  yAxisOptions: {
    labelFormatter: (y) => {
      return `${y}%`;
    },
  },
};
