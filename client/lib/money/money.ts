export const BILL_DENOMINATIONS = ["kr1000", "kr500", "kr200", "kr100", "kr50"];
export type BillDenominations = (typeof BILL_DENOMINATIONS)[number];

export const bills: {
  label: string;
  denomination: BillDenominations;
  amount: number;
}[] = [
  { label: "1000-kr", denomination: "kr1000", amount: 1000 },
  { label: "500-kr", denomination: "kr500", amount: 500 },
  { label: "200-kr", denomination: "kr200", amount: 200 },
  { label: "100-kr", denomination: "kr100", amount: 100 },
  { label: "50-kr", denomination: "kr50", amount: 50 },
];

export const COIN_DENOMINATIONS = ["kr20", "kr10", "kr5", "kr1"];
export type CoinDenominations = (typeof COIN_DENOMINATIONS)[number];

export const coins: {
  label: string;
  denomination: CoinDenominations;
  amount: number;
  grams: number;
}[] = [
  { label: "20-kr", denomination: "kr20", amount: 20, grams: 9.9 },
  { label: "10-kr", denomination: "kr10", amount: 10, grams: 6.8 },
  { label: "5-kr", denomination: "kr5", amount: 5, grams: 7.85 },
  { label: "1-kr", denomination: "kr1", amount: 1, grams: 4.35 },
];

export type CurrencyAmountType = CoinDenominations | BillDenominations;

export type Settlement = Record<CurrencyAmountType, number>;

export interface SettlementReport {
  teller: string;
  time: Date;
  description?: string;
  settlement: Settlement;
}

export function sumSettlements(settlements: Settlement[]) {
  let denominations = [...BILL_DENOMINATIONS, ...COIN_DENOMINATIONS];
  return Object.fromEntries(
    denominations.map((d) => [
      d,
      settlements.map((s) => s[d]).reduce((a, b) => a + b, 0) || 0,
    ]),
  );
}
