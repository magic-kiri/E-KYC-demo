function transactionHelper(transaction, total) {
  total[transaction.from].transaction.push({ ...transaction });
  total[transaction.to].transaction.push({ ...transaction });
}

function billHelper(transaction, total) {
  total[transaction.from].bill += transaction.amount;
}

function loanHelper(transaction, userList) {
  let user = userList[transaction.from];
  user.setLoan({
    ...user.getLoan(),
    [transaction.id]: {
      startingTime: transaction.time,
      duration: transaction.duration,
      amount: transaction.amount,
      paid: 0,
      perMonthPayment: transaction.amount / transaction.duration,
    },
  });
}

function paymentHelper(transaction, total) {
  total[transaction.from].payment.push(transaction);
}

module.exports = { transactionHelper, billHelper, loanHelper, paymentHelper };
