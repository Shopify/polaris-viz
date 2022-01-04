import {useMinimalLabelIndexes} from '../use-minimal-label-indexes';

describe('useMinimalLabelIndexes', () => {
  it('returns null when useMinimalLabels is false', () => {
    const labels = useMinimalLabelIndexes({
      dataLength: 10,
      useMinimalLabels: false,
    });

    expect(labels).toStrictEqual({minimalLabelIndexes: null});
  });

  it('returns null when the data length is less than 2', () => {
    const labels = useMinimalLabelIndexes({
      dataLength: 2,
      useMinimalLabels: false,
    });

    expect(labels).toStrictEqual({minimalLabelIndexes: null});
  });

  it('returns the first and last indexes when the dataLength is even and less than 10', () => {
    const labels = useMinimalLabelIndexes({
      dataLength: 8,
      useMinimalLabels: true,
    });

    expect(labels).toStrictEqual({minimalLabelIndexes: [0, 7]});
  });

  it('includes a middle index when the dataLength is odd and less than 10', () => {
    const labels = useMinimalLabelIndexes({
      dataLength: 9,
      useMinimalLabels: true,
    });

    expect(labels).toStrictEqual({minimalLabelIndexes: [0, 4, 8]});
  });

  it('includes a middle index when the dataLength is even and more than 10', () => {
    const labels = useMinimalLabelIndexes({
      dataLength: 12,
      useMinimalLabels: true,
    });

    expect(labels).toStrictEqual({minimalLabelIndexes: [0, 6, 11]});
  });
});
