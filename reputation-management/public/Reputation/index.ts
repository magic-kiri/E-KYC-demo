import {
  getAllMoneyTransaction,
  getLoanData,
  getPreviousScore,
  Score,
} from "./Data";
import { evaluateLoanScore } from "./loanScoreCalculation";
import { evaluateTransactionScore } from "./transactionScoreCalculation";
import { evaluateReputation, monthDifference } from "./utils";

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
  console.log(loanScore);
  // Calculating Scores END

  const newReputation: Record<string, Score> = {};
  const userList = Object.keys(previousScore);

  userList.forEach((user) => {
    const { createdAt } = previousScore[user];
    const age = monthDifference(new Date(createdAt), new Date());

    // Evaluating Loan Score
    const loan = previousScore[user].loanScore + (loanScore[user] || 0);
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
  console.log(newReputation);
  return newReputation;
};
