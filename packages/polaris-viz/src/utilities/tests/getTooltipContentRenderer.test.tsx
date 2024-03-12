import {Fragment} from 'react';

import {mountWithProvider} from '../../test-utilities/mountWithProvider';
import {TooltipContent} from '../../components';
import type {RenderTooltipContentData} from '../../types';
import {getTooltipContentRenderer} from '../getTooltipContentRenderer';

describe('getTooltipContentRenderer()', () => {
  it('returns <TooltipContent />', () => {
    const renderTooltipContent = getTooltipContentRenderer({
      theme: 'Default',
      data: [],
    });

    const result = mountWithProvider(
      <Fragment>{renderTooltipContent(MOCK_TOOLTIP_DATA)}</Fragment>,
    );

    expect(result).toContainReactComponent(TooltipContent);
  });

  it('returns null when no data is provided', () => {
    const renderTooltipContent = getTooltipContentRenderer({
      theme: 'Default',
      data: [],
    });

    expect(
      renderTooltipContent({
        ...MOCK_TOOLTIP_DATA,
        data: [
          {
            shape: 'Line',
            data: [],
            name: '',
          },
        ],
      }),
    ).toBeNull();
  });

  it('returns a custom function when tooltipOptions.renderTooltipContent is provided', () => {
    const customRenderer = jest.fn();

    const renderTooltipContent = getTooltipContentRenderer({
      theme: 'Default',
      data: [],
      tooltipOptions: {
        renderTooltipContent: customRenderer,
      },
    });

    mountWithProvider(
      <Fragment>{renderTooltipContent(MOCK_TOOLTIP_DATA)}</Fragment>,
    );

    expect(customRenderer).toHaveBeenCalled();
  });
});

const MOCK_TOOLTIP_DATA: RenderTooltipContentData = {
  data: [
    {
      shape: 'Line',
      data: [
        {
          key: 'Monday',
          value: 3,
        },
      ],
      name: '',
    },
  ],
  activeIndex: 0,
  dataSeries: [],
  theme: 'Default',
  title: '',
};
