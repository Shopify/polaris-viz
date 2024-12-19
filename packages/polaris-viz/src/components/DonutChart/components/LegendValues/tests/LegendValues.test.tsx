import {mount} from '@shopify/react-testing';

import {LegendValues} from '../LegendValues';

const mockProps = {
  data: [
    {
      name: 'Shopify Payments',
      data: [{key: 'april - march', value: 50000}],
    },
  ],
  activeIndex: 1,
  legendFullWidth: false,
  labelFormatter: (val) => `${val}!`,
  getColorVisionStyles: jest.fn(),
  getColorVisionEventAttrs: jest.fn(),
  seriesNameFormatter: (val) => `${val}!`,
  renderHiddenLegendLabel: jest.fn(),
} as any;

describe('<LegendValues />', () => {
  it('renders a table with max width', async () => {
    const legendValues = mount(<LegendValues {...mockProps} />);
    expect(legendValues).toContainReactComponent('table', {
      style: {maxWidth: 197.22, width: '100%'},
    });
  });
});
