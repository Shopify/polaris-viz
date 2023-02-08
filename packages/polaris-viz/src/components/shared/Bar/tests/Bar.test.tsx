import {mount} from '@shopify/react-testing';

import {Bar} from '../Bar';
import type {BarProps} from '../Bar';
import type {Props} from '../../../../utilities/getHoverZoneOffset';
import {getHoverZoneOffset} from '../../../../utilities/getHoverZoneOffset';

const MOCK_PROPS: BarProps = {
  color: 'red',
  height: 10,
  width: 100,
  x: 5,
  y: 10,
};

const mockPropsForHoverZone: Props = {
  barSize: 100,
  zeroPosition: 5,
  max: 119,
  position: 'horizontal',
  isNegative: false,
};

describe('<Bar />', () => {
  it('renders a path', () => {
    const bar = mount(
      <svg>
        <Bar {...MOCK_PROPS} />
      </svg>,
    );
    expect(bar).toContainReactComponent('path');
  });

  it('transforms the path', () => {
    const bar = mount(
      <svg>
        <Bar {...MOCK_PROPS} />
      </svg>,
    );
    const group = bar.find('g');

    expect(group?.props?.transform).toStrictEqual('translate(5, 10)');
  });
});

describe('Zero Value', () => {
  it('renders a line component when passed value is zero', () => {
    const bar = mount(
      <svg>
        <Bar {...MOCK_PROPS} width={0} />
      </svg>,
    );
    expect(bar).toContainReactComponent('line');
  });

  describe('hover target zone', () => {
    it("gets an offset for a hover target zone based on the bar's width", () => {
      const bar = getHoverZoneOffset({...mockPropsForHoverZone});
      expect(bar).toStrictEqual({clampedSize: 114, offset: 14});
    });
  });
});
