function evaluateTransactionScore(transactions, user, userList, time) {
  let users = new Set();
  users.add(user);
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
    let otherParticipantsRepu = userList[oponent].getReputationScore(time);
    sum += txn.amount * otherParticipantsRepu;
  });
  const D = users.size - 1;
  const prevScore = userList[user].getTransactionScore();
  const C_u = 1;
  // return prevScore + C_u * D * sum;
  const transactionAmmount = D * sum;
  return prevScore + C_u * Math.log10(transactionAmmount || 1);
}

function evaluateBillScore(bills, user, userList) {
  const prevScore = userList[user].getBillScore();
  const C_b = 1;
  return C_b * Math.log10(bills || 1) + prevScore;
}

function evaluatePaymentScore(payments, time, user) {
  payments.forEach((payment) => user.payBill(payment));
  const { paid, due, unpaid } = user.getLoanScoreParameter(time);
  const C_l = 1;
  const C_paid = 1.5;
  const prevLoanScore = user.getLoanScore();

  // console.log({ user: user.getName(), paid, due, unpaid, prevLoanScore });
  let L = C_paid * paid - due - unpaid;
  L = L <= 0 ? 1 : L;
  const newScore = C_l * Math.log10(L) + prevLoanScore;
  return newScore;
}

module.exports = {
  evaluateTransactionScore,
  evaluateBillScore,
  evaluatePaymentScore,
};
