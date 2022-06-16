export function getOpacityByDataLength(dataLength: number) {
  if (dataLength <= 4) {
    return 0.25;
  }

  if (dataLength <= 7) {
    return 0.1;
  }

  return 0;
}
