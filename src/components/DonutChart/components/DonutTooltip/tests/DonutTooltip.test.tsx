import React from 'react';
import {mount} from '@shopify/react-testing';
import {TooltipContainer} from '../../../../TooltipContainer';

import {DonutTooltip, DonutTooltipProps} from '../DonutTooltip';

describe('<DonutTooltip />', () => {
  const mockProps: DonutTooltipProps = {
    label: 'Shopify Payments',
    value: '$50.000,00',
    activePointIndex: 1,
    currentX: 50,
    currentY: 60,
    chartDimensions: {
      width: 100,
      height: 100,
    },
  };

  it('renders TooltipContainer', () => {
    const tooltip = mount(<DonutTooltip {...mockProps} />);

    expect(tooltip).toContainReactComponent(TooltipContainer, {
      activePointIndex: 1,
      currentX: 50,
      currentY: 60,
      chartDimensions: {
        width: 100,
        height: 100,
      },
    });
  });

  it('renders a label for each of the labels', () => {
    const tooltip = mount(<DonutTooltip {...mockProps} />);

    expect(tooltip).toContainReactComponent('p', {
      children: 'Shopify Payments',
    });
  });

  it('renders a value for each of the values', () => {
    const tooltip = mount(<DonutTooltip {...mockProps} />);

    expect(tooltip).toContainReactComponent('p', {
      children: 'Shopify Payments',
    });
  });
});
