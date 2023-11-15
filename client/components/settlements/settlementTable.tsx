import { SettlementReport, sumBalances } from "../../lib/money/money";
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
  const balance = sumBalances(settlements.map((s) => s.balance));

  return (
    <table className={"settlement-table"}>
      <thead>
        <SettlementTableTitleHeader />
        <SettlementTableHeader report={{ description: "SUM", balance }} />
      </thead>
      <tbody>
        {settlements.map((s) => (
          <SettlementTableRow key={s.time.toString()} report={s} />
        ))}
      </tbody>
    </table>
  );
}
