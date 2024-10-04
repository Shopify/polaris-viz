export function calculateDropOff(value: number, nextValue: number) {
  return ((nextValue - value) / value) * 100;
}
