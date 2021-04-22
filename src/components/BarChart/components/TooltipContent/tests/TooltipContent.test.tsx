import React from 'react';
import {mount} from '@shopify/react-testing';

import {Color} from '../../../../../types';
import {TooltipContent} from '../TooltipContent';

describe('<TooltipContent/>', () => {
  it('renders a label', () => {
    const content = mount(<TooltipContent label="I'm a label" value="10" />);

    expect(content).toContainReactText("I'm a label");
  });

  it('renders a value', () => {
    const content = mount(<TooltipContent label="I'm a label" value="10" />);

    expect(content).toContainReactText('10');
  });
  it('renders an annotation', () => {
    const annotation = {
      width: 5,
      color: 'colorTealLight' as Color,
      tooltipData: {
        label: 'Median',
        value: '1.5 hours',
      },
    };
    const content = mount(
      <TooltipContent label="I'm a label" value="10" annotation={annotation} />,
    );

    expect(content).toContainReactText(`Median1.5 hoursI'm a label10`);
  });
});
