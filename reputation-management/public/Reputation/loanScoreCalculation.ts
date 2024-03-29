import { LoanData } from "./Data";
import { monthDifference } from "./utils";


type LoanFactor = {
  paid: number;
  unpaid: number;
  due: number;
};

export function evaluateLoanScore(loanData: LoanData[]) {
  const loanScoreFactor: Record<string, LoanFactor> = {};

  loanData.forEach((loan) => {
    const { accountNumber } = loan;
    const { paid, unpaid, due } = getIndividualLoanFactor(loan);

    if (loanScoreFactor[accountNumber] === undefined) {
      loanScoreFactor[accountNumber] = { paid, unpaid, due };
    } else {
      loanScoreFactor[accountNumber].paid += paid;
      loanScoreFactor[accountNumber].unpaid += unpaid;
      loanScoreFactor[accountNumber].due += due;
    }
  });

  const userList = Object.keys(loanScoreFactor);

  const C_l = 1;
  const C_paid = 2;

  const loanScore: Record<string, number> = {};
  userList.forEach((user) => {
    const { paid, unpaid, due } = loanScoreFactor[user];
    let L = C_paid * paid - due - unpaid;
    const sign = L < 0 ? -1 : 1; // sign of L .... positive or negative
    L = Math.abs(L);
    loanScore[user] = sign * C_l * Math.log10(L);
  });

  return loanScore;
}

function getIndividualLoanFactor({
  amountRecieved,
  debts,
  loanAmount,
  loanTime,
  loanStartTimeStamp,
}: LoanData): LoanFactor {
  const monthPassed = monthDifference(new Date(loanStartTimeStamp), new Date());
  const perMonthInstallment = loanAmount / loanTime;

  const paid = amountRecieved;
  const unpaid = debts;
  const due = Math.max(monthPassed * perMonthInstallment - paid, 0);
  return { paid, due, unpaid };
}
