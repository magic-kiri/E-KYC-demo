const { Type, ladger } = require("./Test_Data");
const { User } = require("./User");
const {
  transactionHelper,
  billHelper,
  loanHelper,
  paymentHelper,
} = require("./Helper");

const { transactionScore, billScore } = require("./Score");

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
    // console.log(name);
    // console.dir(transactionScore(total[name].transaction, name, userList));
    // console.dir(billScore(total[name].bill, name, userList));
    console.log(userList[name].getLoans());
  }
}

for (let i = 2; i <= 2; i++) {
  let data = ladger[i];
  processData(i, data);
}

// console.log(userList.A.getLoan());
// console.log(userList.B.getLoan());
// console.log(userList.C.getLoan());
