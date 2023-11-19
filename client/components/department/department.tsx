import React from "react";
import {
  amountOfDenomination,
  bills,
  cashTotal,
  coins,
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
      {bills.map((d) =>
        balance[d.denomination] ? (
          <div>
            {d.label}: {amountOfDenomination(balance, d)}
          </div>
        ) : (
          <></>
        ),
      )}
      {coins.map((d) =>
        balance[d.denomination] ? (
          <div>
            {d.label}: {amountOfDenomination(balance, d)}
          </div>
        ) : (
          <></>
        ),
      )}
      <div>
        <strong>Sum</strong>: {cashTotal(balance)}
      </div>

      <SettlementTable settlements={settlements} />
    </>
  );
}
