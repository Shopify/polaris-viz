import React from 'react';
import {mount} from '@shopify/react-testing';
import {Series} from 'components/LineChart/types';

import {LinePreview} from '../../LinePreview';
import {Legend} from '../Legend';

const mockSeriesWithStyles: Series = {
  data: [],
  name: 'Test series 1',
  style: {color: 'colorGreen', lineStyle: 'dashed'},
};
const mockSeriesWithoutStyles: Series = {data: [], name: 'Test series 2'};
const allMockSeries = [mockSeriesWithStyles, mockSeriesWithoutStyles];

describe('<Legend />', () => {
  it('renders the name of each series', () => {
    const legend = mount(<Legend series={allMockSeries} />);

    expect(legend).toContainReactText('Test series 1');
    expect(legend).toContainReactText('Test series 2');
  });

  it('renders a LinePreview for each series', () => {
    const legend = mount(<Legend series={allMockSeries} />);

    expect(legend).toContainReactComponentTimes(LinePreview, 2);
  });

  it('renders a LinePreview with the series style when provided', () => {
    const legend = mount(<Legend series={[mockSeriesWithStyles]} />);

    expect(legend).toContainReactComponent(LinePreview, {
      color: mockSeriesWithStyles.style!.color,
      lineStyle: mockSeriesWithStyles.style!.lineStyle,
    });
  });

  it('renders a LinePreview with a solid, purple line when no style is provided', () => {
    const legend = mount(<Legend series={[mockSeriesWithoutStyles]} />);

    expect(legend).toContainReactComponent(LinePreview, {
      color: 'colorPurple',
      lineStyle: 'solid',
    });
  });
});
