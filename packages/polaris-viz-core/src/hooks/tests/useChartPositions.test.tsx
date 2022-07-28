import React from 'react';
import {mount, Root} from '@shopify/react-testing';

import {useChartPositions, Props} from '../useChartPositions';
import {useTheme} from '../useTheme';

jest.mock('../useTheme', () => ({
  useTheme: jest.fn(() => {
    return {
      grid: {
        horizontalMargin: 16,
      },
    };
  }),
}));

const MOCK_PROPS: Props = {
  annotationsHeight: 0,
  height: 100,
  width: 200,
  xAxisHeight: 0,
  yAxisWidth: 0,
};

describe('useChartPositions()', () => {
  function TestComponent(props: Props) {
    const result = useChartPositions(props);
    return <div>{JSON.stringify(result)}</div>;
  }

  function parseResult(mockComponent: Root<any>) {
    return JSON.parse(mockComponent.text());
  }

  it('returns unaltered positions', () => {
    const mockComponent = mount(<TestComponent {...MOCK_PROPS} />);

    const result = parseResult(mockComponent);

    expect(result).toStrictEqual({
      chartXPosition: 36,
      chartYPosition: 5,
      drawableHeight: 79,
      drawableWidth: 148,
      xAxisBounds: {x: 36, y: 100},
      yAxisBounds: {x: 16, y: 5},
    });
  });

  it('returns altered positions', () => {
    const mockComponent = mount(
      <TestComponent
        annotationsHeight={30}
        height={200}
        width={400}
        xAxisHeight={14}
        yAxisWidth={50}
      />,
    );

    const result = parseResult(mockComponent);

    expect(result).toStrictEqual({
      chartXPosition: 86,
      chartYPosition: 35,
      drawableHeight: 135,
      drawableWidth: 298,
      xAxisBounds: {x: 86, y: 186},
      yAxisBounds: {x: 16, y: 35},
    });
  });

  describe('annotationsHeight', () => {
    it('returns altered positions', () => {
      const mockComponent = mount(
        <TestComponent {...MOCK_PROPS} annotationsHeight={50} />,
      );

      const result = parseResult(mockComponent);

      expect(result).toStrictEqual({
        chartXPosition: 36,
        chartYPosition: 55,
        drawableHeight: 29,
        drawableWidth: 148,
        xAxisBounds: {x: 36, y: 100},
        yAxisBounds: {x: 16, y: 55},
      });
    });
  });

  describe('xAxisHeight', () => {
    it('returns altered positions', () => {
      const mockComponent = mount(
        <TestComponent {...MOCK_PROPS} xAxisHeight={50} />,
      );

      const result = parseResult(mockComponent);

      expect(result).toStrictEqual({
        chartXPosition: 36,
        chartYPosition: 5,
        drawableHeight: 29,
        drawableWidth: 148,
        xAxisBounds: {x: 36, y: 50},
        yAxisBounds: {x: 16, y: 5},
      });
    });
  });

  describe('yAxisWidth', () => {
    it('returns altered positions', () => {
      const mockComponent = mount(
        <TestComponent {...MOCK_PROPS} yAxisWidth={40} />,
      );

      const result = parseResult(mockComponent);

      expect(result).toStrictEqual({
        chartXPosition: 76,
        chartYPosition: 5,
        drawableHeight: 79,
        drawableWidth: 108,
        xAxisBounds: {x: 76, y: 100},
        yAxisBounds: {x: 16, y: 5},
      });
    });
  });

  describe('grid.horizontalMargin', () => {
    it('returns altered positions', () => {
      useTheme.mockImplementation(() => ({
        grid: {horizontalMargin: 0},
      }));

      const mockComponent = mount(<TestComponent {...MOCK_PROPS} />);

      const result = parseResult(mockComponent);

      expect(result).toStrictEqual({
        chartXPosition: 20,
        chartYPosition: 5,
        drawableHeight: 79,
        drawableWidth: 180,
        xAxisBounds: {x: 20, y: 100},
        yAxisBounds: {x: 0, y: 5},
      });
    });
  });
});
