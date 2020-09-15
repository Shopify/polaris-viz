import React from 'react';
import {mount} from '@shopify/react-testing';
import {Color} from 'types';

import {Legend} from '../Legend';
import {SquareColorPreview} from '../../../../SquareColorPreview';

describe('<Legend/>', () => {
  const mockData = [
    {
      label: 'Asia',
      data: [502, 1000, 2000, 1000, 100, 1000, 5000],
      color: 'colorPurple' as Color,
    },
    {
      label: 'Africa',
      data: [106, 107, 111, 133, 100, 767, 1766],
      color: 'colorTeal' as Color,
    },
  ];

  it('renders a <SquareColorPreview /> for each Series', () => {
    const legend = mount(<Legend series={mockData} />);

    expect(legend).toContainReactComponent(SquareColorPreview, {
      color: 'colorPurple',
    });
    expect(legend).toContainReactComponent(SquareColorPreview, {
      color: 'colorTeal',
    });
  });

  it('renders the name of each Series', () => {
    const legend = mount(<Legend series={mockData} />);

    expect(legend).toContainReactText('Asia');
    expect(legend).toContainReactText('Africa');
  });
});
