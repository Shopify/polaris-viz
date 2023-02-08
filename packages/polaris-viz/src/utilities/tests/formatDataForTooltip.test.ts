import type {RenderTooltipContentData} from '../../types';
import {formatDataForTooltip} from '../formatDataForTooltip';

const DATA: RenderTooltipContentData = {
  data: [
    {
      shape: 'Line',
      data: [
        {
          key: 'one',
          value: 1,
        },
        {
          key: 'two',
          value: 1,
        },
      ],
      name: 'foo',
    },
  ],
  title: 'foo title',
  activeIndex: -1,
  dataSeries: [],
};

const PROPS = {
  xAxisOptions: {
    labelFormatter: (value) => `${value} bar`,
    hide: false,
  },
  yAxisOptions: {
    labelFormatter: (value) => `${value} foo`,
    integersOnly: false,
  },
};

describe('get-axis-options', () => {
  it('excludes title when not provided', () => {
    const formattedData = formatDataForTooltip({
      data: {
        activeIndex: -1,
        dataSeries: [],
        data: [],
      },
      ...PROPS,
    });

    expect(formattedData).toStrictEqual({
      formattedData: [],
      title: undefined,
    });
  });
});
