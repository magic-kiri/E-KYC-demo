import { Score, Transaction } from "./Data";
import { evaluateReputation } from "./utils";

function getBlankObject(userList: Set<string | number>) {
  const object: Record<
    string,
    {
      weightedTotalAmount: number;
      interactedWith: Set<string | number>;
      transactionContribution: number;
    }
  > = {};

  userList.forEach(
    (user) =>
      (object[user] = {
        weightedTotalAmount: 0,
        interactedWith: new Set(),
        transactionContribution: 0,
      })
  );

  return object;
}

export function evaluateTransactionScore(
  transactions: Transaction[],
  previousScore: Record<string, Score> = {}
) {
  let usersList: Set<string | number> = new Set();

  transactions.forEach((transaction) => {
    usersList.add(transaction.sender);
    usersList.add(transaction.reciever);
  });

  let initialScore = getBlankObject(usersList);

  transactions.forEach(({ sender, reciever, amount }) => {
    initialScore[sender].weightedTotalAmount +=
      amount *
      (previousScore[reciever]?.reputation || evaluateReputation(0, 0));
    initialScore[sender].interactedWith.add(reciever);

    initialScore[reciever].weightedTotalAmount +=
      amount *
      (previousScore[reciever]?.reputation || evaluateReputation(0, 0));
    initialScore[reciever].interactedWith.add(sender);
  });
  const C_u = 1;

  usersList.forEach((user) => {
    const { weightedTotalAmount, interactedWith } = initialScore[user];
    initialScore[user].transactionContribution =
      C_u * Math.log10(weightedTotalAmount * interactedWith.size);
  });

  return initialScore;
}
