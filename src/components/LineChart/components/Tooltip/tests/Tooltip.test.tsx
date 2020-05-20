import React from 'react';
import {mount} from '@shopify/react-testing';
import {animated, OpaqueInterpolation} from 'react-spring';

import {Margin} from '../../../constants';
import {LinePreview} from '../../LinePreview';
import {Tooltip} from '../Tooltip';

const mockProps = {
  activePointIndex: 0,
  currentX: 0,
  currentY: 0,
  formatYAxisValue: (value: number) => `${value}`,
  series: [
    {name: 'Test series 1', data: [{x: 'Jan 1', y: 100}]},
    {name: 'Test series 2', data: [{x: 'Dec 1', y: 300}]},
  ],
};

(global as any).DOMRect = class DOMRect {
  width = 200;
  height = 100;
};

describe('<Tooltip />', () => {
  it('is wrapped in an animated.div for top and left styles', () => {
    const tooltip = mount(<Tooltip {...mockProps} />);

    const animatedDiv = tooltip.find(animated.div)!;
    const styles = animatedDiv.prop('style')!;

    // Checking that the styles are being controlled by react spring
    expect((styles.top as OpaqueInterpolation<number>).getValue).toBeDefined();
    expect((styles.left as OpaqueInterpolation<number>).getValue).toBeDefined();
  });

  it('does not allow the tooltip position to exceed the top of the chart', () => {
    const tooltip = mount(<Tooltip {...mockProps} currentY={-25} />);

    const animatedDiv = tooltip.find(animated.div)!;
    const styles = animatedDiv.prop('style')!;

    expect((styles.top as OpaqueInterpolation<number>).getValue()).toBe(
      Margin.Top,
    );
  });

  it('renders to the left of the cursor when there is space', () => {
    const tooltip = mount(<Tooltip {...mockProps} currentX={400} />);

    const animatedDiv = tooltip.find(animated.div)!;
    const styles = animatedDiv.prop('style')!;

    // 180 is the currentX (400) minus the tooltip width (set to 200 above)
    // minus the margin/offset of 20 in the component
    expect((styles.left as OpaqueInterpolation<number>).getValue()).toBe(180);
  });

  it('renders to the right of the cursor when there is not space to the left', () => {
    const tooltip = mount(<Tooltip {...mockProps} currentX={0} />);

    const animatedDiv = tooltip.find(animated.div)!;
    const styles = animatedDiv.prop('style')!;

    // 10 is the margin/offset defined in the component
    expect((styles.left as OpaqueInterpolation<number>).getValue()).toBe(10);
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
