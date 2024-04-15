import {mount} from '@shopify/react-testing';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {ZERO_VALUE_LINE_HEIGHT} from '../../../constants';

import type {ZeroValueLineProps} from './ZeroValueLine';
import {ZeroValueLine} from './ZeroValueLine';

const MOCK_PROPS: ZeroValueLineProps = {
  x: 10,
  y: 20,
  direction: 'vertical',
  theme: DEFAULT_THEME_NAME,
};

describe('<ZeroValueLine />', () => {
  it('renders a line', () => {
    const chart = mount(
      <svg>
        <ZeroValueLine {...MOCK_PROPS} />
      </svg>,
    );

    expect(chart).toContainReactComponent('line', {
      strokeWidth: '1',
    });
  });

  describe('direction', () => {
    it('renders a vertical line when vertical', () => {
      const chart = mount(
        <svg>
          <ZeroValueLine {...MOCK_PROPS} />
        </svg>,
      );

      expect(chart).toContainReactComponent('line', {
        x1: 10,
        x2: 10,
        y1: 20,
        y2: 20 - ZERO_VALUE_LINE_HEIGHT,
      });
    });

    it('renders a horizontal line when horizontal', () => {
      const chart = mount(
        <svg>
          <ZeroValueLine {...MOCK_PROPS} direction="horizontal" />
        </svg>,
      );

      expect(chart).toContainReactComponent('line', {
        x1: 10,
        x2: 10 + ZERO_VALUE_LINE_HEIGHT,
        y1: 20,
        y2: 20,
      });
    });
  });
});
