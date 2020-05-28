import React from 'react';
import {mount} from '@shopify/react-testing';
import {animated, OpaqueInterpolation} from 'react-spring';

import {LinePreview} from '../../LinePreview';
import {Tooltip} from '../Tooltip';

(global as any).DOMRect = class DOMRect {
  width = 200;
  height = 100;
};

const mockProps = {
  activePointIndex: 0,
  currentX: 0,
  currentY: 0,
  formatYAxisValue: (value: number) => `${value}`,
  series: [
    {name: 'Test series 1', data: [{x: 'Jan 1', y: 100}]},
    {name: 'Test series 2', data: [{x: 'Dec 1', y: 300}]},
  ],
  chartDimensions: new DOMRect(),
};

describe('<Tooltip />', () => {
  it('is wrapped in an animated.div at top: 0, left: 0 with an animated transform style', () => {
    const tooltip = mount(<Tooltip {...mockProps} />);

    const animatedDiv = tooltip.find(animated.div)!;
    const styles = animatedDiv.prop('style')!;

    expect(styles.left).toStrictEqual(0);
    expect(styles.top).toStrictEqual(0);
    // Checking that the styles are being controlled by react spring
    expect(
      ((styles.transform as unknown) as OpaqueInterpolation<number>).getValue,
    ).toBeDefined();
  });

  describe('Content', () => {
    it('renders a LinePreview for each series at the active point', () => {
      const tooltip = mount(<Tooltip {...mockProps} />);

      expect(tooltip).toContainReactComponentTimes(LinePreview, 2);
    });

    it('renders a series name for each series at the active point', () => {
      const tooltip = mount(<Tooltip {...mockProps} />);

      expect(tooltip).toContainReactText('Test series 1');
      expect(tooltip).toContainReactText('Test series 2');
    });

    it('renders a formatted y-axis value for each series at the active point', () => {
      const tooltip = mount(
        <Tooltip
          {...mockProps}
          formatYAxisValue={(value: number) => `formatted: ${value}`}
        />,
      );

      expect(tooltip).toContainReactText('formatted: 100');
      expect(tooltip).toContainReactText('formatted: 300');
    });
  });
});
