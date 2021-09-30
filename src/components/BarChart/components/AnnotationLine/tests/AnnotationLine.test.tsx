import React from 'react';
import {mount} from '@shopify/react-testing';
import {Globals} from '@react-spring/web';

import {AnnotationLine} from '../AnnotationLine';

describe('<AnnotationLine />', () => {
  const lineWidth = 5;
  const mockProps = {
    xPosition: 0,
    barWidth: 20,
    drawableHeight: 300,
    width: lineWidth,
    color: 'gray',
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
      stroke: 'gray',
      strokeWidth: lineWidth,
    });
  });

  describe('xOffset', () => {
    it('left aligns when xOffset is 0', () => {
      const props = {
        ...mockProps,
        xOffset: 0,
      };
      const content = mount(
        <svg>
          <AnnotationLine {...props} />
        </svg>,
      );

      expect(content).toContainReactComponent('line', {
        x1: 2.5,
        x2: 2.5,
      });
    });

    it('centers when xOffset is 0.5', () => {
      const props = {
        ...mockProps,
        xOffset: 0.5,
      };
      const content = mount(
        <svg>
          <AnnotationLine {...props} />
        </svg>,
      );

      expect(content).toContainReactComponent('line', {
        x1: 10,
        x2: 10,
      });
    });

    it('centers when xOffset is any value besides 0 or 1', () => {
      const props = {
        ...mockProps,
        xOffset: 0.4,
      };
      const content = mount(
        <svg>
          <AnnotationLine {...props} />
        </svg>,
      );

      expect(content).toContainReactComponent('line', {
        x1: 8,
        x2: 8,
      });
    });

    it('right aligns when xOffset is 1', () => {
      const props = {
        ...mockProps,
        xOffset: 1,
      };
      const content = mount(
        <svg>
          <AnnotationLine {...props} />
        </svg>,
      );

      expect(content).toContainReactComponent('line', {
        x1: 17.5,
        x2: 17.5,
      });
    });
  });

  describe('shouldAnimate', () => {
    it('does not animate when false', () => {
      const content = mount(
        <svg>
          <AnnotationLine {...mockProps} />
        </svg>,
      );

      expect(content).not.toContainReactComponent('line', {
        className: 'AnimatedLine',
      });
    });

    it('animates when true', () => {
      Globals.assign({
        skipAnimation: false,
      });

      const content = mount(
        <svg>
          <AnnotationLine {...mockProps} />
        </svg>,
      );

      expect(content).toContainReactComponent('line', {
        className: 'AnimatedLine',
      });
    });
  });

  describe('color', () => {
    it('renders a line with a color string', () => {
      const content = mount(
        <svg>
          <AnnotationLine {...mockProps} color="white" />
        </svg>,
      );

      expect(content).toContainReactComponent('line', {
        stroke: 'white',
      });
    });
  });
});
