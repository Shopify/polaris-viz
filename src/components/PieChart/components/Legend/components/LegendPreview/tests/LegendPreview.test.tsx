import React from 'react';
import {mount} from '@shopify/react-testing';

import {getDefaultColor} from '../../../../../../../utilities';
import {LegendPreview} from '../LegendPreview';
import {ColorPreview, ColorPreviewType} from '../../../../../../ColorPreview';

describe('<LegendPreview />', () => {
  const defaultProps = {
    series: {
      color: getDefaultColor(),
      name: 'Test Name',
      value: 100,
    },
  };

  it('renders container div with props', () => {
    const legendPreview = mount(<LegendPreview {...defaultProps} />);

    expect(legendPreview).toContainReactComponent('div', {
      className: 'Series',
    });
  });

  it('renders ColorPreview with props', () => {
    const props = {
      series: {
        ...defaultProps.series,
        color: getDefaultColor(),
      },
    };

    const legendPreview = mount(<LegendPreview {...defaultProps} {...props} />);

    const {
      series: {color},
    } = props;

    expect(legendPreview).toContainReactComponent(ColorPreview, {
      color,
      type: ColorPreviewType.Circle,
    });
  });

  it('renders a paragraph component with the name and style', () => {
    const props = {
      series: {
        ...defaultProps.series,
        name: 'Test Name',
      },
    };

    const legendPreview = mount(<LegendPreview {...defaultProps} {...props} />);

    const {
      series: {name},
    } = props;

    expect(legendPreview).toContainReactComponent('p', {
      children: name,
      className: 'SeriesName',
      'aria-label': name,
      'aria-describedby': 'name',
    });
  });

  it('renders a paragraph component with the value and style', () => {
    const props = {
      series: {
        ...defaultProps.series,
        value: 200,
      },
    };

    const legendPreview = mount(<LegendPreview {...defaultProps} {...props} />);

    const {
      series: {value},
    } = props;

    expect(legendPreview).toContainReactComponent('p', {
      children: value,
      className: 'SeriesValue',
      'aria-label': value.toString(),
      'aria-describedby': 'value',
    });
  });
});
