import React from 'react';
import {mount} from '@shopify/react-testing';

import {LinePreview} from '../../LinePreview';
import {TooltipContent} from '../TooltipContent';

const mockProps = {
  data: [
    {
      name: 'April',
      point: {
        label: 'Apr 1, 2020',
        value: 'CA$1,240.55',
      },
      style: {
        color: 'primary' as 'primary',
      },
    },
    {
      name: 'March',
      point: {
        label: 'Mar 1, 2020',
        value: 'CA$926.22',
      },
      style: {
        color: 'pastComparison' as 'pastComparison',
        lineStyle: 'dashed' as 'dashed',
      },
    },
  ],
};

describe('<TooltipContent />', () => {
  describe('<LinePreview />', () => {
    it('renders for each series at the active point', () => {
      const tooltip = mount(<TooltipContent {...mockProps} />);

      expect(tooltip).toContainReactComponentTimes(LinePreview, 2);
    });

    it('passes the color and lineStyle for each series', () => {
      const tooltip = mount(<TooltipContent {...mockProps} />);

      expect(tooltip).toContainReactComponent(LinePreview, {
        color: 'primary',
        lineStyle: 'solid',
      });

      expect(tooltip).toContainReactComponent(LinePreview, {
        color: 'pastComparison',
        lineStyle: 'dashed',
      });
    });
  });

  it('renders the label for each series', () => {
    const tooltip = mount(<TooltipContent {...mockProps} />);

    expect(tooltip).toContainReactText('Apr 1, 2020');
    expect(tooltip).toContainReactText('Mar 1, 2020');
  });

  it('renders the value for each series', () => {
    const tooltip = mount(<TooltipContent {...mockProps} />);

    expect(tooltip).toContainReactText('CA$1,240.55');
    expect(tooltip).toContainReactText('CA$926.22');
  });
});
