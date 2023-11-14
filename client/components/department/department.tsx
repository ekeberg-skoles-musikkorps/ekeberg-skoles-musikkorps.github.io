import React from "react";
import { BILL_LABELS, COIN_LABELS, Settlement } from "../../lib/money/bills";
import { SettlementTable } from "../settlements/settlementTable";
import { sampleSettlements } from "../../lib/money/sampleSettlements";

export function Department() {
  const settlements = sampleSettlements();

  const settlementSum: Settlement = Object.fromEntries(
    [...BILL_LABELS, ...COIN_LABELS].map((label) => [
      label,
      settlements.map((s) => s.settlement[label]).reduce((a, b) => a + b, 0) ||
        0,
    ]),
  );

  return (
    <>
      <h2>Avdelingsrapport</h2>
      {BILL_LABELS.map((l) =>
        settlementSum[l] ? (
          <div>
            {l}: {settlementSum[l]}
          </div>
        ) : (
          <></>
        ),
      )}
      {COIN_LABELS.map((l) =>
        settlementSum[l] ? (
          <div>
            {l}: {settlementSum[l]}
          </div>
        ) : (
          <></>
        ),
      )}
      <div>
        <strong>Sum</strong>:{" "}
        {Object.values(settlementSum).reduce((a, b) => a + b, 0)}
      </div>

      <SettlementTable settlements={settlements} />
    </>
  );
}
