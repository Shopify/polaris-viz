// uses Pythagorean Theorem to get the missing side of the triangle
export function getMissingSideOfTriangle({
  side1,
  side2,
}: {
  side1: number;
  side2: number;
}) {
  const side3 = Math.sqrt(side1 ** 2 - side2 ** 2);
  return side3;
}
