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
  ariaHidden?: boolean;
  dominantBaseline?: 'middle' | 'hanging';
  fontSize?: number;
  fontWeight?: number;
  textAnchor?: 'left' | 'center' | 'right';
  willTruncate?: boolean;
  x?: number;
  y?: number;
}

export function SingleTextLine({
  ariaHidden = false,
  color,
  dominantBaseline = 'hanging',
  fontSize = FONT_SIZE,
  fontWeight = 300,
  targetWidth,
  text,
  textAnchor = 'center',
  y = 0,
  x = 0,
  willTruncate = true,
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
        fontWeight={fontWeight}
        fontFamily={FONT_FAMILY}
        y={y}
        x={x}
      >
        {truncated}
      </text>
      {willTruncate && <title>{text}</title>}
    </Fragment>
  );
}
