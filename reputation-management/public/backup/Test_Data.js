// USER A, B, C
// Bank X, Y

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
      time: 5,
      amount: 7 * 10000,
      duration: 7,
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
    // { id: "12.3", type: Type.Transaction, from: "A", to: "B", amount: 10000000000 },
    // { id: "12.4", type: Type.Transaction, from: "C", to: "A", amount: 20000000000 },
  ],
};

module.exports = { Type, ladger };
