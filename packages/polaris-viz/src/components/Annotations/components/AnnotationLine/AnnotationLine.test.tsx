import React from 'react';
import {mount} from '@shopify/react-testing';

import {AnnotationLine, AnnotationLineProps} from './AnnotationLine';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
  estimateStringWidth: jest.fn(() => 100),
}));

const MOCK_PROPS: AnnotationLineProps = {
  size: 100,
  theme: 'Default',
  x: 10,
  y: 20,
  direction: 'vertical',
};

describe('<AnnotationLine />', () => {
  it('renders a line and nub', () => {
    const chart = mount(
      <svg>
        <AnnotationLine {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('line', {
      strokeWidth: '1',
      strokeDasharray: '3 2',
    });
    expect(chart).toContainReactComponent('path', {
      // eslint-disable-next-line id-length
      d: 'M9.31 7.866a2 2 0 0 1-2.62 0L1.664 3.512C.263 2.3 1.12 0 2.973 0h10.055c1.852 0 2.709 2.3 1.31 3.512L9.308 7.866Z',
      transform: 'translate(2, 16)',
    });
  });

  describe('direction', () => {
    it('renders vertical line when vertical', () => {
      const chart = mount(
        <svg>
          <AnnotationLine {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).toContainReactComponent('line', {
        x1: 10,
        x2: 10,
        y1: 20,
        y2: 100,
      });
    });

    it('renders horizontal line when horizontal', () => {
      const chart = mount(
        <svg>
          <AnnotationLine {...MOCK_PROPS} direction="horizontal" />
        </svg>,
      );

      expect(chart).toContainReactComponent('line', {
        x1: 10,
        x2: 100,
        y1: 20,
        y2: 20,
      });
    });
  });
});
