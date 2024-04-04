import type {Root} from '@shopify/react-testing';
import {mount} from '@shopify/react-testing';

import type {Props} from '../useStackedChartTooltipContent';
import {useStackedChartTooltipContent} from '../useStackedChartTooltipContent';

describe('useStackedChartTooltipContent()', () => {
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
              expect.objectContaining({key: 'Name: Series One'}),
            ]),
          }),
        ]),
      }),
    );
  });

  function TestComponent(props: Props) {
    const result = useStackedChartTooltipContent(props);

    result(0);

    return null;
  }
});

const MOCK_PROPS: Props = {
  data: [
    {
      name: 'Series One',
      data: [{key: 'One', value: 1}],
      color: 'red',
    },
  ],
  indexForLabels: 0,
  renderTooltipContent: jest.fn(),
  seriesNameFormatter: (value) => `${value}`,
};
