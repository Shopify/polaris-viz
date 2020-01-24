import React from 'react';
import {act} from 'react-dom/test-utils';
import {mount} from '@shopify/react-testing';
import tokens from '@shopify/polaris-tokens';
import {timerFlush} from 'd3-timer';

import {Sparkline} from './Sparkline';
import {VisiblyHidden} from './Sparkline.style';

const MOCK_PATH_LENGTH = 10;

jest.mock('./utilities.ts', () => {
  return {
    getPathLength: () => {
      return MOCK_PATH_LENGTH;
    },
  };
});

describe('<Sparkline />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {matches: true};
      }),
    });
  });

  const mockData = [
    {x: 0, y: 10},
    {x: 1, y: 10},
  ];

  describe('Accessibility', () => {
    it('gives the SVG an aria-hidden attribute', () => {
      const sparkline = mount(<Sparkline data={mockData} />);

      expect(sparkline.find('svg')!.props['aria-hidden']).toBe(true);
    });

    it('has a hidden label when an accessibility label is passed to the component', () => {
      const label = 'Showing sales over the last 30 days';
      const sparkline = mount(
        <Sparkline data={mockData} accessibilityLabel={label} />,
      );

      expect(sparkline.find(VisiblyHidden)!.text()).toBe(label);
    });
  });

  describe('SVG elements', () => {
    it('renders a path', () => {
      const sparkline = mount(<Sparkline data={mockData} />);

      expect(sparkline.findAll('path')).toHaveLength(1);
    });

    it('renders two paths if includeArea is true', () => {
      const sparkline = mount(<Sparkline data={mockData} includeArea />);

      expect(sparkline.findAll('path')).toHaveLength(2);
    });
  });

  describe('Strokes', () => {
    it('has a 1.5 stroke width', () => {
      const sparkline = mount(<Sparkline data={mockData} />);

      expect(sparkline.find('path')!.props!.strokeWidth).toBe(1.5);
    });
  });

  describe('Colors', () => {
    it('is teal by default', () => {
      const sparkline = mount(<Sparkline data={mockData} />);

      expect(sparkline.find('svg')!.props!.color).toBe(tokens.colorTeal);
    });

    it('applies a color when given one', () => {
      const sparkline = mount(
        <Sparkline data={mockData} color="colorOrange" />,
      );

      expect(sparkline.find('svg')!.props!.color).toBe(tokens.colorOrange);
    });
  });

  describe('Animations', () => {
    it('has a 0 strokeDashoffset when no animation is applied to the line path', () => {
      const sparkline = mount(<Sparkline data={mockData} />);

      act(() => {
        timerFlush();
      });

      sparkline.forceUpdate();

      expect(sparkline.find('path')!.props!.strokeDashoffset).toBe(0);
    });

    it('starts with a value for strokeDashoffset when an animation is applied to the line path', () => {
      const sparkline = mount(<Sparkline data={mockData} useAnimation />);

      expect(sparkline.find('path')!.props!.strokeDashoffset).toBe(
        MOCK_PATH_LENGTH,
      );
    });

    it('ends with 0 for strokeDashoffset when an animation is applied to the line path', () => {
      const sparkline = mount(<Sparkline data={mockData} useAnimation />);

      act(() => {
        timerFlush();
      });

      sparkline.forceUpdate();

      expect(sparkline.find('path')!.props!.strokeDashoffset).toBe(0);
    });

    it('starts with a 0 opacity to animate the area path', () => {
      const sparkline = mount(
        <Sparkline data={mockData} includeArea useAnimation />,
      );
      const area = sparkline.findAll('path')[1];

      expect(area!.props!.opacity).toBe(0);
    });

    it('ends with a 0.4 opacity to animate the area path', () => {
      const sparkline = mount(
        <Sparkline data={mockData} includeArea useAnimation />,
      );

      act(() => {
        timerFlush();
      });

      sparkline.forceUpdate();

      const areaEnd = sparkline.findAll('path')[1];

      expect(areaEnd!.props!.opacity).toBe(0.4);
    });
  });
});
