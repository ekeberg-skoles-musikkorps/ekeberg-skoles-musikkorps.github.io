import { SettlementReport } from "./money";

function pickOne<T>(options: T[]): T {
  return options[Math.trunc(Math.random() * options.length)];
}

function nextInt(lower: number, upper: number, scale = 1.0) {
  return lower + Math.trunc(Math.random() * (upper - lower) * scale);
}

export function sampleTeller() {
  return pickOne(["James", "Jill", "Sam", "Sally"]);
}

export function sampleVeksel() {
  return {
    teller: sampleTeller(),
    description: "Veksel",
    time: new Date(),
    settlement: {
      kr200: -400,
      kr100: -500,
      kr50: -200,
      kr20: -100,
      kr10: -100,
    },
  };
}

export function sampleSettlement(scale = 1) {
  return {
    kr1000: nextInt(0, 3, scale) * 1000,
    kr500: nextInt(0, 5, scale) * 500,
    kr200: nextInt(0, 10, scale) * 200,
    kr100: nextInt(0, 10, scale) * 100,
    kr50: nextInt(0, 10, scale) * 50,
    kr20: nextInt(0, 20, scale) * 20,
    kr10: nextInt(0, 20, scale) * 10,
    kr5: nextInt(0, 20, scale) * 5,
    kr1: nextInt(0, 20, scale),
  };
}

export function sampleSettlementReport() {
  return {
    teller: sampleTeller(),
    time: new Date(),
    settlement: sampleSettlement(),
  };
}

export function sampleSettlements(): SettlementReport[] {
  return [
    sampleVeksel(),
    sampleSettlementReport(),
    sampleSettlementReport(),
    sampleSettlementReport(),
  ];
}
