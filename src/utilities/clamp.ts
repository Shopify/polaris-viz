export function clamp({
  amount,
  min,
  max,
}: {
  amount: number;
  min: number;
  max: number;
}) {
  return Math.min(Math.max(amount, min), max);
}
