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

module.exports = { User };
