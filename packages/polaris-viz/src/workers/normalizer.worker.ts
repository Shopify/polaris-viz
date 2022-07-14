interface Data {
  [k: string]: any;
}

export function normalize(data: Data, key: string) {
  const normalizedData = {};
  data.forEach((item) => {
    const keyName = item[key];
    normalizedData[keyName] = item;
  });
  return normalizedData;
}
