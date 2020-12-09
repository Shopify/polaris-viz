import React from 'react';
import {mount} from '@shopify/react-testing';

import {Tooltip} from '../Tooltip';
import {SquareColorPreview} from '../../SquareColorPreview';

(global as any).DOMRect = class DOMRect {
  width = 500;
  height = 250;
  top = 100;
  left = 100;
};

describe('<Tooltip/>', () => {
  const mockProps = {
    colors: [
      'primary' as 'primary',
      'secondary' as 'secondary',
      'tertiary' as 'tertiary',
    ],

    labels: ['Apple', 'Orange', 'Banana'],
    values: ['$5', '$2', '$3'],
  };

  it('renders a <SquareColorPreview /> for each color', () => {
    const tooltip = mount(<Tooltip {...mockProps} />);

    expect(tooltip).toContainReactComponent(SquareColorPreview, {
      color: 'primary',
    });
    expect(tooltip).toContainReactComponent(SquareColorPreview, {
      color: 'secondary',
    });
    expect(tooltip).toContainReactComponent(SquareColorPreview, {
      color: 'tertiary',
    });
  });

  it('renders a label for each of the labels', () => {
    const tooltip = mount(<Tooltip {...mockProps} />);

    expect(tooltip).toContainReactText('Apple');
    expect(tooltip).toContainReactText('Orange');
    expect(tooltip).toContainReactText('Banana');
  });

  it('renders a value for each of the values', () => {
    const tooltip = mount(<Tooltip {...mockProps} />);

    expect(tooltip).toContainReactText('$5');
    expect(tooltip).toContainReactText('$2');
    expect(tooltip).toContainReactText('$3');
  });

  it('renders a title if a title is provided', () => {
    const tooltip = mount(<Tooltip {...mockProps} title="Fruits" />);

    expect(tooltip).toContainReactText('Fruits');
  });

  it('renders a total if a total is provided', () => {
    const tooltip = mount(
      <Tooltip {...mockProps} total={{label: 'Total', value: '$10'}} />,
    );

    expect(tooltip).toContainReactText('Total');
    expect(tooltip).toContainReactText('$10');
  });
});
