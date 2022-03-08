import {getVerticalLabels} from '../get-vertical-labels';
import characterWidths from '../../../../data/character-widths.json';

import {PREPARED_LABELS} from './mock-data';

describe('getVerticalLabels()', () => {
  it('returns vertical labels', () => {
    expect(
      getVerticalLabels({labels: PREPARED_LABELS, characterWidths}),
    ).toStrictEqual({
      containerHeight: 86,
      lines: [
        [
          {
            fullText: 'Short String',
            height: 14,
            textAnchor: 'end',
            transform: 'translate(14) rotate(-90)',
            truncatedText: 'Short String',
            width: 80,
            x: 0,
            y: 3.5,
          },
        ],
        [
          {
            fullText: 'This is a really long string',
            height: 14,
            textAnchor: 'end',
            transform: 'translate(14) rotate(-90)',
            truncatedText: 'This is a rea…',
            width: 80,
            x: 0,
            y: 3.5,
          },
        ],
        [
          {
            fullText: 'Medium String',
            height: 14,
            textAnchor: 'end',
            transform: 'translate(14) rotate(-90)',
            truncatedText: 'Medium Strin…',
            width: 80,
            x: 0,
            y: 3.5,
          },
        ],
      ],
    });
  });
});
