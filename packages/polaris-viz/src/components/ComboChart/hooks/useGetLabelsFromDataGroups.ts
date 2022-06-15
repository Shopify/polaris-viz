import type {DataGroup, XAxisOptions} from '@shopify/polaris-viz-core';
import isEqual from 'fast-deep-equal';

import {useXAxisLabels} from '../../../hooks/useXAxisLabels';

export interface Props {
  data: DataGroup[];
  xAxisOptions: Required<XAxisOptions>;
}

export function useGetLabelsFromDataGroups({data, xAxisOptions}: Props) {
  const firstLabels = useXAxisLabels({
    data: data[0].series,
    xAxisOptions,
  });

  const secondLabels = useXAxisLabels({
    data: data[1].series,
    xAxisOptions,
  });

  if (isEqual(firstLabels, secondLabels)) {
    return firstLabels;
  }

  const firstKeysMatch = firstLabels[0] === secondLabels[0];
  const lengthsMatch = firstLabels.length !== secondLabels.length;

  if (lengthsMatch) {
    if (firstKeysMatch) {
      return firstLabels.length > secondLabels.length
        ? firstLabels
        : secondLabels;
    }

    // eslint-disable-next-line no-console
    console.warn(
      'Data groups do not have matching keys. Labels will not be rendered',
    );

    return [];
  } else {
    return firstKeysMatch ? firstLabels : [];
  }
}
