import React from 'react';

import {useTheme} from '../../../hooks';
import {FONT_SIZE} from '../../../constants';
import type {FormattedLine} from '../types';

interface LineProps {
  index: number;
  line: FormattedLine[];
  theme?: string;
}

export function Line({index, line, theme}: LineProps) {
  const selectedTheme = useTheme(theme);

  return (
    <React.Fragment>
      {line.map(
        (
          {
            dominantBaseline,
            height,
            fullText,
            truncatedText,
            textAnchor,
            transform,
            width,
            x,
            y,
          },
          textIndex,
        ) => {
          return (
            <React.Fragment key={index + textIndex}>
              <text
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                height={height}
                width={width}
                x={x}
                y={y}
                fill={selectedTheme.xAxis.labelColor}
                fontSize={FONT_SIZE}
                transform={transform}
              >
                {truncatedText}
              </text>
              <title>{fullText}</title>
              {/* <rect
                width={width}
                height={height}
                fill="rgba(0,0,255,0.5)"
                transform={transform}
              /> */}
            </React.Fragment>
          );
        },
      )}
    </React.Fragment>
  );
}
