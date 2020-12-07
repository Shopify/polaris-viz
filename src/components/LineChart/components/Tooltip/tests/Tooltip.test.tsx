import React from 'react';
import {mount} from '@shopify/react-testing';

import {TooltipContainer} from '../../../..';
import {LinePreview} from '../../LinePreview';
import {Tooltip} from '../Tooltip';

(global as any).DOMRect = class DOMRect {
  width = 200;
  height = 100;
};

const mockProps = {
  activePointIndex: 0,
  currentX: 0,
  currentY: 0,
  formatYAxisLabel: (value: number) => `${value}`,
  series: [
    {name: 'Test series 1', data: [{label: 'Jan 1', rawValue: 100}]},
    {name: 'Test series 2', data: [{label: 'Dec 1', rawValue: 300}]},
  ],
  chartDimensions: new DOMRect(),
};

describe('<Tooltip />', () => {
  it('renders a TooltipContainer', () => {
    const tooltip = mount(<Tooltip {...mockProps} />);
    expect(tooltip).toContainReactComponent(TooltipContainer, {
      activePointIndex: 0,
      currentX: 0,
      currentY: 0,
      chartDimensions: new DOMRect(),
      children: expect.any(Object),
    });
  });

  describe('Content', () => {
    it('renders a LinePreview for each series at the active point', () => {
      const tooltip = mount(<Tooltip {...mockProps} />);

      expect(tooltip).toContainReactComponentTimes(LinePreview, 2);
    });

    it('renders the label for each series at the active point', () => {
      const tooltip = mount(<Tooltip {...mockProps} />);

      expect(tooltip).toContainReactText('Jan 1');
      expect(tooltip).toContainReactText('Dec 1');
    });

    it('renders a formatted y-axis value for each series at the active point', () => {
      const tooltip = mount(
        <Tooltip
          {...mockProps}
          formatYAxisLabel={(value: number) => `formatted: ${value}`}
        />,
      );

      expect(tooltip).toContainReactText('formatted: 100');
      expect(tooltip).toContainReactText('formatted: 300');
    });
  });
});
