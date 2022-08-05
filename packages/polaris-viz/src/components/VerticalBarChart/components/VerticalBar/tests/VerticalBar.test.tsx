import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';
import {BORDER_RADIUS} from '@shopify/polaris-viz-core';

import {VerticalBar, VerticalBarProps} from '../VerticalBar';
import {MASK_HIGHLIGHT_COLOR} from '../../../../../constants';
import {
  getHoverZoneOffset,
  Props as HoverZoneOffsetProps,
} from '../../../../../utilities/getHoverZoneOffset';

jest.mock('d3-scale', () => ({
  scaleBand: jest.requireActual('d3-scale').scaleBand,
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const DEFAULT_PROPS: VerticalBarProps = {
  height: 1000,
  color: MASK_HIGHLIGHT_COLOR,
  x: 0,
  rawValue: 1000,
  width: 100,
  index: 1,
  zeroPosition: 0,
};

const HOVER_ZONE_MOCK_PROPS: HoverZoneOffsetProps = {
  barSize: 100,
  zeroPosition: 0,
  max: 135,
  position: 'vertical',
  isNegative: false,
};

describe('<VerticalBar/>', () => {
  describe('borderRadius', () => {
    it('renders sharp edges when not provided', () => {
      const bar = mount(
        <svg>
          <VerticalBar {...DEFAULT_PROPS} />,
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
          <VerticalBar {...DEFAULT_PROPS} borderRadius={BORDER_RADIUS.Top} />,
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
          <VerticalBar {...DEFAULT_PROPS} color="rgb(156, 106, 222)" />,
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
          <VerticalBar {...DEFAULT_PROPS} rawValue={0} />
        </svg>,
      );

      expect(bar).toContainReactComponent('line');
    });
  });

  describe('hover target zone', () => {
    it("gets an offset for a hover target zone based on the bar's height", () => {
      const bar = getHoverZoneOffset({...HOVER_ZONE_MOCK_PROPS});
      expect(bar).toStrictEqual({clampedSize: 100, offset: -100});
    });
  });
});
