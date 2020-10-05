import React, {useMemo} from 'react';
import {ScaleLinear} from 'd3-scale';
import {colorSky, spacingLoose} from '@shopify/polaris-tokens';

import {getTextWidth} from '../../utilities';
import {
  SPACING_TIGHT,
  SMALL_WIDTH,
  MIN_LABEL_SPACE,
  TICK_SIZE,
  FONT_SIZE,
} from '../../constants';

import styles from './LinearXAxis.scss';

interface Props {
  xScale: ScaleLinear<number, number>;
  labels?: string[];
  dimensions: DOMRect;
  drawableHeight: number;
  axisMargin: number;
}

function getTextXTransform({
  index,
  value,
  xOffset,
  axisMargin,
  xScaleMax,
}: {
  index: number;
  value: string;
  xOffset: number;
  axisMargin: number;
  xScaleMax: number;
}) {
  const textHalfWidth = getTextWidth({text: value, fontSize: FONT_SIZE}) / 2;
  const firstLabel = index === 0;

  if (firstLabel) {
    const overflowingFirstLabel = textHalfWidth + SPACING_TIGHT > axisMargin;
    return overflowingFirstLabel
      ? textHalfWidth - axisMargin + SPACING_TIGHT
      : 0;
  } else {
    const textEndPoint = xOffset + textHalfWidth;
    const overflowingLabel = textEndPoint > xScaleMax;
    return overflowingLabel
      ? (textEndPoint - xScaleMax + SPACING_TIGHT) * -1
      : 0;
  }
}

function Axis({xScale, drawableHeight, dimensions, labels, axisMargin}: Props) {
  const ticks = useMemo(() => {
    if (labels == null) {
      return [];
    }
    const labelsWidths = labels.map((label) =>
      getTextWidth({fontSize: FONT_SIZE, text: label}),
    );
    const longestLabelWidth = Math.max(...labelsWidths);
    const maxLabelSpace = Math.max(longestLabelWidth * 2.5, MIN_LABEL_SPACE);
    const maxTicks = Math.max(1, Math.floor(dimensions.width / maxLabelSpace));
    const idealNumberOfTicks = Math.min(labels.length - 1, maxTicks);
    const generatedTicks = xScale.ticks(idealNumberOfTicks);

    if (
      generatedTicks.length > idealNumberOfTicks &&
      dimensions.width < SMALL_WIDTH
    ) {
      generatedTicks.pop();
    }

    return generatedTicks.map((value) => {
      return {
        value: labels[value],
        xOffset: xScale(value),
      };
    });
  }, [labels, dimensions, xScale]);

  const [xScaleMin, xScaleMax] = xScale.range();

  return (
    <React.Fragment>
      <path
        d={`M ${xScaleMin} ${TICK_SIZE} v ${-TICK_SIZE} H ${xScaleMax} v ${TICK_SIZE}`}
        fill="none"
        stroke={colorSky}
      />

      {ticks.map(({value, xOffset}, index) => {
        if (value == null) {
          return null;
        }

        const textXTransform = getTextXTransform({
          index,
          value,
          xOffset,
          axisMargin,
          xScaleMax,
        });

        return (
          <g key={`${value}-${index}`} transform={`translate(${xOffset}, 0)`}>
            <line y2={TICK_SIZE} stroke={colorSky} />
            <line
              y1="0"
              y2={-drawableHeight}
              stroke={colorSky}
              strokeDasharray="3 2"
            />
            <text
              className={styles.Text}
              style={{
                fontSize: `${FONT_SIZE}px`,
                textAnchor: 'middle',
                transform: `translate(${textXTransform}px, ${spacingLoose})`,
              }}
            >
              {value}
            </text>
          </g>
        );
      })}
    </React.Fragment>
  );
}

export const LinearXAxis = React.memo(Axis);
