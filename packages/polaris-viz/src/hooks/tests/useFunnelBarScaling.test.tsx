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

    it('returns a height of 0 when the value is 0', () => {
      function TestComponent() {
        const data = useFunnelBarScaling({
          yScale: mockYScale,
          values: [0, 100],
        });

        const height = data.getBarHeight(0);
        return <span data-data={`${JSON.stringify({height})}`} />;
      }

      const result = mount(<TestComponent />);
      const data = parseData(result);

      expect(data.height).toBe(0);
    });

    it('applies logarithmic scaling for values with large differences', () => {
      function TestComponent() {
        const data = useFunnelBarScaling({
          yScale: mockYScale,
          values: [1, 1000],
        });

        const heights = {
          small: data.getBarHeight(1),
          medium: data.getBarHeight(100),
          large: data.getBarHeight(1000),
        };

        return <span data-data={`${JSON.stringify(heights)}`} />;
      }

      const result = mount(<TestComponent />);
      const heights = parseData(result);

      // Verify logarithmic behavior - differences between consecutive heights, should be smaller for larger values
      const smallToMediumRatio =
        (heights.medium - heights.small) / heights.medium;
      const mediumToLargeRatio =
        (heights.large - heights.medium) / heights.large;

      expect(smallToMediumRatio).toBeGreaterThan(mediumToLargeRatio);
    });

    it('maintains minimum height ratio even with extreme value differences', () => {
      function TestComponent() {
        const data = useFunnelBarScaling({
          yScale: mockYScale,
          values: [1, 10000],
        });

        const smallestHeight = data.getBarHeight(1);
        const tallestHeight = data.getBarHeight(10000);

        return (
          <span
            data-data={`${JSON.stringify({
              smallestHeight,
              tallestHeight,
              ratio: smallestHeight / tallestHeight,
            })}`}
          />
        );
      }

      const result = mount(<TestComponent />);
      const data = parseData(result);

      expect(data.ratio).toBeGreaterThanOrEqual(MINIMUM_SEGMENT_HEIGHT_RATIO);
    });
  });
});
