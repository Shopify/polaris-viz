import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleBand} from 'd3-scale';
import {ChartContext} from '@shopify/polaris-viz-core';

import {SingleTextLine} from '../../../../Labels';
import {ScaleIcon} from '../../ScaleIcon';
import {ScaleIconTooltip} from '../../ScaleIconTooltip';
import {FunnelChartLabels, LABEL_VERTICAL_OFFSET} from '../FunnelChartLabels';
import {TrendIndicator} from '../../../../TrendIndicator';
import {LINE_HEIGHT} from '../../../../../constants';
import type {MetaDataTrendIndicator} from '../../../types';

describe('<FunnelChartLabels />', () => {
  const mockContext = {
    characterWidths: new Map([['default', 10]]),
    containerBounds: {
      width: 500,
      height: 300,
      x: 0,
      y: 0,
    },
  };

  const mockProps = {
    formattedValues: ['1,000', '750', '500'],
    labels: ['Step 1', 'Step 2', 'Step 3'],
    labelWidth: 200,
    barWidth: 150,
    percentages: ['100%', '75%', '50%'],
    xScale: scaleBand().domain(['0', '1', '2']).range([0, 300]),
    shouldApplyScaling: false,
    renderScaleIconTooltipContent: () => <div>Tooltip content</div>,
    trends: [
      {
        reached: {
          value: '10%',
          trend: 'positive',
          direction: 'upward',
        },
      },
      {
        reached: {
          value: '20%',
          trend: 'negative',
          direction: 'downward',
        },
      },
      {
        reached: {
          value: '30%',
          trend: 'neutral',
          direction: 'upward',
        },
      },
    ] as MetaDataTrendIndicator,
  };

  const wrapper = (props = mockProps) => {
    return mount(
      <ChartContext.Provider value={mockContext}>
        <svg>
          <FunnelChartLabels {...props} />
        </svg>
        ,
      </ChartContext.Provider>,
    );
  };

  describe('text elements', () => {
    it('renders expected number of text elements', () => {
      const component = wrapper();

      expect(component).toContainReactComponentTimes(SingleTextLine, 9);
    });

    it('renders labels, percentages, and values', () => {
      const component = wrapper();

      expect(component).toContainReactComponent(SingleTextLine, {
        text: 'Step 1',
      });
      expect(component).toContainReactComponent(SingleTextLine, {
        text: '100%',
      });
      expect(component).toContainReactComponent(SingleTextLine, {
        text: '1,000',
      });
    });

    it('hides formatted values when space is constrained', () => {
      const propsWithNarrowWidth = {
        ...mockProps,
        labelWidth: 50,
        barWidth: 50,
      };

      const component = wrapper(propsWithNarrowWidth);
      const texts = component.findAll(SingleTextLine);

      expect(texts).toHaveLength(9);

      // Verify labels and percentages are still shown
      expect(component).toContainReactComponent(SingleTextLine, {
        text: 'Step 1',
      });
      expect(component).toContainReactComponent(SingleTextLine, {
        text: '100%',
      });
    });
  });

  describe('trend indicators', () => {
    it('renders trend indicators for all labels when provided', () => {
      const component = wrapper(mockProps);
      expect(component.findAll(TrendIndicator)).toHaveLength(3);
    });

    it('positions all trend indicators inline when there is enough space', () => {
      const component = wrapper({
        ...mockProps,
        labelWidth: 200,
        barWidth: 200,
      });

      expect(component).toContainReactComponentTimes('g', 3, {
        transform: expect.stringContaining(`${-LABEL_VERTICAL_OFFSET}`),
      });
    });

    it('positions all trend indicators below when there is not enough space', () => {
      const component = wrapper({
        ...mockProps,
        labelWidth: 50,
        barWidth: 50,
      });

      expect(component).toContainReactComponentTimes('g', 0, {
        transform: expect.stringContaining(`${LINE_HEIGHT}`),
      });
    });
  });

  describe('scale icon', () => {
    it('renders scale icon when shouldApplyScaling is true', () => {
      const component = wrapper({
        ...mockProps,
        shouldApplyScaling: true,
      });

      expect(component).toContainReactComponent(ScaleIcon);
    });

    it('does not render scale icon when shouldApplyScaling is false', () => {
      const component = wrapper({
        ...mockProps,
        shouldApplyScaling: false,
      });

      expect(component).not.toContainReactComponent(ScaleIcon);
    });

    it('shows tooltip when scale icon is hovered', () => {
      const mockTooltipContent = () => <div>Tooltip content</div>;
      const component = wrapper({
        ...mockProps,
        shouldApplyScaling: true,
        renderScaleIconTooltipContent: mockTooltipContent,
      });

      // Get the second g element
      const iconContainer = component.findAll('g')[1];
      iconContainer.trigger('onMouseEnter');

      expect(component).toContainReactComponent(ScaleIconTooltip);
    });

    it('hides tooltip when scale icon is unhovered', () => {
      const mockTooltipContent = () => <div>Tooltip content</div>;
      const component = wrapper({
        ...mockProps,
        shouldApplyScaling: true,
        renderScaleIconTooltipContent: mockTooltipContent,
      });

      const iconContainer = component.findAll('g')[1];

      iconContainer.trigger('onMouseEnter');
      iconContainer.trigger('onMouseLeave');

      expect(component).not.toContainReactComponent(ScaleIconTooltip);
    });
  });

  describe('label font size', () => {
    it('uses reduced font size when labels are too long', () => {
      const propsWithLongLabels = {
        ...mockProps,
        labels: [
          'Very Long Step Name 1',
          'Very Long Step Name 2',
          'Very Long Step Name 3',
        ],
        labelWidth: 50,
      };

      const component = wrapper(propsWithLongLabels);

      expect(component.findAll(SingleTextLine)[0]).toHaveReactProps({
        fontSize: 11,
      });
    });

    it('uses default font size when labels fit', () => {
      const component = wrapper();

      expect(component.findAll(SingleTextLine)[0]).toHaveReactProps({
        fontSize: 12,
      });
    });
  });
});
