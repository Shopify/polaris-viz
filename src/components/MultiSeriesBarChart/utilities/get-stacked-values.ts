import {stack, stackOffsetDiverging} from 'd3-shape';

import type {Data} from '../types';

export function getStackedValues(series: Data[], labels: string[]) {
  const barStack = stack()
    .offset(stackOffsetDiverging)
    .keys(series.map(({label}) => label));

  const formattedData = labels.map((_, labelIndex) =>
    series.reduce((acc, {label, data}) => {
      const indexData = data[labelIndex];
      const newObject = {[label]: indexData == null ? 0 : indexData};

      return Object.assign(acc, newObject);
    }, {}),
  );

  const stackedValues = barStack(formattedData);

  return stackedValues;
}
