import { CashBalance, SettlementReport } from "./money";

export interface Event {
  _id: string;
  cashBalanceSettlements: CashBalanceSettlement[];
  departments: EventDepartment[];
  currentCashBalance: CashBalanceSettlement;
}

export interface CashBalanceSettlement {
  description: string;
  time: Date;
  includedSettlements: SettlementReport[];
  looseCash: CashBalance;
  moneyBags: MoneyBag[];
}

interface EventDepartment {
  _id: string;
  name: string;
  settlements: SettlementReport[];
  pendingExchangeOrder: CashBalance;
}

interface MoneyBag {
  _id: string;
  barcode?: string;
  balance: CashBalance;
}
