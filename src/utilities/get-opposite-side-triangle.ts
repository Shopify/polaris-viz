// uses Pythagorean Theorem to get the missing side of right angle triangle
export function getOppositeSideOfTriangle({
  sideC,
  sideA,
}: {
  sideC: number;
  sideA: number;
}) {
  const sideB = Math.sqrt(sideC ** 2 - sideA ** 2);
  return sideB;
}
