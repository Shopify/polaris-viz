export function getBarId(id: string, groupIndex: number, seriesIndex: number) {
  return `${id}-series-${groupIndex}-${seriesIndex}`;
}
