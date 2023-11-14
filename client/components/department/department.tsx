import React from "react";
import {
  BILL_LABELS,
  COIN_LABELS,
  sumSettlements,
} from "../../lib/money/money";
import { SettlementTable } from "../settlements/settlementTable";
import { sampleSettlements } from "../../lib/money/sampleSettlements";

export function Department() {
  const settlements = sampleSettlements();
  const settlementSum = sumSettlements(settlements.map((s) => s.settlement));

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
