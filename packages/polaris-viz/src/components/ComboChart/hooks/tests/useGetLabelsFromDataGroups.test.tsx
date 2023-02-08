import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';

import {useGetLabelsFromDataGroups} from '../useGetLabelsFromDataGroups';

function parseData(result: Root<any>) {
  return JSON.parse(result.domNode?.dataset.data ?? '');
}

describe('useGetLabelsFromDataGroups()', () => {
  // eslint-disable-next-line no-console
  const realWarn = console.warn;

  beforeAll(() => {
    // eslint-disable-next-line no-console
    console.warn = () => {};
  });

  afterAll(() => {
    // eslint-disable-next-line no-console
    console.warn = realWarn;
  });

  function TestComponent({data}) {
    const labels = useGetLabelsFromDataGroups({
      data,
      xAxisOptions: {
        labelFormatter: (value) => `${value}`,
        hide: false,
      },
    });

    return <span data-data={`${JSON.stringify(labels)}`} />;
  }

  it('data-series are equal', () => {
    const result = mount(
      <TestComponent
        data={[
          {
            shape: 'Bar',
            series: [
              {
                name: 'Bar Name',
                data: [
                  {value: 100, key: 'key1'},
                  {value: 100, key: 'key2'},
                  {value: 100, key: 'key3'},
                ],
              },
            ],
          },
          {
            shape: 'Line',
            series: [
              {
                name: 'Line Name',
                data: [
                  {value: 100, key: 'key1'},
                  {value: 100, key: 'key2'},
                  {value: 100, key: 'key3'},
                ],
              },
            ],
          },
        ]}
      />,
    );

    const data = parseData(result);

    expect(data).toStrictEqual(['key1', 'key2', 'key3']);
  });

  it('first keys match, series length equal', () => {
    const result = mount(
      <TestComponent
        data={[
          {
            shape: 'Bar',
            series: [
              {
                name: 'Bar Name',
                data: [
                  {value: 100, key: 'key1'},
                  {value: 100, key: 'key2'},
                  {value: 100, key: 'key3'},
                ],
              },
            ],
          },
          {
            shape: 'Line',
            series: [
              {
                name: 'Line Name',
                data: [
                  {value: 100, key: 'key1'},
                  {value: 100, key: 'key4'},
                  {value: 100, key: 'key5'},
                ],
              },
            ],
          },
        ]}
      />,
    );

    const data = parseData(result);

    expect(data).toStrictEqual(['key1', 'key2', 'key3']);
  });

  it('first keys match, series length not equal', () => {
    const result = mount(
      <TestComponent
        data={[
          {
            shape: 'Bar',
            series: [
              {
                name: 'Bar Name',
                data: [
                  {value: 100, key: 'key1'},
                  {value: 100, key: 'key2'},
                  {value: 100, key: 'key3'},
                ],
              },
            ],
          },
          {
            shape: 'Line',
            series: [
              {
                name: 'Line Name',
                data: [
                  {value: 100, key: 'key1'},
                  {value: 100, key: 'key5'},
                ],
              },
            ],
          },
        ]}
      />,
    );

    const data = parseData(result);

    expect(data).toStrictEqual(['key1', 'key2', 'key3']);
  });

  it('first keys do not match, series length equal', () => {
    const result = mount(
      <TestComponent
        data={[
          {
            shape: 'Bar',
            series: [
              {
                name: 'Bar Name',
                data: [
                  {value: 100, key: 'key2'},
                  {value: 100, key: 'key3'},
                ],
              },
            ],
          },
          {
            shape: 'Line',
            series: [
              {
                name: 'Line Name',
                data: [
                  {value: 100, key: 'key1'},
                  {value: 100, key: 'key4'},
                ],
              },
            ],
          },
        ]}
      />,
    );

    const data = parseData(result);

    expect(data).toStrictEqual([]);
  });

  it('first keys do not match, series length not equal', () => {
    const result = mount(
      <TestComponent
        data={[
          {
            shape: 'Bar',
            series: [
              {
                name: 'Bar Name',
                data: [
                  {value: 100, key: 'key2'},
                  {value: 100, key: 'key3'},
                ],
              },
            ],
          },
          {
            shape: 'Line',
            series: [
              {
                name: 'Line Name',
                data: [
                  {value: 100, key: 'key1'},
                  {value: 100, key: 'key4'},
                  {value: 100, key: 'key5'},
                ],
              },
            ],
          },
        ]}
      />,
    );

    const data = parseData(result);

    expect(data).toStrictEqual([]);
  });
});
