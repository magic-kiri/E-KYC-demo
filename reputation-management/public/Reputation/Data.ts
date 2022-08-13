// Data Types START
export type Transaction = {
  sender: number | string;
  reciever: number | string;
  amount: number;
  senderBankID: number;
  recieverBankID: number;
  moneyTransactionTimestamp: string;
};

export type LoanData = {
  loanId: number;
  accountNumber: number | string;
  amountRecieved: number;
  loanAmount: number;
  numberOfInstallmentRecieved: number;
  debts: number;
  loanTime: number;
  loanStartTimeStamp: string;
};

export type Score = {
  transactionScore: number;
  loanScore: number;
  reputation: number;
  createdAt: string | Date; // When the account was created!
};
// Data Types END

export const getAllMoneyTransaction: () => Transaction[] = () => {
  return [
    {
      sender: 1000020,
      reciever: 1000026,
      amount: 80,
      senderBankID: 2010,
      recieverBankID: 2010,
      moneyTransactionTimestamp: "2022-07-02T21:46:48.000Z",
    },
    {
      sender: 1000020,
      reciever: 200004,
      amount: 1000,
      senderBankID: 2010,
      recieverBankID: 1000,
      moneyTransactionTimestamp: "2022-07-02T21:46:47.000Z",
    },
    {
      sender: 1000020,
      reciever: 200004,
      amount: 80,
      senderBankID: 2010,
      recieverBankID: 1000,
      moneyTransactionTimestamp: "2022-07-02T21:46:47.000Z",
    },
    {
      sender: 1000020,
      reciever: 1000026,
      amount: 40,
      senderBankID: 2010,
      recieverBankID: 2010,
      moneyTransactionTimestamp: "2022-07-02T21:46:47.000Z",
    },
  ];
};

export const getPreviousScore: () => Record<string, Score> = () => {
  return {
    "1000020": {
      transactionScore: 0,
      loanScore: 0,
      reputation: 2,
      createdAt: "2022-07-02T21:46:48.000Z",
    },
    "1000026": {
      transactionScore: 0,
      loanScore: 0,
      reputation: 3,
      createdAt: "2022-07-02T21:46:48.000Z",
    },
    "200004": {
      transactionScore: 0,
      loanScore: 0,
      reputation: 4,
      createdAt: "2022-07-02T21:46:48.000Z",
    },
  };
};

export const getLoanData: () => LoanData[] = () => {
  return [
    {
      loanId: 19,
      accountNumber: 1000020,
      amountRecieved: 700,
      loanAmount: 10000,
      numberOfInstallmentRecieved: 2,
      debts: 9300,
      loanTime: 24,
      loanStartTimeStamp: "2022-04-26T11:42:22.000Z",
    },
    {
      loanId: 21,
      accountNumber: 1000019,
      amountRecieved: 500,
      loanAmount: 10000,
      numberOfInstallmentRecieved: 1,
      debts: 9500,
      loanTime: 12,
      loanStartTimeStamp: "2022-04-26T13:47:37.000Z",
    },
    {
      loanId: 23,
      accountNumber: 1000020,
      amountRecieved: 0,
      loanAmount: 100000,
      numberOfInstallmentRecieved: 0,
      debts: 100000,
      loanTime: 12,
      loanStartTimeStamp: "2022-08-03T21:10:25.000Z",
    },
    {
      loanId: 25,
      accountNumber: 1000020,
      amountRecieved: 0,
      loanAmount: 7000,
      numberOfInstallmentRecieved: 0,
      debts: 7000,
      loanTime: 12,
      loanStartTimeStamp: "2022-08-03T20:56:55.000Z",
    },
  ];
};
