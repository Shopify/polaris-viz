import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {VerticalGridLines} from '../VerticalGridLines';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const MOCK_PROPS = {
  chartHeight: 100,
  stroke: 'red',
  ticks: [0, 1, 2],
  xScale: scaleLinear(),
};

describe('<VerticalGridLines />', () => {
  it('renders lines', () => {
    const container = mount(
      <svg>
        <VerticalGridLines {...MOCK_PROPS} />
      </svg>,
    );
    const lines = container.findAll('line');

    expect(lines[0].props.transform).toStrictEqual('translate(1,0)');
    expect(lines[0].props.y1).toStrictEqual(0);
    expect(lines[0].props.y2).toStrictEqual(80);
    expect(lines[0].props.stroke).toStrictEqual('red');

    expect(lines[1].props.transform).toStrictEqual('translate(2,0)');
  });

  it('skips 0 grid line', () => {
    const container = mount(
      <svg>
        <VerticalGridLines {...MOCK_PROPS} />
      </svg>,
    );
    const lines = container.findAll('line');

    expect(lines).toHaveLength(2);
  });
});
