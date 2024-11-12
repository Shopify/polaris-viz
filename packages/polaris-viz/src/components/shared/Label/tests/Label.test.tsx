import {mount} from '@shopify/react-testing';

import {Label} from '../Label';
import type {LabelProps} from '../Label';
import {HORIZONTAL_BAR_LABEL_HEIGHT} from '../../../../constants';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => ({
  estimateStringWidth: jest.fn(() => 100),
}));

const MOCK_PROPS: LabelProps = {
  barHeight: 15,
  color: 'red',
  fontSize: 11,
  label: 'Label Text',
  labelWidth: 100,
  y: 20,
};

describe('<Label />', () => {
  it('renders <text> element with label', () => {
    const label = mount(
      <svg>
        <Label {...MOCK_PROPS} />
      </svg>,
    );
    expect(label).toContainReactComponent('text', {
      children: 'Label Text',
    });
  });

  it('is positioned', () => {
    const label = mount(
      <svg>
        <Label {...MOCK_PROPS} />
      </svg>,
    );

    const object = label.find('text');

    expect(object?.props).toStrictEqual(
      expect.objectContaining({
        y: MOCK_PROPS.y + MOCK_PROPS.barHeight / 2,
        width: MOCK_PROPS.labelWidth,
        height: HORIZONTAL_BAR_LABEL_HEIGHT,
        fontSize: '11px',
        dominantBaseline: 'central',
      }),
    );
  });
});
