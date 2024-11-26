import {useLayoutEffect, useState, useRef} from 'react';
import {createPortal} from 'react-dom';

import type {CellGroup} from '../types';
import {useRootContainer} from '../../../hooks/useRootContainer';
import {TOOLTIP_ID} from '../../../constants';

import styles from './Tooltip.scss';

interface TooltipProps {
  x: number;
  y: number;
  group: CellGroup | null;
}

export function Tooltip({x, y, group}: TooltipProps) {
  const container = useRootContainer(TOOLTIP_ID);

  const [actionsButtonsColumns, setActionsButtonsColumns] = useState(1);
  const actionsContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (group?.actions?.length && actionsContainerRef.current) {
      // This is a workaround to determine if the buttons should be displayed in one or two columns depending if the copy fits in one line
      const buttonsWrapper = actionsContainerRef.current;
      const actionsButtons = buttonsWrapper.querySelectorAll('a span');

      const heights: Set<number> = new Set();
      let areWrapping = false;
      for (const button of actionsButtons) {
        const wrapping =
          parseFloat(window.getComputedStyle(button).height) /
            parseFloat(window.getComputedStyle(button).lineHeight) >
          1;
        if (wrapping) {
          areWrapping = true;
        }
        heights.add(button.getBoundingClientRect().height);
      }

      const haveSameHeight = heights.size === 1;
      setActionsButtonsColumns(haveSameHeight && !areWrapping ? 2 : 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group?.actions, actionsContainerRef.current]);

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
      onClick={(event) => {
        event.stopPropagation();
      }}
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
        {group.actions?.length && (
          <div className={styles.TooltipActions} ref={actionsContainerRef}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${actionsButtonsColumns}, 1fr)`,
                gap: 8,
              }}
            >
              {group.actions?.map((action, index) => {
                const numActions = group.actions?.length || 0;
                const oddNumActions = numActions % 2 !== 0;
                const lastAction = index === numActions - 1;
                const spanFullWidth = oddNumActions && lastAction;
                return (
                  <div
                    key={`action-${index}`}
                    style={{
                      gridColumn: spanFullWidth ? 'span 2' : 'span 1',
                    }}
                  >
                    <a
                      className={styles.TooltipAction}
                      href={action.url}
                      target={action.target}
                    >
                      <span>{action.children}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>,
    container,
  );
}
