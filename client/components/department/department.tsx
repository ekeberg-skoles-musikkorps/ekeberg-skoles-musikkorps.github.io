import React from "react";
import {
  BILL_DENOMINATIONS,
  COIN_DENOMINATIONS,
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
      {BILL_DENOMINATIONS.map((d) =>
        settlementSum[d] ? (
          <div>
            {d}: {settlementSum[d]}
          </div>
        ) : (
          <></>
        ),
      )}
      {COIN_DENOMINATIONS.map((d) =>
        settlementSum[d] ? (
          <div>
            {d}: {settlementSum[d]}
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
