function evaluateTransactionScore(transactions, user, userList) {
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
    let otherParticipantsRepu = userList[oponent].getReputationScore(new Date());
    // sum += txn.amount;
    sum += txn.amount * Math.log10(otherParticipantsRepu);
  });
  const D = users.size - 1;
  const prevScore = userList[user].getTransactionScore();
  const C_u = 1;
  // console.log('prevScore');
  // console.log(prevScore);
  // console.log(sum);
  return prevScore + C_u * D * sum;
}

function evaluateBillScore(bills, user, userList) {
  const prevScore = userList[user].getBillScore();
  const C_b = 1;
  return C_b * bills + prevScore;
}

function evaluatePaymentScore(payments, time, user) {
  payments.forEach((payment) => user.payBill(payment));
  const { paid, due, unpaid } = user.getLoanScoreParameter(time);
  const C_l = 1;
  const C_paid = 1.5;
  const prevLoanScore = user.getLoanScore();
  const newScore = C_l * (C_paid * paid - due - unpaid) + prevLoanScore;
  return newScore;
}

module.exports = {
  evaluateTransactionScore,
  evaluateBillScore,
  evaluatePaymentScore,
};
