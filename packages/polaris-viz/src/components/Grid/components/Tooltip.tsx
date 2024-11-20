import {createPortal} from 'react-dom';

import type {CellGroup} from '../types';
import {useRootContainer} from '../../../hooks/useRootContainer';
import {TOOLTIP_ID} from '../../../constants';

import styles from './Tooltip.scss';

const TOOLTIP_ID = 'polaris_viz_tooltip_root';

interface TooltipProps {
  x: number;
  y: number;
  group: CellGroup | null;
}

export function Tooltip({x, y, group}: TooltipProps) {
  const container = useRootContainer(TOOLTIP_ID);

  if (!group) {
    return null;
  }

  return createPortal(
    <div
      className={styles.TooltipContainer}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      aria-label={group.name}
    >
      <div className={styles.Tooltip}>
        <div className={styles.TooltipTitle}>{group.name}</div>
        {group.metricInformation && (
          <div className={styles.TooltipMetricInformation}>
            {group.metricInformation}
          </div>
        )}
        {group.description && (
          <div className={styles.TooltipDescription}>{group.description}</div>
        )}
        {group.goal && (
          <div className={styles.TooltipGoal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className={styles.TooltipIcon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
            <p className={styles.GroupGoal}>{group.goal}</p>
          </div>
        )}
      </div>
    </div>,
    container,
  );
}
