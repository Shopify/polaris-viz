export function groupNumbersIntoRuns(indexes) {
  const runs: number[][] = [];
  let current: number[] = [];

  indexes.forEach((value, index) => {
    if (index === 0 || value - indexes[index - 1] === 1) {
      current.push(value);
    } else {
      runs.push(current);
      current = [value];
    }
  });

  runs.push(current);

  return runs;
}
