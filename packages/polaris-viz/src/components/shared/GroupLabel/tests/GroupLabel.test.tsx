import {mount} from '@shopify/react-testing';

import {GroupLabel} from '../GroupLabel';
import type {GroupLabelProps} from '../GroupLabel';

jest.mock('@shopify/polaris-viz-core/src/utilities', () => {
  return {
    ...jest.requireActual('@shopify/polaris-viz-core/src/utilities'),
    estimateStringWidth: () => 100,
  };
});

const MOCK_PROPS: GroupLabelProps = {
  areAllNegative: false,
  containerWidth: 300,
  label: 'Label Text',
  zeroPosition: 0,
};

describe('<GroupLabel />', () => {
  it('renders <foreignObject />', () => {
    const label = mount(
      <svg>
        <GroupLabel {...MOCK_PROPS} />
      </svg>,
    );
    expect(label).toContainReactComponent('foreignObject');
  });

  it('renders a text string', () => {
    const label = mount(
      <svg>
        <GroupLabel {...MOCK_PROPS} />
      </svg>,
    );
    expect(label).toContainReactText('Label Text');
  });

  describe('areAllNegative', () => {
    it('positions label negatively when true', () => {
      const label = mount(
        <svg>
          <GroupLabel {...MOCK_PROPS} areAllNegative />
        </svg>,
      );

      const object = label.find('foreignObject');

      expect(object?.props.x).toStrictEqual(-92);
    });

    it('positions label at 0 when false', () => {
      const label = mount(
        <svg>
          <GroupLabel {...MOCK_PROPS} />
        </svg>,
      );

      const object = label.find('foreignObject');

      expect(object?.props.x).toStrictEqual(0);
    });

    it('positions at zeroPosition when true', () => {
      const label = mount(
        <svg>
          <GroupLabel {...MOCK_PROPS} areAllNegative zeroPosition={20} />
        </svg>,
      );

      const object = label.find('foreignObject');

      expect(object?.props.x).toStrictEqual(-72);
    });

    it('renders max-width when true', () => {
      const label = mount(
        <svg>
          <GroupLabel {...MOCK_PROPS} areAllNegative />
        </svg>,
      );

      const div = label.find('div');

      expect(div?.props?.style?.maxWidth).toStrictEqual(107);
    });

    it('renders max-width when false', () => {
      const label = mount(
        <svg>
          <GroupLabel {...MOCK_PROPS} />
        </svg>,
      );

      const div = label.find('div');

      expect(div?.props?.style?.maxWidth).toStrictEqual(300);
    });
  });

  describe('zeroPosition', () => {
    it('positions label starting at zero position', () => {
      const label = mount(
        <svg>
          <GroupLabel {...MOCK_PROPS} zeroPosition={10} />
        </svg>,
      );

      const object = label.find('foreignObject');

      expect(object?.props.x).toStrictEqual(10);
    });
  });
});
