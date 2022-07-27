export const flatMap = <T>(arr: T[], fn: (...args: any) => any): T[] => {
  return arr.map(fn).reduce((previous, current) => previous.concat(current));
};
