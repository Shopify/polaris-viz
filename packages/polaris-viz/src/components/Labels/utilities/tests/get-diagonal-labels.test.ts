import {getDiagonalLabels} from '../get-diagonal-labels';
import characterWidths from '../../../../data/character-widths.json';
import {LINE_HEIGHT} from '../../../../constants';

import {PREPARED_LABELS} from './mock-data';

describe('getDiagonalLabels()', () => {
  it('returns vertical labels', () => {
    expect(
      getDiagonalLabels({
        labels: PREPARED_LABELS,
        characterWidths,
        targetHeight: LINE_HEIGHT,
        targetWidth: 25,
      }),
    ).toStrictEqual({
      containerHeight: 80,
      lines: [
        [
          {
            dominantBaseline: 'hanging',
            fullText: 'Short String',
            height: 14,
            textAnchor: 'end',
            transform: 'rotate(-45)',
            truncatedText: 'Short String',
            width: 71,
            x: 5.5,
            y: 5.5,
          },
        ],
        [
          {
            dominantBaseline: 'hanging',
            fullText: 'This is a really long string',
            height: 14,
            textAnchor: 'end',
            transform: 'rotate(-45)',
            truncatedText: 'This is a really…',
            width: 99,
            x: 5.5,
            y: 5.5,
          },
        ],
        [
          {
            dominantBaseline: 'hanging',
            fullText: 'Medium String',
            height: 14,
            textAnchor: 'end',
            transform: 'rotate(-45)',
            truncatedText: 'Medium String',
            width: 83,
            x: 5.5,
            y: 5.5,
          },
        ],
      ],
    });
  });
});
