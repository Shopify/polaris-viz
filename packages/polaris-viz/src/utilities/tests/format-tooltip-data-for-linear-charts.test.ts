import {RenderTooltipContentData} from '../../types';
import {formatTooltipDataForLinearCharts} from '../format-tooltip-data-for-linear-charts';

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
  it('formats values using labelFormatter', () => {
    const formattedData = formatTooltipDataForLinearCharts({
      data: DATA,
      ...PROPS,
    });

    expect(formattedData).toStrictEqual({
      formattedData: [
        {
          data: [
            {
              key: 'one',
              value: '1 foo',
            },
            {
              key: 'two',
              value: '1 foo',
            },
          ],
          name: 'foo',
          shape: 'Line',
        },
      ],
      title: 'foo title bar',
    });
  });

  it('excludes title when not provided', () => {
    const formattedData = formatTooltipDataForLinearCharts({
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
