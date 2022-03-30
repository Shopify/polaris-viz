export function getClosestDivisibleNumber(number: number, divisibleBy: number) {
  const quotient = parseInt(`${number / divisibleBy}`, 10);

  // 1st possible closest number
  const n1 = divisibleBy * quotient;

  // 2nd possible closest number
  const n2 =
    number * divisibleBy > 0
      ? divisibleBy * (quotient + 1)
      : divisibleBy * (quotient - 1);

  if (Math.abs(number - n1) < Math.abs(number - n2)) {
    return n1;
  }

  return n2;
}
