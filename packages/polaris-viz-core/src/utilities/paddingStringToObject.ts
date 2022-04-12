const isValidNumber = (value: string | number | null) => {
  if (value === 0) return true;
  return value != null;
};

export const paddingStringToObject = (paddingString: string) => {
  const numberPattern = /\d+/g;

  const [top, right, bottom, left] =
    paddingString
      .match(numberPattern)
      ?.map((paddingSide) =>
        isValidNumber(paddingSide) ? paddingSide : null,
      ) || [];

  const hasValidRight = isValidNumber(right);

  const alternateLeft = hasValidRight ? right : top;

  return {
    paddingTop: Number(top),
    paddingRight: Number(hasValidRight ? right : top),
    paddingBottom: Number(isValidNumber(bottom) ? bottom : top),
    paddingLeft: Number(isValidNumber(left) ? left : alternateLeft),
  };
};
