import {
  BILL_DENOMINATIONS,
  CashBalance,
  COIN_DENOMINATIONS,
} from "../../lib/money/money";
import React from "react";

export function SettlementTableHeader({
  report,
}: {
  report: { balance: CashBalance; description?: string };
}) {
  const { balance } = report;
  return (
    <tr>
      <th>{report.description}</th>
      <th></th>
      <th></th>
      <th className={"amount"}>
        {Object.values(balance).reduce((a, b) => a + b, 0)}
      </th>
      {BILL_DENOMINATIONS.map((d) => (
        <th key={d} className={"bill amount"}>
          {balance[d]}
        </th>
      ))}
      {COIN_DENOMINATIONS.map((d) => (
        <th key={d} className={"coin amount"}>
          {balance[d]}
        </th>
      ))}
    </tr>
  );
}
