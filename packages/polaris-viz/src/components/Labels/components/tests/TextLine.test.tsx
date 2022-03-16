import React from 'react';
import {mount} from '@shopify/react-testing';
import type {FormattedLine} from 'components/Labels/types';

import {TextLine, TextLineProps} from '../TextLine';

const LINES: FormattedLine[] = [
  {
    dominantBaseline: 'hanging',
    fullText: 'This is a really long string',
    height: 14,
    textAnchor: 'middle',
    truncatedText: 'This is a',
    width: 75,
    x: 37.5,
    y: 0,
  },
  {
    dominantBaseline: 'hanging',
    fullText: 'This is a really long string',
    height: 14,
    textAnchor: 'middle',
    truncatedText: 'really l…',
    width: 75,
    x: 37.5,
    y: 14,
  },
];

const MOCK_PROPS: TextLineProps = {
  index: 0,
  line: LINES,
};

describe('<TextLine />', () => {
  it('renders lines of text', () => {
    const content = mount(
      <svg>
        <TextLine {...MOCK_PROPS} />
      </svg>,
    );

    expect(content).toContainReactComponentTimes('text', 2);
    expect(content).toContainReactComponent('text', {
      textAnchor: 'middle',
      dominantBaseline: 'hanging',
      height: 14,
      width: 75,
      x: 37.5,
      y: 0,
      fill: 'colorGray30',
      fontSize: 12,
    });
  });

  it('renders a title with the un-truncated string', () => {
    const content = mount(
      <svg>
        <TextLine {...MOCK_PROPS} />
      </svg>,
    );

    const title = content.find('title');

    expect(title?.prop('children')).toStrictEqual(
      'This is a really long string',
    );
  });
});
