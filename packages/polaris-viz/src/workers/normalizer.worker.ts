import {normalizeData} from '../utilities';

export function normalize(data, key) {
  // const start = Date.now();
  // let count = 0;
  // while (Date.now() - start < time) count++;
  // return count;
  // return normalize(data, key);
  const normalizedData = {};
  data.forEach((item) => {
    const keyName = item[key];
    normalizedData[keyName] = item;
  });
  return normalizedData;
}
