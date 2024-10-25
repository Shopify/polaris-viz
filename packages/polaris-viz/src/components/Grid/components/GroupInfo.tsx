import {Fragment} from 'react';

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
}

export const GroupInfo = ({
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
}: GroupInfoProps) => {
  return (
    <Fragment>
      <text
        x={groupX + groupWidth / 2}
        y={groupY + groupHeight / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={getColors(group).textColor}
        opacity={opacity}
      >
        <tspan fontWeight={600} fontSize={`${mainFontSize}px`}>
          {groupValue}
        </tspan>
        {showNameAndSecondaryValue && (
          <tspan dx="0.5em" fontSize={`${secondaryFontSize}px`}>
            {groupSecondaryValue}
          </tspan>
        )}
      </text>

      {showNameAndSecondaryValue && (
        <text
          x={groupX + groupNameOffset}
          y={groupY + groupNameOffset}
          textAnchor="start"
          dominantBaseline="hanging"
          fontSize="11"
          fill={getColors(group).textColor}
          opacity={opacity}
        >
          {group.name}
        </text>
      )}
    </Fragment>
  );
};
