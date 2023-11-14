export const BILL_LABELS = ["kr1000", "kr500", "kr200", "kr100", "kr50"];
export type BillType = (typeof BILL_LABELS)[number];

export const bills: { label: string; field: BillType; amount: number }[] = [
  { label: "1000-kr", field: "kr1000", amount: 1000 },
  { label: "500-kr", field: "kr500", amount: 500 },
  { label: "200-kr", field: "kr200", amount: 200 },
  { label: "100-kr", field: "kr100", amount: 100 },
  { label: "50-kr", field: "kr50", amount: 50 },
];

export const COIN_LABELS = ["kr20", "kr10", "kr5", "kr1"];
export type CoinType = (typeof COIN_LABELS)[number];

export const coins: {
  label: string;
  field: CoinType;
  amount: number;
  grams: number;
}[] = [
  { label: "20-kr", field: "kr20", amount: 20, grams: 9.9 },
  { label: "10-kr", field: "kr10", amount: 10, grams: 6.8 },
  { label: "5-kr", field: "kr5", amount: 5, grams: 7.85 },
  { label: "1-kr", field: "kr1", amount: 1, grams: 4.35 },
];

export type CurrencyAmountType = CoinType | BillType;

export type Settlement = Record<CurrencyAmountType, number>;

export interface SettlementReport {
  teller: string;
  time: Date;
  description?: string;
  settlement: Settlement;
}
