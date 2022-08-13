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

  const buffer = {};
  for (const [name, data] of Object.entries(total)) {
    const transactionScore = evaluateTransactionScore(
      total[name].transaction,
      name,
      userList,
      time
    );
    const billScore = evaluateBillScore(total[name].bill, name, userList);
    const loanScore = evaluatePaymentScore(
      total[name].payment,
      time,
      userList[name]
    );
    buffer[name] = { transactionScore, loanScore, billScore };
  }

  // console.dir(buffer, { depth: null });

  Object.keys(buffer).forEach((name) => {
    const user = userList[name];
    user.setTransactionScore(buffer[name].transactionScore);
    user.setLoanScore(buffer[name].loanScore);
    user.setBillScore(buffer[name].billScore);
  });
}
const resultData = { A: [], B: [], C: [] };
for (let i = 1; i <= 12; i++) {
  let data = ladger[i];
  processData(i, data);
  resultData.A.push(userList.A.getReputationScore(i));
  resultData.B.push(userList.B.getReputationScore(i));
  resultData.C.push(userList.C.getReputationScore(i));
}

export default resultData;
