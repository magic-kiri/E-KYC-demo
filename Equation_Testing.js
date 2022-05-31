const { Type, ladger } = require("./Test_Data");
const { User } = require("./User");
const {
  transactionHelper,
  billHelper,
  loanHelper,
  paymentHelper,
} = require("./Helper");

const {
  evaluateTransactionScore,
  evaluateBillScore,
  evaluatePaymentScore,
} = require("./Score");

const userList = {
  A: new User("A"),
  B: new User("B"),
  C: new User("C"),
};

const empty = {
  transaction: [],
  bill: 0,
  payment: [],
};

function processData(time, data) {
  let total = {
    A: JSON.parse(JSON.stringify(empty)),
    B: JSON.parse(JSON.stringify(empty)),
    C: JSON.parse(JSON.stringify(empty)),
  };

  data.forEach((transaction) => {
    if (transaction.type === Type.Transaction) {
      transactionHelper(transaction, total);
    } else if (transaction.type === Type.Bill) {
      billHelper(transaction, total);
    } else if (transaction.type === Type.Loan) {
      loanHelper(transaction, userList);
    } else if (transaction.type === Type.Payment) {
      paymentHelper(transaction, total);
    }
  });

  for (const [name, data] of Object.entries(total)) {
    const transactionScore = evaluateTransactionScore(
      total[name].transaction,
      name,
      userList
    );
    const billScore = evaluateBillScore(total[name].bill, name, userList);
    const loanScore = evaluatePaymentScore(
      total[name].payment,
      time,
      userList[name]
    );

    userList[name].setTransactionScore(transactionScore);
    userList[name].setLoanScore(loanScore);
    userList[name].setBillScore(billScore);
  }
}

for (let i = 1; i <= 3; i++) {
  let data = ladger[i];
  processData(i, data);
  // console.log(`:::::${i}`);
  // console.log(userList.A.getTransactionScore());
  // console.log(userList.A.getLoanScore());
  // console.log(userList.A.getBillScore());

  // console.log(userList.A.getReputationScore(i));
  // console.log(userList.B.getReputationScore(i));
  // console.log(userList.C.getReputationScore(i));
}
