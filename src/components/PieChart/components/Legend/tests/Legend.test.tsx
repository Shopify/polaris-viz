import React from 'react';
import {mount} from '@shopify/react-testing';

import {getDefaultColor} from '../../../../../utilities';
import {Legend} from '../Legend';
import {LegendPreview} from '../components';

describe('<Legend />', () => {
  const defaultProps = {
    series: [{name: 'DataPoint1', color: getDefaultColor(), value: 0}],
  };

  it('renders container div with props', () => {
    const legend = mount(<Legend {...defaultProps} ariaHidden />);

    expect(legend).toContainReactComponent('div', {
      className: 'Container',
      'aria-hidden': true,
    });
  });

  it('renders the all LegendPreviews in the series array', () => {
    const props = {
      series: [
        {name: 'DataPoint1', color: getDefaultColor(), value: 0},
        {name: 'DataPoint2', color: getDefaultColor(1), value: 1},
      ],
    };

    const legend = mount(<Legend {...props} />);

    const legendPreviews = legend.findAll(LegendPreview);

    expect(legendPreviews).toHaveLength(2);
  });

  it('renders LegendPreview with its props', () => {
    const props = {
      series: [{name: 'DataPoint1', color: getDefaultColor(), value: 0}],
    };

    const legend = mount(<Legend {...props} ariaHidden />);

    const {series} = props;

    expect(legend).toContainReactComponent(LegendPreview, {
      series: {
        color: series[0].color,
        name: series[0].name,
        value: series[0].value,
      },
    });
  });
});
