export const toUSDString = (
  originalBigInt: BigInt,
  offsetDecimals: number = 6
): string => {
  const updatedNumber = Number(originalBigInt) / Math.pow(10, offsetDecimals);
  return isNaN(updatedNumber) ? "0" : updatedNumber.toFixed(2);
};

export const reduceDecimals = (
  originalBigInt: BigInt,
  offsetDecimals: number = 6
): number => {
  const updatedNumber = Number(originalBigInt) / Math.pow(10, offsetDecimals);
  return isNaN(updatedNumber) ? 0 : updatedNumber;
};
