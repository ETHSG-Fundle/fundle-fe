export const toUSDString = (
  originalBigInt: BigInt,
  offsetDecimals: number = 6
): string => {
  return String(
    (Number(originalBigInt) / Math.pow(10, offsetDecimals)).toFixed(2)
  );
};

export const reduceDecimals = (
  originalBigInt: BigInt,
  offsetDecimals: number = 6
): number => {
  return Number(originalBigInt) / Math.pow(10, offsetDecimals);
};
