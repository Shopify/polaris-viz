import React from 'react';
import {mount} from '@shopify/react-testing';

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
});
