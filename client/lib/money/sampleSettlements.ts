import { Settlement, SettlementReport } from "./bills";

function pickOne<T>(options: T[]): T {
  return options[Math.trunc(Math.random() * options.length)];
}

function nextInt(lower: number, upper: number) {
  return lower + Math.trunc(Math.random() * (upper - lower));
}

function sampleTeller() {
  return pickOne(["James", "Jill", "Sam", "Sally"]);
}

function sampleVeksel() {
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

function sampleSettlement() {
  const settlement: Settlement = {
    kr1000: nextInt(0, 3) * 1000,
    kr500: nextInt(0, 5) * 500,
    kr200: nextInt(0, 10) * 200,
    kr100: nextInt(0, 10) * 100,
    kr50: nextInt(0, 10) * 50,
    kr20: nextInt(0, 20) * 20,
    kr10: nextInt(0, 20) * 10,
    kr5: nextInt(0, 20) * 5,
    kr1: nextInt(0, 20) * 1,
  };
  return {
    teller: sampleTeller(),
    time: new Date(),
    settlement,
  };
}

export function sampleSettlements(): SettlementReport[] {
  return [
    sampleVeksel(),
    sampleSettlement(),
    sampleSettlement(),
    sampleSettlement(),
  ];
}
