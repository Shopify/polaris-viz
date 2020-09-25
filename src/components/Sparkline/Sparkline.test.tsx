import React from 'react';
import {mount} from '@shopify/react-testing';
import tokens from '@shopify/polaris-tokens';

import {Sparkline} from './Sparkline';
import {LinearGradient} from './components';

const MOCK_PATH_LENGTH = 10;

jest.mock('./utilities.ts', () => {
  return {
    ...jest.requireActual('./utilities.ts'),
    getPathLength: () => {
      return MOCK_PATH_LENGTH;
    },
  };
});

jest.mock('utilities/unique-id', () => ({
  uniqueId: jest.fn(() => 'stackedAreas-1'),
}));

describe('<Sparkline />', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {matches: false};
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

      expect(sparkline).toContainReactComponent('svg', {
        'aria-hidden': true,
      });
    });

    it('has a hidden label when an accessibility label is passed to the component', () => {
      const label = 'Showing sales over the last 30 days';
      const sparkline = mount(
        <Sparkline data={mockData} accessibilityLabel={label} />,
      );

      expect(sparkline.find('span')!.text()).toBe(label);
    });
  });

  describe('SVG elements', () => {
    it('renders a path', () => {
      const sparkline = mount(<Sparkline data={mockData} />);

      expect(sparkline.findAll('path')).toHaveLength(1);
    });

    it('renders two paths if areaFillStyle is not `none`', () => {
      const sparkline = mount(
        <Sparkline data={mockData} areaFillStyle="gradient" />,
      );

      expect(sparkline.findAll('path')).toHaveLength(2);
    });

    it('renders a <LinearGradient /> if the areaFillStyle is `gradient`', () => {
      const sparkline = mount(
        <Sparkline data={mockData} areaFillStyle="gradient" />,
      );

      expect(sparkline).toContainReactComponent(LinearGradient, {
        id: 'stackedAreas-1',
        startColor: 'rgba(71, 193, 191, 0)',
        endColor: 'rgba(71, 193, 191, 0.8)',
      });
    });
  });

  describe('Animations', () => {
    it('starts with a strokeDashoffset for the line path when animations are used', () => {
      const sparkline = mount(
        <Sparkline useAnimation data={mockData} areaFillStyle="gradient" />,
      );

      expect(sparkline).toContainReactComponent('path', {
        strokeDashoffset: MOCK_PATH_LENGTH,
      });
    });

    it('starts with zero strokeDashoffset for the line path when animations are used', () => {
      const sparkline = mount(
        <Sparkline data={mockData} areaFillStyle="gradient" />,
      );

      expect(sparkline).toContainReactComponent('path', {
        strokeDashoffset: 0,
      });
    });

    it('starts with 0 opacity for the area path when animations are used', () => {
      const sparkline = mount(
        <Sparkline useAnimation data={mockData} areaFillStyle="gradient" />,
      );

      expect(sparkline).toContainReactComponent('path', {
        opacity: 0,
      });
    });

    it('starts with 0.4 for the area path opacity when animations are not used', () => {
      const sparkline = mount(
        <Sparkline data={mockData} areaFillStyle="solid" />,
      );

      expect(sparkline).toContainReactComponent('path', {
        opacity: 0.4,
      });
    });
  });

  describe('Strokes', () => {
    it('has a 1.5 stroke width', () => {
      const sparkline = mount(<Sparkline data={mockData} />);

      expect(sparkline).toContainReactComponent('path', {
        strokeWidth: 1.5,
      });
    });
  });

  describe('Colors', () => {
    it('is teal by default', () => {
      const sparkline = mount(<Sparkline data={mockData} />);

      expect(sparkline).toContainReactComponent('svg', {
        color: tokens.colorTeal,
      });
    });

    it('applies a color when given one', () => {
      const sparkline = mount(
        <Sparkline data={mockData} color="colorOrange" />,
      );

      expect(sparkline).toContainReactComponent('svg', {
        color: tokens.colorOrange,
      });
    });
  });
});
