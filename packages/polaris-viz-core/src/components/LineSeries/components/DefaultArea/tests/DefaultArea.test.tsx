import {mount} from '@shopify/react-testing';

import type {Props} from '../DefaultArea';
import {DefaultArea} from '../DefaultArea';

jest.mock('d3-shape', () => ({
  area: jest.fn(() => {
    const shape = (value: any) => value;
    shape.x = () => shape;
    shape.y0 = () => shape;
    shape.y1 = () => shape;
    return shape;
  }),
}));

const MOCK_PROPS: Props = {
  series: {
    name: 'Primary',
    color: 'primary' as any,
    areaColor: '#ff0000',
    data: [
      {key: 'Jan 1', value: 1500},
      {key: 'Jan 2', value: 1000},
      {key: 'Jan 3', value: 800},
      {key: 'Jan 4', value: 1300},
    ],
  },
  areaPath:
    'M0,100L0.0050000000000000044,100C0.5891,100,0.41090000000000004,50,0.995,50L1,50',
};

describe('<DefaultArea />', () => {
  it('renders a linear gradient', () => {
    const actual = mount(
      <svg>
        <DefaultArea {...MOCK_PROPS} />
      </svg>,
    );
    expect(actual).toContainReactComponent('linearGradient');
  });

  it('renders stops', () => {
    const actual = mount(
      <svg>
        <DefaultArea {...MOCK_PROPS} />
      </svg>,
    );
    expect(actual).toContainReactComponent('stop');
  });

  it('renders a path', () => {
    const actual = mount(
      <svg>
        <DefaultArea {...MOCK_PROPS} />
      </svg>,
    );
    expect(actual).toContainReactComponent('path');
  });

  describe('areaColor', () => {
    it('gets passed to <stop/>', () => {
      const actual = mount(
        <svg>
          <DefaultArea {...MOCK_PROPS} />
        </svg>,
      );
      expect(actual).toContainReactComponent('stop', {stopColor: '#ff0000'});
    });
  });
});
