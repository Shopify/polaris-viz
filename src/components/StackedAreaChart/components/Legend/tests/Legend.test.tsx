import React from 'react';
import {mount} from '@shopify/react-testing';
import type {Color} from 'types';

import {Legend} from '../Legend';
import {SquareColorPreview} from '../../../../SquareColorPreview';

describe('<Legend/>', () => {
  const mockData = [
    {
      name: 'Asia',
      data: [
        {label: '1', rawValue: 502},
        {label: '2', rawValue: 1000},
        {label: '3', rawValue: 2000},
        {label: '4', rawValue: 1000},
        {label: '5', rawValue: 100},
        {label: '6', rawValue: 1000},
        {label: '7', rawValue: 5000},
      ],
      color: 'colorPurple' as Color,
    },
    {
      name: 'Africa',
      data: [
        {label: '1', rawValue: 106},
        {label: '2', rawValue: 107},
        {label: '3', rawValue: 111},
        {label: '4', rawValue: 133},
        {label: '5', rawValue: 100},
        {label: '6', rawValue: 767},
        {label: '7', rawValue: 1766},
      ],
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
