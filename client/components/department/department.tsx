import React from "react";
import {
  BILL_DENOMINATIONS,
  COIN_DENOMINATIONS,
  sumBalances,
} from "../../lib/money/money";
import { SettlementTable } from "../settlements/settlementTable";
import { sampleSettlements } from "../../lib/money/sampleSettlements";

export function Department() {
  const settlements = sampleSettlements();
  const balance = sumBalances(settlements.map((s) => s.balance));

  return (
    <>
      <h2>Avdelingsrapport</h2>
      {BILL_DENOMINATIONS.map((d) =>
        balance[d] ? (
          <div>
            {d}: {balance[d]}
          </div>
        ) : (
          <></>
        ),
      )}
      {COIN_DENOMINATIONS.map((d) =>
        balance[d] ? (
          <div>
            {d}: {balance[d]}
          </div>
        ) : (
          <></>
        ),
      )}
      <div>
        <strong>Sum</strong>:{" "}
        {Object.values(balance).reduce((a, b) => a + b, 0)}
      </div>

      <SettlementTable settlements={settlements} />
    </>
  );
}
