const BILL_DENOMINATIONS = [
  "kr1000",
  "kr500",
  "kr200",
  "kr100",
  "kr50",
] as const;
export type BillDenominationName = (typeof BILL_DENOMINATIONS)[number];

const COIN_DENOMINATIONS = ["kr20", "kr10", "kr5", "kr1"] as const;
export type CoinDenominationName = (typeof COIN_DENOMINATIONS)[number];

export type DenominationName = CoinDenominationName | BillDenominationName;

export interface DenominationType {
  label: string;
  denomination: DenominationName;
  amount: number;
}

export interface CoinDenominationType extends DenominationType {
  denomination: CoinDenominationName;
  grams: number;
}

export const bills: DenominationType[] = [
  { label: "1000-kr", denomination: "kr1000", amount: 1000 },
  { label: "500-kr", denomination: "kr500", amount: 500 },
  { label: "200-kr", denomination: "kr200", amount: 200 },
  { label: "100-kr", denomination: "kr100", amount: 100 },
  { label: "50-kr", denomination: "kr50", amount: 50 },
];

export const coins: CoinDenominationType[] = [
  { label: "20-kr", denomination: "kr20", amount: 20, grams: 9.9 },
  { label: "10-kr", denomination: "kr10", amount: 10, grams: 6.8 },
  { label: "5-kr", denomination: "kr5", amount: 5, grams: 7.85 },
  { label: "1-kr", denomination: "kr1", amount: 1, grams: 4.35 },
];

export const denominations = [...bills, ...coins];

export type CashBalance = Record<
  DenominationName,
  { count: number } | { grams: number }
>;

export interface SettlementReport {
  teller: string;
  time: Date;
  description?: string;
  balance: CashBalance;
}

export interface ChangeOrder {
  department: string;
  balance: Record<DenominationName, { count: number }>;
}

export function sumBalances(balances: CashBalance[]) {
  return Object.fromEntries(
    denominations.map((denomination) => {
      const count = balances
        .map((b) => countOfDenomination(b, denomination))
        .reduce((a, b) => a + b, 0);
      return [denomination.denomination, { count }];
    }),
  );
}

export function countOfDenomination(
  balance: CashBalance,
  denomination: DenominationType | CoinDenominationType,
) {
  const d = balance[denomination.denomination];
  const grams = "grams" in denomination ? denomination.grams : 1;
  return d && "count" in d
    ? d.count
    : d && "grams" in d
      ? Math.round(d.grams / grams)
      : 0;
}

export function amountOfDenomination(
  balance: CashBalance,
  denomination: DenominationType,
) {
  return countOfDenomination(balance, denomination) * denomination.amount;
}

export function cashTotal(balance: CashBalance) {
  return denominations
    .map((denomination) => amountOfDenomination(balance, denomination))
    .reduce((a, b) => a + b, 0);
}
