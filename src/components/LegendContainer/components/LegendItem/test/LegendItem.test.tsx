import React from 'react';
import {mount} from '@shopify/react-testing';

import {LegendItem, LegendItemProps} from '../LegendItem';

const mockProps: LegendItemProps = {
  activeIndex: 2,
  colorBlindType: 'someType',
  index: 0,
  legend: {name: 'Legend Name', color: 'red'},
};

describe('<LegendItem />', () => {
  it('renders a button', () => {
    const item = mount(<LegendItem {...mockProps} />);

    expect(item).toContainReactComponent('button');
  });

  describe('colorBlindType', () => {
    it('applies data attributes', () => {
      const item = mount(<LegendItem {...mockProps} />);
      const button = item.find('button');
      const dataset = button?.domNode?.dataset;

      expect(dataset?.colorBlindEventIndex).toStrictEqual('0');
      expect(dataset?.colorBlindEventType).toStrictEqual('someType');
    });

    it('applies nothing when null', () => {
      const item = mount(
        <LegendItem {...mockProps} colorBlindType={undefined} />,
      );
      const button = item.find('button');
      const dataset = button?.domNode?.dataset;

      expect(dataset?.colorBlindEventIndex).toBeUndefined();
      expect(dataset?.colorBlindEventType).toBeUndefined();
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
});
