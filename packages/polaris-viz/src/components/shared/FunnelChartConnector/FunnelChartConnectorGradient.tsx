import {LinearGradientWithStops} from '@shopify/polaris-viz-core';

import {
  FUNNEL_CHART_CONNECTOR_GRADIENT_ID,
  FUNNEL_CHART_CONNECTOR_GRADIENT,
} from './constants';

export function FunnelChartConnectorGradient() {
  return (
    <LinearGradientWithStops
      gradient={FUNNEL_CHART_CONNECTOR_GRADIENT}
      id={FUNNEL_CHART_CONNECTOR_GRADIENT_ID}
      x1="100%"
      x2="0%"
      y1="0%"
      y2="0%"
    />
  );
}
