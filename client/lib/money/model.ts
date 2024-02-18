import { CashBalance, SettlementReport } from "./money";

export interface Project {
  _id: string;
  cashBalanceSettlements: CashBalanceSettlement[];
  departments: ProjectDepartment[];
  startingCashBalance: CashBalanceSettlement;
  currentCashBalance: CashBalanceSettlement;
  users: ProjectUser[];
}

export interface ProjectUser {
  _id: string;
  phoneNumber: string;
  name?: string;
  role: "admin" | "teller" | "readOnly";
}

export interface CashBalanceSettlement {
  description: string;
  time: Date;
  includedSettlements: SettlementReport[];
  looseCash: CashBalance;
  moneyBags: MoneyBag[];
}

interface ProjectDepartment {
  _id: string;
  name: string;
  settlements: SettlementReport[];
  pendingExchangeOrder: CashBalance;
}

export interface MoneyBag {
  _id: string;
  barcode?: string;
  balance: CashBalance;
}
