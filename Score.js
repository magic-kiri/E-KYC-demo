function transactionScore(transactions, user, userList) {
  let users = new Set();
  let sum = 0;
  transactions.forEach((txn) => {
    users.add(txn.from);
    users.add(txn.to);

    let oponent;

    if (txn.from === user) {
      oponent = txn.to;
    } else {
      oponent = txn.from;
    }
    let oponentReputation = userList[oponent].getReputationScore(new Date());
    sum += txn.amount * oponentReputation;
  });
  const D = users.size - 1;
  const prevScore = userList[user].getTransactionScore();
  const C_u = 1;
  return prevScore + C_u * D * sum;
}

function billScore(bills, user, userList) {
  const prevScore = userList[user].getBillScore();
  const C_b = 1;
  return C_b * bills + prevScore;
}

function loanScore(loans, user, userList) {}

module.exports = { transactionScore, billScore };
