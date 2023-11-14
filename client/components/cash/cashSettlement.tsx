import React from "react";
import {
  sampleSettlement,
  sampleSettlementReport,
  sampleTeller,
  sampleVeksel,
} from "../../lib/money/sampleSettlements";
import { SettlementTableTitleHeader } from "../settlements/settlementTableTitleHeader";
import { SettlementTableHeader } from "../settlements/settlementTableHeader";
import { SettlementTableRow } from "../settlements/settlementTableRow";
import { sumSettlements } from "../../lib/money/money";

export function CashSettlement() {
  const settlements = [
    {
      description: "Start",
      teller: sampleTeller(),
      time: new Date(),
      settlement: sampleSettlement(),
      included: [],
    },
    {
      description: "Etter veksel",
      teller: sampleTeller(),
      time: new Date(),
      settlement: sampleSettlement(0.1),
      included: [sampleVeksel(), sampleVeksel()],
    },
    {
      description: "Etter dag 1",
      teller: sampleTeller(),
      time: new Date(),
      settlement: sampleSettlement(10),
      included: [
        sampleSettlementReport(),
        sampleSettlementReport(),
        sampleSettlementReport(),
      ],
    },
    {
      description: "Etter veksel dag 2",
      teller: sampleTeller(),
      time: new Date(),
      settlement: sampleSettlement(0.1),
      included: [sampleVeksel(), sampleVeksel()],
    },
  ];

  return (
    <>
      <h2>Kontantavstemming</h2>
      <table className={"settlement-table"}>
        <thead>
          <SettlementTableTitleHeader />
        </thead>
        <tbody>
          {settlements.map((s) => (
            <>
              {s.included.length > 0 && (
                <SettlementTableRow
                  report={{
                    settlement: sumSettlements(
                      s.included.map((i) => i.settlement),
                    ),
                    description: "Sum av posteringer",
                  }}
                />
              )}
              <SettlementTableHeader key={s.time.toString()} report={s} />
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}
