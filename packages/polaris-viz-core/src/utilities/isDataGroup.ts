import type {DataGroup} from '../types';

export function isDataGroup(object: any): object is DataGroup {
  return (
    Object.prototype.hasOwnProperty.call(object, 'shape') &&
    Object.prototype.hasOwnProperty.call(object, 'series')
  );
}

export function isDataGroupArray(array: any[]): array is DataGroup[] {
  if (array.length > 0) {
    const [group] = array;
    return isDataGroup(group);
  }
  return false;
}
