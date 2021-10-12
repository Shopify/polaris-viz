import type {Series} from '../types';
import type {Series as MSBCSeries} from '../../MultiSeriesBarChart';

export function formatDataFromMultiseries(series: MSBCSeries[]): Series[] {
  const roots: Series[] = [];

  series.forEach(({name, data}) => {
    data.forEach(({label, rawValue}, index) => {
      if (!roots[index]) {
        roots.push({
          name: label,
          data: [
            {
              label: name,
              rawValue,
            },
          ],
        });
      } else {
        roots[index].data.push({
          label: name,
          rawValue,
        });
      }
    });
  });

  return roots;
}
