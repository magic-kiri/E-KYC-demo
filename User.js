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
    let score = age * (this.transactionScore + this.loanScore + this.billScore);
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
    return this.loan;
  }
  setLoans(loans) {
    this.loans = loans;
  }
}

module.exports = { User };
