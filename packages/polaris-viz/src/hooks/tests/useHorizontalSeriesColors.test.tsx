import React from 'react';
import {mount} from '@shopify/react-testing';

import type {DataSeries} from '../../types';
import {useHorizontalSeriesColors} from '../useHorizontalSeriesColors';
import {DEFAULT_THEME, LIGHT_THEME} from '../../constants';

const DATA: DataSeries[] = [
  {
    name: 'Group 1',
    data: [
      {value: 5, key: 'Label 01'},
      {value: -10, key: 'Label 02'},
      {value: 12, key: 'Label 03'},
    ],
  },
  {
    name: 'Group 2',
    data: [
      {value: 1, key: 'Label 01'},
      {value: -2, key: 'Label 02'},
      {value: 3, key: 'Label 03'},
    ],
  },
];

const MOCK_PROPS = {
  data: DATA,
};

describe('useHorizontalSeriesColors()', () => {
  it('returns colors with no overrides', () => {
    function TestComponent() {
      const data = useHorizontalSeriesColors(MOCK_PROPS);

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = JSON.parse(result.domNode?.dataset.data ?? '');

    expect(data).toStrictEqual({
      longestSeriesCount: 3,
      seriesColors: [...DEFAULT_THEME.seriesColors.upToFour].splice(0, 2),
    });
  });

  it('returns colors for theme', () => {
    function TestComponent() {
      const data = useHorizontalSeriesColors({...MOCK_PROPS, theme: 'Light'});

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = JSON.parse(result.domNode?.dataset.data ?? '');

    expect(data).toStrictEqual({
      longestSeriesCount: 3,
      seriesColors: LIGHT_THEME.seriesColors.upToFour.splice(0, 2),
    });
  });

  it('returns colors with overrides', () => {
    function TestComponent() {
      const data = useHorizontalSeriesColors({
        data: [
          {
            name: 'Group 1',
            data: [
              {value: 5, key: 'Label 01'},
              {value: -10, key: 'Label 02'},
            ],
            color: 'red',
          },
          {
            name: 'Group 2',
            data: [
              {value: 1, key: 'Label 01'},
              {value: -2, key: 'Label 02'},
            ],
          },
        ],
      });

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = JSON.parse(result.domNode?.dataset.data ?? '');

    expect(data).toStrictEqual({
      longestSeriesCount: 2,
      seriesColors: ['red', DEFAULT_THEME.seriesColors.upToFour[0]],
    });
  });

  it('returns comparison colors', () => {
    function TestComponent() {
      const data = useHorizontalSeriesColors({
        data: [
          {
            name: 'Group 1',
            data: [
              {value: 5, key: 'Label 01'},
              {value: -10, key: 'Label 02'},
              {value: 12, key: 'Label 03'},
            ],
          },
          {
            name: 'Group 2',
            isComparison: true,
            data: [
              {value: 1, key: 'Label 01'},
              {value: -2, key: 'Label 02'},
              {value: 3, key: 'Label 03'},
            ],
          },
        ],
      });

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = JSON.parse(result.domNode?.dataset.data ?? '');

    expect(data).toStrictEqual({
      longestSeriesCount: 3,
      seriesColors: [DEFAULT_THEME.seriesColors.single, 'colorDarkComparison'],
    });
  });
});
