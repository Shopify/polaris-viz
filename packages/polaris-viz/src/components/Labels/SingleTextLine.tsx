import {Fragment} from 'react';
import {
  FONT_FAMILY,
  LINE_HEIGHT,
  useChartContext,
} from '@shopify/polaris-viz-core';

import {endLineTruncate} from './utilities/endLineTruncate';

interface SingleTextLineProps {
  color: string;
  fontSize: number;
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
  fontSize,
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
        fontSize={fontSize}
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
