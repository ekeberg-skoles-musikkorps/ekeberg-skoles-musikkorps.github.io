import { SettlementReport, sumSettlements } from "../../lib/money/money";
import React from "react";

import "./settlement.css";
import { SettlementTableRow } from "./settlementTableRow";
import { SettlementTableHeader } from "./settlementTableHeader";
import { SettlementTableTitleHeader } from "./settlementTableTitleHeader";

export function SettlementTable({
  settlements,
}: {
  settlements: SettlementReport[];
}) {
  const settlementSum = sumSettlements(settlements.map((s) => s.settlement));

  return (
    <table className={"settlement-table"}>
      <thead>
        <SettlementTableTitleHeader />
        <SettlementTableHeader
          report={{
            description: "SUM",
            settlement: settlementSum,
          }}
        />
      </thead>
      <tbody>
        {settlements.map((s) => (
          <SettlementTableRow key={s.time.toString()} report={s} />
        ))}
      </tbody>
    </table>
  );
}
