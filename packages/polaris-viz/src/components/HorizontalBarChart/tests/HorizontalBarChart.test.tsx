import {mount} from '@shopify/react-testing';
import type {DataSeries} from '@shopify/polaris-viz-core';

import type {HorizontalBarChartProps} from '../HorizontalBarChart';
import {HorizontalBarChart} from '../HorizontalBarChart';
import {Chart} from '../Chart';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  isLargeDataSet: jest.fn(() => true),
  estimateStringWidth: jest.fn(() => 50),
}));

const mockProps: HorizontalBarChartProps = {
  data: [
    {
      name: 'Test',
      data: [
        {value: 10, key: 'Label 01'},
        {value: 12, key: 'Label 02'},
      ],
    },
  ],
  xAxisOptions: {
    labelFormatter: (value) => `${value}`,
    hide: false,
    allowLineWrap: false,
  },
  yAxisOptions: {
    labelFormatter: (value) => `${value}`,
    integersOnly: false,
    fixedWidth: false,
    maxYOverride: null,
  },
  seriesNameFormatter: (value) => `${value}`,
  renderTooltipContent: (value) => `${value}`,
  showLegend: false,
};

describe('<HorizontalBarChart />', () => {
  it('renders <Chart />', () => {
    const barChart = mount(<HorizontalBarChart {...mockProps} />);

    expect(barChart).toContainReactComponent(Chart);
  });

  it('correctly rerenders if new data object is passed in as prop', () => {
    const alteredData = [
      {
        name: 'Test',
        data: [
          {value: 1, key: 'Label 01'},
          {value: 2, key: 'Label 02'},
        ],
      },
    ] as DataSeries[];

    const chart = mount(<HorizontalBarChart {...mockProps} />);
    chart.setProps({...mockProps, data: alteredData});

    expect(chart).toContainReactComponent(Chart);
  });
});
