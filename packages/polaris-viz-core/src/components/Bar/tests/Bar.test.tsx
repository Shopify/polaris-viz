import {scaleLinear} from 'd3-scale';

import type {Props} from '../Bar';
import {Bar} from '../Bar';
import {mountWithProvider} from '../../../test-utilities';

jest.mock('d3-scale', () => ({
  scaleBand: jest.fn(() => jest.fn((value) => value)),
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const DEFAULT_PROPS: Props = {
  borderRadius: 0,
  fill: 'red',
  yScale: scaleLinear(),
  x: 0,
  value: 1,
  width: 100,
};

describe('<Bar/>', () => {
  it('renders a path', () => {
    const bar = mountWithProvider(
      <svg>
        <Bar {...DEFAULT_PROPS} height={100} x={0} value={1000} width={100} />
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: `
  M0,0
  h100
  a0,0 0 0 1 0,0
  v100
  a0,0 0 0 1 -0,0
  h-100
  a0,0 0 0 1 -0,-0
  v-100
  a0,0 0 0 1 0,-0
  Z
`,
      transform: 'translate(0 -100), rotate(0)',
    });
  });

  it('d attibute is present if the height is shorter than the arc height', () => {
    const bar = mountWithProvider(
      <svg>
        <Bar {...DEFAULT_PROPS} height={49} x={0} value={1} width={100} />
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: `
  M0,0
  h100
  a0,0 0 0 1 0,0
  v49
  a0,0 0 0 1 -0,0
  h-100
  a0,0 0 0 1 -0,-0
  v-49
  a0,0 0 0 1 0,-0
  Z
`,
      transform: 'translate(0 -49), rotate(0)',
    });
  });

  it('gives a 0 value an empty path d attribute and 0 height', () => {
    const bar = mountWithProvider(
      <svg>
        <Bar {...DEFAULT_PROPS} height={0} x={0} value={0} width={100} />
      </svg>,
    );

    expect(bar).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: ``,
      transform: `translate(0 0), rotate(0)`,
    });
  });

  it('renders null if the value is null', () => {
    const wrapper = mountWithProvider(
      <Bar {...DEFAULT_PROPS} value={null} x={0} width={10} height={0} />,
    );

    expect(wrapper.find(Bar)!.children).toHaveLength(0);
  });

  describe('borderRadius', () => {
    const width = 100;
    const mockProps = {
      height: 100,
      x: 0,
      value: 1000,
      width,
    };

    it('renders a bar with border radius', () => {
      const bar = mountWithProvider(
        <svg>
          <Bar {...DEFAULT_PROPS} {...mockProps} borderRadius={3} />
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        // eslint-disable-next-line id-length
        d: `
  M3,0
  h94
  a3,3 0 0 1 3,3
  v97
  a0,0 0 0 1 -0,0
  h-100
  a0,0 0 0 1 -0,-0
  v-97
  a3,3 0 0 1 3,-3
  Z
`,
      });
    });

    it('renders a bar without border radius', () => {
      const bar = mountWithProvider(
        <svg>
          <Bar {...DEFAULT_PROPS} {...mockProps} />
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        // eslint-disable-next-line id-length
        d: `
  M0,0
  h100
  a0,0 0 0 1 0,0
  v100
  a0,0 0 0 1 -0,0
  h-100
  a0,0 0 0 1 -0,-0
  v-100
  a0,0 0 0 1 0,-0
  Z
`,
      });
    });
  });
});
