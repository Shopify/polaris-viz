import React from 'react';
import {Story, Meta} from '@storybook/react';
import {condenseNumber} from '@shopify/condense-number';

import {
  LineChart,
  LineChartProps,
  Legend,
  LinePreview,
} from '../../src/components';
import {
  backgroundColors,
  axisColors,
  textColors,
  crossHairColors,
  fontFamily,
  containerStyles,
} from './constants.stories';

document.body.style.fontFamily = fontFamily;
export default {
  title: 'Playground/LineChart',
  component: LineChart,
  parameters: {
    options: {
      showPanel: false,
    },
    backgrounds: {
      default: 'light',
      values: [
        {name: 'light', value: backgroundColors.light},
        {name: 'dark', value: backgroundColors.dark},
      ],
    },
  },
  decorators: [
    (Story: any, context) => {
      return <div style={containerStyles}>{Story()}</div>;
    },
  ],
} as Meta;

function getPercentageDiffernce(A: number, B: number) {
  return Math.round(100 * ((A - B) / ((A + B) / 2)));
}

const formatNumber = (number: number) =>
  new Intl.NumberFormat('en-ca').format(number);

function renderTooltipContent(stuff) {
  const {data} = stuff;
  const percentageDifference = getPercentageDiffernce(
    data[0].point.value,
    data[1].point.value,
  );

  const percentMarkup = (
    <p
      style={{
        margin: '0 0 0 0',
        color: percentageDifference > 0 ? '#00A47C' : '#FF5546',
      }}
    >
      <span style={{marginRight: '3px'}}>
        {percentageDifference > 0 ? '▲' : '▼'}
      </span>
      {`${Math.abs(percentageDifference)}%`}
    </p>
  );

  const innerContent = data.map(({point, color, lineStyle}, index) => (
    <React.Fragment key={`${name}-${index}`}>
      <div style={{marginRight: '13.5px'}}>
        <LinePreview color={color} lineStyle={lineStyle} />
      </div>
      <p style={{margin: 0, marginRight: '25px', color: '#6D7175'}}>
        {new Date(point.label)
          .toLocaleDateString('en-CA', {
            day: 'numeric',
            month: 'short',
          })
          .replace('.', '')}
      </p>
      <p style={{margin: 0, marginRight: '8px'}}>{formatNumber(point.value)}</p>
      {index === 0 ? percentMarkup : <div />}
    </React.Fragment>
  ));
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto auto auto',
        alignItems: 'center',
        rowGap: '8px',
        fontSize: '10px',
        background: 'none',
      }}
    >
      {innerContent.reverse()}
    </div>
  );
}

const Template: Story<LineChartProps> = (args: LineChartProps) => {
  return (
    <>
      <LineChart
        isAnimated
        axisColor={args.axisColor}
        textColor={args.textColor}
        tooltipBackground={args.tooltipBackground}
        renderTooltipContent={renderTooltipContent}
        crossHairColor={args.crossHairColor}
        series={args.data}
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
        formatXAxisLabel={(val) =>
          new Date(val)
            .toLocaleDateString('en-CA', {
              day: 'numeric',
              month: 'short',
            })
            .replace('.', '')
        }
        formatYAxisLabel={(value) => condenseNumber(value, 'en')}
        skipLinkText="Skip line chart content"
        hasSpline
        lineWidth={2}
        useGradientLine
      />

      <div style={{marginTop: '8px'}}>
        <Legend
          textColor={args.textColor}
          series={[
            {
              name: 'previous period',

              color: '#637381',
              lineStyle: 'dashed' as 'dashed',
            },
          ]}
        />
      </div>
    </>
  );
};

const chartData = [
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
    showArea: true,
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
];

const darkData = [
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
    showArea: true,
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
    color: '#637381',
    lineStyle: 'dashed' as 'dashed',
  },
];

export const Light = Template.bind({});
Light.args = {
  data: chartData,
  axisColor: axisColors.light,
  textColor: textColors.light,
  crossHairColor: crossHairColors.light,
  tooltipBackground: 'white',
};

Light.parameters = {
  backgrounds: {
    default: 'light',
  },
};

export const Dark = Template.bind({});
Dark.args = {
  data: darkData,
  axisColor: axisColors.dark,
  textColor: textColors.dark,
  crossHairColor: crossHairColors.dark,
  tooltipBackground: `rgb(46,48,51)`,
};

Dark.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
