import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';

import type {Props} from '../useComboChartTooltipContent';
import {useComboChartTooltipContent} from '../useComboChartTooltipContent';

describe('useComboChartTooltipContent()', () => {
  it('returns formatted series name', () => {
    const renderTooltipContentSpy = jest.fn();

    mount(
      <TestComponent
        {...MOCK_PROPS}
        renderTooltipContent={renderTooltipContentSpy}
        seriesNameFormatter={(value) => `Name: ${value}`}
      />,
    );

    expect(renderTooltipContentSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            data: expect.arrayContaining([
              expect.objectContaining({key: 'Name: Bar Name'}),
            ]),
          }),
        ]),
      }),
    );
  });

  function TestComponent(props: Props) {
    const result = useComboChartTooltipContent(props);

    result(0);

    return null;
  }
});

const MOCK_PROPS: Props = {
  data: [
    {
      shape: 'Bar',
      series: [
        {
          name: 'Bar Name',
          data: [{value: 100, key: 'key1'}],
        },
      ],
    },
  ],
  seriesColors: ['red', 'red', 'red'],
  renderTooltipContent: jest.fn(),
  seriesNameFormatter: (value) => `${value}`,
};
