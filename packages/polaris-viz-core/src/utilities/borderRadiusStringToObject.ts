import type {BorderRadius} from '../types';

const isValidNumber = (value: string | number | null) => {
  if (value === 0) return true;
  return value != null;
};

export const borderRadiusStringToObject = (
  borderRadiusString: string,
): BorderRadius => {
  const numberPattern = /\d+/g;

  const [topLeft, topRight, bottomRight, bottomLeft] =
    borderRadiusString
      .match(numberPattern)
      ?.map((corner) => (isValidNumber(corner) ? corner : null)) || [];

  const hasValidRight = isValidNumber(topRight);

  const alternateLeft = hasValidRight ? topRight : topLeft;

  return {
    topLeft: Number(topLeft),
    topRight: Number(hasValidRight ? topRight : topLeft),
    bottomRight: Number(isValidNumber(bottomRight) ? bottomRight : topLeft),
    bottomLeft: Number(isValidNumber(bottomLeft) ? bottomLeft : alternateLeft),
  };
};
