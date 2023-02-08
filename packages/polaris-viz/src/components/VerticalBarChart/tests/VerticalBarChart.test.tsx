import {mount} from '@shopify/react-testing';

import type {VerticalBarChartProps} from '../VerticalBarChart';
import {VerticalBarChart} from '../VerticalBarChart';
import {Chart} from '../Chart';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 50),
  isLargeDataSet: jest.fn(() => true),
}));

describe('<VerticalBarChart />', () => {
  const mockProps: VerticalBarChartProps = {
    data: [
      {
        data: [
          {key: 'Something', value: 10},
          {key: 'Another', value: 20},
          {key: 'Thing', value: 30},
        ],
        color: 'black',
        name: 'LABEL1',
      },
    ],
    renderTooltipContent: (value) => `${value}`,
    showLegend: false,
    xAxisOptions: {
      labelFormatter: (value) => `${value}`,
      hide: false,
    },
    yAxisOptions: {
      labelFormatter: (value) => `${value}`,
      integersOnly: false,
    },
  };

  it('renders a <Chart />', () => {
    const verticalBarChart = mount(<VerticalBarChart {...mockProps} />);

    expect(verticalBarChart).toContainReactComponent(Chart);
  });
});
