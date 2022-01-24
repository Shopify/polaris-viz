import {normalizeData} from '../normalize-data';

describe('normalizeData', () => {
  it('returns a normalized object', () => {
    const annotationsData = [
      {
        dataIndex: 1,
        width: 5,
        color: '#ccc',
      },
      {
        dataIndex: 2,
        width: 5,
        color: '#ccc',
      },
    ];
    const expectedResult = {
      '1': {
        color: '#ccc',
        dataIndex: 1,
        width: 5,
      },
      '2': {
        color: '#ccc',
        dataIndex: 2,
        width: 5,
      },
    };
    const result = normalizeData(annotationsData, 'dataIndex');
    expect(result).toMatchObject(expectedResult);
  });

  it('expects the data to use a unique key and returns the last provided object if two objects have the same key', () => {
    const annotationsData = [
      {
        dataIndex: 1,
        width: 5,
        color: '#ccc',
      },
      {
        dataIndex: 1,
        width: 10,
        color: '#000',
      },
    ];
    const expectedResult = {
      '1': {
        dataIndex: 1,
        width: 10,
        color: '#000',
      },
    };
    const result = normalizeData(annotationsData, 'dataIndex');
    expect(result).toMatchObject(expectedResult);
  });

  describe('empty state', () => {
    it('returns an empty object when no data is provided', () => {
      const annotationsData = [] as any;
      const expectedResult = {};
      const result = normalizeData(annotationsData, 'dataIndex');
      expect(result).toMatchObject(expectedResult);
    });

    it('returns an empty object when key does not match', () => {
      const annotationsData = [
        {
          dataIndex: 1,
          width: 5,
          color: '#ccc',
        },
      ];
      const expectedResult = {};
      const keyName = 'keyDoesNotExist';
      const result = normalizeData(annotationsData, keyName);
      expect(result).toMatchObject(expectedResult);
    });
  });
});
