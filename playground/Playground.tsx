import React, {useState} from 'react';
import {condenseNumber} from '@shopify/condense-number';

import * as PlaygroundDemos from '../documentation/code';

import {BarChart, LineChart} from '../src/components';

const barChartData = [
  {
    rawValue: 10.154471869354719,
    label: '0',
  },
  {
    rawValue: 45.996319948781284,
    label: '1',
  },
  {
    rawValue: 16.587832862892647,
    label: '2',
  },
  {
    rawValue: 0.6549163769236532,
    label: '3',
    annotation: 'Median: 3.5',
  },
  {
    rawValue: 32.83315300207698,
    label: '4',
  },
  {
    rawValue: 85.59694953733555,
    label: '5',
  },
  {
    rawValue: 74.31675425853265,
    label: '6',
  },
  {
    rawValue: 91.56764219680792,
    label: '7',
  },
  {
    rawValue: 58.01201763880841,
    label: '8',
  },
  {
    rawValue: 40.92917545574713,
    label: '9',
  },
  {
    rawValue: 58.544724136704396,
    label: '10',
  },
  {
    rawValue: 64.58976679740891,
    label: '11',
  },
  {
    rawValue: 9.322668954699687,
    label: '12',
  },
  {
    rawValue: 26.57654241435403,
    label: '13',
  },
  {
    rawValue: 34.2578055525538,
    label: '14',
  },
  {
    rawValue: 50.169629782092095,
    label: '15',
  },
  {
    rawValue: 56.51483868457661,
    label: '16',
  },
  {
    rawValue: 85.85622063984066,
    label: '17',
  },
  {
    rawValue: 2.6429450901744644,
    label: '18',
  },
  {
    rawValue: 12.476274510608242,
    label: '19 +',
  },
];

export default function Playground() {
  const [showDemos, setShowDemos] = useState(false);
  const toggleDemos = () => setShowDemos((showingDemos) => !showingDemos);

  document.body.style.fontFamily =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

  return (
    <div>
      <div
        style={{
          width: '600px',
          height: '250px',
          background: '#0E305E',
          padding: '20px',
          marginTop: '5px',
        }}
      >
        <BarChart
          isAnimated
          data={barChartData}
          color="blueWhiteGradient"
          skipLinkText="Skip chart content"
          timeSeries
          axisColor="#194685"
          textColor="#8C9196"
          crossHairColor="dark"
          hasRoundedCorners
          leftAlignLabels
          lastBarTreatment
        />
      </div>

      <div
        style={{
          width: '600px',
          height: '250px',
          background: '#0E305E',
          padding: '20px',
          marginTop: '5px',
        }}
      >
        <LineChart
          isAnimated
          axisColor="#194685"
          textColor="#8C9196"
          crossHairColor="dark"
          series={[
            {
              name: 'Apr 01–Apr 14, 2020',
              data: [
                {rawValue: 2251, label: '2020-04-01T12:00:00'},
                {rawValue: 12132.2, label: '2020-04-02T12:00:00'},
                {rawValue: 5000, label: '2020-04-03T12:00:00'},
                {rawValue: 7200, label: '2020-04-04T12:00:00'},
                {rawValue: 1500, label: '2020-04-05T12:00:00'},
                {rawValue: 6132, label: '2020-04-06T12:00:00'},
                {rawValue: 3100, label: '2020-04-07T12:00:00'},
                {rawValue: 2200, label: '2020-04-08T12:00:00'},
                {rawValue: 5103, label: '2020-04-09T12:00:00'},
                {rawValue: 2112.5, label: '2020-04-10T12:00:00'},
                {rawValue: 4004, label: '2020-04-11T12:00:00'},
                {rawValue: 6000, label: '2020-04-12T12:00:00'},
                {rawValue: 5500, label: '2020-04-13T12:00:00'},
                {rawValue: 7000, label: '2020-04-14T12:00:00'},
              ],
              color: 'quaternary',
              lineStyle: 'solid' as 'solid',
              // showArea: true,
            },
            {
              name: 'Mar 01–Mar 14, 2020',
              data: [
                {rawValue: 5200, label: '2020-03-01T12:00:00'},
                {rawValue: 7000, label: '2020-03-02T12:00:00'},
                {rawValue: 1000, label: '2020-03-03T12:00:00'},
                {rawValue: 2000, label: '2020-03-04T12:00:00'},
                {rawValue: 5000, label: '2020-03-05T12:00:00'},
                {rawValue: 1000, label: '2020-03-06T12:00:00'},
                {rawValue: 2000, label: '2020-03-07T12:00:00'},
                {rawValue: 5000, label: '2020-03-08T12:00:00'},
                {rawValue: 4000, label: '2020-03-09T12:00:00'},
                {rawValue: 11200, label: '2020-03-10T12:00:00'},
                {rawValue: 2000, label: '2020-03-11T12:00:00'},
                {rawValue: 3000, label: '2020-03-12T12:00:00'},
                {rawValue: 2000, label: '2020-03-13T12:00:00'},
                {rawValue: 3000, label: '2020-03-14T12:00:00'},
              ],
              color: 'pastComparison' as 'pastComparison',
              lineStyle: 'dashed' as 'dashed',
            },
          ]}
          xAxisLabels={[
            '2020-04-01T12:00:00',
            '2020-04-02T12:00:00',
            '2020-04-03T12:00:00',
            '2020-04-04T12:00:00',
            '2020-04-05T12:00:00',
            '2020-04-06T12:00:00',
            '2020-04-07T12:00:00',
            '2020-04-08T12:00:00',
            '2020-04-09T12:00:00',
            '2020-04-10T12:00:00',
            '2020-04-11T12:00:00',
            '2020-04-12T12:00:00',
            '2020-04-13T12:00:00',
            '2020-04-14T12:00:00',
          ]}
          formatXAxisLabel={(value) =>
            new Date(value).toLocaleDateString('en-CA', {
              day: 'numeric',
              month: 'numeric',
            })
          }
          formatYAxisLabel={(value) => condenseNumber(value, 'en')}
          skipLinkText="Skip line chart content"
          hasSpline
          lineWidth={3}
          useGradientLine
        />
      </div>

      <div
        style={{
          width: '600px',
          height: '250px',
          background: '#0E305E',
          padding: '20px',
          marginTop: '5px',
        }}
      >
        <BarChart
          useHardCodedGradient
          axisColor="#194685"
          textColor="#8C9196"
          crossHairColor="dark"
          isAnimated
          data={Array.from({length: 12}, (_, i) => {
            return {rawValue: Math.random() * 100, label: (i + 1).toString()};
          })}
          color="blueGreenGradient"
          highlightColor="inverse"
          formatXAxisLabel={(val) =>
            new Date(val).toLocaleDateString('en-CA', {
              day: 'numeric',
              month: 'short',
            })
          }
          formatYAxisLabel={(val) =>
            new Intl.NumberFormat('en-CA', {
              style: 'currency',
              currency: 'CAD',
              maximumSignificantDigits: 2,
            }).format(val)
          }
          timeSeries
          hasRoundedCorners
        />
      </div>
    </div>
  );
}
