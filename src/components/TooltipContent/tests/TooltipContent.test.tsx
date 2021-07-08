import React from 'react';
import {mount} from '@shopify/react-testing';

import {TooltipContent} from '../TooltipContent';
import {SquareColorPreview} from '../../SquareColorPreview';

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 250;
  top = 100;
  left = 100;
};

describe('<TooltipContent/>', () => {
  const mockProps = {
    data: [
      {
        label: 'Apple',
        color: 'green',
        value: '$5',
      },
      {
        label: 'Orange',
        color: 'orange',
        value: '$2',
      },
      {
        label: 'Banana',
        color: 'yellow',
        value: '$3',
      },
    ],
  };

  it('renders a <SquareColorPreview /> for each color', () => {
    const tooltip = mount(<TooltipContent {...mockProps} />);

    expect(tooltip).toContainReactComponent(SquareColorPreview, {
      color: 'green',
    });
    expect(tooltip).toContainReactComponent(SquareColorPreview, {
      color: 'orange',
    });
    expect(tooltip).toContainReactComponent(SquareColorPreview, {
      color: 'yellow',
    });
  });

  it('renders a label for each of the labels', () => {
    const tooltip = mount(<TooltipContent {...mockProps} />);

    expect(tooltip).toContainReactText('Apple');
    expect(tooltip).toContainReactText('Orange');
    expect(tooltip).toContainReactText('Banana');
  });

  it('renders a value for each of the values', () => {
    const tooltip = mount(<TooltipContent {...mockProps} />);

    expect(tooltip).toContainReactText('$5');
    expect(tooltip).toContainReactText('$2');
    expect(tooltip).toContainReactText('$3');
  });

  it('renders a title if a title is provided', () => {
    const tooltip = mount(<TooltipContent {...mockProps} title="Fruits" />);

    expect(tooltip).toContainReactText('Fruits');
  });

  it('renders a total if a total is provided', () => {
    const tooltip = mount(
      <TooltipContent {...mockProps} total={{label: 'Total', value: '$10'}} />,
    );

    expect(tooltip).toContainReactText('Total');
    expect(tooltip).toContainReactText('$10');
  });
});
