import type {AccessibilitySeries} from 'components/MultiSeriesBarChart/types';

export function formatAriaLabel(series: AccessibilitySeries) {
  return `${series.title}: ${series.data.map(
    ({label, value}) => `${label} ${value}`,
  )}`;
}
