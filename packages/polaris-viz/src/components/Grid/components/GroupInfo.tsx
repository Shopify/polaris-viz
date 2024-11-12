import React, {useCallback} from 'react';
import {useChartContext} from '@shopify/polaris-viz-core';

import {truncateText} from '../utilities/truncate-text';
import {
  LABEL_FONT_SIZE,
  GROUP_NAME_WIDTH_MULTIPLIER,
  TEXT_Y_OFFSET_WITH_SECONDARY,
  VALUES_DIVIDER,
  TRUNCATE_WIDTH_MULTIPLIER,
} from '../utilities/constants';

interface GroupInfoProps {
  groupX: number;
  groupY: number;
  group: {
    name: string;
  };
  groupWidth: number;
  groupHeight: number;
  getColors: (group: any) => {textColor: string};
  opacity: number;
  mainFontSize: number;
  groupValue: string;
  showNameAndSecondaryValue: boolean;
  secondaryFontSize: number;
  groupSecondaryValue: string;
  groupNameOffset: number;
  dimensions: {width: number; height: number};
}

export const GroupInfo: React.FC<GroupInfoProps> = ({
  groupX,
  groupY,
  group,
  groupWidth,
  groupHeight,
  getColors,
  opacity,
  mainFontSize,
  groupValue,
  showNameAndSecondaryValue,
  secondaryFontSize,
  groupSecondaryValue,
  groupNameOffset,
  dimensions,
}) => {
  const {characterWidths} = useChartContext();

  const getTruncatedText = useCallback(
    (text: string, availableWidth: number) => {
      let fullWidth = availableWidth;
      if (dimensions?.width < 800) {
        fullWidth = availableWidth / TRUNCATE_WIDTH_MULTIPLIER;
      }
      return truncateText(text, fullWidth, characterWidths);
    },
    [characterWidths, dimensions],
  );

  const valueAndSecondaryValue = showNameAndSecondaryValue
    ? `${groupValue}${VALUES_DIVIDER}${groupSecondaryValue}`
    : groupValue;
  const truncatedValueAndSecondaryValue = getTruncatedText(
    valueAndSecondaryValue,
    groupWidth,
  );
  const truncatedValue =
    truncatedValueAndSecondaryValue.split(VALUES_DIVIDER)[0];
  const truncatedSecondaryValue =
    truncatedValueAndSecondaryValue.split(VALUES_DIVIDER)[1];

  const truncatedGroupName = showNameAndSecondaryValue
    ? getTruncatedText(group.name, groupWidth * GROUP_NAME_WIDTH_MULTIPLIER)
    : '';

  const textYOffset = showNameAndSecondaryValue
    ? TEXT_Y_OFFSET_WITH_SECONDARY
    : 0;

  return (
    <React.Fragment>
      <text
        x={groupX + groupWidth / 2}
        y={groupY + groupHeight / 2 + textYOffset}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={getColors(group).textColor}
        opacity={opacity}
      >
        <tspan fontWeight={600} fontSize={`${mainFontSize}px`}>
          {truncatedValue}
        </tspan>
        {showNameAndSecondaryValue && (
          <tspan dx="0.5em" fontSize={`${secondaryFontSize}px`}>
            {truncatedSecondaryValue}
          </tspan>
        )}
      </text>

      {showNameAndSecondaryValue && (
        <text
          x={groupX + groupNameOffset}
          y={groupY + groupNameOffset}
          textAnchor="start"
          dominantBaseline="hanging"
          fontSize={LABEL_FONT_SIZE}
          fill={getColors(group).textColor}
          opacity={opacity}
        >
          {truncatedGroupName}
        </text>
      )}
    </React.Fragment>
  );
};
