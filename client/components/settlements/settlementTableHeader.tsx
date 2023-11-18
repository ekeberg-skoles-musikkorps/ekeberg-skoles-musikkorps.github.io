import {
  BILL_DENOMINATIONS,
  CashBalance,
  cashTotal,
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
      <th className={"amount"}>{cashTotal(balance)}</th>
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
