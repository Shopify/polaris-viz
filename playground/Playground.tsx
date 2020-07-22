import React from 'react';
import format from 'date-fns/format';

import {Series} from '../src/components/LineChart/types';

import {LineChart} from '../src/components';

const dates = [
  '2020-06-22 00:00:00',
  '2020-06-23 00:00:00',
  '2020-06-24 00:00:00',
  '2020-06-25 00:00:00',
  '2020-06-26 00:00:00',
  '2020-06-27 00:00:00',
  '2020-06-28 00:00:00',
  '2020-06-29 00:00:00',
  '2020-06-30 00:00:00',
  '2020-07-01 00:00:00',
  '2020-07-02 00:00:00',
  '2020-07-03 00:00:00',
  '2020-07-04 00:00:00',
  '2020-07-05 00:00:00',
  '2020-07-06 00:00:00',
  '2020-07-07 00:00:00',
  '2020-07-08 00:00:00',
  '2020-07-09 00:00:00',
  '2020-07-10 00:00:00',
  '2020-07-11 00:00:00',
  '2020-07-12 00:00:00',
  '2020-07-13 00:00:00',
  '2020-07-14 00:00:00',
  '2020-07-15 00:00:00',
  '2020-07-16 00:00:00',
  '2020-07-17 00:00:00',
  '2020-07-18 00:00:00',
  '2020-07-19 00:00:00',
  '2020-07-20 00:00:00',
  '2020-07-21 00:00:00',
];

const successData = [
  65597632,
  71260244,
  69304497,
  70899592,
  73711662,
  65448054,
  57181588,
  70071957,
  74684986,
  77301120,
  74113524,
  67859444,
  53236337,
  50121874,
  71081046,
  70303223,
  68015589,
  68259598,
  69380796,
  56811751,
  52167685,
  70396711,
  70797402,
  71002617,
  69977906,
  69095460,
  57902522,
  57190956,
  69308771,
  68952179,
];

const failData = [
  1425,
  126,
  160,
  56,
  433,
  659,
  26,
  28083,
  75,
  41,
  127,
  57,
  260,
  128,
  60,
  64174,
  183,
  76907,
  10915,
  68529,
  115355,
  115340,
  78,
  93,
  137,
  402,
  237,
  11357,
  1298,
  1500,
];

const multipleFailData = [
  1425,
  126,
  160,
  56,
  433,
  660,
  26,
  28169,
  78,
  42,
  127,
  58,
  260,
  128,
  60,
  100736,
  183,
  397254,
  132,
  26,
  34,
  136,
  81,
  94,
  137,
  406,
  236,
  11370,
  1439,
  1500,
];

const getData = (dates, data) => {
  return dates.map((date, i) => ({
    x: date,
    y: data[i],
  }));
};

const successSeries = {
  data: getData(dates, successData),
  name: 'Succeed',
  style: {
    color: 'colorTeal',
    lineStyle: 'solid',
  },
} as Series;

const firstFailSeries = {
  data: getData(dates, failData),
  name: '1st attempt failure',
  style: {
    color: 'colorOrange',
    lineStyle: 'solid',
  },
} as Series;

const multipleFailSeries = {
  data: getData(dates, multipleFailData),
  name: 'Multiple attempt failure',
  style: {
    color: 'colorRed',
    lineStyle: 'solid',
  },
} as Series;

export default function Playground() {
  return (
    <div style={{height: '501px', margin: '40px'}}>
      <LineChart
        series={[successSeries, firstFailSeries, multipleFailSeries]}
        xAxisLabels={dates.map((date) => format(new Date(date), 'MMM d'))}
      />
    </div>
  );
}
