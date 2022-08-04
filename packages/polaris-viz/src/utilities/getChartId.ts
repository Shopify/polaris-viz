export function getChartId(id: string | null) {
  return `chart_${id ?? ''}`;
}
