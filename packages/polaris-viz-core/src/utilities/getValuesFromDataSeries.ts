import type {DataSeries} from '../types';

export function getValuesFromDataSeries(data: DataSeries[], labels: string[]) {
  return labels.map((_, index) => {
    return data
      .map((type) => type.data[index].value)
      .filter((value) => value !== null) as number[];
  });
}
