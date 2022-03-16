import {LINE_HEIGHT} from '../../../../constants';
import characterWidths from '../../../../data/character-widths.json';
import {endLineTruncate} from '../end-line-truncate';
import {truncateLastLine} from '../truncate-last-line';
import {truncateSingleLine} from '../truncate-single-line';

jest.mock('../truncate-last-line', () => {
  return {truncateLastLine: jest.fn()};
});

jest.mock('../truncate-single-line', () => {
  return {truncateSingleLine: jest.fn()};
});

const MOCK_DATA = {
  label: 'abcdefghijklmnopqrstuvwxyz',
  targetWidth: 100,
  characterWidths,
};

describe('endLineTruncate()', () => {
  it(`calls truncateSingleLine when targetHeight is less than ${LINE_HEIGHT}`, () => {
    endLineTruncate({
      ...MOCK_DATA,
      targetHeight: LINE_HEIGHT - 1,
    });

    expect(truncateSingleLine).toHaveBeenCalled();
  });

  it(`calls truncateLastLine when targetHeight is greater than ${LINE_HEIGHT}`, () => {
    endLineTruncate({
      ...MOCK_DATA,
      targetHeight: LINE_HEIGHT + 1,
    });

    expect(truncateLastLine).toHaveBeenCalled();
  });
});
