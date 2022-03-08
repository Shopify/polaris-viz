import {getHorizontalLabels} from '../get-horizontal-labels';
import characterWidths from '../../../../data/character-widths.json';

import {PREPARED_LABELS} from './mock-data';

describe('getHorizontalLabels()', () => {
  it('returns horizontal labels for single line', () => {
    expect(
      getHorizontalLabels({
        labels: PREPARED_LABELS,
        characterWidths,
        targetHeight: 14,
        targetWidth: 400,
      }),
    ).toStrictEqual({
      containerHeight: 14,
      lines: [
        [
          {
            dominantBaseline: 'hanging',
            fullText: 'Short String',
            height: 14,
            textAnchor: 'middle',
            truncatedText: 'Short String',
            width: 400,
            x: 200,
            y: 0,
          },
        ],
        [
          {
            dominantBaseline: 'hanging',
            fullText: 'This is a really long string',
            height: 14,
            textAnchor: 'middle',
            truncatedText: 'This is a really long string',
            width: 400,
            x: 200,
            y: 0,
          },
        ],
        [
          {
            dominantBaseline: 'hanging',
            fullText: 'Medium String',
            height: 14,
            textAnchor: 'middle',
            truncatedText: 'Medium String',
            width: 400,
            x: 200,
            y: 0,
          },
        ],
      ],
    });
  });

  it('returns horizontal labels for multiple lines', () => {
    expect(
      getHorizontalLabels({
        labels: PREPARED_LABELS,
        characterWidths,
        targetHeight: 100,
        targetWidth: 80,
      }),
    ).toStrictEqual({
      containerHeight: 42,
      lines: [
        [
          {
            dominantBaseline: 'hanging',
            fullText: 'Short String',
            height: 14,
            textAnchor: 'middle',
            truncatedText: 'Short String',
            width: 80,
            x: 40,
            y: 0,
          },
        ],
        [
          {
            dominantBaseline: 'hanging',
            fullText: 'This is a really long string',
            height: 14,
            textAnchor: 'middle',
            truncatedText: 'This is a',
            width: 80,
            x: 40,
            y: 0,
          },
          {
            dominantBaseline: 'hanging',
            fullText: 'This is a really long string',
            height: 14,
            textAnchor: 'middle',
            truncatedText: 'really long',
            width: 80,
            x: 40,
            y: 14,
          },
          {
            dominantBaseline: 'hanging',
            fullText: 'This is a really long string',
            height: 14,
            textAnchor: 'middle',
            truncatedText: 'string',
            width: 80,
            x: 40,
            y: 28,
          },
        ],
        [
          {
            dominantBaseline: 'hanging',
            fullText: 'Medium String',
            height: 14,
            textAnchor: 'middle',
            truncatedText: 'Medium',
            width: 80,
            x: 40,
            y: 0,
          },
          {
            dominantBaseline: 'hanging',
            fullText: 'Medium String',
            height: 14,
            textAnchor: 'middle',
            truncatedText: 'String',
            width: 80,
            x: 40,
            y: 14,
          },
        ],
      ],
    });
  });
});
