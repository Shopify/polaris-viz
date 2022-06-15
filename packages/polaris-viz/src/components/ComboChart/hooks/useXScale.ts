import {useMemo} from 'react';
import {scaleLinear} from 'd3-scale';
import type {DataGroup, XAxisOptions} from '@shopify/polaris-viz-core';

import {useGetLabelsFromDataGroups} from './useGetLabelsFromDataGroups';

interface Props {
  drawableWidth: number;
  data: DataGroup[];
  xAxisOptions: Required<XAxisOptions>;
}

export function useXScale({drawableWidth, data, xAxisOptions}: Props) {
  const labels = useGetLabelsFromDataGroups({data, xAxisOptions});
  const labelsLength = labels.length;

  const xScale = useMemo(() => {
    return scaleLinear().range([0, drawableWidth]).domain([0, labelsLength]);
  }, [drawableWidth, labelsLength]);

  return {xScale, labels};
}
