import {createPortal} from 'react-dom';
import {FONT_SIZE, useChartContext} from '@shopify/polaris-viz-core';

import {useHideTooltipWhenMounted} from '../../../../../../hooks/useHideTooltipWhenMounted';
import {getChartId} from '../../../../../../utilities/getChartId';

import styles from './DescriptionPopover.scss';

export interface DescriptionPopoverProps {
  description: string;
  label: string;
  onMouseLeave: () => void;
  x: number;
  y: number;
  yOffset: number;
}

export function DescriptionPopover({
  description,
  label,
  onMouseLeave,
  x,
  y,
  yOffset,
}: DescriptionPopoverProps) {
  const {id} = useChartContext();
  const chartId = getChartId(id);

  useHideTooltipWhenMounted();

  return createPortal(
    <div
      className={styles.Wrapper}
      style={{
        top: y,
        left: x,
        paddingTop: yOffset,
      }}
      onMouseLeave={onMouseLeave}
      data-block-tooltip-events
    >
      <div
        aria-label={label}
        className={styles.Container}
        role="dialog"
        style={{fontSize: FONT_SIZE}}
      >
        {description}
      </div>
    </div>,
    document.getElementById(chartId) ?? document.body,
  );
}
