import {Fragment} from 'react';
import {DEFAULT_THEME_NAME} from '@shopify/polaris-viz-core';

import {mountWithProvider} from '../../../../polaris-viz-core/src/test-utilities/mountWithProvider';
import {TooltipContent} from '../../components';
import type {RenderTooltipContentData} from '../../types';
import {getTooltipContentRenderer} from '../getTooltipContentRenderer';

describe('getTooltipContentRenderer()', () => {
  it('returns <TooltipContent />', () => {
    const renderTooltipContent = getTooltipContentRenderer({
      theme: DEFAULT_THEME_NAME,
      data: [],
    });

    const result = mountWithProvider(
      <Fragment>{renderTooltipContent(MOCK_TOOLTIP_DATA)}</Fragment>,
    );

    expect(result).toContainReactComponent(TooltipContent);
  });

  it('returns null when no data is provided', () => {
    const renderTooltipContent = getTooltipContentRenderer({
      theme: DEFAULT_THEME_NAME,
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
      theme: DEFAULT_THEME_NAME,
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
  theme: DEFAULT_THEME_NAME,
  title: '',
};
