const { Type, ladger } = require("./Test_Data");
const { User } = require("./User");
const {
  transactionHelper,
  billHelper,
  loanHelper,
  paymentHelper,
} = require("./Helper");
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

function processData(data) {
  let total = {
    A: { ...empty },
    B: { ...empty },
    C: { ...empty },
  };

  for (const [time, monthlyTransaction] of Object.entries(data)) {
    monthlyTransaction.forEach((transaction) => {
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
  }

  for (const [name, data] of Object.entries(total)) {
    console.log(name);
    console.log(data.transaction);
  }
}

for (let i = 1; i <= 2; i += 2) {
  let data = { [i]: ladger[i], [i + 1]: ladger[i + 1] };
  processData(data);
}

console.log(userList.A.getLoan());
console.log(userList.B.getLoan());
console.log(userList.C.getLoan());
