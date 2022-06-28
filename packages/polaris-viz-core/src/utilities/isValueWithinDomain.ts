export function isValueWithinDomain(value: number, domain: number[]) {
  return value >= Math.min(...domain) && value <= Math.max(...domain);
}
