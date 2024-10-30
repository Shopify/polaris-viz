import {useEffect, useRef} from 'react';

import {TOOLTIP_WIDTH, TOOLTIP_PADDING} from '../utilities/constants';

import styles from './Tooltip.scss';

interface TooltipProps {
  groupName: string;
  groupDescription: string;
  groupGoal: string;
  x: number;
  y: number;
  tooltipHeight: number;
  setTooltipHeight: (height: number) => void;
}

export function Tooltip({
  groupName,
  groupDescription,
  groupGoal,
  x,
  y,
  tooltipHeight,
  setTooltipHeight,
}: TooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tooltipRef.current) {
      const {height} = tooltipRef.current.getBoundingClientRect();
      const newTooltipHeight = height + TOOLTIP_PADDING * 2;
      setTooltipHeight(newTooltipHeight);
    }
  }, [setTooltipHeight]);

  if (!groupName) return null;

  return (
    <g className={styles.TooltipContainer} transform={`translate(${x}, ${y})`}>
      <foreignObject x={0} y={0} width={TOOLTIP_WIDTH} height={tooltipHeight}>
        <div ref={tooltipRef}>
          <div className={styles.Tooltip}>
            <div className={styles.TooltipTitle}>{groupName}</div>
            {groupDescription && (
              <div className={styles.TooltipDescription}>
                {groupDescription}
              </div>
            )}
            {groupGoal && (
              <div className={styles.TooltipGoal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  style={{height: '13px', width: '20px'}}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
                <p className={styles.GroupGoal}>{groupGoal}</p>
              </div>
            )}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}
