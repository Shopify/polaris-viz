import {DEFAULT_THEME_NAME, useChartContext} from '@shopify/polaris-viz-core';
import type {ReactNode} from 'react';
import {Fragment} from 'react';

import {TooltipContentContainer} from '../../../components/TooltipContent';

import {FunnelTooltip} from './FunnelTooltip';
import {TooltipWithPortal} from './TooltipWithPortal';

const TOOLTIP_VERTICAL_OFFSET = 65;

interface ScaleIconTooltipProps {
  renderScaleIconTooltipContent: () => ReactNode;
}

export function ScaleIconTooltip({
  renderScaleIconTooltipContent,
}: ScaleIconTooltipProps) {
  const {containerBounds} = useChartContext();
  const {x, y} = containerBounds ?? {
    x: 0,
    y: 0,
  };

  return (
    <TooltipWithPortal>
      <FunnelTooltip x={x} y={y - TOOLTIP_VERTICAL_OFFSET}>
        <TooltipContentContainer
          maxWidth={200}
          theme={DEFAULT_THEME_NAME}
          color="white"
        >
          {() => <Fragment>{renderScaleIconTooltipContent()}</Fragment>}
        </TooltipContentContainer>
      </FunnelTooltip>
    </TooltipWithPortal>
  );
}
