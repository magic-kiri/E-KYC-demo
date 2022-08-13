export function monthDifference(startDate: Date, endDate: Date): number {
  var months;
  months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();
  return months <= 0 ? 0 : months;
}

function sigmoid(A: number, D: number, x: number) {
  return A / (1 + Math.pow(Math.E, -D * x));
}

function convertUnboundToBound(reputation: number) {
  const amplitude = 100;
  const D = 0.001;
  return sigmoid(amplitude, D, reputation);
}

export function evaluateReputation(
  transactionScore: number,
  loanScore: number,
  age: number = 1
): number {
  let score = age * (transactionScore + loanScore);
  // score = score <= 0 ? 1 : score;
  return convertUnboundToBound(score);
}
