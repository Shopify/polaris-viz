export const uniqueId = (() => {
  let num = 0;
  return (prefix: string) => {
    num++;
    return `${prefix}-${num}`;
  };
})();
