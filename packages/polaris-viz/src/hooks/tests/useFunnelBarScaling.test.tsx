import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';
import React from 'react';

import {
  useFunnelBarScaling,
  MINIMUM_SEGMENT_HEIGHT_RATIO,
} from '../useFunnelBarScaling';

const mockYScale = scaleLinear().domain([0, 100]).range([0, 400]);

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

describe('useFunnelBarScaling', () => {
  it('returns shouldApplyScaling=false when ratio above threshold', () => {
    function TestComponent() {
      const data = useFunnelBarScaling({
        yScale: mockYScale,
        values: [90, 100],
      });

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);
    const data = parseData(result);

    expect(data.shouldApplyScaling).toBe(false);
  });

  it('returns shouldApplyScaling=true when ratio below threshold', () => {
    function TestComponent() {
      const data = useFunnelBarScaling({
        yScale: mockYScale,
        values: [5, 100],
      });

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);
    const data = parseData(result);

    expect(data.shouldApplyScaling).toBe(true);
  });

  describe('getBarHeight', () => {
    it('returns original bar height when ratio is above scaling threshold', () => {
      function TestComponent() {
        const data = useFunnelBarScaling({
          yScale: mockYScale,
          values: [90, 100],
        });

        const height = data.getBarHeight(90);
        return <span data-data={`${JSON.stringify({height})}`} />;
      }

      const result = mount(<TestComponent />);
      const data = parseData(result);

      expect(data.height).toBe(mockYScale(90));
    });

    it('returns scaled height when scaling needed', () => {
      function TestComponent() {
        const data = useFunnelBarScaling({
          yScale: mockYScale,
          values: [5, 100],
        });

        const scaledHeight = data.getBarHeight(5);
        const originalHeight = mockYScale(5);
        const tallestHeight = mockYScale(100);

        return (
          <span
            data-data={`${JSON.stringify({
              scaledHeight,
              originalHeight,
              tallestHeight,
            })}`}
          />
        );
      }

      const result = mount(<TestComponent />);
      const data = parseData(result);

      expect(data.scaledHeight).toBeGreaterThan(data.originalHeight);
      expect(data.scaledHeight).toBeLessThan(data.tallestHeight);
      expect(data.scaledHeight / data.tallestHeight).toBeGreaterThanOrEqual(
        MINIMUM_SEGMENT_HEIGHT_RATIO,
      );
    });

    it('returns original height for tallest bar even when scaling applied', () => {
      function TestComponent() {
        const data = useFunnelBarScaling({
          yScale: mockYScale,
          values: [5, 100],
        });

        const height = data.getBarHeight(100);
        return <span data-data={`${JSON.stringify({height})}`} />;
      }

      const result = mount(<TestComponent />);
      const data = parseData(result);

      expect(data.height).toBe(mockYScale(100));
    });
  });
});
