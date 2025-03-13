import type {AriaRole, Dispatch, ReactNode, SetStateAction} from 'react';
import {XMLNS} from '@shopify/polaris-viz-core';

import {getTooltipDataAttr} from '../TooltipWrapper';

import styles from './ChartElements.scss';

interface ChartSVGProps {
  children: ReactNode;
  height: number;
  width: number;
  setRef?: Dispatch<SetStateAction<SVGSVGElement | null>>;
  role?: AriaRole;
  emptyStateText?: string;
  emptyState?: boolean;
}

export function ChartSVG({
  width,
  setRef,
  role = 'list',
  height,
  emptyStateText,
  emptyState = false,
  children,
}: ChartSVGProps) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns={XMLNS}
      width={width}
      height={height}
      className={styles.SVG}
      role={emptyState ? 'img' : role}
      aria-label={emptyState ? emptyStateText : undefined}
      ref={setRef}
    >
      <rect
        height={height}
        width={width}
        {...getTooltipDataAttr({
          index: -1,
        })}
      />
      {children}
    </svg>
  );
}
