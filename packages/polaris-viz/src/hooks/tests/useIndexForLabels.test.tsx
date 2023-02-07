import {mount, Root} from '@shopify/react-testing';

import {useIndexForLabels} from '../useIndexForLabels';

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

describe('useIndexForLabels', () => {
  it('returns the first index when series.data[] length matches', () => {
    0;
    function TestComponent() {
      const data = useIndexForLabels([
        {
          name: 'Bfcm sales',
          data: [
            {
              key: 'Nov 25, 2022',
              value: 4597927.99,
            },
            {
              key: 'Nov 26, 2022',
              value: 1771353.08,
            },
            {
              key: 'Nov 27, 2022',
              value: 1013047.84,
            },
            {
              key: 'Nov 28, 2022',
              value: 0,
            },
          ],
        },
        {
          name: 'Bfcm sales bfcm2021',
          data: [
            {
              key: 'Nov 26, 2021',
              value: 1856721.98,
            },
            {
              key: 'Nov 27, 2021',
              value: 1029153.21,
            },
            {
              key: 'Nov 28, 2021',
              value: 1235163.58,
            },
            {
              key: 'Nov 29, 2021',
              value: 4393912.58,
            },
          ],
        },
      ]);

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const indexForLabels = parseData(result);

    expect(indexForLabels).toStrictEqual(0);
  });

  it('returns the index of the first longest series.data[] when length does not match', () => {
    0;
    function TestComponent() {
      const data = useIndexForLabels([
        {
          name: 'Bfcm sales',
          data: [
            {
              key: 'Nov 25, 2022',
              value: 4597927.99,
            },
            {
              key: 'Nov 26, 2022',
              value: 1771353.08,
            },
            {
              key: 'Nov 27, 2022',
              value: 1013047.84,
            },
          ],
        },
        {
          name: 'Bfcm sales bfcm2021',
          data: [
            {
              key: 'Nov 26, 2021',
              value: 1856721.98,
            },
            {
              key: 'Nov 27, 2021',
              value: 1029153.21,
            },
            {
              key: 'Nov 28, 2021',
              value: 1235163.58,
            },
            {
              key: 'Nov 29, 2021',
              value: 4393912.58,
            },
          ],
        },
        {
          name: 'Bfcm sales bfcm2021',
          data: [
            {
              key: 'Nov 26, 2021',
              value: 1856721.98,
            },
            {
              key: 'Nov 27, 2021',
              value: 1029153.21,
            },
            {
              key: 'Nov 28, 2021',
              value: 1235163.58,
            },
            {
              key: 'Nov 29, 2021',
              value: 4393912.58,
            },
          ],
        },
      ]);

      return <span data-data={`${JSON.stringify(data)}`} />;
    }

    const result = mount(<TestComponent />);

    const indexForLabels = parseData(result);

    expect(indexForLabels).toStrictEqual(1);
  });
});
