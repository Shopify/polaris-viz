import type {AccessibilitySeries} from '../types';

export function formatAriaLabel(series: AccessibilitySeries) {
  return `${series.title}: ${series.data.map(
    ({label, value}) => `${label} ${value}`,
  )}`;
}
