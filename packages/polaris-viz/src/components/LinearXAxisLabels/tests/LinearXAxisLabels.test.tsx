import React from 'react';
import {mount} from '@shopify/react-testing';
import {scaleLinear} from 'd3-scale';

import {LinearXAxisLabels, LinearXAxisLabelsProps} from '../LinearXAxisLabels';
import {TextLine} from '../../../components/Labels';

jest.mock('d3-scale', () => ({
  scaleLinear: jest.requireActual('d3-scale').scaleLinear,
}));

const MOCK_PROPS: LinearXAxisLabelsProps = {
  chartX: 10,
  chartY: 15,
  labels: ['Sample Label 1', 'Sample Label 2', 'Sample Label 3'],
  labelWidth: 100,
  onHeightChange: jest.fn(),
  xScale: scaleLinear(),
  reducedLabelIndexes: [],
};

describe('<LinearXAxisLabels />', () => {
  it('renders <TextLine /> for each label', () => {
    const content = mount(
      <svg>
        <LinearXAxisLabels {...MOCK_PROPS} />
      </svg>,
    );

    expect(content).toContainReactComponentTimes(
      TextLine,
      MOCK_PROPS.labels.length,
    );
  });

  it('applies transform to group', () => {
    const content = mount(
      <svg>
        <LinearXAxisLabels {...MOCK_PROPS} />
      </svg>,
    );

    expect(content).toContainReactComponent('g', {
      transform: `translate(10,15)`,
    });
  });

  describe('reducedLabelIndexes', () => {
    it('uses reducedLabelIndexes when they are provided', () => {
      const content = mount(
        <svg>
          <LinearXAxisLabels {...MOCK_PROPS} reducedLabelIndexes={[0, 2]} />
        </svg>,
      );

      expect(content).toContainReactComponentTimes(TextLine, 2);
    });
  });
});
