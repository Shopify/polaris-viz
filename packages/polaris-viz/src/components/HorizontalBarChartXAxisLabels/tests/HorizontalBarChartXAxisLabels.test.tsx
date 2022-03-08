import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {
  HorizontalBarChartXAxisLabels,
  HorizontalBarChartXAxisLabelsProps,
} from '../HorizontalBarChartXAxisLabels';
import {TextLine} from '../../../components/Labels';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const MOCK_PROPS: HorizontalBarChartXAxisLabelsProps = {
  chartX: 10,
  chartY: 15,
  labels: ['Sample Label 1', 'Sample Label 2', 'Sample Label 3'],
  labelWidth: 100,
  onHeightChange: jest.fn(),
  xScale: scaleLinear(),
  ticks: [0, 1, 2],
};

describe('<HorizontalBarChartXAxisLabels />', () => {
  it('renders <TextLine /> for each label', () => {
    const content = mount(
      <svg>
        <HorizontalBarChartXAxisLabels {...MOCK_PROPS} />
      </svg>,
    );

    expect(content).toContainReactComponentTimes(TextLine, 3);
  });

  it('applies transform to group', () => {
    const content = mount(
      <svg>
        <HorizontalBarChartXAxisLabels {...MOCK_PROPS} />
      </svg>,
    );

    expect(content).toContainReactComponent('g', {
      transform: `translate(10,15)`,
    });
  });
});
