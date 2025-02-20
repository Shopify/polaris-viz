import type {TooltipData} from '../../../../types';
import {getTooltipContentTemplateColumnCount} from '../get-tooltip-template-content-column-count';

describe('getTooltipContentTemplateColumnCount()', () => {
  it('returns the default column count when data does not have a trend or color', () => {
    const data: TooltipData = {
      shape: 'Line',
      data: [
        {
          key: 'Sessions from Google ads',
          value: '5250',
        },
      ],
    };
    expect(getTooltipContentTemplateColumnCount(data)).toBe(2);
  });

  it('adds a column when data has a color', () => {
    const data: TooltipData = {
      shape: 'Line',
      data: [{key: 'Sessions from Google ads', value: '5250', color: 'red'}],
    };
    expect(getTooltipContentTemplateColumnCount(data)).toBe(3);
  });

  it('adds a column when data has a trend', () => {
    const data: TooltipData = {
      shape: 'Line',
      data: [
        {key: 'Sessions from Google ads', value: '5250', trend: {value: '10%'}},
      ],
    };
    expect(getTooltipContentTemplateColumnCount(data)).toBe(3);
  });

  it('returns all columns when data has a color and trend', () => {
    const data: TooltipData = {
      shape: 'Line',
      data: [
        {
          key: 'Sessions from Google ads with color and trend',
          value: '5250',
          color: 'red',
          trend: {value: '10%'},
        },
      ],
    };
    expect(getTooltipContentTemplateColumnCount(data)).toBe(4);
  });
});
