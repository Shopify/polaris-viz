import {mount} from '@shopify/react-testing';

import type {LegendItemProps} from '../LegendItem';
import {
  LegendItem,
  MINIMUM_LEGEND_ITEM_WIDTH,
  MINIMUM_LEGEND_ITEM_WITH_VALUE_WIDTH,
} from '../LegendItem';

const mockProps: LegendItemProps = {
  activeIndex: 2,
  colorVisionType: 'someType',
  index: 0,
  name: 'Legend Name',
  color: 'red',
  onDimensionChange: jest.fn(),
};

describe('<LegendItem />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a button', () => {
    const item = mount(<LegendItem {...mockProps} />);

    expect(item).toContainReactComponent('button');
  });

  it('renders legend.value if available', () => {
    const item = mount(
      <LegendItem
        {...mockProps}
        name="Legend Name"
        color="red"
        value="LegendValue"
      />,
    );

    expect(item).toContainReactText('LegendValue');
  });

  describe('colorVisionType', () => {
    it('applies data attributes', () => {
      const item = mount(<LegendItem {...mockProps} />);
      const button = item.find('button');
      const dataset = button?.domNode?.dataset;

      expect(dataset?.colorVisionEventIndex).toStrictEqual('0');
      expect(dataset?.colorVisionEventType).toStrictEqual('someType');
    });

    it('applies nothing when null', () => {
      const item = mount(
        <LegendItem {...mockProps} colorVisionType={undefined} />,
      );
      const button = item.find('button');
      const dataset = button?.domNode?.dataset;

      expect(dataset?.colorVisionEventIndex).toBeUndefined();
      expect(dataset?.colorVisionEventType).toBeUndefined();
    });
  });

  describe('activeIndex', () => {
    it('applies full opacity when indexes match', () => {
      const item = mount(<LegendItem {...mockProps} activeIndex={0} />);
      const button = item.find('button');

      expect(button?.props?.style?.opacity).toStrictEqual(1);
    });

    it('applies faded opacity when indexes do not match', () => {
      const item = mount(<LegendItem {...mockProps} />);
      const button = item.find('button');

      expect(button?.props?.style?.opacity).toStrictEqual(0.3);
    });
  });

  describe('onDimensionChange', () => {
    it('calls onDimensionChange if passed in', () => {
      jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
        () =>
          ({
            width: 50,
            height: 50,
          } as DOMRect),
      );

      const onDimensionChangeSpy = jest.fn();
      mount(
        <LegendItem {...mockProps} onDimensionChange={onDimensionChangeSpy} />,
      );

      expect(onDimensionChangeSpy).toHaveBeenCalledWith({
        width: 50,
        height: 50,
      });
    });
  });

  describe('max and min width', () => {
    it('sets a maxWidth if truncate is true', () => {
      const item = mount(<LegendItem {...mockProps} truncate />);

      expect(item.find('button')).toHaveReactProps({
        style: expect.objectContaining({
          maxWidth: MINIMUM_LEGEND_ITEM_WIDTH,
        }),
      });
    });

    it('sets a maxWidth for items with values if truncate is true', () => {
      const item = mount(
        <LegendItem {...mockProps} truncate value="$100.00" />,
      );

      expect(item.find('button')).toHaveReactProps({
        style: expect.objectContaining({
          maxWidth: MINIMUM_LEGEND_ITEM_WITH_VALUE_WIDTH,
        }),
      });
    });

    it('does not set a minWidth if the width is smaller than MINIMUM_LEGEND_ITEM_WIDTH', () => {
      jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
        () =>
          ({
            width: MINIMUM_LEGEND_ITEM_WIDTH - 1,
            height: 0,
          } as DOMRect),
      );

      const item = mount(<LegendItem {...mockProps} />);

      expect(item.find('button')).toHaveReactProps({
        style: expect.objectContaining({
          minWidth: undefined,
        }),
      });
    });

    it('sets a minWidth if the item width is greater than MINIMUM_LEGEND_ITEM_WIDTH', () => {
      jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
        () =>
          ({
            width: MINIMUM_LEGEND_ITEM_WIDTH + 1,
            height: 0,
          } as DOMRect),
      );

      const item = mount(<LegendItem {...mockProps} />);

      expect(item.find('button')).toHaveReactProps({
        style: expect.objectContaining({
          minWidth: MINIMUM_LEGEND_ITEM_WIDTH,
        }),
      });
    });
  });
});
