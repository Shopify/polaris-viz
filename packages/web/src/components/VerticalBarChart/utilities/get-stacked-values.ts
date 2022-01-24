import {stack, stackOffsetDiverging} from 'd3-shape';

import type {DataSeries} from '../../../types';

export function getStackedValues(series: DataSeries[], labels: string[]) {
  const barStack = stack()
    .offset(stackOffsetDiverging)
    .keys(series.map(({name}) => name ?? ''));

  const formattedData = labels.map((_, labelIndex) =>
    series.reduce((acc, {name, data}) => {
      const indexData = data[labelIndex];
      const namedData = {
        [name ?? '']: indexData.value == null ? 0 : indexData.value,
      };

      return Object.assign(acc, namedData);
    }, {}),
  );

  const stackedValues = barStack(formattedData);

  return stackedValues;
}
