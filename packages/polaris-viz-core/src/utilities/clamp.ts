export function clamp({
  amount,
  min,
  max,
}: {
  amount: number;
  min: number;
  max?: number;
}) {
  if (amount < min) {
    return min;
  }

  if (max != null && amount > max) {
    return max;
  }

  return amount;
}
