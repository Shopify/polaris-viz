import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';
import {SquareColorPreview} from 'components';

import {Legend} from '../Legend';

describe('<Legend />', () => {
  const mockProps = {
    series: [
      {
        data: [10, 20, 30],
        color: 'colorRed' as Color,
        label: 'My label 1',
      },
      {
        data: [10, 20, 30],
        color: 'colorPurple' as Color,
        label: 'My label 2',
      },
    ],
  };

  it('renders each label', () => {
    const legend = mount(<Legend {...mockProps} />);

    expect(legend).toContainReactText('My label 1');
    expect(legend).toContainReactText('My label 2');
  });

  it('renders each color preview', () => {
    const legend = mount(<Legend {...mockProps} />);

    expect(legend).toContainReactComponent(SquareColorPreview, {
      color: 'colorRed',
    });
    expect(legend).toContainReactComponent(SquareColorPreview, {
      color: 'colorPurple',
    });
  });
});
