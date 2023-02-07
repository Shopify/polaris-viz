import {mount} from '@shopify/react-testing';

import {YAxis} from '../YAxis';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 100),
}));

const testTicks = [
  {value: 0, formattedValue: '0', yOffset: 0},
  {value: 1000, formattedValue: '1,000', yOffset: 50},
  {value: 2000, formattedValue: '2,000', yOffset: 100},
];

describe('<YAxis />', () => {
  it('displays a formatted value with each tick', () => {
    const yAxis = mount(
      <svg>
        <YAxis
          ticks={testTicks}
          width={100}
          textAlign="right"
          theme="Default"
        />
      </svg>,
    );

    const text = yAxis.findAll('text');
    const values = text.map((node) => node.prop('children'));
    expect(values).toStrictEqual(['0', '1,000', '2,000']);
  });
});
