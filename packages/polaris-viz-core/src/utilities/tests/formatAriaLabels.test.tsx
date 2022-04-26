import {formatAriaLabel} from '../formatAriaLabel';
import type {AccessibilitySeries} from '../../types';

const mockData: AccessibilitySeries = {
  title: 'title1',
  data: [
    {
      label: 'label',
      value: 'value',
    },
    {
      label: 'label2',
      value: 'value2',
    },
    {
      label: 'label3',
      value: 'value3',
    },
  ],
};

describe('format-aria-label', () => {
  it('returns formatted aria label string', () => {
    const ariaLabel = formatAriaLabel(mockData);

    expect(ariaLabel).toStrictEqual(
      'title1: label value,label2 value2,label3 value3',
    );
  });
});
