import React from 'react';
import {mount} from '@shopify/react-testing';

import {Label} from '../Label';
import type {LabelProps} from '../Label';

jest.mock('../../../../../../utilities/estimate-string-width', () => ({
  estimateStringWidth: jest.fn(() => 100),
}));

const MOCK_PROPS: LabelProps = {
  barHeight: 15,
  color: 'red',
  label: 'Label Text',
  labelWidth: 100,
  x: 10,
  y: 20,
};

describe('<Label />', () => {
  it('renders <foreignObject />', () => {
    const label = mount(
      <svg>
        <Label {...MOCK_PROPS} />
      </svg>,
    );
    expect(label).toContainReactComponent('foreignObject');
  });

  it('renders a text string', () => {
    const label = mount(
      <svg>
        <Label {...MOCK_PROPS} />
      </svg>,
    );
    expect(label).toContainReactText('Label Text');
  });

  it('is positioned', () => {
    const label = mount(
      <svg>
        <Label {...MOCK_PROPS} />
      </svg>,
    );

    const object = label.find('foreignObject');

    expect(object?.props.y).toStrictEqual(21.5);
  });
});
