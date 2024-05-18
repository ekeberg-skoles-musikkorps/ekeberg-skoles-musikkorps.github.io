import {
  BillDenominationName,
  CoinDenominationName,
  SettlementReport,
} from "./money";

function pickOne<T>(options: T[]): T {
  return options[Math.trunc(Math.random() * options.length)];
}

function nextInt(lower: number, upper: number, scale = 1.0) {
  return lower + Math.trunc(Math.random() * (upper - lower) * scale);
}

export function sampleTeller() {
  return pickOne(["James", "Jill", "Sam", "Sally"]);
}

export function sampleChangeReserveOrder(): SettlementReport {
  return {
    teller: sampleTeller(),
    description: "Veksel",
    time: new Date(),
    balance: {
      kr1000: { count: 0 },
      kr500: { count: 0 },
      kr200: { count: -2 },
      kr100: { count: -5 },
      kr50: { count: -4 },
      kr20: { count: -5 },
      kr10: { count: -10 },
      kr5: { count: 0 },
      kr1: { count: 0 },
    },
  };
}

export function sampleCashBalance(
  scale = 1,
): Record<CoinDenominationName | BillDenominationName, { count: number }> {
  return {
    kr1000: { count: nextInt(0, 3, scale) },
    kr500: { count: nextInt(0, 5, scale) },
    kr200: { count: nextInt(0, 10, scale) },
    kr100: { count: nextInt(0, 10, scale) },
    kr50: { count: nextInt(0, 10, scale) },
    kr20: { count: nextInt(0, 20, scale) },
    kr10: { count: nextInt(0, 20, scale) },
    kr5: { count: nextInt(0, 20, scale) },
    kr1: { count: nextInt(0, 20, scale) },
  };
}

export function sampleSettlementReport(): SettlementReport {
  return {
    teller: sampleTeller(),
    time: new Date(),
    balance: sampleCashBalance(),
  };
}

export function sampleSettlements(): SettlementReport[] {
  return [
    sampleChangeReserveOrder(),
    sampleSettlementReport(),
    sampleSettlementReport(),
    sampleSettlementReport(),
  ];
}
