import React from 'react';
import {mount} from '@shopify/react-testing';

import {Color} from '../../../../../types';
import {AnnotationLine} from '../AnnotationLine';

describe('<AnnotationLine />', () => {
  const mockProps = {
    xPosition: 0,
    barWidth: 20,
    drawableHeight: 300,
    width: 5,
    color: 'colorTeal' as Color,
    ariaLabel: 'Median: 1.5 hours',
    xOffset: 0.5,
  };

  it('renders a line', () => {
    const content = mount(
      <svg>
        <AnnotationLine {...mockProps} />
      </svg>,
    );

    expect(content).toContainReactComponent('line', {
      // x1 and x2 will be half of bar width
      x1: 10,
      x2: 10,
      // the drawable height
      y1: 300,
      y2: 0,
      stroke: 'rgb(71, 193, 191)',
      strokeWidth: 5,
      'aria-label': 'Median: 1.5 hours',
    });
  });
});
