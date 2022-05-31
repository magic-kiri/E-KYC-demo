class User {
  constructor(name) {
    this.name = name;

    this.transactionScore = 0;
    this.loanScore = 0;
    this.billScore = 0;
    this.startingTime = 0;
    this.lastPaid = 0;
    this.loans = {};
  }
  getName() {
    return this.name;
  }

  getReputationScore(currentTime) {
    let age = currentTime - this.startingTime;
    let score = 1 * (this.transactionScore + this.loanScore + this.billScore);
    score = score === 0 ? 1 : score;
    return score;
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

  getLoans() {
    return this.loans;
  }
  setLoans(loans) {
    this.loans = loans;
  }

  payBill(payment) {
    if (payment?.from !== this.name) {
      console.log("Not actual owner!");
    } else {
      const { paymentID, amount } = payment;
      if (this.loans[paymentID]) {
        this.loans[paymentID].paid += amount;
      } else {
        console.log(`Loan doesn't exist for ${this.name}`);
      }
    }
  }

  getLoanScoreParameter(time) {
    let paid = 0,
      due = 0,
      unpaid = 0;
    for (const [id, loanInfo] of Object.entries(this.getLoans())) {
      if (time === loanInfo.startingTime) {
        unpaid += loanInfo.amount - loanInfo.paid;
      }
      paid += loanInfo.paid;
      due +=
        loanInfo.perMonthPayment * (time - loanInfo.startingTime) -
        loanInfo.paid;
    }
    return { paid, due, unpaid };
  }
}

module.exports = { User };
