import { getAllMoneyTransaction, getLoanData, getPreviousScore } from "./Data";
import { evaluateLoanScore } from "./loanScoreCalculation";
import { evaluateTransactionScore } from "./transactionScoreCalculation";

// const { evaluateTransactionScore } = require("./transactionScoreCalculation");
// const { getAllMoneyTransaction, getPreviousScore } = require("./Data");

function evaluateReputation(
  transactionScore: number,
  loanScore: number,
  age: number
): number {
  let score = age * (transactionScore + loanScore);
  score = score <= 0 ? 1 : score;
  return score;
}

export const getReputationaScores = () => {
  const transactionData = getAllMoneyTransaction();
  const loanData = getLoanData();
  const previousScore = getPreviousScore();

  const transactionScore = evaluateTransactionScore(
    transactionData,
    previousScore
  );
  const loanScore = evaluateLoanScore(loanData);

  let usersList = new Set();

  transactionData.forEach((transaction) => {
    usersList.add(transaction.sender);
    usersList.add(transaction.reciever);
  });
  
};
