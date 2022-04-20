import {formatAndAddEllipsis} from '../formatAndAddEllipsis';

describe('formatAndAddEllipsis()', () => {
  it.each(['Monday', 'Monday ', 'Monday-'])('formats %s', (label) => {
    const actual = formatAndAddEllipsis(label);

    expect(actual).toStrictEqual('Monday…');
  });
});
