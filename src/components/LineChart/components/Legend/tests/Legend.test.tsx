import React from 'react';
import {mount} from '@shopify/react-testing';
import {Series} from 'components/LineChart/types';

import {LinePreview} from '../../LinePreview';
import {Legend} from '../Legend';

const mockSeries: Required<Series>[] = [
  {
    data: [],
    name: 'Test series 1',
    color: 'colorGreen',
    lineStyle: 'dashed',
  },
];

describe('<Legend />', () => {
  it('renders the name of each series', () => {
    const legend = mount(<Legend series={mockSeries} />);

    expect(legend).toContainReactText('Test series 1');
  });

  it('renders a LinePreview for each series', () => {
    const legend = mount(<Legend series={mockSeries} />);

    expect(legend).toContainReactComponentTimes(LinePreview, 1);
  });

  it('renders a LinePreview with the provided series styles', () => {
    const legend = mount(<Legend series={mockSeries} />);

    expect(legend).toContainReactComponent(LinePreview, {
      color: 'colorGreen',
      lineStyle: 'dashed',
    });
  });
});
