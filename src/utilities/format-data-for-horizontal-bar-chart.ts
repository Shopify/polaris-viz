import type {DataSeries} from '../types';

// The format between MultiSeriesBarChart and HorizontalBarChart
// is a little bit different. Until we can take the time
// to change how HorizontalBarChart renders the bars,
// we're going to alter the format into what HorizontalBarChart
// expects.
export function formatDataForHorizontalBarChart(
  series: DataSeries[],
): DataSeries[] {
  const roots: DataSeries[] = [];

  series.forEach(({name, data}) => {
    data.forEach(({key, value}, index) => {
      if (!roots[index]) {
        roots.push({
          name: `${key}`,
          data: [
            {
              key: `${name}`,
              value,
            },
          ],
        });
      } else {
        roots[index].data.push({
          key: `${name}`,
          value,
        });
      }
    });
  });

  return roots;
}
