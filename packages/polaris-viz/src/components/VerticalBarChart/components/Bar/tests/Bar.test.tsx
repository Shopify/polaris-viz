import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';
import {BORDER_RADIUS} from '@shopify/polaris-viz-core';

import {Bar} from '../Bar';
import {MASK_HIGHLIGHT_COLOR} from '../../../../../constants';
import {
  getHoverZoneOffset,
  Props,
} from '../../../../../utilities/getHoverZoneOffset';

jest.mock('d3-scale', () => ({
  scaleBand: jest.requireActual('d3-scale').scaleBand,
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const defaultProps = {
  height: 1000,
  color: MASK_HIGHLIGHT_COLOR,
  isSelected: false,
  x: 0,
  rawValue: 1000,
  width: 100,
  yScale: scaleBand() as any,
  index: 1,
  onFocus: jest.fn(),
  tabIndex: 0,
  zeroPosition: 0,
};

const mockProps: Props = {
  barSize: 100,
  zeroPosition: 0,
  max: 135,
  position: 'vertical',
  isNegative: false,
};

describe('<Bar/>', () => {
  describe('borderRadius', () => {
    it('renders sharp edges when not provided', () => {
      const bar = mount(
        <svg>
          <Bar {...defaultProps} />,
        </svg>,
      );
     
      expect(bar).toContainReactComponent('path', {
        // eslint-disable-next-line id-length
        d: `
        M3,0
        h94
        a3,3 0 0 1 3,3
        v997
        a0,0 0 0 1 -0,0
        h-100
        a0,0 0 0 1 -0,-0
        v-997
        a3,3 0 0 1 3,-3
        Z
        `,
      });
    });

    it('applies the provided border radius', () => {
      const bar = mount(
        <svg>
          <Bar {...defaultProps} borderRadius={5} />,
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        // eslint-disable-next-line id-length
        d: `
  M3,0
  h94
  a3,3 0 0 1 3,3
  v997
  a0,0 0 0 1 -0,0
  h-100
  a0,0 0 0 1 -0,-0
  v-997
  a3,3 0 0 1 3,-3
  Z
`,
      });
    });
  });

  describe('color', () => {
    it('gets passed to the underlying path', () => {
      const bar = mount(
        <svg>
          <Bar {...defaultProps} color="rgb(156, 106, 222)" />,
        </svg>,
      );

      expect(bar).toContainReactComponent('path', {
        fill: 'rgb(156, 106, 222)',
      });
    });
  });

  describe('zero value', () => {
    it('renders a line component when passed value is zero', () => {
      const bar = mount(
        <svg>
          <Bar {...defaultProps} rawValue={0} />
        </svg>,
      );

      expect(bar).toContainReactComponent('line');
    });
  });

  describe('hover target zone', () => {
    it("gets an offset for a hover target zone based on the bar's height", () => {
      const bar = getHoverZoneOffset({...mockProps});
      expect(bar).toStrictEqual({clampedSize: 100, offset: -100});
    });
  });
});
