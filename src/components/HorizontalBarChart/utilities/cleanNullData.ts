import type {Data, NullableData} from '../types';

export function cleanNullData(data: NullableData[]): Data[] {
  return data.filter(Boolean).map((value) => value) as Data[];
}
