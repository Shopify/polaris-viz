import React from 'react';
import {mount, Root} from '@shopify/react-testing';

import {useGetLongestLabelFromData} from '../useGetLongestLabelFromData';
import {TooltipData} from '../../../../types';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useContext: () => ({
      characterWidths: {
        // eslint-disable-next-line id-length
        a: 1,
        // eslint-disable-next-line id-length
        b: 1,
        1: 1,
        0: 1,
      },
    }),
  };
});

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

const DATA: TooltipData[] = [
  {
    shape: 'Line',
    data: [
      {key: 'a', value: '1', color: 'red'},
      {key: 'aa', value: '10', color: 'red'},
      {key: 'aaa', value: '1', color: 'red'},
    ],
  },
  {
    shape: 'Bar',
    data: [
      {key: 'a', value: '1111', color: 'red'},
      {key: 'ab', value: '10', color: 'red'},
    ],
  },
];

describe('useGetLongestLabelFromData()', () => {
  it('returns longest labels', () => {
    function TestComponent() {
      const data = useGetLongestLabelFromData(DATA);

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = parseData(result);

    expect(data).toStrictEqual({keyWidth: 1, valueWidth: 4});
  });

  it('does not throw error when data is missing', () => {
    function TestComponent() {
      const data = useGetLongestLabelFromData([
        {
          shape: 'Line',
          data: [],
        },
      ]);

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const data = parseData(result);

    expect(data).toStrictEqual({keyWidth: 0, valueWidth: 0});
  });
});
