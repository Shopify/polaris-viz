import {truncateLabels} from '../truncate-labels';
import characterWidths from '../../../../data/character-widths.json';
import {LINE_HEIGHT} from '../../../../constants';

const WORDS = [
  {word: 'Sample', wordWidth: 43},
  {word: 'string', wordWidth: 33},
  {word: 'with', wordWidth: 25},
  {word: 'text', wordWidth: 22},
];

const TEXT = 'Sample string with text';

const LABELS = [
  {
    text: TEXT,
    words: [],
    truncatedWords: [],
    truncatedName: '',
    truncatedWidth: 0,
  },
];

describe('truncateLabels()', () => {
  it('returns data for labels that do not require truncation', () => {
    expect(
      truncateLabels({
        labels: LABELS,
        targetWidth: 400,
        targetHeight: LINE_HEIGHT,
        characterWidths,
      }),
    ).toStrictEqual([
      {
        text: TEXT,
        truncatedName: TEXT,
        truncatedWidth: 135,
        truncatedWords: ['Sample', 'string', 'with', 'text'],
        words: WORDS,
      },
    ]);
  });

  it('returns data for labels that will end-line truncate', () => {
    expect(
      truncateLabels({
        labels: LABELS,
        targetWidth: 100,
        targetHeight: LINE_HEIGHT,
        characterWidths,
      }),
    ).toStrictEqual([
      {
        text: TEXT,
        truncatedName: 'Sample string w…',
        truncatedWidth: 104,
        truncatedWords: ['Sample', 'string', 'w…'],
        words: WORDS,
      },
    ]);
  });

  it('returns data for labels that will end-word truncate', () => {
    expect(
      truncateLabels({
        labels: LABELS,
        targetWidth: 30,
        targetHeight: 100,
        characterWidths,
      }),
    ).toStrictEqual([
      {
        text: TEXT,
        truncatedName: 'Sa… st… with text',
        truncatedWidth: 105,
        truncatedWords: ['Sa…', 'st…', 'with', 'text'],
        words: WORDS,
      },
    ]);
  });
});
