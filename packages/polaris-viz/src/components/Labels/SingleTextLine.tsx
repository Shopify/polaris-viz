import {Fragment} from 'react';
import {
  FONT_FAMILY,
  LINE_HEIGHT,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {FONT_SIZE} from '../../constants';

import {endLineTruncate} from './utilities/endLineTruncate';

interface SingleTextLineProps {
  color: string;
  targetWidth: number;
  text: string;
  x: number;
  y: number;
  ariaHidden?: boolean;
  dominantBaseline?: 'middle' | 'hanging';
  textAnchor?: 'left' | 'center' | 'right';
}

export function SingleTextLine({
  ariaHidden = false,
  color,
  dominantBaseline = 'hanging',
  targetWidth,
  text,
  textAnchor = 'center',
  y,
  x,
}: SingleTextLineProps) {
  const {characterWidths} = useChartContext();

  const truncated = endLineTruncate({
    label: text,
    targetWidth,
    targetHeight: LINE_HEIGHT,
    characterWidths,
  });

  return (
    <Fragment>
      <text
        aria-hidden={ariaHidden}
        textAnchor={textAnchor}
        dominantBaseline={dominantBaseline}
        height={LINE_HEIGHT}
        width={targetWidth}
        fill={color}
        fontSize={FONT_SIZE}
        fontFamily={FONT_FAMILY}
        y={y}
        x={x}
      >
        {truncated}
      </text>
      <title>{text}</title>
    </Fragment>
  );
}
