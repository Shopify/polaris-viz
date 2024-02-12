import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';

import {useOverflowLegend} from '../useOverflowLegend';

const SHARED_MOCK_PROPS = {
  data: [
    {
      name: 'Series 1',
      value: '345',
      shape: 'Line',
      color: '#33798c',
    },
    {
      name: 'Series 2',
      value: '347',
      shape: 'Line',
      color: '#88b1f2',
    },
    {
      name: 'Series 3',
      value: '378',
      shape: 'Line',
      color: '#7f4afa',
    },
  ],
  enableHideOverflow: true,
  legendItemDimensions: {
    current: [
      {
        width: 145,
        height: 24,
      },
      {
        width: 81,
        height: 24,
      },
      {
        width: 76,
        height: 24,
      },
    ],
  },
};

const MOCK_VERTICAL_OVERFLOW_LEGEND_PROPS = {
  ...SHARED_MOCK_PROPS,
  direction: 'vertical',
  height: 70,
};

const MOCK_HORIZONTAL_OVERFLOW_LEGEND_PROPS = {
  ...SHARED_MOCK_PROPS,
  direction: 'horizontal',
  width: 150,
  activatorWidth: 0,
  leftMargin: 16,
  horizontalMargin: 16,
};

describe('useOverflowLegend', () => {
  function TestComponent({mockProps}) {
    const data = useOverflowLegend(mockProps);
    return <span data-data={`${JSON.stringify(data)}`} />;
  }

  it('returns all data if overflow is not enabled', () => {
    const result = mount(
      <TestComponent
        mockProps={{
          ...MOCK_VERTICAL_OVERFLOW_LEGEND_PROPS,
          enableHideOverflow: false,
        }}
      />,
    );

    const {displayedData, hiddenData} = parseData(result);

    expect(displayedData).toStrictEqual(
      MOCK_VERTICAL_OVERFLOW_LEGEND_PROPS.data,
    );
    expect(hiddenData).toStrictEqual([]);
  });

  describe('vertical direction', () => {
    it('returns displayed and hidden data when the legend item dimension heights exceed the container height', () => {
      const result = mount(
        <TestComponent mockProps={MOCK_VERTICAL_OVERFLOW_LEGEND_PROPS} />,
      );

      const {displayedData, hiddenData} = parseData(result);

      expect(displayedData).toStrictEqual([
        {
          name: 'Series 1',
          value: '345',
          shape: 'Line',
          color: '#33798c',
        },
        {
          name: 'Series 2',
          value: '347',
          shape: 'Line',
          color: '#88b1f2',
        },
      ]);
      expect(hiddenData).toStrictEqual([
        {
          name: 'Series 3',
          value: '378',
          shape: 'Line',
          color: '#7f4afa',
        },
      ]);
    });
  });

  describe('horizontal direction', () => {
    it('returns displayed and hidden data when the legend item dimension widths exceed the container width', () => {
      const result = mount(
        <TestComponent mockProps={MOCK_HORIZONTAL_OVERFLOW_LEGEND_PROPS} />,
      );

      const {displayedData, hiddenData} = parseData(result);

      expect(displayedData).toStrictEqual([
        {
          name: 'Series 1',
          value: '345',
          shape: 'Line',
          color: '#33798c',
        },
      ]);
      expect(hiddenData).toStrictEqual([
        {
          name: 'Series 2',
          value: '347',
          shape: 'Line',
          color: '#88b1f2',
        },
        {
          name: 'Series 3',
          value: '378',
          shape: 'Line',
          color: '#7f4afa',
        },
      ]);
    });
  });
});

function parseData(result: Root<JSX.Element>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}
