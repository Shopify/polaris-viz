import React from 'react';
import {mount} from '@shopify/react-testing';
import {animated} from 'react-spring';

import {TooltipContainer} from '../TooltipContainer';

(global as any).DOMRect = class DOMRect {
  width = 200;
  height = 100;
};

const mockProps = {
  activePointIndex: 0,
  currentX: 0,
  currentY: 0,
  chartDimensions: new DOMRect(),
  margin: {Top: 0, Left: 0, Right: 0, Bottom: 0},
};

describe('<TooltipContainer />', () => {
  it('is wrapped in an animated.div at top: 0, left: 0 with an animated transform style', () => {
    const tooltipContainer = mount(
      <TooltipContainer {...mockProps}>
        <p>tooltip content</p>
      </TooltipContainer>,
    );

    const animatedDiv = tooltipContainer.find(animated.div)!;
    const styles = animatedDiv.prop('style')!;

    expect(styles.left).toStrictEqual(0);
    expect(styles.top).toStrictEqual(0);
    // Checking that the styles are being controlled by react spring
    expect(styles.transform).toBeDefined();
  });

  it('reners its children', () => {
    const children = <p>tooltip content</p>;
    const tooltipContainer = mount(
      <TooltipContainer {...mockProps}>{children}</TooltipContainer>,
    );

    expect(tooltipContainer.props.children).toStrictEqual(children);
  });
});
