import { Score, Transaction } from "./Data";

function getBlankObject(userList) {
  const object = {};

  userList.forEach(
    (user) =>
      (object[user] = { weightedTotalAmount: 0, interactedWith: new Set() })
  );

  return object;
}

export function evaluateTransactionScore(
  transactions: Transaction[],
  previousScore: Record<string, Score> = {}
) {
  let usersList = new Set();

  transactions.forEach((transaction) => {
    usersList.add(transaction.sender);
    usersList.add(transaction.reciever);
  });

  let initialScore = getBlankObject(usersList);

  transactions.forEach(({ sender, reciever, amount }) => {
    initialScore[sender].weightedTotalAmount +=
      amount * (previousScore[reciever]?.reputation || 1);
    initialScore[sender].interactedWith.add(reciever);

    initialScore[reciever].weightedTotalAmount +=
      amount * (previousScore[reciever]?.reputation || 1);
    initialScore[reciever].interactedWith.add(sender);
  });
  const C_u = 1;

  usersList.forEach((user) => {
    const { weightedTotalAmount, interactedWith } = initialScore[user];
    initialScore[user].transactionContribution =
      C_u * Math.log10(weightedTotalAmount * interactedWith.size);
  });

  // add log10
  return initialScore;
}
