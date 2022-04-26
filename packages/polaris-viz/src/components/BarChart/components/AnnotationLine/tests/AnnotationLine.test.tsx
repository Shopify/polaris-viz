import React from 'react';
import {mount} from '@shopify/react-testing';

import {AnnotationLine, AnnotationLineProps} from '../AnnotationLine';

describe('<AnnotationLine />', () => {
  const lineWidth = 5;
  const mockProps: AnnotationLineProps = {
    position: 0,
    barSize: 20,
    drawableSize: 300,
    width: lineWidth,
    color: 'gray',
    ariaLabel: 'Median: 1.5 hours',
    offset: 0.5,
    direction: 'vertical',
  };

  describe('direction', () => {
    it('renders a vertical line when vertical', () => {
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

    it('renders a horizontal line when horizontal', () => {
      const content = mount(
        <svg>
          <AnnotationLine {...mockProps} direction="horizontal" />
        </svg>,
      );

      expect(content).toContainReactComponent('line', {
        y1: 10,
        y2: 10,
        x1: 300,
        x2: 0,
        stroke: 'gray',
        strokeWidth: lineWidth,
      });
    });
  });

  describe('offset', () => {
    it('left aligns when offset is 0', () => {
      const props = {
        ...mockProps,
        offset: 0,
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

    it('centers when offset is 0.5', () => {
      const props = {
        ...mockProps,
        offset: 0.5,
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

    it('centers when offset is any value besides 0 or 1', () => {
      const props = {
        ...mockProps,
        offset: 0.4,
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

    it('right aligns when offset is 1', () => {
      const props = {
        ...mockProps,
        offset: 1,
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

  describe('isAnimated', () => {
    it('does not animate when false', () => {
      const content = mount(
        <svg>
          <AnnotationLine {...mockProps} isAnimated={false} />
        </svg>,
      );

      expect(content).not.toContainReactComponent('line', {
        className: 'AnimatedLine',
      });
    });

    it('animates when true', () => {
      const props = {
        ...mockProps,
        isAnimated: true,
      };
      const content = mount(
        <svg>
          <AnnotationLine {...props} />
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
