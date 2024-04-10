import {Fragment} from 'react';
import {LINE_HEIGHT, useChartContext} from '@shopify/polaris-viz-core';

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
  fontWeight?: number;
  id?: string;
  textAnchor?: 'left' | 'center' | 'right';
}

export function SingleTextLine({
  ariaHidden = false,
  color,
  dominantBaseline = 'hanging',
  fontWeight = 300,
  id,
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
        dominantBaseline={dominantBaseline}
        fill={color}
        fontSize={FONT_SIZE}
        fontWeight={fontWeight}
        height={LINE_HEIGHT}
        id={id}
        textAnchor={textAnchor}
        width={targetWidth}
        x={x}
        y={y}
      >
        {truncated}
      </text>
      <title>{text}</title>
    </Fragment>
  );
}
