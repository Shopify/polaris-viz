import {stack, stackOffsetDiverging} from 'd3-shape';

import type {Series} from 'components/MultiSeriesBarChart/types';

export function getStackedValues(series: Series[], labels: string[]) {
  const barStack = stack()
    .offset(stackOffsetDiverging)
    .keys(series.map(({name}) => name));

  const formattedData = labels.map((_, labelIndex) =>
    series.reduce((acc, {name, data}) => {
      const indexData = data[labelIndex];
      const namedData = {
        [name]: indexData.rawValue == null ? 0 : indexData.rawValue,
      };

      return Object.assign(acc, namedData);
    }, {}),
  );

  const stackedValues = barStack(formattedData);

  return stackedValues;
}
