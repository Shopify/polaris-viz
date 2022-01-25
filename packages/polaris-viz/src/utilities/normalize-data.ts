interface Data {
  [k: string]: any;
}

// Inspired by https://github.com/paularmstrong/normalizr
// Converts an array of data with IDs to an object with IDs as the keys
// This allows us to do O(1) lookups instead of using something like array.find() to do O(n)
export function normalizeData(data: Data[], key: string) {
  const normalizedData: Data = {};
  data.forEach((item) => {
    const keyName = item[key];
    normalizedData[keyName] = item;
  });
  return normalizedData;
}
