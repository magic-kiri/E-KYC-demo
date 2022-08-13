import {
  getAllMoneyTransaction,
  getLoanData,
  getPreviousScore,
  Score,
} from "./Data";
import { evaluateLoanScore } from "./loanScoreCalculation";
import { evaluateTransactionScore } from "./transactionScoreCalculation";
import { monthDifference } from "./utils";

// const { evaluateTransactionScore } = require("./transactionScoreCalculation");
// const { getAllMoneyTransaction, getPreviousScore } = require("./Data");

function evaluateReputation(
  transactionScore: number,
  loanScore: number,
  age: number = 1
): number {
  let score = age * (transactionScore + loanScore);
  score = score <= 0 ? 1 : score;
  return score;
}

export const getReputationaScores = () => {
  // Fetch Data START
  const transactionData = getAllMoneyTransaction();
  const loanData = getLoanData();
  const previousScore = getPreviousScore();
  // Fetch Data END

  // Caculating Scores START
  const transactionScore = evaluateTransactionScore(
    transactionData,
    previousScore
  );
  const loanScore = evaluateLoanScore(loanData);
  // Calculating Scores END

  const newReputation: Record<string, Score> = {};
  const userList = Object.keys(previousScore);

  userList.forEach((user) => {
    const { createdAt } = previousScore[user];
    const age = monthDifference(new Date(createdAt), new Date());

    // Evaluating Loan Score
    const loan = previousScore[user].loanScore + loanScore[user];
    // Evaluating Transaction Score
    const transaction =
    previousScore[user].transactionScore +
    transactionScore[user].transactionContribution;
    // Final Reputation
    const reputation = evaluateReputation(transaction, loan, age);
    
    newReputation[user] = {
      createdAt,
      transactionScore: transaction,
      loanScore: loan,
      reputation,
    };
  });

  return newReputation;
};
