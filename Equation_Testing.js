const Type = {
  Transaction: "transaction",
  Loan: "loan",
  Bill: "bill",
  Payment: "Payment",
};

const ladger = {
  1: [
    { id: "1.1", type: Type.Transaction, from: "A", to: "B", amount: 10000 },
    { id: "1.2", type: Type.Transaction, from: "C", to: "A", amount: 20000 },
    { id: "1.3", type: Type.Bill, from: "A", amount: 3500 },
    { id: "1.4", type: Type.Bill, from: "B", amount: 3000 },
    { id: "1.5", type: Type.Bill, from: "C", amount: 4000 },
  ],
  2: [
    { id: "2.1", type: Type.Transaction, from: "B", to: "C", amount: 12000 },
    { id: "2.2", type: Type.Transaction, from: "C", to: "A", amount: 15000 },
    {
      id: "2.3",
      type: Type.Loan,
      from: "A",
      amount: 2 * 100000,
      duration: 10,
      time: 2,
    },
    { id: "2.4", type: Type.Bill, from: "B", amount: 3000 },
    { id: "2.5", type: Type.Bill, from: "C", amount: 4000 },
  ],
  3: [
    { id: "3.1", type: Type.Transaction, from: "A", to: "C", amount: 1000 },
    { id: "3.1", type: Type.Transaction, from: "C", to: "A", amount: 2000 },
    { id: "3.1", type: Type.Transaction, from: "A", to: "C", amount: 5000 },
    { id: "3.2", type: Type.Transaction, from: "B", to: "A", amount: 25000 },
    {
      id: "3.3",
      type: Type.Payment,
      paymentID: "2.3",
      from: "A",
      amount: 20000,
    },
    { id: "3.4", type: Type.Bill, from: "A", amount: 2000 },
    { id: "3.5", type: Type.Bill, from: "C", amount: 2500 },
  ],
  4: [
    {
      id: "4.2",
      type: Type.Payment,
      paymentID: "2.3",
      from: "A",
      amount: 20000,
    },
    { id: "4.3", type: Type.Bill, from: "B", amount: 5000 },
    { id: "4.4", type: Type.Bill, from: "C", amount: 4000 },
  ],
  5: [
    { id: "5.1", type: Type.Transaction, from: "B", to: "C", amount: 1000 },
    {
      id: "5.2",
      type: Type.Loan,
      from: "B",
      amount: 100000,
      duration: 10,
      time: 5,
    },
  ],
  6: [
    {
      id: "6.1",
      type: Type.Payment,
      paymentID: "2.3",
      from: "A",
      amount: 40000,
    },
    {
      id: "6.2",
      type: Type.Payment,
      paymentID: "5.2",
      from: "B",
      amount: 10000,
    },
  ],
  7: [
    {
      id: "7.1",
      type: Type.Payment,
      paymentID: "2.3",
      from: "A",
      amount: 20000,
    },
    {
      id: "7.2",
      type: Type.Payment,
      paymentID: "5.2",
      from: "B",
      amount: 10000,
    },
  ],
  8: [
    {
      id: "8.1",
      type: Type.Payment,
      paymentID: "2.3",
      from: "A",
      amount: 20000,
    },
    {
      id: "8.2",
      type: Type.Payment,
      paymentID: "5.2",
      from: "B",
      amount: 10000,
    },
  ],
  9: [
    {
      id: "9.1",
      type: Type.Payment,
      paymentID: "5.2",
      from: "B",
      amount: 10000,
    },
  ],
  10: [
    {
      id: "10.1",
      type: Type.Payment,
      paymentID: "5.2",
      from: "B",
      amount: 10000,
    },
  ],
  11: [
    {
      id: "11.1",
      type: Type.Payment,
      paymentID: "5.2",
      from: "B",
      amount: 10000,
    },
  ],
  12: [
    {
      id: "12.1",
      type: Type.Payment,
      paymentID: "2.3",
      from: "A",
      amount: 40000,
    },
    {
      id: "12.2",
      type: Type.Payment,
      paymentID: "5.2",
      from: "B",
      amount: 10000,
    },
  ],
};

class User {
  constructor(name) {
    this.name = name;

    this.transactionScore = 0;
    this.loanScore = 0;
    this.billScore = 0;
    this.startingTime = 0;
    this.lastPaid = 0;
    this.loan = {};
  }

  getRating(currentTime) {
    let age = currentTime - this.startingTime;
    return age * (this.transactionScore + this.loanScore + this.billScore);
  }

  getTransactionScore() {
    return this.transactionScore;
  }

  getLoanScore() {
    return this.loanScore;
  }

  getBillScore() {
    return this.billScore;
  }

  setTransactionScore(score) {
    this.transactionScore = score;
  }

  setLoanScore(score) {
    this.loanScore = score;
  }

  setBillScore(score) {
    this.billScore = score;
  }

  getLoan() {
    return this.loan;
  }
  setLoan(loan) {
    this.loan = loan;
  }
}

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

function calculate(data) {
  let total = {
    A: { ...empty },
    B: { ...empty },
    C: { ...empty },
  };

  for (const [time, monthlyTransaction] of Object.entries(data)) {
    monthlyTransaction.forEach((transaction) => {
      if (transaction.type === Type.Transaction) {
        total[transaction.from].transaction.push({ ...transaction });
        total[transaction.to].transaction.push({ ...transaction });
        // total[transaction.from].transaction += transaction.amount;
        // total[transaction.to].transaction += transaction.amount;
      } else if (transaction.type === Type.Bill) {
        total[transaction.from].bill += transaction.amount;
      } else if (transaction.type === Type.Loan) {
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
      } else if (transaction.type === Type.Payment) {
        total[transaction.from].payment.push(transaction);
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
  calculate(data);
}

console.log(userList.A.getLoan());
console.log(userList.B.getLoan());
console.log(userList.C.getLoan());
