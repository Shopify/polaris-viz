import React from 'react';
import {mount} from '@shopify/react-testing';
import type {Color} from 'types';
import {SquareColorPreview} from 'components';

import {Legend} from '../Legend';

describe('<Legend />', () => {
  const mockProps = {
    series: [
      {
        data: [
          {label: 'label', rawValue: 10},
          {label: 'label', rawValue: 20},
          {label: 'label', rawValue: 30},
        ],
        color: 'colorRed' as Color,
        name: 'My label 1',
      },
      {
        data: [
          {label: 'label', rawValue: 10},
          {label: 'label', rawValue: 20},
          {label: 'label', rawValue: 30},
        ],
        color: 'colorPurple' as Color,
        name: 'My label 2',
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
